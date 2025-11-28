import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';

export default function AntigravityScene() {
  return (
    <Canvas style={{ height: '100vh', background: '#000' }}>
      <ambientLight intensity={0.5} />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Text fontSize={1} color="cyan" position={[0, 0, 0]}>
          🚀 Agent Hub
        </Text>
      </Float>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
