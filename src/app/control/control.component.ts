import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  public buttonsUp = ['R', 'U', 'L'];
  public buttonsMiddle = ['Ra', 'Ua', 'La'];
  public buttonsDown = ['R U Ra Ua', 'R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua R U Ra Ua'];
  public buttonDisabled = false;
  private sidesForRandom: string[] = this.buttonsUp.concat(this.buttonsMiddle);
  public randomOne = '';

  private static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  @Input() set disableButtons(controls: any) {
    this.buttonDisabled = controls.disableButtons;
  }

  @Output() emitSideClick = new EventEmitter();

  public onClick(side: string): void {
    this.buttonDisabled = true;
    this.emitSideClick.emit(side);
  }

  public onRandomClick(): void {
    const randomOne = [];

    for (let i = 0; i < 10; i++) {
      randomOne.push(this.sidesForRandom[ControlComponent.getRandomInt(this.sidesForRandom.length)]);
    }

    this.randomOne = randomOne.join(' ');
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.randomOne);
  }

  public onRandomSolveClick(): void {
    this.buttonDisabled = true;
    this.emitSideClick.emit(this.inverseRandom());
    this.randomOne = '';
  }

  private inverseRandom(): string {
    const randomArr = this.randomOne.split(' ');

    return randomArr.slice(0).reverse().map((item: string) => {
      if (item.length === 1) {
        return item + 'a';
      } else {
        return item[0];
      }
    }).join(' ');
  }
}
