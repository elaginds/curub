import { Injectable } from '@angular/core';
import * as THREE from 'three';
import {CubService} from './cub.service';

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
      return this.cubService.create(item, colors[key]);
    });

    return this.cubs;
  }

  constructor(private cubService: CubService) {}
}
