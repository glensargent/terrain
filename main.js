import * as THREE from 'three'
import { OrbitControls } from './orbitcontrols'

const { innerWidth, innerHeight } = window

function makeCamera() {
  const fov = 45
  const aspect = innerWidth / innerHeight
  const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100)
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
  // add a new light so we can see
  const light = new THREE.PointLight(0xffffff, 1.5, 100)
  light.position.set(10, 10, 20)
  scene.add(light)

  const peak = 0.8
  let geometry = new THREE.PlaneGeometry(res, res, res, res)
  // loop through terrain vertices and change their 'heights'
  let vertices = geometry.attributes.position.array
  for (let i = 0; i <= vertices.length; i += 3) {
      vertices[i+2] = peak * Math.random()
  }
  // geometry = geometry.toNonIndexed()
  geometry.computeVertexNormals()

  // color
  let count = geometry.attributes.position.count * 3
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count), 3))
  let colors = geometry.getAttribute('color')
  let color = new THREE.Color()
  for (let i = 0; i < colors.count; i++) {
    // get height of the vertex here
    // need to skip every 3 because its a buffer, so each 3 values
    // is one vertex xyz, then get +2 for the Y value
    let height = vertices[i * 3 + 2]
    if (height > 0.35) {
      color.setHex(0x44ccff)
    } else {
      color.setHex(0x228800)
    }
    
    colors.setXYZ(i, color.r, color.g, color.b)
  }

  geometry.attributes.position.needsUpdate = true
  geometry.attributes.color.needsUpdate = true;



  // make material
  let material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    vertexColors: THREE.VertexColors,
    flatShading: THREE.FlatShading,
    // shininess: 0,
  })


  // create mesh
  let terrain = new THREE.Mesh(geometry, material) 
  // rotate terrain for better viewing
  terrain.rotateX(Math.PI / 1.4)
  scene.add(terrain)
  // scene.add(makeWireframe(terrain.geometry))


  // orbit controls
  const controls = new OrbitControls( camera, renderer.domElement );
  camera.position.set( 0, 0, 15 );
  controls.update();

  function animate() {
    requestAnimationFrame( animate );
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
}


const camera = makeCamera()
const renderer = makeRenderer({ antialias: true })

run(camera, renderer)
