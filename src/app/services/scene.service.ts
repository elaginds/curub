import {Injectable} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {SceneParameters} from '../classes/SceneParameters';
import {ColorsService} from './colors.service';
import {CubsService} from './cubs.service';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private parameters: SceneParameters = new SceneParameters();

  public create(): SceneParameters {
    const colors = this.colorsService.createColors();
    this.parameters.cubs = this.cubsService.createCubs(colors);

    this.parameters.scene.background = new THREE.Color(0x000000);

    this.parameters.renderer.setSize( window.innerWidth, window.innerHeight );
    // @ts-ignore
    document.getElementById('container').appendChild( this.parameters.renderer.domElement );

    this.parameters.camera.position.z = 11;
    this.parameters.scene.rotation.set(0.4, 1.1, 0);

    const controls = new OrbitControls( this.parameters.camera, this.parameters.renderer.domElement );

    this.parameters.cubs.forEach((cube: THREE.Mesh) => {
      // @ts-ignore
      this.parameters.scene.add(cube);
    });

    return this.parameters;
  }

  constructor(private colorsService: ColorsService,
              private cubsService: CubsService) {
  }
}
