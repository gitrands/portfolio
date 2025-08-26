import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";

function WireGrid({ width = 60, height = 30, cols = 100, rows = 50, paused = false }) {
  const reduce = useReducedMotion();
  const geometry = React.useMemo(
    () => new THREE.PlaneGeometry(width, height, cols, rows),
    [width, height, cols, rows]
  );
  const material = React.useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#a855f7"), // purple
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (reduce || paused) return;
    const t = clock.getElapsedTime() * 0.6;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.65 + t) * 0.7 + Math.cos(y * 0.55 + t * 0.9) * 0.45;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 3, 0, 0]}
      position={[0, -6, 0]}
    />
  );
}

function Particles({ count = 600, paused = false }) {
  const reduce = useReducedMotion();
  const points = React.useRef<THREE.Points>(null);
  const [geo] = React.useState(() => new THREE.BufferGeometry());
  const [mat] = React.useState(
    () =>
      new THREE.PointsMaterial({
        size: 0.06,
        color: "#60a5fa", // blue
        transparent: true,
        opacity: 0.6,
      })
  );

  React.useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = Math.random() * 18 - 4;
      positions[i * 3 + 2] = Math.random() * -20;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [count, geo]);

  useFrame(({ clock }) => {
    if (reduce || paused || !points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return <points ref={points} geometry={geo} material={mat} />;
}

export default function NeonGridBackground() {
  const reduce = useReducedMotion();
  // Delay Canvas mount until after first paint so parent has correct size
  const [mounted, setMounted] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [bloom, setBloom] = React.useState(1.2);
  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    const onVis = () => setPaused(document.visibilityState !== 'visible');
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);
  React.useEffect(() => {
    const update = () => setBloom(window.innerWidth < 420 ? 1.0 : 1.2);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  if (reduce) {
    // Lightweight fallback for users who prefer reduced motion
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 0%, rgba(236,72,153,0.22), transparent 60%), radial-gradient(40% 40% at 85% 20%, rgba(99,102,241,0.3), transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px, 40px 40px",
            transform: "perspective(800px) rotateX(55deg) translateY(60px)",
            transformOrigin: "center top",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Glow tints */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(236,72,153,0.20), transparent 60%), radial-gradient(40% 40% at 85% 20%, rgba(99,102,241,0.28), transparent)",
        }}
      />
      {mounted && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 2, 12], fov: 55, near: 0.1, far: 100 }}
          dpr={[1, 2]}
          frameloop="always"
          gl={{ powerPreference: 'high-performance' }}
        >
          <FitCamera />
          <color attach="background" args={["#07070b"]} />
          <fog attach="fog" args={["#07070b", 10, 40]} />
          <ambientLight intensity={0.4} />
          <Particles paused={paused} />
          <WireGrid paused={paused} />
          <EffectComposer>
            <Bloom intensity={bloom} mipmapBlur luminanceThreshold={0.15} />
            <Vignette eskil={false} offset={0.2} darkness={0.9} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}

function FitCamera() {
  const { camera, size, gl } = useThree();
  // Ensure projection matrix and DPR are correct whenever size changes
  React.useLayoutEffect(() => {
    camera.aspect = size.width / Math.max(1, size.height);
    camera.updateProjectionMatrix();
    gl.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  }, [camera, size.width, size.height, gl]);

  React.useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    // Nudge camera distance in portrait so grid fills nicely
    camera.position.z = aspect < 0.75 ? 16 : aspect < 1 ? 14 : 12;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}
