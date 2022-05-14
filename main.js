import * as THREE from 'three'

const { innerWidth, innerHeight } = window

function makeCamera() {
  const fov = 45
  const aspect = innerWidth / innerHeight
  const camera = new THREE.PerspectiveCamera(fov, aspect, 1, 500)
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)
  return camera
}

function makeRenderer(config = { antialias: true }) {
  const renderer = new THREE.WebGLRenderer(config)
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)
  return renderer
}

function makeWireframe(geometry) {
  const wireframe = new THREE.WireframeGeometry(geometry)
  const line = new THREE.LineSegments(wireframe)
  line.material.color.setHex(0xffffff)
  line.rotateX(Math.PI / 1.5)
  return line
}

function run(camera, renderer) {
  const res = 10
  const scene = new THREE.Scene()
  // make geometry
  const geometry = new THREE.PlaneGeometry(res, res, res, res)

  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  })
  const terrain = new THREE.Mesh(geometry, material) 
  terrain.rotateX(Math.PI / 1.5)

  const peak = 1
  let vertices = terrain.geometry.attributes.position.array
  // loop through vertices & update their values
  for (let i = 0; i <= vertices.length; i += 3) {
      vertices[i+2] = peak * Math.random()
  }
  terrain.geometry.attributes.position.needsUpdate = true
  terrain.geometry.computeVertexNormals()

  scene.add(terrain, makeWireframe(geometry))
  renderer.render(scene, camera)
}

const camera = makeCamera()
const renderer = makeRenderer({ antialias: true })

run(camera, renderer)
