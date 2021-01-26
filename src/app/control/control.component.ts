import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  @Input() set disableButtons(controls: any) {
    this.buttonDisabled = controls.disableButtons;
  }
  public buttonsUp = ['R', 'U', 'L', 'F', 'y'];
  public buttonsMiddle = ['Ra', 'Ua', 'La', 'Fa'];
  public buttonsDown = ['R U Ra Ua', 'R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua'];
  public buttonDisabled = false;
  private sidesForRandom: string[] = this.buttonsUp.concat(this.buttonsMiddle);
  public randomOne = '';
  public savedMoves = [];

  @Output() emitSideClick = new EventEmitter();

  public get savedMovesView(): string {
    return  this.savedMoves.join(' ').replace(/a/g, '\'');
  }

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public onClick(side: string): void {
    this.buttonDisabled = true;
    this.emitSideClick.emit(side);
    this.saveMove(side);
  }

  public saveMove(move: string): void {

    // @ts-ignore
    this.savedMoves = this.savedMoves.concat(move.split(' '));
  }

  public onRandomClick(): void {
    const randomOne = [];

    for (let i = 0; i < 10; i++) {
      randomOne.push(this.sidesForRandom[ControlComponent.getRandomInt(this.sidesForRandom.length)]);
    }

    this.randomOne = randomOne.join(' ');
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.randomOne);

    this.saveMove(this.randomOne);
  }

  public onSolveClick(): void {
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.inverseRandom());
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
