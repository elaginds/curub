import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {RotateSideParameters} from '../classes/RotateSideParameters';
import {RefreshCubesService} from './refresh-cubes.service';

@Injectable({
  providedIn: 'root'
})
export class RotateSideService {
  quaternion: THREE.Quaternion = new THREE.Quaternion();
  quaternionAngle = 0.07;
  private nextCubePosition = 1.1;
  private PI2 = 1.61; // Math.PI / 2;

  constructor(private refreshCubesService: RefreshCubesService) {
  }

  /* Запуск поворота стороны */
  public rotate(rotateParameters: RotateSideParameters, scene: THREE.Scene | null, cubs: THREE.Mesh[] | null): Promise<boolean | null> {
    return new Promise(resolve => {
      // Находим 9 кубиков для поворота
      rotateParameters.cubes = this.getMovingCubes(scene, cubs, rotateParameters.axis, rotateParameters.isPlus);

      /* Если кубики не нашлись - возвращаем NULL */
      if (!rotateParameters.cubes || !rotateParameters.cubes.length) {
        resolve(null);
      }

      /* Находим вектор вращения */
      const vector = new THREE.Vector3(rotateParameters.axis === 'x' ? 1 : 0,
        rotateParameters.axis === 'y' ? 1 : 0,
        rotateParameters.axis === 'z' ? 1 : 0);

      /* Задаем кватернион вращения */
      this.quaternion.setFromAxisAngle(vector.normalize(), (rotateParameters.isClockwise ? -1 : 1) * this.quaternionAngle);

      /* Вращаем каждый кубик */
      rotateParameters.cubes?.forEach((cube: THREE.Mesh, key: number) => {
        cube.position.applyQuaternion(this.quaternion);

        if (rotateParameters.axis === 'x') {
          cube.rotation.x += (rotateParameters.isClockwise ? -1 : 1) * this.quaternionAngle;
        } else if (rotateParameters.axis === 'y') {
          cube.rotation.y += (rotateParameters.isClockwise ? -1 : 1) * this.quaternionAngle;
        } else if (rotateParameters.axis === 'z') {
          cube.rotation.z += (rotateParameters.isClockwise ? -1 : 1) * this.quaternionAngle;
        }
      });

      /* Если поворот уже более ПИ/2 - заканчиваем вращать
      * обновляем местоположение кубиков и
      * возвращаем true */
      // @ts-ignore
      if (Math.abs(rotateParameters.cubes[0].rotation[rotateParameters.axis]) >= this.PI2) {
        this.refreshCubesService.refreshCubes(rotateParameters);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  /* Находим поворачиваемые кубики */
  private getMovingCubes(scene: THREE.Scene | null,
                         cubs: THREE.Mesh[] | null,
                         axis: string | null,
                         isPlus: boolean): (THREE.Mesh[] | undefined | null) {
    if (!scene || !axis || !cubs) {
      return null;
    }

    // @ts-ignore
    if (scene.y === 1 || scene.y === 3) {
      axis = 'z';
    }

    return cubs?.filter((cube: THREE.Mesh) => {
      // @ts-ignore
      return (cube.position[axis] === (isPlus ? 1 : -1) * this.nextCubePosition);
    });
  }
}
