import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RotateSideParameters} from '../classes/RotateSideParameters';

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
    { label: 'R', params: [new RotateSideParameters('R')]},
    { label: 'L', params: [new RotateSideParameters('L')]},
    { label: 'U', params: [new RotateSideParameters('U')]},
    { label: 'D', params: [new RotateSideParameters('D')]},
    { label: 'F', params: [new RotateSideParameters('F')]},
    { label: 'B', params: [new RotateSideParameters('B')]}
  ];
  public buttonsMiddle = [
    { label: 'R`', params: [new RotateSideParameters('Ra')]},
    { label: 'L`', params: [new RotateSideParameters('La')]},
    { label: 'U`', params: [new RotateSideParameters('Ua')]},
    { label: 'D`', params: [new RotateSideParameters('Da')]},
    { label: 'F`', params: [new RotateSideParameters('Fa')]},
    { label: 'B`', params: [new RotateSideParameters('Ba')]}
  ];

  public buttonsDown = [
    { label: 'R L U D F B', params: [
        new RotateSideParameters('R'),
        new RotateSideParameters('L'),
        new RotateSideParameters('U'),
        new RotateSideParameters('D'),
        new RotateSideParameters('F'),
        new RotateSideParameters('B'),
      ]}, { label: 'R` L` U` D` F` B`', params: [
        new RotateSideParameters('Ra'),
        new RotateSideParameters('La'),
        new RotateSideParameters('Ua'),
        new RotateSideParameters('Da'),
        new RotateSideParameters('Fa'),
        new RotateSideParameters('Ba'),
      ]}, { label: 'R U R` U`', params: [
        new RotateSideParameters('R'),
        new RotateSideParameters('U'),
        new RotateSideParameters('Ra'),
        new RotateSideParameters('Ua')
      ]}
  ];

    // public buttonsUp = ['R', 'U', 'L', 'F', 'y'];
  // public buttonsMiddle = ['Ra', 'Ua', 'La', 'Fa', 'ya'];
  // public buttonsDown = ['R U Ra Ua', 'R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua'];
  public buttonDisabled = false;
  // private sidesForRandom: string[] = this.buttonsUp.concat(this.buttonsMiddle);
  public randomOne = '';
  public savedMoves = [];

  @Output() emitSideClick = new EventEmitter();
  @Output() emitSolveClick = new EventEmitter();

  public get savedMovesView(): string {
    return  this.savedMoves.join(' ').replace(/a/g, '\'');
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public onClick(side: RotateSideParameters[] | RotateSideParameters): void {
    this.buttonDisabled = true;

    this.emitSideClick.emit(!(side instanceof RotateSideParameters) ? side : [side]);

    // this.saveMove(side);
  }

  public saveMove(move: string): void {

    // @ts-ignore
    this.savedMoves = this.savedMoves.concat(move.split(' '));
  }

  public onRandomClick(): void {
    /*const randomOne = [];

    for (let i = 0; i < 10; i++) {
      randomOne.push(this.sidesForRandom[ControlComponent.getRandomInt(this.sidesForRandom.length)]);
    }

    this.randomOne = randomOne.join(' ');
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.randomOne);

    this.saveMove(this.randomOne);*/
  }

  public onReverseSolveClick(): void {
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.inverseRandom());
    this.randomOne = '';
    this.savedMoves = [];
  }

  public onTrueSolveClick(): void {
    this.buttonDisabled = true;
    this.emitSolveClick.emit(this.savedMoves);
    this.randomOne = '';
    this.savedMoves = [];
  }

  private inverseRandom(): string {
    return this.savedMoves.slice(0).reverse().map((item: string) => {
      if (item.length === 1) {
        return item + 'a';
      } else {
        return item[0];
      }
    }).join(' ');
  }
}
