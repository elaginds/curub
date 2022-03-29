import {EventEmitter, Injectable, Output} from '@angular/core';
import * as THREE from 'three';
import {RotateSceneCorrection, RotatingParameters} from '../classes/RotatingParameters';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RotateControlService {
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
    F: {
      axis: 'x',
      isPlus: false,
      direction: false
    },
    Fa: {
      axis: 'x',
      isPlus: false,
      direction: true
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
    B: {
      axis: 'x',
      isPlus: true,
      direction: false
    },
    Ba: {
      axis: 'x',
      isPlus: true,
      direction: true
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
    }
  };
  private rotateSceneCorrection = new RotateSceneCorrection();
  private cubs = {
    filter: null
  };

  constructor(private commonService: CommonService) {
  }

  public getRotateParameters(cubes: THREE.Mesh[], side: string): any {
    const s = side[0];

    if (s === 'R' || s === 'L' || s === 'U' || s === 'F') {
      this.prepareRotateSimple(side);
    } else if (s === 'x' || s === 'y' || s === 'z') {
      this.prepareRotateScene(side);
    }
  }

  private prepareRotateSimple(side: string): RotatingParameters {
    // @ts-ignore
    const movingCubes = null; // this.getMovingCubes(side);

    return {
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
  }

  private prepareRotateScene(side: string): RotatingParameters {
    this.correctRotationScene(side);

    return new RotatingParameters(null, side, this.commonService);
  }


  /*private getMovingCubes(side: string): THREE.Mesh[] | null {
    const axis = this.commonService.getAxis(side, this.rotateSceneCorrection);

    if (this.cubs && this.cubs.filter) {
      return this.cubs?.filter((cube: THREE.Mesh) => {
        // @ts-ignore
        return (cube.position[axis] === (isPlus ? 1 : -1) * this.nextCubePosition);
      });
    } else { return null; }
  }*/

  private correctRotationScene(side: string): void {
    const axis: string = side[0];
    const direction = Boolean(side[0]);
    // @ts-ignore
    this.rotateSceneCorrection[axis] += direction ? 1 : -1;

    // @ts-ignore
    if (this.rotateSceneCorrection[axis] === 4) {
      // @ts-ignore
      this.rotateSceneCorrection[axis] = 0;
      // @ts-ignore
    } else if (this.rotateSceneCorrection[axis] === -1) {
      // @ts-ignore
      this.rotateSceneCorrection[axis] = 3;
    }
  }
}
