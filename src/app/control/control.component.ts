import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RotateSideParameters} from '../classes/RotateSideParameters';
import {RotateParams} from '../classes/Rotate-params';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  @Input() set disableButtons(controls: any) {
    this.buttonDisabled = controls.disableButtons;
  }
  public buttonsUp = [
    new RotateParams('R'),
    new RotateParams('L'),
    new RotateParams('U'),
    new RotateParams('D'),
    new RotateParams('F'),
    new RotateParams('B')
    /*{ label: 'R', params: [new RotateSideParameters('R')]},
    { label: 'L', params: [new RotateSideParameters('L')]},
    { label: 'U', params: [new RotateSideParameters('U')]},
    { label: 'D', params: [new RotateSideParameters('D')]},
    { label: 'F', params: [new RotateSideParameters('F')]},
    { label: 'B', params: [new RotateSideParameters('B')]}*/
  ];
  public buttonsMiddle = [
    new RotateParams('Ra'),
    new RotateParams('La'),
    new RotateParams('Ua'),
    new RotateParams('Da'),
    new RotateParams('Fa'),
    new RotateParams('Ba')
    /*{ label: 'R`', params: [new RotateSideParameters('Ra')]},
    { label: 'L`', params: [new RotateSideParameters('La')]},
    { label: 'U`', params: [new RotateSideParameters('Ua')]},
    { label: 'D`', params: [new RotateSideParameters('Da')]},
    { label: 'F`', params: [new RotateSideParameters('Fa')]},
    { label: 'B`', params: [new RotateSideParameters('Ba')]}*/
  ];
  public buttonsDown = [
    new RotateParams('R L U D F B'),
    new RotateParams('Ra La Ua Da Fa Ba'),
    new RotateParams('R U Ra Ua'),
    new RotateParams('R U Ra Ua')
  ];

  public buttonDisabled = false;
  private sidesForRandom: RotateParams[] = this.buttonsUp.concat(this.buttonsMiddle);
  public randomOne = '';
  public savedMoves: RotateSideParameters[] = [];

  @Output() emitSideClick = new EventEmitter();
  @Output() emitSolveClick = new EventEmitter();

  public get savedMovesView(): string {
    return this.savedMoves.map((move: RotateSideParameters) => {
      return move.label;
    }).join(' ').replace(/a/g, '`');
    // return  this.savedMoves.join(' ').replace(/a/g, '\'');
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public onClick(side: RotateSideParameters[] | RotateSideParameters): void {
    this.buttonDisabled = true;

    this.emitSideClick.emit(!(side instanceof RotateSideParameters) ? side : [side]);

    this.saveMove(side);
  }

  public saveMove(move: RotateSideParameters[] | RotateSideParameters): void {
    this.savedMoves = this.savedMoves.concat(move);
  }

  public onRandomClick(): void {
    const randomOne: RotateSideParameters[] = [];

    for (let i = 0; i < 10; i++) {
      randomOne.push(this.sidesForRandom[ControlComponent.getRandomInt(this.sidesForRandom.length)].params[0]);
    }

    this.onClick(randomOne);
  }

  public onReverseSolveClick(): void {
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.getInverseSavedMoves());
    this.randomOne = '';
    this.savedMoves = [];
  }

  public onTrueSolveClick(): void {
    this.emitSolveClick.emit();
    /*this.buttonDisabled = true;
    this.emitSolveClick.emit(this.savedMoves);
    this.randomOne = '';
    this.savedMoves = [];*/
  }

  private getInverseSavedMoves(): RotateSideParameters[] {
    const reverseSavedMoves = this.savedMoves.slice(0).reverse();

    return reverseSavedMoves.map(item => {
      if (item.label.length === 1) {
        return new RotateSideParameters(item.sideName + 'a');
      } else {
        return new RotateSideParameters(item.sideName);
      }
    });
  }
}
