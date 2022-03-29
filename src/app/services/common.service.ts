import {Injectable} from '@angular/core';
import {RotateSceneCorrection} from '../classes/RotatingParameters';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public getAxis(side: string, corrections?: RotateSceneCorrection): 'x' | 'y' | 'z' {
    let s = side[0];

    if (s === 'x' || s === 'y' || s === 'z') {
      return s;
    } else if (s === 'R' || s === 'F' || s === 'L' || s === 'B' || s === 'U' || s === 'D') {

      s = this.correctAxis(s, corrections);

      if (s === 'R' || s === 'L') {
        return 'x';
      } else if (s === 'F' || s === 'B') {
        return 'z';
      } else if (s === 'U' || s === 'D') {
        return 'y';
      } else {
        return 'y';
      }
    } else {
      return 'y';
    }
  }

  private correctAxis(s: string, corrections?: RotateSceneCorrection): any {
    if (!corrections) {
      return s;
    }

    if (s === 'R') {
      if (corrections.y === 0) {
        return 'R';
      } else if (corrections.y === 1) {
        return 'B';
      } else if (corrections.y === 2) {
        return 'L';
      } else if (corrections.y === 3) {
        return 'F';
      }

    } else if (s === 'L') {
      if (corrections.y === 0) {
        return 'L';
      } else if (corrections.y === 1) {
        return 'F';
      } else if (corrections.y === 2) {
        return 'R';
      } else if (corrections.y === 3) {
        return 'B';
      }

    } else if (s === 'F') {
      // if (corrections.)
    } else if (s === 'B') {
      return 'z';
    } else if (s === 'U' || s === 'D') {
      return 'y';
    }
  }

}
