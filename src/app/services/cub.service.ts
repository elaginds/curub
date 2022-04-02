import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CubService {
  private static color(geometry: THREE.BoxGeometry, colors: number[]): THREE.BoxGeometry {
    // console.log(geometry.faces.length, colors);
    for ( let i = 0; i < geometry.faces.length / 2; i++ ) {
      geometry.faces[ i * 2 ].color.setHex(colors[i]);
      geometry.faces[ i * 2 + 1 ].color.setHex(colors[i]);
    }

    return geometry;
  }

  public create(positions: any, colors: number[]): THREE.Mesh {
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );

    geometry = CubService.color(geometry, colors);

    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, vertexColors: true} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = positions[0];
    cube.position.y = positions[1];
    cube.position.z = positions[2];

    return cube;
  }
}
