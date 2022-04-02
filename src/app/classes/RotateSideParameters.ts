import * as THREE from 'three';

export class RotateSideParameters {
  public isSide: boolean;
  public isClockwise: boolean;
  public isPlus: boolean;
  public sideName: string;
  public label: string;

  public rotating: boolean;
  public cubes: THREE.Mesh[] | null | undefined;
  public axis: string | null;
  public start: null | number;
  public stop: null | number;

  private sideNames = ['R', 'L', 'U', 'D', 'F', 'B'];
  private axisForSideName = {
    R: 'z',
    L: 'z',
    U: 'y',
    D: 'y',
    F: 'x',
    B: 'x',
  };
  private isPlusSide = ['R', 'U', 'B'];
  private isClockwiseSide = ['R', 'U', 'B'];

  constructor(label?: string) {
    if (label) {
      const sideName = label[0];

      this.isSide = this.sideNames.indexOf(sideName) !== -1;
      this.isClockwise = Boolean(this.isClockwiseSide.indexOf(sideName) !== -1 === !label[1]);
      this.isPlus = this.isPlusSide.indexOf(sideName) !== -1;
      this.sideName = sideName;
      this.label = label;
      this.rotating = true;
      this.cubes = null;
      // @ts-ignore
      this.axis = this.axisForSideName[sideName];
      this.start = 0;
      this.stop = 0;
    } else {
      this.isSide = true;
      this.isClockwise = true;
      this.isPlus = true;
      this.sideName = '';
      this.label = '';
      this.rotating = false;
      this.cubes = null;
      this.axis = '';
      this.start = 0;
      this.stop = 0;
    }
  }
}
