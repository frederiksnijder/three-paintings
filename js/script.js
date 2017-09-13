// initialize variables
var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var directionalLight;
var painting1, painting2;

var normalScale;
var shininess;

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    var loader = new THREE.TextureLoader();
    var texture_DIFF = loader.load('tex/painting_01_DIFF.jpg');
    var texture_SPEC = loader.load('tex/painting_01_SPEC_inv.png');
    var texture_NRM = loader.load('tex/painting_01_NRM.png');
    var texture2_DIFF = loader.load('tex/painting_02_DIFF.jpg');
    var texture2_SPEC = loader.load('tex/painting_02_SPEC.png');
    var texture2_NRM = loader.load('tex/painting_02_NRM.png');
    var texture3_diff = loader.load('tex/painting3_DIFF.png');
    var texture3_spec = loader.load('tex/painting3_SPEC.png');

    var texture_canvas_bg = loader.load('tex/background.jpg');
    var texture_canvas_paint_white = loader.load('tex/paint-white.png');
    var texture_canvas_paint_white_mask = loader.load('tex/paint-white_MASK.jpg');
    var texture_shadow = loader.load('tex/box-shadow.jpg');
    var texture_shadow_mask = loader.load('tex/box-shadow_MASK.jpg');

    initEnvironment();
    addDirectionalLight1();
    //addDirectionalLight2();
    tweenCamera();
    addOrbitControls();
    addBox();
    addBox2();
    addBox3();
    addBackPlane();
    addBackPlane2();
    addBackPlane3();
    addPaint();
    addPaint2();
    addPaint3();
    addPaintingShadow1();
    addPaintingShadow2();
    addPaintingShadow3();

    function initEnvironment() {
        initCamera();
        initScene();
        initRenderer();

        normalScale = new THREE.Vector2( 0, 0);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.x = 25;
        camera.position.y = 0;
    }

    function initScene() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xf4f3f2 ); //0xf7a322
        scene.add(new THREE.AmbientLight(0x666666));
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true});
        renderer.setClearColor( 0xfff6e6 );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
    }

    function addDirectionalLight1() {
        directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        directionalLight.position.set( 5, 4, 0 );
        scene.add( directionalLight );
    }

    function addDirectionalLight2() {
        directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
        directionalLight.position.set( 5, -4, 0 );
        scene.add( directionalLight );
    }

    function tweenCamera() {
        // tween1
        var position = { x : 0, y: 0 };
        var target = { x : 0, y: -50 };
        var tween1 = new TWEEN.Tween(position).to(target, 4500);
        tween1.onUpdate(function(){
            //camera.position.x = position.x;
            camera.position.y = position.y;
        });
        tween1.easing(TWEEN.Easing.Sinusoidal.InOut);
        tween1.delay(4000);

        //tween2
        var target2 = { x: 0, y: -100 };
        var tween2 = new TWEEN.Tween(position).to(target2, 4500);
        tween2.onUpdate(function(){
            camera.position.y = position.y;
        });
        tween2.easing(TWEEN.Easing.Sinusoidal.InOut);
        tween2.delay(4000);

        //tween3
        var target3 = { x: 0, y: 0 };
        var tween3 = new TWEEN.Tween(position).to(target3, 4500);
        tween3.onUpdate(function(){
            camera.position.y = position.y;
        });
        tween3.easing(TWEEN.Easing.Sinusoidal.InOut);
        tween3.delay(4000);

        //chain and start tweens
        tween1.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween1);
        tween1.start();

    }

    function addBox() {
        material = new THREE.MeshPhysicalMaterial( {
            reflectivity: 0,
            roughness: 0.1,
            roughnessMap: texture_SPEC,
            metalness: 0,
            clearCoat: 0,
            clearCoatRoughness: 0,
            map: texture_DIFF,
            normalMap: texture_NRM,
            normalScale: normalScale

        });
        painting1 = new THREE.Mesh(
            new THREE.BoxGeometry( 0.8, 20, 20, 4, 4, 4 ),
            material
        );
        painting1.position.set( 0, 0, 0 );
        //painting1.castShadow = true;
        painting1.name = "painting1";
        scene.add( painting1 );
    }

    function addBox2() {
        material = new THREE.MeshPhysicalMaterial( {
            reflectivity: 0.2,
            roughness: 0.15,
            roughnessMap: texture2_SPEC,
            metalness: 0,
            clearCoat: 1,
            clearCoatRoughness: 0.6,
            map: texture2_DIFF,
            normalMap: texture2_NRM,
            normalScale: normalScale
        });
        //objectBox2 without var because it's already initialised upstream
        painting2 = new THREE.Mesh(
            new THREE.BoxGeometry( 0.8, 20, 26.94, 4, 4, 4 ),
            material
        );
        painting2.position.set( 0, -50, 0 );
        painting2.castShadow = true;
        painting2.name = "painting2";
        scene.add( painting2 );
    }

    function addBox3() {
        material = new THREE.MeshPhysicalMaterial( {
            reflectivity: 0.2,
            roughness: 0.2,
            roughnessMap: texture3_spec,
            metalness: 0,
            clearCoat: 0.4,
            clearCoatRoughness: 0.3,
            map: texture3_diff
        });
        painting3 = new THREE.Mesh(
            new THREE.BoxGeometry( 0.8, 20, 20, 4, 4, 4 ),
            material
        );
        painting3.position.set( 0, -100, 0 );
        painting3.castShadow = true;
        painting3.name = "painting3";
        scene.add( painting3 );
    }

    function addBackPlane() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture_canvas_bg});
        var groundMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 50, .1, 50 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0;
        groundMesh.rotation.z = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addBackPlane2() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture_canvas_bg});
        var groundMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 50, .1, 50 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0;
        groundMesh.position.y = -50;
        groundMesh.rotation.z = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addBackPlane3() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture_canvas_bg});
        var groundMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 50, .1, 50 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0;
        groundMesh.position.y = -100;
        groundMesh.rotation.z = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addPaint() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture_canvas_paint_white,
            alphaMap: texture_canvas_paint_white_mask,
            transparent: true
        });
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 1, 50 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0.05;
        groundMesh.position.y = -25;
        groundMesh.rotation.x = Math.PI / 2;
        groundMesh.rotation.y = Math.PI / 2;
        groundMesh.rotation.z = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addPaint2() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture_canvas_paint_white,
            alphaMap: texture_canvas_paint_white_mask,
            transparent: true
        });
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 1, 50 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0.05;
        groundMesh.position.y = -50;
        groundMesh.rotation.x = Math.PI / 2;
        groundMesh.rotation.y = Math.PI / 2;
        groundMesh.rotation.z = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addPaint3() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture_canvas_paint_white,
            alphaMap: texture_canvas_paint_white_mask,
            transparent: true
        });
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 1, 50 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0.05;
        groundMesh.position.y = -75;
        groundMesh.rotation.x = Math.PI / 2;
        groundMesh.rotation.y = Math.PI / 2;
        groundMesh.rotation.z = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addPaintingShadow1() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0x666666,
            map: texture_shadow,
            alphaMap: texture_shadow_mask,
            transparent: true
        });
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 24.1, 24.1 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0.15;
        groundMesh.position.y = 0;
        groundMesh.rotation.y = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addPaintingShadow2() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0x666666,
            map: texture_shadow,
            alphaMap: texture_shadow_mask,
            transparent: true
        });
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 32.5, 24.1 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0.15;
        groundMesh.position.y = -50;
        groundMesh.rotation.y = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addPaintingShadow3() {
        var backPlaneMaterial = new THREE.MeshBasicMaterial({
            color: 0x666666,
            map: texture_shadow,
            alphaMap: texture_shadow_mask,
            transparent: true
        });
        var groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry( 24.1, 24.1 ),
            backPlaneMaterial
        );
        groundMesh.position.x = 0.15;
        groundMesh.position.y = -100;
        groundMesh.rotation.y = Math.PI / 2;
        scene.add( groundMesh );
    }

    function addOrbitControls() {
        // for some reason the camera is in the wrong spot when this line is commented out
        var controls = new THREE.OrbitControls( camera, renderer.domElement );
    }

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function calculateEffects() {
    var fxStrengthDivider = 13;

    var fxIntensity = 0;
    var differenceBetweenCameraAndPainting1 = Math.abs(painting1.position.y - camera.position.y);
    if ( differenceBetweenCameraAndPainting1 > 0.05 ) {
        fxIntensity = differenceBetweenCameraAndPainting1 / fxStrengthDivider;
    }

    var fxIntensity2 = 0;
    var differenceBetweenCameraAndPainting2 = Math.abs(painting2.position.y - camera.position.y);
    if ( differenceBetweenCameraAndPainting2 > 0.05 ) {
        fxIntensity2 = differenceBetweenCameraAndPainting2 / fxStrengthDivider;
    }

    var fxIntensity3 = 0;
    var differenceBetweenCameraAndPainting3 = Math.abs(painting3.position.y - camera.position.y);
    if ( differenceBetweenCameraAndPainting3 > 0.05 ) {
        fxIntensity3 = differenceBetweenCameraAndPainting3 / fxStrengthDivider;
    }

    return {
        painting1: fxIntensity,
        painting2: fxIntensity2,
        painting3: fxIntensity3
    };
}

function updateNormalScale(key) {
    normalScale = new THREE.Vector2( calculateEffects()[key], calculateEffects()[key]);
    return normalScale;
}

function updateShininess(key) {
    shininess = calculateEffects()[key] * 500;
    //console.log(shininess);
    return shininess;
}

function animate() {
    //console.log(scene.getObjectByName('painting1').material.normalScale);
    scene.getObjectByName('painting1').material.normalScale = updateNormalScale('painting1');
    scene.getObjectByName('painting2').material.normalScale = updateNormalScale('painting2');
    scene.getObjectByName('painting3').material.normalScale = updateNormalScale('painting3');
    //scene.getObjectByName('painting1').material.shininess = updateShininess('painting1');
    //scene.getObjectByName('painting2').material.shininess = updateShininess('painting2');
    //scene.getObjectByName('painting3').material.shininess = updateShininess('painting3');
    requestAnimationFrame( animate );
    TWEEN.update();
    render();
}

function render() {
    renderer.render( scene, camera );
}

// helper functions
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
    //console.log( item, loaded, total );
};

function onProgress(xhr) {
    if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        //console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
}

function onError(xhr) {
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

function onDocumentMouseDown( e ) {
    e.preventDefault();
}