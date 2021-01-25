import {EventEmitter, Injectable, Output} from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class RotateService {
  private PI2 = 1.61; // Math.PI / 2;
  private nextCubePosition = 1.1;
  private rotateObj: {
    rotating: boolean,
    cubes: THREE.Mesh[] | null | undefined,
    direction: boolean,
    axis: string | null,
    start: null | number,
    side: string | null,
    returnPromise: boolean
  }  = {
    rotating: false,
    cubes: null,
    direction: true,
    axis: null,
    start: null,
    side: null,
    returnPromise: false
  };

  private colorsMesh = {
    U: {
      0: 11,
      2: 9,
      4: 5,
      6: 7,
      8: 1,
      10: 3
    },
    R: {
      0: 5,
      2: 7,
      4: 3,
      6: 1,
      8: 9,
      10: 11
    },
    F: {
      0: 1,
      2: 3,
      4: 11,
      6: 9,
      8: 5,
      10: 7
    },
    L: {
      0: 5,
      2: 7,
      4: 3,
      6: 1,
      8: 9,
      10: 11
    },
    Ua: {
      0: 9,
      2: 11,
      4: 5,
      6: 7,
      8: 3,
      10: 1
    },
    Ra: {
      0: 7,
      2: 5,
      4: 1,
      6: 3,
      8: 9,
      10: 11
    },
    La: {
      0: 7,
      2: 5,
      4: 1,
      6: 3,
      8: 9,
      10: 11
    },
    Fa: {
      0: 1,
      2: 3,
      4: 9,
      6: 11,
      8: 7,
      10: 5
    }
  };

  renderer: THREE.WebGLRenderer | null = null;
  scene: THREE.Scene | null = null;
  camera: THREE.Camera | null = null;
  quaternion: THREE.Quaternion = new THREE.Quaternion();
  quaternionAngle = 0.07;

  testCube = 0;

  @Output() requestRefresh = new EventEmitter();

  private cubs: THREE.Mesh[] | null = null;

  private static bringRotation(axis: string, vector: THREE.Euler): number {
    // @ts-ignore
    const original = vector[axis];

    if (!original) {
      return original;
    }

    const count = original / (Math.PI / 2);

    // @ts-ignore
    return (Math.PI / 2) * parseInt(count, 10);
  }

  private static bringPosition(value: number): number {
    let result = parseFloat(value.toFixed(1));

    if (result === -0) {
      result = 0;
    }

    return result;
  }

  public runAnimate(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, cubs: THREE.Mesh[]): void {
    this.cubs = cubs;
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });

    if (this.rotateObj.rotating) {
      this.rotate();
    }

    if (this.renderer && this.camera && this.scene) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private rotate(): void {

    if (!this.rotateObj.start) {
      // @ts-ignore
      this.rotateObj.start = this.rotateObj.cubes[0].rotation[this.rotateObj.axis];
    }

    const vector = new THREE.Vector3(this.rotateObj.axis === 'x' ? 1 : 0,
                                     this.rotateObj.axis === 'y' ? 1 : 0,
                                     this.rotateObj.axis === 'z' ? 1 : 0);

    this.quaternion.setFromAxisAngle(vector.normalize(), (this.rotateObj.direction ? -1 : 1 ) * this.quaternionAngle);

    this.rotateObj.cubes?.forEach((cube: THREE.Mesh, key: number) => {
      cube.position.applyQuaternion(this.quaternion);

      if (this.rotateObj.axis === 'x') {
        cube.rotation.x += (this.rotateObj.direction ? -1 : 1 ) * this.quaternionAngle;
      } else if (this.rotateObj.axis === 'y') {
        cube.rotation.y += (this.rotateObj.direction ? -1 : 1 ) * this.quaternionAngle;
      } else if (this.rotateObj.axis === 'z') {
        cube.rotation.z += (this.rotateObj.direction ? -1 : 1 ) * this.quaternionAngle;
      }
    });

    // @ts-ignore
    /*if (Math.abs(this.rotateObj.cubes[0].rotation[this.rotateObj.axis] - this.rotateObj.start) >= this.PI2) {
      this.refreshCubs();
    }*/

    // @ts-ignore
    if (Math.abs(this.rotateObj.cubes[0].rotation[this.rotateObj.axis]) >= this.PI2) {
      this.refreshCubs();
    }
  }

  private refreshCubs(): void {
    this.rotateObj.rotating = false;
    this.rotateObj.start = 0;
    this.rotateObj.returnPromise = true;

    this.rotateObj.cubes?.forEach((cube: THREE.Mesh) => {
      // @ts-ignore
      this.refreshCube(cube);
    });

    this.putCubes();
  }

  refreshCube(cube: THREE.Mesh): void {
    cube.rotation.set(0, 0, 0);

    for (let i = 0; i < 12; i = i + 2) {
      // @ts-ignore
       cube.geometry.faces[i].color.setHex(cube.geometry.faces[this.colorsMesh[this.rotateObj.side][i]].color.getHex());
    }

    for (let i = 1; i < 12; i = i + 2) {
      // @ts-ignore
       cube.geometry.faces[i].color.setHex(cube.geometry.faces[i - 1].color.getHex());
    }

// @ts-ignore
    /*cube.geometry.faces.forEach(face => {
      face.color.set(0xcccccc);
    });*/

    // @ts-ignore
    cube.geometry.colorsNeedUpdate = true;

  }

  private putCubes(): void {
    this.rotateObj.cubes?.forEach((cube: THREE.Mesh) => {
      cube.position.setX(RotateService.bringPosition(cube.position.x));
      cube.position.setY(RotateService.bringPosition(cube.position.y));
      cube.position.setZ(RotateService.bringPosition(cube.position.z));

      /*cube.rotation.set(RotateService.bringRotation('x', cube.rotation),
                        RotateService.bringRotation('y', cube.rotation),
                        RotateService.bringRotation('z', cube.rotation));*/
    });
  }

  public rotateSide(side: string): Promise<boolean> {
    return new Promise(resolve => {
      if (side === 'R') {
        this.rotateR();
      } else if (side === 'F') {
        this.rotateF();
      } else if (side === 'Fa') {
        this.rotateFa();
      } else if (side === 'L') {
        this.rotateL();
      } else if (side === 'La') {
        this.rotateLa();
      } else if (side === 'U') {
        this.rotateU();
      } else if (side === 'Ua') {
        this.rotateUa();
      } else if (side === 'Ra') {
        this.rotateRa();
      }

      const interval = setInterval(() => {
        if (this.rotateObj.returnPromise) {
          clearInterval(interval);
          this.rotateObj.returnPromise = false;
          resolve(true);
        }
      }, 100);
    });
  }

  private getMovingCubes(axis: string, isPlus: boolean): (THREE.Mesh[] | undefined) {
    return this.cubs?.filter((cube: THREE.Mesh) => {
      // @ts-ignore
      return (cube.position[axis] === (isPlus ? 1 : -1) * this.nextCubePosition);
    });
  }

  private rotateR(): void {
    const movingCubes = this.getMovingCubes('z', true);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: true,
      axis: 'z',
      start: 0,
      side: 'R',
      returnPromise: false
    };
  }

  private rotateL(): void {
    const movingCubes = this.getMovingCubes('z', false);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: true,
      axis: 'z',
      start: 0,
      side: 'L',
      returnPromise: false
    };
  }

  private rotateLa(): void {
    const movingCubes = this.getMovingCubes('z', false);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: false,
      axis: 'z',
      start: 0,
      side: 'La',
      returnPromise: false
    };
  }

  private rotateU(): void {
    const movingCubes = this.getMovingCubes('y', true);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: true,
      axis: 'y',
      start: 0,
      side: 'U',
      returnPromise: false
    };
  }

  private rotateUa(): void {
    const movingCubes = this.getMovingCubes('y', true);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: false,
      axis: 'y',
      start: 0,
      side: 'Ua',
      returnPromise: false
    };
  }

  private rotateRa(): void {
    const movingCubes = this.getMovingCubes('z', true);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: false,
      axis: 'z',
      start: 0,
      side: 'Ra',
      returnPromise: false
    };
  }

  private rotateF(): void {
    const movingCubes = this.getMovingCubes('x', false);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: false,
      axis: 'x',
      start: 0,
      side: 'F',
      returnPromise: false
    };
  }

  private rotateFa(): void {
    const movingCubes = this.getMovingCubes('x', false);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      direction: true,
      axis: 'x',
      start: 0,
      side: 'Fa',
      returnPromise: false
    };
  }
}
