import * as THREE from 'three';
import {CommonService} from '../services/common.service';

export class RotatingParameters {
  public rotating = true;
  public cubes: THREE.Mesh[] | null;
  public direction: boolean;
  public axis: 'x' | 'y' | 'z';
  public side: string;
  public start: number | undefined;
  public stop: number | undefined;
  public returnPromise: boolean | undefined;

  constructor(cubes: THREE.Mesh[] | null, side: string, commonService: CommonService) {
    this.rotating = true;
    this.cubes = cubes || null;
    this.direction = !Boolean(side [1]);
    this.axis = commonService.getAxis(side);
    this.side = side;

  }
}

export class RotateSceneCorrection {
  public x = 0;
  public y = 0;
  public z = 0;
}
