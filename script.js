// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB_h7hHz6WYsPemSBtJ690ADcCdk1jBgkA",
  authDomain: "discord-5d5dd.firebaseapp.com",
  projectId: "discord-5d5dd",
  storageBucket: "discord-5d5dd.firebasestorage.app",
  messagingSenderId: "551252331990",
  appId: "1:551252331990:web:d229929c73e734e2f46877",
  measurementId: "G-7YJTL9PYYJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById("game").appendChild(renderer.domElement);

camera.position.z = 5;

// Card Geometry
const geometry = new THREE.BoxGeometry(1, 1.5, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const card = new THREE.Mesh(geometry, material);
scene.add(card);

function animate() {
  requestAnimationFrame(animate);
  card.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();