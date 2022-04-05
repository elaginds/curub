import {EventEmitter, Injectable, Output} from '@angular/core';
import * as THREE from 'three';
import {SceneParameters} from '../classes/SceneParameters';
import {RotateSideParameters} from '../classes/RotateSideParameters';
import {RotateSideService} from './rotate-side.service';

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
    stop: null | number,
    side: string | null,
    returnPromise: boolean
  }  = {
    rotating: false,
    cubes: null,
    direction: true,
    axis: null,
    start: null,
    stop: null,
    side: null,
    returnPromise: false
  };

  ticks = 0;

  /*private colorsMesh = {
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
  };*/
  private rotationParameters = {
    R: {
      axis: 'z',
      isPlus: true,
      direction: true
    },
    Ra: {
      axis: 'z',
      isPlus: true,
      direction: false
    },
    L: {
      axis: 'z',
      isPlus: false,
      direction: true
    },
    La: {
      axis: 'z',
      isPlus: false,
      direction: false
    },
    U: {
      axis: 'y',
      isPlus: true,
      direction: true
    },
    Ua: {
      axis: 'y',
      isPlus: true,
      direction: false
    },
    F: {
      axis: 'x',
      isPlus: false,
      direction: false
    },
    Fa: {
      axis: 'x',
      isPlus: false,
      direction: true
    }
  };
  private rotationScene = {
    x: 0,
    y: 0,
    z: 0
  };

  renderer: THREE.WebGLRenderer | null = null;
  scene: THREE.Scene | null = null;
  camera: THREE.Camera | null = null;
  quaternion: THREE.Quaternion = new THREE.Quaternion();
  quaternionAngle = 0.07;

  private rotateParameters = new RotateSideParameters();

  @Output() requestRefresh = new EventEmitter();

  private cubs: THREE.Mesh[] | null = null;

  /*private static bringRotation(axis: string, vector: THREE.Euler): number {
    // @ts-ignore
    const original = vector[axis];

    if (!original) {
      return original;
    }

    const count = original / (Math.PI / 2);

    // @ts-ignore
    return (Math.PI / 2) * parseInt(count, 10);
  }*/

  /*private static bringPosition(value: number): number {
    let result = parseFloat(value.toFixed(1));

    if (result === -0) {
      result = 0;
    }

    return result;
  }*/

  constructor(private rotateSideService: RotateSideService) {
  }

  /* Запуск анимации */
  public runAnimate(sceneParameters: SceneParameters): void {

    // renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, cubs: THREE.Mesh[]
    this.cubs = sceneParameters.cubs;
    this.renderer = sceneParameters.renderer;
    this.scene = sceneParameters.scene;
    this.camera = sceneParameters.camera;

    this.animate();
  }

  /* Если this.rotateParameters.rotating - запускаем поворот (this.rotateSideService.rotate) */
  private animate(): void {

    requestAnimationFrame(() => {
      this.animate();
    });

    if (this.rotateParameters.rotating) {
      if (this.rotateParameters.isSide) {
        this.rotateSideService.rotate(this.rotateParameters, this.scene, this.cubs).then(result => {
          if (result) {
            this.rotateParameters = new RotateSideParameters();
          }
        });
      } else {

      }
    }

    if (this.renderer && this.camera && this.scene) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* Запуск поворота извне
  * Используется массив из параметров поворота
  * для каждого элемента запускаем асинхронную функцию this.processRotate
  * как только закончили обработку всего массива - возвращаем TRUE */
  public rotate(sides: RotateSideParameters[]): Promise<boolean> {
    return new Promise(async resolve => {
      for (const side of sides) {
        await this.processRotate(side);
      }

      resolve(true);
    });
  }


  public solve(): Promise<boolean> {
    // @ts-ignore
    this.cubs[0].visible = false;
    // @ts-ignore
    this.cubs[1].visible = false;
    console.log(this.cubs?.map(item => {
      return `${item.id} - ${item.position.x} ${item.position.y} ${item.position.z}`;
    }));

    return new Promise(resolve => {
      resolve(true);
    });
  }

  /* Обработка поворота для каждого действия (R U y и тд)
  * просто вставляем this.rotateParameters = side и ждем, когда animate() все выполнит
  * ждем с помощью setInterval
  * как только процесс поворота завершен - возвращаем действие
  * ( можем возвращать что угодно - это ни на что не влияет) */
  // @ts-ignore
  private async processRotate(side: RotateSideParameters): Promise<RotateSideParameters> {
    return new Promise(resolve => {
      this.rotateParameters = side;

      const interval = setInterval(() => {
        if (!this.rotateParameters.rotating) {
          clearInterval(interval);

          resolve(side);
        }
      }, 10);
    });
  }



  /* Поворачиваем сторону (rotateSimple) или всю сцену (rotateScene) */
  /*private rotateOld(): void {
    if (this.rotateObj.cubes) {
      this.rotateSimple();
    } else {
      this.rotateScene();
    }
  }*/

  /* Поворачиваем сторону и обновляем */
  /*private rotateSimple(): void {
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
    if (Math.abs(this.rotateObj.cubes[0].rotation[this.rotateObj.axis]) >= this.PI2) {
      this.refreshCubs();
    }
  }*/

  /* Поворачиваем сцену */
  private rotateScene(): void {
    if (!this.scene || !this.scene.rotation) {
      return;
    }

    this.ticks++;

    // @ts-ignore
    this.scene.rotation.y += (this.rotateObj.direction ? -1 : 1) * 0.05;

    // @ts-ignore
    // if (Math.abs(this.scene?.rotation.y) - this.rotateObj.stop > 0.5) {
    if (this.ticks >= 32) {
      this.ticks = 0;
      this.rotateObj.rotating = false;
      this.rotateObj.returnPromise = true;

      this.rotationScene.y += this.rotateObj.direction ? 1 : -1;

      if (this.rotationScene.y === 4) {
        this.rotationScene.y = 0;
      } else if (this.rotationScene.y === -1) {
        this.rotationScene.y = 3;
      }
    }
  }

  /* Останавливаем поворот, обновляем цвета (refreshCube) и обновляем кубики (putCubes) */
  /*private refreshCubs(): void {
    this.rotateObj.rotating = false;
    this.rotateObj.start = 0;
    this.rotateObj.returnPromise = true;

    this.rotateObj.cubes?.forEach((cube: THREE.Mesh) => {
      // @ts-ignore
      this.refreshCube(cube);
    });

    this.putCubes();
  }*/

  /* Обновляем цвета */
  /*private refreshCube(cube: THREE.Mesh): void {
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
    /!*cube.geometry.faces.forEach(face => {
      face.color.set(0xcccccc);
    });*!/

    // @ts-ignore
    cube.geometry.colorsNeedUpdate = true;

  }*/

  /* Обновляем кубики */
  /*private putCubes(): void {
    this.rotateObj.cubes?.forEach((cube: THREE.Mesh) => {
      cube.position.setX(RotateService.bringPosition(cube.position.x));
      cube.position.setY(RotateService.bringPosition(cube.position.y));
      cube.position.setZ(RotateService.bringPosition(cube.position.z));

      /!*cube.rotation.set(RotateService.bringRotation('x', cube.rotation),
                        RotateService.bringRotation('y', cube.rotation),
                        RotateService.bringRotation('z', cube.rotation));*!/
    });
  }*/



  /* Запуск поворота извне. Поворот стороны (prepareRotateSimple) или сцены (prepareRotateScene) */
  /*public rotateSide(side: string): Promise<boolean> {
    const s = side[0];

    return new Promise(resolve => {
      if (s === 'R' || s === 'L' || s === 'U' || s === 'F') {
        this.prepareRotateSimple(side);
      } else if (s === 'y') {
        this.prepareRotateScene(side);
      }

      const interval = setInterval(() => {
        if (this.rotateObj.returnPromise) {
          clearInterval(interval);
          this.rotateObj.returnPromise = false;
          resolve(true);
        }
      }, 100);
    });
  }*/

  /* Запуск поворота стороны, находим поворачиваемые кубики (getMovingCubes) */
  /*private prepareRotateSimple(side: string): void {
    // @ts-ignore
    const movingCubes = this.getMovingCubes(this.rotationParameters[side].axis, this.rotationParameters[side].isPlus);

    this.rotateObj = {
      rotating: true,
      cubes: movingCubes,
      // @ts-ignore
      direction: this.rotationParameters[side].direction,
      // @ts-ignore
      axis: this.rotationParameters[side].axis,
      start: 0,
      stop: 0,
      side,
      returnPromise: false
    };
  }*/

  /* Запуск поворота сцены */
  private prepareRotateScene(side: string): void {
    this.rotateObj = {
      rotating: true,
      cubes: null,
      // @ts-ignore
      direction: !Boolean(side [1]),
      // @ts-ignore
      axis: 'z',
      // @ts-ignore
      start: Math.abs(this.scene.rotation.y),
      // @ts-ignore
      stop: Math.abs(this.scene.rotation.y - 0.5),
      side,
      returnPromise: false
    };
  }

  /* Находим поворачиваемые кубики */
  /*private getMovingCubes(axis: string, isPlus: boolean): (THREE.Mesh[] | undefined) {
    if (this.rotationScene.y === 1 || this.rotationScene.y === 3) {
      axis = 'z';
    }

    return this.cubs?.filter((cube: THREE.Mesh) => {
      // @ts-ignore
      return (cube.position[axis] === (isPlus ? 1 : -1) * this.nextCubePosition);
    });
  }*/
}
