import {Component, OnInit} from '@angular/core';

import * as THREE from 'three';
import {CubsService} from './services/cubs.service';
import {ColorsService} from './services/colors.service';
import {RotateService} from './services/rotate.service';
import {SolveService} from './services/solve.service';
import {RotateControlService} from './services/rotate-control';
import {SceneService} from './services/scene.service';
import {RotateSideParameters} from './classes/RotateSideParameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'curub';
  emitControls = {
    disableButtons: false
  };
  cubs: THREE.Mesh[] = [];


  ngOnInit(): void {
    this.init();
  }

  constructor(private colorsService: ColorsService,
              private cubsService: CubsService,
              private rotateService: RotateService,
              private sceneService: SceneService,
              private rotateControlService: RotateControlService,
              public solveService: SolveService) {
  }

  private init(): void {
    const sceneParameters = this.sceneService.create();

    this.rotateService.runAnimate(sceneParameters);
  }

  public onRotateClick(sides: RotateSideParameters[]): void {
    this.rotateService.rotate(sides).then(result => {
      this.emitControls = {
        disableButtons: false
      };
    });

    /*const sideArr = side.split(' ');
    let key = 0;

    const rotateSide = (sd: string) => {
      this.rotateService.rotateSide(sd).then(() => {

        key++;

        if (sideArr[key]) {
          rotateSide(sideArr[key]);
        } else {
          this.emitControls = {
            disableButtons: false
          };
        }
      });
    };

    rotateSide(sideArr[key]);*/

    // this.rotateControlService.getRotateParameters(this.cubs, sideArr[key]);
  }
}
