import { useRef, useMemo, useCallback, useState, forwardRef } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Plus, Minus } from 'lucide-react';
import { RadioStation } from '@/data/radioStations';

export interface GlobeProps {
  stations: RadioStation[];
  focusedStation: RadioStation | null;
  isPlaying: boolean;
  onStationFocus: (station: RadioStation | null) => void;
  onGlobeClick: () => void;
}

interface GlobeSceneProps extends GlobeProps {
  controlsRef: React.RefObject<any>;
}

const GLOBE_RADIUS = 2;
const STATION_ALT = 0.005;
const FOCUS_THRESHOLD = 0.12;

const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

/* ── All station dots as a single Points cloud ── */
const StationPoints = ({ stations }: { stations: RadioStation[] }) => {
  const geometry = useMemo(() => {
    const positions = new Float32Array(stations.length * 3);
    for (let i = 0; i < stations.length; i++) {
      const p = latLongToVector3(stations[i].latitude, stations[i].longitude, GLOBE_RADIUS + STATION_ALT);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [stations]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.012,
        color: new THREE.Color('#4ade80'),
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return <points geometry={geometry} material={material} />;
};

/* ── Pulsing highlight for the focused station ── */
const FocusedMarker = ({ station }: { station: RadioStation }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const position = useMemo(
    () => latLongToVector3(station.latitude, station.longitude, GLOBE_RADIUS + 0.01),
    [station.latitude, station.longitude]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.3);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(t * 3) * 0.5);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 4) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.9} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

/* ── Scene with Earth, points, raycasting ── */
const GlobeScene = forwardRef<any, GlobeSceneProps>(({ stations, focusedStation, isPlaying, onStationFocus, onGlobeClick, controlsRef }, _ref) => {
  const globeMeshRef = useRef<THREE.Mesh>(null);
  const focusedIdRef = useRef<string | null>(null);
  const { camera } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  const earthTexture = useLoader(THREE.TextureLoader, '/textures/earth-hires.jpg');
  earthTexture.colorSpace = THREE.SRGBColorSpace;
  earthTexture.anisotropy = 16;

  // Pre-compute 3-component flat array for fast lookup
  const stationCoords = useMemo(() => {
    const arr = new Float32Array(stations.length * 3);
    for (let i = 0; i < stations.length; i++) {
      const p = latLongToVector3(stations[i].latitude, stations[i].longitude, GLOBE_RADIUS + STATION_ALT);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    }
    return arr;
  }, [stations]);

  useFrame(() => {
    if (!globeMeshRef.current || stations.length === 0) return;

    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const hit = raycaster.intersectObject(globeMeshRef.current);
    if (hit.length === 0) return;

    const px = hit[0].point.x;
    const py = hit[0].point.y;
    const pz = hit[0].point.z;

    let nearestIdx = -1;
    let nearestSq = FOCUS_THRESHOLD * FOCUS_THRESHOLD;

    for (let i = 0; i < stations.length; i++) {
      const j = i * 3;
      const dx = px - stationCoords[j];
      const dy = py - stationCoords[j + 1];
      const dz = pz - stationCoords[j + 2];
      const sq = dx * dx + dy * dy + dz * dz;
      if (sq < nearestSq) {
        nearestIdx = i;
        nearestSq = sq;
      }
    }

    const newId = nearestIdx >= 0 ? stations[nearestIdx].id : null;
    if (newId !== focusedIdRef.current) {
      focusedIdRef.current = newId;
      onStationFocus(nearestIdx >= 0 ? stations[nearestIdx] : null);
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#14b8a6" />

      {/* Earth */}
      <mesh
        ref={globeMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          onGlobeClick();
        }}
      >
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial map={earthTexture} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.05, 64, 64]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* Station markers */}
      {stations.length > 0 && <StationPoints stations={stations} />}

      {/* Focused station highlight */}
      {focusedStation && <FocusedMarker station={focusedStation} />}

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        minDistance={2.5}
        maxDistance={8}
        rotateSpeed={0.4}
        zoomSpeed={0.5}
        autoRotate={!isPlaying}
        autoRotateSpeed={0.3}
      />
    </>
  );
});

GlobeScene.displayName = 'GlobeScene';

export const Globe = (props: GlobeProps) => {
  const controlsRef = useRef<any>(null);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    const controls = controlsRef.current;
    if (!controls) return;
    const camera = controls.object;
    const target = controls.target;
    const offset = camera.position.clone().sub(target);
    const distance = offset.length();
    const factor = direction === 'in' ? 0.8 : 1.25;
    const newDistance = Math.max(2.5, Math.min(8, distance * factor));
    offset.normalize().multiplyScalar(newDistance);
    camera.position.copy(target).add(offset);
    controls.update();
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <GlobeScene {...props} controlsRef={controlsRef} />
      </Canvas>

      {/* Zoom controls */}
      <div className="absolute right-2 md:right-4 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2 z-10">
        <button
          onClick={() => handleZoom('in')}
          className="glass w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:glow-primary transition-all"
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="glass w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:glow-primary transition-all"
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
