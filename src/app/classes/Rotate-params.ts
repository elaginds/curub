import {RotateSideParameters} from './RotateSideParameters';

export class RotateParams {
  public label: string;
  public params: RotateSideParameters[];

  constructor(label: string) {
    this.label = label.replace(/a/g, '`');
    this.params = this.createParams(label);
  }

  private createParams(label: string): RotateSideParameters[] {
    const labelArr = label.split(' ');

    return labelArr.map((letter: string) => {
      return new RotateSideParameters(letter);
    });
  }
}
