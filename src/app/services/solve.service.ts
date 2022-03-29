import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolveService {
  private matrixCubes: number[][] = [];
  private cubesSide = {
    R: {
      O:  [ 2,  5,  8, 11, 14, 17, 20, 23, 26],
      R:  [ 8, 17, 26,  5, 14, 23,  2, 11, 20],
      Ra: [20, 11,  2, 23, 14,  5, 26, 17,  8],
    },
    L: {
      O:  [ 0,  3,  6,  9, 12, 15, 18, 21, 24],
      L:  [18,  9,  0, 21, 12,  3, 24, 15,  6],
      La: [ 6, 15, 24,  3, 12, 21,  0,  9, 18],
    },
    U: {
      O:  [18, 19, 20, 21, 22, 23, 24, 25, 26],
      U:  [20, 23, 26, 19, 22, 25, 18, 21, 24],
      Ua: [24, 21, 18, 25, 22, 19, 26, 23, 20]
    },
    F: {
      O:  [ 6,  7,  8, 15, 16, 17, 24, 25, 26],
      F:  [24, 15,  6, 25, 16,  7, 26, 17,  8],
      Fa: [ 8, 17, 26,  7, 16, 25,  6, 15, 24]
    }
  };

  private rotationAxis = {
    R: 0,
    L: 0,
    U: 1,
    F: 2,
  };

  public getSolve(savedMoves: string[]): void {
    for (let i = 0; i < 27; i++) {
      this.matrixCubes.push([0, 0, 0]);
    }

    console.log(savedMoves);

    savedMoves.forEach((side: string) => {
      this.setOrientation(side);
    });

    console.log(this.matrixCubes);
  }

  private setOrientation(side: string): void {
    // @ts-ignore
    if (!side || !side[0] || !this.cubesSide[side[0]]) {
      return;
    }

    // @ts-ignore
    const cubes = this.cubesSide[side[0]].O;
    // @ts-ignore
    const axis = this.rotationAxis[side[0]];
    const direction = Boolean(side === 'R' || side === 'La' ||  side === 'U' ||  side === 'F');

    cubes.forEach((num: number) => {
      this.matrixCubes[num][axis] = this.matrixCubes[num][axis] + (direction ? 1 : -1);
    });

    const oldMatrixCubes = [...this.matrixCubes];

    for (let i = 0; i < 9; i++) {
      // @ts-ignore
      this.matrixCubes[this.cubesSide[side[0]].O[i]] = oldMatrixCubes[this.cubesSide[side[0]][side][i]];
    }
  }
}
