import * as THREE from 'three';

export class SceneParameters {
  public scene: THREE.Scene = new THREE.Scene();
  public renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  public camera: THREE.Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  public cubs: THREE.Mesh[] = [];
}
