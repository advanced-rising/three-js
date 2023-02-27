import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Application } from '@splinetool/runtime';
import { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const canvasRef = useRef<any>();

  useEffect(() => {
    if (canvasRef!.current) {
      const app = new Application(canvasRef!.current);
      app.load('https://prod.spline.design/bRllaLJ9l-jXtjYs/scene.splinecode');
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <canvas id={'canvas3d'} ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}
