import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis"; // Don't forget to install this

gsap.registerPlugin(ScrollTrigger);

// Init Lenis
// const lenis = new Lenis();

// function raf(time){
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the 3D scene
  const modelContainer = document.getElementById("model-container");
  const loader = document.querySelector(".loading-container");

  // setup three.js scene
  const scene = new THREE.Scene();
  // new THREE.PerspectiveCamera(fov, aspect, near, far)
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Set inital camera position
  camera.position.z = 5;
  camera.position.y = 1;

  //Create renderer | THREE.WebGLRenderer({Smooths jagged edges, Enables transparency});
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight); //    Sets canvas size to fit screen
  renderer.setPixelRatio(window.devicePixelRatio); //  Makes it crisp on retina displays
  renderer.outputEncoding = THREE.sRGBEncoding; //  Fixes lighting & color accuracy
  modelContainer.appendChild(renderer.domElement); //  Adds canvas to your HTML so stuff shows up

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); //  Even light everywhere, no shadows
  scene.add(ambientLight);

  // Add Directional lights "sunlight" from a specific direction.
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(1, 1, 1); // (x,y,z) axis
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight2.position.set(-1, 0.5, -1);
  scene.add(directionalLight2);

  // Variables for model and animation
  let model;
  let modelLoaded = false;
  let modelRotation = { x: 0, y: 0, z: 0 };

  function getResponsiveScale(maxDim) {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? 4 / maxDim : 4 / maxDim;
  }

  loadModel();

  function loadModel() {
    // Load the GLTF model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/assets/shinchan/scene.gltf",
      function (gltf) {
        model = gltf.scene;

        //Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        //Scale the model to a reasonable size
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = getResponsiveScale(maxDim);
        model.scale.set(scale, scale, scale);

        //Center the model
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        scene.add(model);

        //Hide loading screen
        loader.style.display = "none";

        modelLoaded = true;

        //Set up GSAP animations when model is loaded
        setupScrollAnimations();
      },

      //Progress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },

      //Error callback
      function (error) {
        console.error("An error happened while loading the model:", error);
        loader.style.display = "none";
      }
    );
  }

  //Function to set up scroll animations with GSAP
  function setupScrollAnimations() {
    //Create a timeline for model rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".model-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Add rotations to the timeline
    tl.to(modelRotation, {
      y: Math.PI * 2, // Full 360 degree rotation
      ease: "none",
      onUpdate: function () {
        if (model) {
          model.rotation.y = modelRotation.y;
          model.rotation.x = modelRotation.x;
        }
      },
    });

    // Add mode animations if desired
    // tl.to(modelRotation, {
    //     x: Math.PI / 8, // slight tilt
    //     ease: "power1.inOut"
    // }, 0);

    // tl.to(modelRotation, {
    //     x: 0, // return to normal
    //     ease: "power1.inOut"
    // }, 0.5);

    // tl.to(camera.position, {
    //     y: 3.5,
    //     ease: "power1.inOut"
    // }, 0.5);

    // tl.to(camera.position, {
    //     y: 3.5,
    //     ease: "power1.inOut"
    // }, 0.5);

    tl.to(camera.position, {
        y: 5,
        ease: "power1.inOut"
    }, 0.4);
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRatio);
  });

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();


  //GSAP Animate

  gsap.set('.cloud-1',{
    xPercent:-80,
    yPercent:-50
  });

  gsap.set('.cloud-2',{
    xPercent:50,
    yPercent:-60
  });

  gsap.set('.cloud-3',{
    xPercent:-20,
    yPercent:0
  });

  gsap.set('.cloud-4',{
    xPercent:0,
    yPercent:0
  });

    gsap.to('.cloud-1',{
        xPercent:-40,
        scrollTrigger: {
            trigger: ".section-two",
            start: "top-=800 middle+=500",
            end: "bottom bottom",
            scrub: true,
        }
    });

    gsap.to('.cloud-2',{
        xPercent:0,
        scrollTrigger: {
            trigger: ".section-two",
            start: "top-=800 middle+=500",
            end: "bottom bottom",
            scrub: true,
        }
    });

    gsap.to('.cloud-3',{
        xPercent:-80,
        scrollTrigger: {
            trigger: ".section-three",
            start: "middle+=200 bottom-=200",
            end: "bottom bottom",
            scrub: true,
        }
    });

    gsap.to('.cloud-4',{
        xPercent:50,
        scrollTrigger: {
            trigger: ".section-three",
            start: "middle+=200 bottom-=200",
            end: "bottom bottom",
            scrub: true,
        }
    });

    // gsap.fromTo(".bubble", 
    //     {
    //         y: 100,
    //         scale: 0,
    //         opacity: 0
    //     }, 
    //     {
    //         y: 0,
    //         scale: 1.2,
    //         opacity: 1,
    //         ease: "back.out(2)",
    //         // duration: 0.4,
    //         scrollTrigger: {
    //         trigger: ".section-four",
    //         start: "30% 40%", 
    //         end: "70% 80%", 
    //         scrub: true,
    //         }
    //     }
    // );

    gsap.to(".scroll-container", {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
            trigger: ".scroll-container",
            pin: true,
            scrub: 1,
            // snap: {
            //     snapTo: 1 / 2,
            //     duration: 0.5,
            //     ease: "power1.inOut"
            // },
            end: "+=2000",
        }
    });

    gsap.set(".shinchan-fly", {
        x: -200,
        y: -500
    });

    gsap.to(".shinchan-fly", {
        x: 600,
        y: 200,
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top-=300 center",       // start when container hits center of viewport
            end: "bottom center",      // end when container's bottom hits center
            scrub: true,
        }
    });

    gsap.fromTo(".shinchan-fly", 
        {
            x: 500,
            y: 100,
        },
        {
        x: 2200,
        y: 500,
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "50% center",
            end: "300% bottom-=300",
            scrub: true,
        }
    });



});
