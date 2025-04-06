import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import '../styles/PointCloudViewer.css';

// Separate component for the point cloud
const PointCloud = ({ points }) => {
  // Use useMemo to create the geometry only when points change
  const geometry = useMemo(() => {
    if (!points || points.length === 0) return null;
    
    // Create buffer geometry
    const geometry = new THREE.BufferGeometry();
    
    // Convert points to Float32Array
    const vertices = new Float32Array(points.flat());
    
    // Add position attribute to geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    return geometry;
  }, [points]);
  
  if (!geometry) return null;
  
  return (
    <points>
      <pointsMaterial size={0.01} color="#3498db" sizeAttenuation />
      <primitive object={geometry} />
    </points>
  );
};

const PointCloudViewer = ({ pointCloud }) => {
  if (!pointCloud || pointCloud.length === 0) {
    return <div className="no-pointcloud">No point cloud data available</div>;
  }
  
  return (
    <div className="point-cloud-viewer">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PointCloud points={pointCloud} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <axesHelper args={[1]} />
      </Canvas>
    </div>
  );
};

export default PointCloudViewer;
