//THREE.PerspectiveCamera attributes
camera.position.z = 0;
camera.rotation.y = 0.3;
camera.rotation.z = 0.3;
camera.rotation.z = Math.PI / 2;
camera.up.set(0,1,0);


//THREE.OrbitControls attributes
controls.target = new THREE.Vector3(0,15,0);
controls.maxPolarAngle = Math.PI / 1;
controls.minAzimuthAngle = Math.PI / 2; // radians
controls.maxAzimuthAngle = Math.PI / 2; // radians
controls.enableRotate = false;
controls.enableZoom = false;

//render function camera attributes
//uncomment below to map the position of the mouse pointer to the position of the camera
camera.position.x += ( ( mouseX/4 ) - camera.position.x );
camera.position.y += ( ( - mouseY/4 ) - camera.position.y ) ;
camera.lookAt( scene.position );


function addPlane() {
    var planeMaterial = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        specular: 0x111111,
        shininess: 40
    });
    var object = new THREE.Mesh(
        new THREE.PlaneGeometry( 250, 250, 250, 1, 1, 1),
        planeMaterial
    );
    object.rotation.x = Math.PI / -2;
    object.position.set( 0, -25, 0);
    object.receiveShadow = true;
    scene.add( object );
}

function addGroundPlane() {
    // groundPlane
    var shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee });
    shadowMaterial.opacity = 0.2;
    var groundMesh = new THREE.Mesh(
    new THREE.BoxGeometry( 200, .1, 200 ),
        shadowMaterial
        );
    groundMesh.receiveShadow = true;
    scene.add( groundMesh );
}

function addAreaLight1() {
    rectLight = new THREE.RectAreaLight( 0xFFFFFF, undefined, 10, 10 );
    rectLight.matrixAutoUpdate = true;
    rectLight.intensity = 200.0;
    rectLight.position.set( 6, 0, 0 );
    rectLight.rotation = new THREE.Vector3( 0.3, 1.3, 0.6);
    rectLight.target = objectBox2;
    rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
    rectLight.add( rectLightHelper );
    scene.add(rectLight);
}

function addPointLight() {
    pointLight1 = new THREE.PointLight( 0xffffff, 1 );
    pointLight1.position.set( 10, 10, 0);
    pointLight1.shadow.mapSize.width = 2048;
    pointLight1.shadow.mapSize.height = 2048;
    scene.add( pointLight1 );
}

function addPointLight2() {
    // Add a point light that will cast shadows
    var pointLight = new THREE.PointLight( 0xffffff, 1 );
    pointLight.position.set( 0, 30, 15 );
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight);
}

function addSpotLight() {
    // Add a point light that will cast shadows
    var spotLight = new THREE.SpotLight( 0xffffff, 0.8 );
    spotLight.distance = 200;
    spotLight.decay = 1;
    spotLight.position.set( 40, 50, 40 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add( spotLight );
}