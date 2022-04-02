import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private originalColors = {
    r: 0x8b0000,
    w: 0xffffff,
    b: 0x00008b,
    y: 0xffff00,
    o: 0xff4500,
    g: 0x006400,
    0: 0x000000
  };

  // [0 - back, 1 - front, 2 - up, 3 - down, 4 - right, 5 - left]
  colorsMask = [
    [0, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1],

    [0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0],

    [0, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0],
    [1, 0, 0, 1, 1, 0],


    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],

    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],

    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0],


    [0, 1, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1],

    [0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],

    [0, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0]
  ];

  assembledCube = [
    ['o', 'w', 'g'],
    ['w', 'g'],
    ['r', 'w', 'g'],

    ['o', 'w'],
    ['w'],
    ['r', 'w'],

    ['o', 'w', 'b'],
    ['w', 'b'],
    ['r', 'w', 'b'],


    ['o', 'g'],
    ['g'],
    ['r', 'g'],

    ['o'],
    [],
    ['r'],

    ['o', 'b'],
    ['b'],
    ['r', 'b'],


    ['o', 'y', 'g'],
    ['y', 'g'],
    ['r', 'y', 'g'],

    ['o', 'y'],
    ['y'],
    ['r', 'y'],

    ['o', 'y', 'b'],
    ['y', 'b'],
    ['r', 'y', 'b']
  ];

  public createColors(): any {
    const colors = [];
    for (let i = 0; i < 27; i++) {
      colors.push(this.createColor(i));
    }

    return colors;
  }

  private createColor(num: number): number[] {
    const combinedMaskColors = this.combineMaskColors(num);

    return combinedMaskColors.map(color => {
      // @ts-ignore
      return this.originalColors[color];
    });
  }

  private combineMaskColors(num: number): any[] {
    const mask: any[] = this.colorsMask[num].map(item => item);

    this.assembledCube[num].forEach(color => {
      const index = mask.indexOf(1);

      mask[index] = color;
    });

    return mask;
  }
}
