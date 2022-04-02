import {Injectable} from '@angular/core';
import {RotateSideParameters} from '../classes/RotateSideParameters';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class RefreshCubesService {
  private colorsMesh = {
    R: {
      0: 5,
      2: 7,
      4: 3,
      6: 1,
      8: 9,
      10: 11
    },
    L: {
      0: 7,
      2: 5,
      4: 1,
      6: 3,
      8: 9,
      10: 11
    },
    U: {
      0: 11,
      2: 9,
      4: 5,
      6: 7,
      8: 1,
      10: 3
    },
    D: {
      0: 9,
      2: 11,
      4: 5,
      6: 7,
      8: 3,
      10: 1
    },
    F: {
      0: 1,
      2: 3,
      4: 11,
      6: 9,
      8: 5,
      10: 7
    },
    B: {
      0: 1,
      2: 3,
      4: 9,
      6: 11,
      8: 7,
      10: 5
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
    Da: {
      0: 11,
      2: 9,
      4: 5,
      6: 7,
      8: 1,
      10: 3
    },
    Fa: {
      0: 1,
      2: 3,
      4: 9,
      6: 11,
      8: 7,
      10: 5
    },
    Ba: {
      0: 1,
      2: 3,
      4: 11,
      6: 9,
      8: 5,
      10: 7
    }
  };

  private static bringPosition(value: number): number {
    let result = parseFloat(value.toFixed(1));

    if (result === -0) {
      result = 0;
    }

    return result;
  }

  /* Обновляем цвета (refreshCube) и обновляем кубики (putCubes) */
  public refreshCubes(rotateParameters: RotateSideParameters): void {
    rotateParameters.cubes?.forEach((cube: THREE.Mesh) => {
      // @ts-ignore
      this.refreshCube(cube, rotateParameters.label);
    });

    this.putCubes(rotateParameters);
  }

  /* Обновляем цвета */
  private refreshCube(cube: THREE.Mesh, sideName: string): void {
    cube.rotation.set(0, 0, 0);

    for (let i = 0; i < 12; i = i + 2) {
      // @ts-ignore
      cube.geometry.faces[i].color.setHex(cube.geometry.faces[this.colorsMesh[sideName][i]].color.getHex());
    }

    for (let i = 1; i < 12; i = i + 2) {
      // @ts-ignore
      cube.geometry.faces[i].color.setHex(cube.geometry.faces[i - 1].color.getHex());
    }

    // @ts-ignore
    cube.geometry.colorsNeedUpdate = true;

  }

  /* Обновляем кубики */
  private putCubes(rotateParameters: RotateSideParameters): void {
    rotateParameters.cubes?.forEach((cube: THREE.Mesh) => {
      cube.position.setX(RefreshCubesService.bringPosition(cube.position.x));
      cube.position.setY(RefreshCubesService.bringPosition(cube.position.y));
      cube.position.setZ(RefreshCubesService.bringPosition(cube.position.z));
    });
  }
}
