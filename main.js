import * as THREE from 'three'

const { innerWidth, innerHeight } = window

function makeCamera() {
  const fov = 70
  const aspect = innerWidth / innerHeight
  const camera = new THREE.PerspectiveCamera(fov, aspect, 0.01, 1000)
  camera.position.z = 1
  return camera
}

function makeScene() {
  const scene = new THREE.Scene()
  return scene
}

function makeRenderer(config = { antialias: true }) {
  const renderer = new THREE.WebGLRenderer(config)
  renderer.setSize( innerWidth, innerHeight )
  return renderer
}

function run(camera, renderer, scene) {
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
  const material = new THREE.MeshNormalMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  
  renderer.setAnimationLoop(time => {
    mesh.rotation.x = time / 2000
    mesh.rotation.y = time / 1000
    renderer.render(scene, camera)
  })

  document.body.appendChild(renderer.domElement)
}

const camera = makeCamera()
const scene = makeScene()
const renderer = makeRenderer()

run(camera, renderer, scene)
