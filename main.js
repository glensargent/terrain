import * as THREE from 'three'

const { innerWidth, innerHeight } = window

function makeCamera() {
  const fov = 45
  const aspect = innerWidth / innerHeight
  const camera = new THREE.PerspectiveCamera(fov, aspect, 1, 500)
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)
  return camera
}

function makeRenderer(config = { antialias: true }) {
  const renderer = new THREE.WebGLRenderer(config)
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)
  return renderer
}

function run(camera, renderer) {
  const scene = new THREE.Scene()
  // make geometry
  let points = []
  points.push(new THREE.Vector3(1, -1, 0))
  points.push(new THREE.Vector3(0, 1, 0))
  points.push(new THREE.Vector3(-1, -1, 0))
  // points.push(new THREE.Vector3(1, 1, 0))
  console.log(points)
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
    // .setFromPoints([points[0], points[3], points[1]])
  const material = new THREE.MeshBasicMaterial()
  const mesh = new THREE.Mesh(geometry, material) 
  
  scene.add(mesh)
  renderer.render(scene, camera)
}

const camera = makeCamera()
const renderer = makeRenderer({ antialias: true })

run(camera, renderer)
