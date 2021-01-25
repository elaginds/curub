import {Component, OnInit} from '@angular/core';

import * as THREE from 'three';
import {CubsService} from './services/cubs.service';
import {ColorsService} from './services/colors.service';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {RotateService} from './services/rotate.service';

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
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();


  ngOnInit(): void {
    this.init();
  }

  constructor(private colorsService: ColorsService,
              private cubsService: CubsService,
              private rotateService: RotateService) {
    const colors = colorsService.createColors();
    this.cubs = cubsService.createCubs(colors);
  }

  private init(): void {
    this.scene.background = new THREE.Color(0x000000);

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    // @ts-ignore
    document.getElementById('container').appendChild( this.renderer.domElement );

    this.camera.position.z = 11;
    this.scene.rotation.set(0.4, 1.1, 0);

    const controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.cubs.forEach((cube: THREE.Mesh) => {
      // @ts-ignore
      this.scene.add(cube);
    });

    this.rotateService.runAnimate(this.renderer, this.scene, this.camera, this.cubs);
  }

  public onSideClick(side: string): void {
    const sideArr = side.split(' ');

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

    rotateSide(sideArr[key]);
  }
}
