var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var crate, crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02 };
var USE_WIREFRAME = false;

function init(box, wood, camp, floor) {
	scene = new THREE.Scene();

	// first argument is camera distance
	camera = new THREE.PerspectiveCamera(45, 1280 / 720, 0.1, 1000);

	console.log(box);
	console.log(wood);
	console.log(camp);
	console.log(floor);

	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshPhongMaterial({ color: 0x7F7F7F, wireframe: USE_WIREFRAME })
	);
	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;

	if (box)
		scene.add(mesh);

	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(20, 20, 10, 10),
		new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME })
	);
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;

	if (floor)
		scene.add(meshFloor);


	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 18);
	light.position.set(-3, 6, -3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);

	var textureLoader = new THREE.TextureLoader();
	crateTexture = textureLoader.load("menu/modeling/crate0/crate0_diffuse.jpg");
	crateBumpMap = textureLoader.load("menu/modeling/crate0/crate0_bump.jpg");
	crateNormalMap = textureLoader.load("menu/modeling/crate0/crate0_normal.jpg");

	crate = new THREE.Mesh(
		new THREE.BoxGeometry(3, 3, 3),
		new THREE.MeshPhongMaterial({
			color: 0xffffff,
			map: crateTexture,
			bumpMap: crateBumpMap,
			normalMap: crateNormalMap
		})
	);

	if (wood)
		scene.add(crate);
	crate.position.set(2.5, 3 / 2, 2.5);
	crate.receiveShadow = true;
	crate.castShadow = true;




	// Model/material loading!
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("menu/modeling/models/Tent_Poles_01.mtl", function (materials) {

		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

		objLoader.load("menu/modeling/models/Tent_Poles_01.obj", function (mesh) {

			mesh.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.castShadow = true;
					node.receiveShadow = true;
				}
			});

			if (camp)
				scene.add(mesh);
			mesh.position.set(-5, 0, 4);
			mesh.rotation.y = -Math.PI / 4;
		});

	});



	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0, player.height, 0));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(640, 360);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;

	let renderElement = renderer.domElement;
	renderElement.style.borderRadius = "30px";
	renderElement.style.marginTop = "0.5rem";
	htmlCanvas = document.querySelector(".threedDModels").appendChild(renderElement); //document.body.appendChild(renderer.domElement);
	htmlCanvas.setAttribute("class", "objLoader");

	animate();
}

function animate() {
	requestAnimationFrame(animate);

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	crate.rotation.y += 0.01;

	if (keyboard[87]) { // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if (keyboard[83]) { // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if (keyboard[65]) { // A key
		camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
	}
	if (keyboard[68]) { // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
	}

	if (keyboard[37]) { // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if (keyboard[39]) { // right arrow key
		camera.rotation.y += player.turnSpeed;
	}

	renderer.render(scene, camera);
}

function keyDown(event) {
	keyboard[event.keyCode] = true;
}

function keyUp(event) {
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

//window.onload = init;
