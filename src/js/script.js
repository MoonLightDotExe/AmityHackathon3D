import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { AmbientLight } from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight)

const cityUrl = new URL('../data/db.glb',import.meta.url)
renderer.setClearColor('#FFF')

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    110,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera , renderer.domElement)

document.body.appendChild(renderer.domElement)

camera.position.set(0,2,10)
orbit.update()

const assetLoader = new GLTFLoader();

assetLoader.load(cityUrl.href,function(gltf){
    const model = gltf.scene;
    scene.add(model)
    model.position.set(0,0,0)
    function animate(){
        model.rotation.y += 0
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
},undefined,function(error){
    console.error(error)
});

const ambLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(ambLight)

const ambLight2 = new THREE.AmbientLight(0xFFFFFF)
ambLight2.position.set(10,10,10)
scene.add(ambLight2)

renderer.render(scene,camera)