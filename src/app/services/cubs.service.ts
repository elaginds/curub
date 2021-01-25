import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CubsService {
  cubs: THREE.Mesh[] = [];
  nextCubePosition = 1.1;
  positions = [
    /* DOWN */
    [- this.nextCubePosition, - this.nextCubePosition, - this.nextCubePosition],
    [0, - this.nextCubePosition, - this.nextCubePosition],
    [this.nextCubePosition, - this.nextCubePosition, - this.nextCubePosition],

    [- this.nextCubePosition, - this.nextCubePosition, 0],
    [0, - this.nextCubePosition, 0],
    [this.nextCubePosition, - this.nextCubePosition, 0],

    [- this.nextCubePosition, - this.nextCubePosition, this.nextCubePosition],
    [0, - this.nextCubePosition, this.nextCubePosition],
    [this.nextCubePosition, - this.nextCubePosition, this.nextCubePosition],
    /* CENTER */
    [- this.nextCubePosition, 0, - this.nextCubePosition],
    [0, 0, - this.nextCubePosition],
    [this.nextCubePosition, 0, - this.nextCubePosition],

    [- this.nextCubePosition, 0, 0],
    [0, 0, 0],
    [this.nextCubePosition, 0, 0],

    [- this.nextCubePosition, 0, this.nextCubePosition],
    [0, 0, this.nextCubePosition],
    [this.nextCubePosition, 0, this.nextCubePosition],

    /* UP */
    [- this.nextCubePosition, this.nextCubePosition, - this.nextCubePosition],
    [0, this.nextCubePosition, - this.nextCubePosition],
    [this.nextCubePosition, this.nextCubePosition, - this.nextCubePosition],

    [- this.nextCubePosition, this.nextCubePosition, 0],
    [0, this.nextCubePosition, 0],
    [this.nextCubePosition, this.nextCubePosition, 0],

    [- this.nextCubePosition, this.nextCubePosition, this.nextCubePosition],
    [0, this.nextCubePosition, this.nextCubePosition],
    [this.nextCubePosition, this.nextCubePosition, this.nextCubePosition]
  ];

  public createCubs(colors: any[]): THREE.Mesh[] {
    this.cubs = this.positions.map((item, key) => {
      return this.createCube(item, key, colors[key]);
    });

    return this.cubs;
  }

  public refreshRotate(colors: any[]): THREE.Mesh[] {
    this.cubs = this.cubs.map((item: THREE.Mesh, key: number) => {
      return this.createCube(item, key, colors[key]);
    });

    return this.cubs;
  }

  private createCube(positions: any, num: number, colors: number[]): THREE.Mesh {
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );

    geometry = this.colorCube(geometry, num, colors);

    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, vertexColors: true} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = positions[0];
    cube.position.y = positions[1];
    cube.position.z = positions[2];

    return cube;
  }

  private colorCube(geometry: THREE.BoxGeometry, num: number, colors: number[]): THREE.BoxGeometry {
    // console.log(geometry.faces.length, colors);
    for ( let i = 0; i < geometry.faces.length / 2; i++ ) {
      geometry.faces[ i * 2 ].color.setHex(colors[i]);
      geometry.faces[ i * 2 + 1 ].color.setHex(colors[i]);
    }

    return geometry;
  }
}
