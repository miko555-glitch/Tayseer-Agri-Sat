import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls, Float, Environment, ContactShadows } from '@react-three/drei';
import { Moon, Sun, Droplet, Sprout, Activity, Cpu, Leaf, MessageSquare, Satellite, Radio, Zap, ShieldCheck } from 'lucide-react';
import * as THREE from 'three';

// This component creates the floating "Liquid Glass / Shader" blob in the background
const LiquidBlob = ({ color, isDark }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          envMapIntensity={isDark ? 0.8 : 2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={3}
          transmission={0.8}
          thickness={1.5}
        />
      </mesh>
    </Float>
  );
};

const GlassCard = ({ children, delay, colorScheme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-3xl p-8
        backdrop-blur-xl bg-white/10 dark:bg-black/20
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]
        dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        group
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      {children}
    </motion.div>
  );
};

const Header = ({ theme, setTheme, division, setDivision }) => {
  const isAgri = division === 'agrisat';
  const primaryColor = isAgri ? 'text-blue-500' : 'text-purple-500';
  
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col md:flex-row justify-between items-center py-6 px-4 md:px-8 max-w-7xl mx-auto w-full z-50 relative"
    >
      {/* Dynamic Logo based on Identity */}
      <div className="flex items-center gap-3 mb-6 md:mb-0">
        <div className={`p-2 rounded-xl backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/20`}>
          <Satellite size={32} className={primaryColor} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Tay<span className={primaryColor}>see</span>r
          </h1>
          <span className="text-xs font-medium tracking-widest uppercase opacity-60">
            {isAgri ? 'Agri-SaT Farms' : 'Lavender Life'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 bg-white/10 dark:bg-black/20 backdrop-blur-lg p-2 rounded-full border border-white/20">
        {/* Division Toggle */}
        <div className="flex rounded-full overflow-hidden bg-black/5 dark:bg-white/5 p-1">
          <button
            onClick={() => setDivision('agrisat')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              isAgri 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            المزارع (AgriSaT)
          </button>
          <button
            onClick={() => setDivision('lavender')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              !isAgri 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            الطبي (Lavender)
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
        </button>
      </div>
    </motion.header>
  );
};

const AgriSatContent = () => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto px-4 py-12"
  >
    <div className="text-center mb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400"
      >
        Complex Tech. Simple Decisions.
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto"
      >
        إطار عمل متكامل يدمج بين صور الأقمار الصناعية ومستشعرات الحافة والذكاء الاصطناعي لتحويل البيانات الزراعية المعقدة إلى قرارات ميدانية بسيطة.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <GlassCard delay={0.1} colorScheme="from-blue-500 to-cyan-500">
        <Activity className="text-blue-500 mb-6" size={40} />
        <h3 className="text-2xl font-bold mb-4">Field-Ready Visuals</h3>
        <p className="opacity-70 leading-relaxed">
          نحول الخرائط المعقدة إلى خرائط حرارية بسيطة (NDVI & NDWI) مصممة لاتخاذ القرارات في الحقل مباشرة وليس للمهندسين فقط.
        </p>
      </GlassCard>

      <GlassCard delay={0.2} colorScheme="from-blue-500 to-cyan-500">
        <MessageSquare className="text-blue-500 mb-6" size={40} />
        <h3 className="text-2xl font-bold mb-4">Works Fully Offline</h3>
        <p className="opacity-70 leading-relaxed">
          مساعد الذكاء الاصطناعي (Mini-Tayseer Chat) مزود بالمعرفة الزراعية ويعمل بكفاءة تامة بدون الحاجة للاتصال بالإنترنت.
        </p>
      </GlassCard>

      <GlassCard delay={0.3} colorScheme="from-blue-500 to-cyan-500">
        <Cpu className="text-blue-500 mb-6" size={40} />
        <h3 className="text-2xl font-bold mb-4">Sensorless Hardware</h3>
        <p className="opacity-70 leading-relaxed">
          أجهزة (CM-60) منخفضة التكلفة لمراقبة صحة التربة والآلات، ترسل تنبيهات استباقية فورية عبر WhatsApp.
        </p>
      </GlassCard>
    </div>

    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {[
        { value: "3,500+", label: "Feddans Monitored" },
        { value: "6", label: "Awards & Recognitions" },
        { value: "100%", label: "Data Automation" },
        { value: "0", label: "Dashboards Needed" }
      ].map((stat, i) => (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          key={i} 
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-blue-500/20"
        >
          <div className="text-4xl font-black text-blue-500 mb-2">{stat.value}</div>
          <div className="text-sm font-medium opacity-70 uppercase tracking-wider">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const LavenderContent = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto px-4 py-12"
  >
    <div className="text-center mb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
      >
        From Space to the Still.
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto"
      >
        الهندسة العكسية لجودة الزيوت العطرية للافندر (Linalool). نتتبع اللحظة المثالية للحصاد من الفضاء لمنع تعفن الجذور وزيادة الجودة.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <GlassCard delay={0.1} colorScheme="from-purple-500 to-pink-500">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-purple-500/20 rounded-2xl">
            <Radio className="text-purple-500" size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">1. Space Monitoring</h3>
            <p className="opacity-70 leading-relaxed">
              تتتبع الأقمار الصناعية رطوبة المظلة النباتية (NDWI) كل 10 أيام. تتحول الخريطة إلى اللون البنفسجي عندما يصل النبات إلى نقطة الإجهاد المائي المعتدل، وهي اللحظة المثالية للحصاد.
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard delay={0.2} colorScheme="from-purple-500 to-pink-500">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-pink-500/20 rounded-2xl">
            <ShieldCheck className="text-pink-500" size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">2. Ground Protection</h3>
            <p className="opacity-70 leading-relaxed">
              متحكمات (CM-60) على صمامات التنقيط تكتشف انخفاض الضغط أو الانسداد، وتوقف المياه تلقائياً لتجنب تعفن الجذور الحساسة (Root Rot Risk).
            </p>
          </div>
        </div>
      </GlassCard>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <GlassCard delay={0.3} colorScheme="from-purple-500 to-pink-500">
        <Droplet className="text-purple-400 mb-4" size={32} />
        <h4 className="text-xl font-bold mb-2">The 33% Sweet Spot</h4>
        <p className="opacity-70 text-sm">
          أثبتت الأبحاث أن العجز المائي بنسبة 33% يحفز النبات لفرز أعلى نسبة من زيت Linalool كآلية دفاعية.
        </p>
      </GlassCard>
      
      <GlassCard delay={0.4} colorScheme="from-purple-500 to-pink-500">
        <Zap className="text-purple-400 mb-4" size={32} />
        <h4 className="text-xl font-bold mb-2">+47% EO Yield</h4>
        <p className="opacity-70 text-sm">
          تطبيق النقطة المثالية (Sweet Spot) يرفع من إنتاجية الزيوت العطرية الصيدلانية بنسبة تصل إلى 47٪.
        </p>
      </GlassCard>

      <GlassCard delay={0.5} colorScheme="from-purple-500 to-pink-500">
        <Sprout className="text-purple-400 mb-4" size={32} />
        <h4 className="text-xl font-bold mb-2">Virtual Moisture</h4>
        <p className="opacity-70 text-sm">
          نستخدم حساسات افتراضية مدمجة عبر الذكاء الاصطناعي دون الحاجة لدفن معدات مكلفة في التربة.
        </p>
      </GlassCard>
    </div>
  </motion.div>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [division, setDivision] = useState('agrisat'); // 'agrisat' or 'lavender'

  // Update document classes for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const isAgri = division === 'agrisat';
  const blobColor = isAgri ? '#3b82f6' : '#8b5cf6'; // Blue vs Purple
  const ambientLightColor = isAgri ? '#e0f2fe' : '#f3e8ff';

  return (
    <div 
      className={`relative min-h-screen transition-colors duration-700 ease-in-out font-sans overflow-hidden
        ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'}
      `}
      dir="ltr"
    >
      {/* Background 3D Shader/Liquid Glass Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 dark:to-black/60 z-10" />
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={theme === 'dark' ? 0.5 : 1} color={ambientLightColor} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} color={blobColor} />
          
          <Suspense fallback={null}>
            <LiquidBlob color={blobColor} isDark={theme === 'dark'} />
            <Environment preset={theme === 'dark' ? 'night' : 'city'} />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Suspense>
        </Canvas>
      </div>

      {/* Background Dynamic Glow */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 pointer-events-none transition-colors duration-1000 z-0
          ${isAgri ? 'bg-blue-600' : 'bg-purple-600'}
        `}
      />

      {/* Main UI Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header theme={theme} setTheme={setTheme} division={division} setDivision={setDivision} />
        
        <main className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            {division === 'agrisat' ? (
              <AgriSatContent key="agrisat" />
            ) : (
              <LavenderContent key="lavender" />
            )}
          </AnimatePresence>
        </main>

        <footer className="text-center py-8 opacity-60 text-sm">
          <p>© 2026 Tayseer AgriSaT. All rights reserved.</p>
          <p className="mt-1 flex items-center justify-center gap-2">
            <Leaf size={14} /> Rooted in Egypt. Connected to Space.
          </p>
        </footer>
      </div>
    </div>
  );
}

