"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LandingPageComponent() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-rich-black text-white overflow-hidden">
      {/* Particle effect background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-rich-black bg-opacity-30 rounded-full px-6 py-3">
          <div className="text-cyber-blue font-bold text-2xl glow-cyber-blue">
            LumenAI
          </div>
          <div className="hidden md:flex space-x-6">
            {["Features", "Pricing", "Gallery", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-cyber-blue transition-colors duration-300 hover:glow-cyber-blue"
              >
                {item}
              </a>
            ))}
          </div>
          <button
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-electric-purple to-hot-pink text-white font-semibold hover:shadow-glow-pink transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              router.push("/login");
            }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Animated orb */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-electric-purple via-cyber-blue to-hot-pink opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            translateY: scrollY * -0.2,
          }}
        />

        {/* Light trails */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full border-4 border-electric-purple opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ translateY: scrollY * -0.1 }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border-4 border-cyber-blue opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ translateY: scrollY * -0.15 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full border-4 border-hot-pink opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ translateY: scrollY * -0.2 }}
        />

        {/* Hero content */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-electric-purple via-cyber-blue to-hot-pink text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Create Beyond Imagination
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl mb-4 text-cyber-blue glow-cyber-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Train. Generate. Transform.
        </motion.h2>
        <motion.p
          className="text-xl mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your personal AI-powered image generation studio
        </motion.p>
        <Button
          className="px-8 py-4 rounded-xl h-12 bg-gradient-to-r from-electric-purple to-hot-pink text-white font-bold text-lg hover:shadow-glow-pink transition-all duration-300 transform hover:scale-105"
          onClick={() => {
            router.push("/login");
          }}
        >
          Start Creating
        </Button>
      </main>

      {/* Light beam accents */}
      <div className="fixed bottom-0 left-0 w-1/3 h-96 bg-gradient-to-t from-electric-purple to-transparent opacity-10 transform -skew-x-12" />
      <div className="fixed bottom-0 right-0 w-1/3 h-96 bg-gradient-to-t from-hot-pink to-transparent opacity-10 transform skew-x-12" />

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent to-rich-black opacity-50" />
    </div>
  );
}
