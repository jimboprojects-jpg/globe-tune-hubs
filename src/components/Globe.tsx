import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { RadioStation } from '@/data/radioStations';

interface GlobeProps {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onStationClick: (station: RadioStation) => void;
}

// Convert lat/long to 3D position on sphere
const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
};

interface StationMarkerProps {
  station: RadioStation;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

const StationMarker = ({ station, isActive, isPlaying, onClick }: StationMarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => 
    latLongToVector3(station.latitude, station.longitude, 2.05), 
    [station.latitude, station.longitude]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isActive 
        ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
        : hovered 
          ? 1.3 
          : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color={isActive && isPlaying ? '#f59e0b' : '#14b8a6'}
          emissive={isActive && isPlaying ? '#f59e0b' : '#14b8a6'}
          emissiveIntensity={isActive ? 2 : hovered ? 1.5 : 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Outer glow ring */}
      <mesh>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshBasicMaterial
          color={isActive && isPlaying ? '#f59e0b' : '#14b8a6'}
          transparent
          opacity={isActive ? 0.6 : hovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[0, 0.1, 0]}
          center
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="glass px-3 py-2 rounded-lg text-xs">
            <div className="font-medium text-foreground">{station.name}</div>
            <div className="text-muted-foreground text-[10px]">{station.city}, {station.country}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

const GlobeCore = ({ stations, currentStation, isPlaying, onStationClick }: GlobeProps) => {
  const globeRef = useRef<THREE.Group>(null);

  // Auto-rotate the globe slightly
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  // Zoom to station when clicked
  const handleStationClick = (station: RadioStation) => {
    const targetPosition = latLongToVector3(station.latitude, station.longitude, 4);
    // Simple animation could be added here
    onStationClick(station);
  };

  // Create ocean gradient texture
  const oceanTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some noise/texture
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
      ctx.fillRect(x, y, 1, 1);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} />
      
      {/* Main light */}
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      
      {/* Rim light for dramatic effect */}
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#14b8a6" />
      
      {/* Globe */}
      <group ref={globeRef}>
        {/* Main sphere */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            map={oceanTexture}
            roughness={0.8}
            metalness={0.1}
          />
        </Sphere>
        
        {/* Atmosphere glow */}
        <Sphere args={[2.1, 64, 64]}>
          <meshBasicMaterial
            color="#14b8a6"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Grid lines */}
        <Sphere args={[2.01, 32, 32]}>
          <meshBasicMaterial
            color="#334155"
            wireframe
            transparent
            opacity={0.15}
          />
        </Sphere>
        
        {/* Station markers */}
        {stations.map((station) => (
          <StationMarker
            key={station.id}
            station={station}
            isActive={currentStation?.id === station.id}
            isPlaying={isPlaying}
            onClick={() => handleStationClick(station)}
          />
        ))}
      </group>
      
      {/* Stars background */}
      {Array.from({ length: 200 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 15 + Math.random() * 10;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.5 + Math.random() * 0.5} />
          </mesh>
        );
      })}
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        autoRotate={false}
      />
    </>
  );
};

export const Globe = (props: GlobeProps) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <GlobeCore {...props} />
      </Canvas>
    </div>
  );
};
