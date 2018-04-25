	var scene, renderer;
	var camera, avatarCam, edgeCam;
	var avatar;
	var suzanne;
	var npc;
	var npc2;
	var npc3;
	var npc4;
	var npc5;
	var ring1, ring2, ring3, ring4, ring5;
	var opening, opencamera, start, main;
	var endScene, endScene2, endCamera, endText, endText2, endCamera2;
	var endScene3, endCamera3, endText3;
	var controls =
			 {fwd:false, bwd:false, left:false, right:false,
				speed:10, fly:false, reset:false,
				camera:camera}
	var coneAvatarControls =
					 {fwd:false, bwd:false, left:false, right:false,
						speed:10, fly:false, reset:false}
	var gameState =
			 {score:0, health:1, scene:'starting', camera:'none' }
	init();
	initControls();
	animate();
	function createLoseScene(){
		endScene2 = initScene();
		endText2 = createSkyBox('youlost.png',10);
		endScene2.add(endText2);
		var light2 = createPointLight();
		light2.position.set(0,200,20);
		endScene2.add(light2);
		endCamera2 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		endCamera2.position.set(0,50,1);
		endCamera2.lookAt(0,0,0);
	}
	function createStartScene(){
		endScene3 = initScene();
		endText3 = createSkyBox('starting.png',10);
		endScene3.add(endText3);
		var light3 = createPointLight();
		light3.position.set(0,200,20);
		endScene3.add(light3);
		endCamera3 = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		endCamera3.position.set(0,50,1);
		endCamera3.lookAt(0,0,0);
		console.log("Press p to start!");
		console.log("Collect all 5 rings! Avoid the spheres. The 5th ring appears after you collect the other 4 rings!")
	}
	function createEndScene(){
		endScene = initScene();
		endText = createSkyBox('youwon.png',10);
		endScene.add(endText);
		var light1 = createPointLight();
		light1.position.set(0,200,20);
		endScene.add(light1);
		endCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		endCamera.position.set(0,50,1);
		endCamera.lookAt(0,0,0);
		console.log("If you lose, you can press r to continue game from where you left off!");
	}
	function init(){
		createStartScene();
			initPhysijs();
			scene = initScene();
			createLoseScene();
			createEndScene();
			initRenderer();
			createMainScene();
	}
	function createMainScene(){
			var light1 = createPointLight();
			light1.position.set(0,200,20);
			scene.add(light1);
			var light0 = new THREE.AmbientLight( 0xffffff,0.25);
			scene.add(light0);
			camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.position.set(0,50,0);
			camera.lookAt(0,0,0);
			var ground = createGround('sand.png');
			scene.add(ground);
			var skybox = createSkyBox('sunset.png',1);
			skybox.translateY(50);
			scene.add(skybox);
			avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
			avatar = createAvatar();
			avatarCam.translateY(-4);
			avatarCam.translateZ(3);
			scene.add(avatar);
			gameState.camera = avatarCam;
			edgeCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
			edgeCam.position.set(20,20,10);
			ring1 = createRing();
			ring1.position.set(40,2,-40);
			scene.add(ring1);
			ring2 = createRing();
			ring2.position.set(-40,2,40);
			scene.add(ring2);
			ring3 = createRing();
			ring3.position.set(-40,2,-40);
			scene.add(ring3);
			ring4 = createRing();
			ring4.position.set(40,2,40);
			scene.add(ring4);
			addRings();
			npc = createSphereMesh(0x00CCCC);
			npc.position.set(30,5,-30);
			scene.add(npc);
			console.dir(npc);
			npc2 = createSphereMesh(0xF5F5F5);
			npc2.position.set(-30,5,30);
			scene.add(npc2);
			console.dir(npc2);
			npc3 = createSphereMesh(0xDC143C);
			npc3.position.set(30,5,30);
			scene.add(npc3);
			console.dir(npc3);
			npc4 = createSphereMesh(0xFFBF00);
			npc4.position.set(-30,5,-30);
			scene.add(npc4);
			console.dir(npc4);
			npc5 = createSphereMesh(0x00008B);
			npc5.position.set(15,5,-15);
			scene.add(npc5);
			console.dir(npc5);
			npc.addEventListener( 'collision',
				function(other_object){
					if(other_object==avatar){
						gameState.health-=1;
						npc.__dirtyPosition = true;
						npc.position.set(Math.random(),Math.random(),Math.random());
						if(gameState.health==0){
							gameState.scene = 'youlost';
						}
					}
				}
			)
			npc2.addEventListener( 'collision',
				function(other_object){
					if(other_object==avatar){
						gameState.health-=1;
						npc2.__dirtyPosition = true;
						npc2.position.set(Math.random(),Math.random(),Math.random());
						if(gameState.health==0){
							gameState.scene = 'youlost';
						}
					}
				}
			)
			npc3.addEventListener( 'collision',
				function(other_object){
					if(other_object==avatar){
						gameState.health-=1;
						npc3.__dirtyPosition = true;
						npc3.position.set(Math.random(),Math.random(),Math.random());
						if(gameState.health==0){
							gameState.scene = 'youlost';
						}
					}
				}
			)
			npc4.addEventListener( 'collision',
				function(other_object){
					if(other_object==avatar){
						gameState.health-=1;
						npc4.__dirtyPosition = true;
						npc4.position.set(Math.random(),Math.random(),Math.random());
						if(gameState.health==0){
							gameState.scene = 'youlost';
						}
					}
				}
			)
			npc5.addEventListener( 'collision',
				function(other_object){
					if(other_object==avatar){
						gameState.health-=1;
						npc5.__dirtyPosition = true;
						npc5.position.set(Math.random(),Math.random(),Math.random());
						if(gameState.health==0){
							gameState.scene = 'youlost';
						}
					}
				}
			)
	}
 function addRings(){
	 ring1.addEventListener( 'collision',
		 function( other_object ) {
			 if (other_object==avatar){
				 soundEffect('good.wav');
				 gameState.score += 1;
				 if (gameState.score == 4){
					 ring5 = createRing();
					 ring5.position.set(9,2,-9);
					 scene.add(ring5);
					 ring5.addEventListener( 'collision',
			 			 function( other_object ) {
			 				 if (other_object==avatar){
			 					 soundEffect('good.wav');
			 					 gameState.score += 1;
			 					 if (gameState.score==5) {
			 						 gameState.scene='youwon';
			 					 }
			 					 this.position.y = this.position.y - 100;
			 					 this.__dirtyPosition = true;
			 				 }
			 			 }
			 		 )
				 }
				 if (gameState.score==5) {
					 gameState.scene='youwon';
				 }
				 this.position.y = this.position.y - 100;
				 this.__dirtyPosition = true;
			 }
		 }
	 )
	 ring2.addEventListener( 'collision',
		 function( other_object) {
			 if (other_object==avatar){
				 soundEffect('good.wav');
				 gameState.score += 1;
				 if (gameState.score == 4){
					 ring5 = createRing();
					 ring5.position.set(9,2,-9);
					 scene.add(ring5);
					 ring5.addEventListener( 'collision',
			 			 function( other_object ) {
			 				 if (other_object==avatar){
			 					 soundEffect('good.wav');
			 					 gameState.score += 1;
			 					 if (gameState.score==5) {
			 						 gameState.scene='youwon';
			 					 }
			 					 this.position.y = this.position.y - 100;
			 					 this.__dirtyPosition = true;
			 				 }
			 			 }
			 		 )
				 }
				 if (gameState.score==5) {
					 gameState.scene='youwon';
				 }
				 this.position.y = this.position.y - 100;
				 this.__dirtyPosition = true;
			 }
		 }
	 )
	 ring3.addEventListener( 'collision',
		 function( other_object) {
			 if (other_object==avatar){
				 soundEffect('good.wav');
				 gameState.score += 1;
				 if (gameState.score == 4){
					 ring5 = createRing();
					 ring5.position.set(9,2,-9);
					 scene.add(ring5);
					 ring5.addEventListener( 'collision',
		 				 function( other_object ) {
		 					 if (other_object==avatar){
		 						 soundEffect('good.wav');
		 						 gameState.score += 1;
		 						 if (gameState.score==5) {
		 							 gameState.scene='youwon';
		 						 }
		 						 this.position.y = this.position.y - 100;
		 						 this.__dirtyPosition = true;
		 					 }
		 				 }
		 			 )
				 }
				 if (gameState.score==5) {
					 gameState.scene='youwon';
				 }
				 this.position.y = this.position.y - 100;
				 this.__dirtyPosition = true;
			 }
		 }
	 )
	 ring4.addEventListener( 'collision',
		 function( other_object ) {
			 if (other_object==avatar){
				 soundEffect('good.wav');
				 gameState.score += 1;
				 if (gameState.score == 4){
					 ring5 = createRing();
					 ring5.position.set(9,2,-9);
					 scene.add(ring5);
					 ring5.addEventListener( 'collision',
				 		 function( other_object ) {
				 			 if (other_object==avatar){
				 				 soundEffect('good.wav');
				 				 gameState.score += 1;
				 				 if (gameState.score==5) {
				 					 gameState.scene='youwon';
				 				 }
				 				 this.position.y = this.position.y - 100;
				 				 this.__dirtyPosition = true;
				 			 }
				 		 }
				 	 )
				 }
				 if (gameState.score==5) {
					 gameState.scene='youwon';
				 }
				 this.position.y = this.position.y - 100;
				 this.__dirtyPosition = true;
			 }
		 }
	 )
 }
	function randN(n){
		return Math.random()*n;
	}
	function playGameMusic(){
		var listener = new THREE.AudioListener();
		camera.add( listener );
		var sound = new THREE.Audio( listener );
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/loop.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.05 );
			sound.play();
		});
	}
	function soundEffect(file){
		var listener = new THREE.AudioListener();
		camera.add( listener );
		var sound = new THREE.Audio( listener );
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/'+file, function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( false );
			sound.setVolume( 0.5 );
			sound.play();
		});
	}
	function initScene(){
		var scene = new Physijs.Scene();
		return scene;
	}
	function initPhysijs(){
		Physijs.scripts.worker = '/js/physijs_worker.js';
		Physijs.scripts.ammo = '/js/ammo.js';
	}
	function initRenderer(){
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight-50 );
		document.body.appendChild( renderer.domElement );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}
	function createPointLight(){
		var light;
		light = new THREE.PointLight( 0xffffff);
		light.castShadow = true;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.camera.near = 0.5;
		light.shadow.camera.far = 500
		return light;
	}
	function createBoxMesh(color){
		var geometry = new THREE.BoxGeometry( 1, 1, 1);
		var material = new THREE.MeshLambertMaterial( { color: color} );
		mesh = new Physijs.BoxMesh( geometry, material );
		mesh.castShadow = true;
		return mesh;
	}
	function createSphereMesh(color){
		var geometry = new THREE.SphereGeometry( 1, 26, 26);
		var material = new THREE.MeshLambertMaterial( { color: color} );
		mesh = new Physijs.BoxMesh( geometry, material );
		mesh.castShadow = true;
		return mesh;
	}
	function createGround(image){
		var geometry = new THREE.PlaneGeometry( 180, 180, 128 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 15, 15 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.05);
		var mesh = new Physijs.BoxMesh( geometry, pmaterial, 0 );
		mesh.receiveShadow = true;
		mesh.rotateX(Math.PI/2);
		return mesh
	}
	function createSkyBox(image,k){
		var geometry = new THREE.SphereGeometry( 80, 80, 80 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( k, k );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		var mesh = new THREE.Mesh( geometry, material, 0 );
		mesh.receiveShadow = false;
		return mesh
	}
	function createAvatar(){
		var geometry = new THREE.BoxGeometry( 0.9, 0.9, 0.9);
		var material = new THREE.MeshLambertMaterial( { color: 0x123524} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		var mesh = new THREE.Mesh( geometry, material );
		var mesh = new Physijs.BoxMesh( geometry, pmaterial );
		mesh.setDamping(0.1,0.1);
		mesh.castShadow = true;
		avatarCam.position.set(0,4,0);
		avatarCam.lookAt(0,4,10);
		mesh.add(avatarCam);
		return mesh;
	}
	function createConeMesh(r,h){
		var geometry = new THREE.ConeGeometry( r, h, 32);
		var texture = new THREE.TextureLoader().load( '../images/tile.jpg' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 1, 1 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		var mesh = new Physijs.ConeMesh( geometry, pmaterial, 0 );
		mesh.castShadow = true;
		return mesh;
	}
	function createRing(){
		var geometry = new THREE.RingGeometry( 1, 2, 15 );
		var material = new THREE.MeshLambertMaterial( { color: 0x00BFFF, side: THREE.DoubleSide } );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.95);
		var mesh = new Physijs.BoxMesh( geometry, pmaterial );
		mesh.castShadow = true;
		return mesh;
	}
	function createBall(){
		var geometry = new THREE.SphereGeometry( 1, 16, 16);
		var material = new THREE.MeshLambertMaterial( { color: 0xffff00} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.95);
		var mesh = new Physijs.BoxMesh( geometry, pmaterial );
		mesh.setDamping(0.1,0.1);
		mesh.castShadow = true;
		return mesh;
	}
	var clock;
	function initControls(){
			clock = new THREE.Clock();
			clock.start();
			window.addEventListener( 'keydown', keydown);
			window.addEventListener( 'keyup',   keyup );
	}
	function keydown(event){
		console.log("Keydown: '"+event.key+"'");
		if (gameState.scene == 'youlost' && event.key=='r') {
			gameState.scene = 'main';
			gameState.score = 0;
			addBalls();
			return;
		}
		if (gameState.scene == 'youwon' && event.key=='r') {
			gameState.scene = 'main';
			gameState.score = 0;
			addBalls();
			return;
		}
		if(gameState.scene == 'starting' && event.key =='p'){
			gameState.scene = 'main';
			gameState.score = 0;
			addBalls();
			return;
		}
		switch (event.key){
			case "w": controls.fwd = true;  break;
			case "s": controls.bwd = true; break;
			case "a": controls.left = true; break;
			case "d": controls.right = true; break;
			case "r": controls.up = true; break;
			case "p": controls.up = true; break;
			case "f": controls.down = true; break;
			case "m": controls.speed = 30; break;
			case " ": controls.fly = true;
					console.log("space!!");
					break;
			case "i": controls.fwd2 = true; break;
			case "j": controls.left2 = true; break;
			case "k": controls.bwd2 = true; break;
			case "l": controls.right2 = true; break;
			case "h": controls.reset = true; break;
			case "1": gameState.camera = camera; break;
			case "2": gameState.camera = avatarCam; break;
			case "3": gameState.camera = edgeCam; break;
			case "q": avatarCam.rotateY(.5); break;
			case "e": avatarCam.rotateY(-.5); break;
			case "ArrowLeft": avatarCam.translateY(1);break;
			case "ArrowRight": avatarCam.translateY(-1);break;
			case "ArrowUp": avatarCam.translateZ(-1);break;
			case "ArrowDown": avatarCam.translateZ(1);break;
		}
	}
	function keyup(event){
		switch (event.key){
			case "w": controls.fwd   = false;  break;
			case "s": controls.bwd   = false; break;
			case "a": controls.left  = false; break;
			case "d": controls.right = false; break;
			case "i": controls.fwd2 = false; break;
			case "j": controls.left2 = false; break;
			case "k": controls.bwd2 = false; break;
			case "l": controls.right2 = false; break;
			case "r": controls.up    = false; break;
			case "p": controls.up = false; break;
			case "f": controls.down  = false; break;
			case "m": controls.speed = 10; break;
			case " ": controls.fly = false; break;
			case "h": controls.reset = false; break;
		}
	}
	function updateNPC(){
		npc.lookAt(avatar.position);
		npc.__dirtyPosition = true;
		npc.setLinearVelocity(npc.getWorldDirection().multiplyScalar(0.5));
	}
	function updateNPC2(){
		npc2.lookAt(avatar.position);
		npc2.__dirtyPosition = true;
		npc2.setLinearVelocity(npc2.getWorldDirection().multiplyScalar(0.5));
	}
	function updateNPC3(){
		npc3.lookAt(avatar.position);
		npc3.__dirtyPosition = true;
		npc3.setLinearVelocity(npc3.getWorldDirection().multiplyScalar(0.5));
	}
	function updateNPC4(){
		npc4.lookAt(avatar.position);
		npc4.__dirtyPosition = true;
		npc4.setLinearVelocity(npc4.getWorldDirection().multiplyScalar(0.5));
	}
	function updateNPC5(){
		npc5.lookAt(avatar.position);
		npc5.__dirtyPosition = true;
		npc5.setLinearVelocity(npc5.getWorldDirection().multiplyScalar(0.5));
	}
	function updateAvatar(){
		"change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)"
		var forward = avatar.getWorldDirection();
		if (controls.fwd){
			avatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
		} else if (controls.bwd){
			avatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
		} else {
			var velocity = avatar.getLinearVelocity();
			velocity.x=velocity.z=0;
			avatar.setLinearVelocity(velocity);
		}
		if(controls.fwd2){
			coneAvatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
		} else if(controls.bwd2){
			coneAvatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
		}
		if (controls.fly){
			avatar.setLinearVelocity(new THREE.Vector3(0,controls.speed,0));
		}
		if (controls.left){
			avatar.setAngularVelocity(new THREE.Vector3(0,controls.speed*0.1,0));
		} else if (controls.right){
			avatar.setAngularVelocity(new THREE.Vector3(0,-controls.speed*0.1,0));
		}
		if(controls.left2){
				coneAvatar.setAngularVelocity(new THREE.Vector3(0,controls.speed*0.1,0));
		} else if(controls.right2){
				coneAvatar.setAngularVelocity(new THREE.Vector3(0,-controls.speed*0.1,0));
		}
		if (controls.reset){
			avatar.__dirtyPosition = true;
			avatar.position.set(40,10,40);
		}
	}
	function animate() {
		requestAnimationFrame( animate );
		switch(gameState.scene) {
			case "youlost":
			endText2.rotateY(0.005);
				renderer.render( endScene2, endCamera2 );
			break;
			case "starting":
			endText3.rotateY(0.005);
				renderer.render( endScene3, endCamera3 ); break;
			case "youwon":
				endText.rotateY(0.005);
				renderer.render( endScene, endCamera );
				break;
			case "starting":
			endText2.rotateY(0.005);
				renderer.render( endScene3, endCamera3 );
			break;
			case "main":
				updateAvatar();
				updateNPC();
				updateNPC2();
				updateNPC3();
				updateNPC4();
				updateNPC5();
				edgeCam.lookAt(avatar.position);
				scene.simulate();
				if (gameState.camera!= 'none'){
					renderer.render( scene, gameState.camera );
				}
				break;
			default:
				console.log("don't know the scene "+gameState.scene);
		}
		var info = document.getElementById("info");
		info.innerHTML='<div style="font-size:24pt">Score: ' + gameState.score
		+ ' Health: ' + gameState.health + '</div>';
	}
