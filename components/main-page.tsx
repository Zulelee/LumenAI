"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  User,
  LogOut,
  Upload,
  Image as ImageIcon,
  Sliders,
  Zap,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-rich-black bg-opacity-30 rounded-full px-6 py-3">
        <div className="text-cyber-blue font-bold text-2xl glow-cyber-blue">
          LumenAI
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-purple to-hot-pink p-0.5"
          >
            <div className="w-full h-full rounded-full bg-rich-black flex items-center justify-center">
              <User className="text-white" />
            </div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-rich-black bg-opacity-90 backdrop-blur-md ring-1 ring-black ring-opacity-5"
              >
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    role="menuitem"
                  >
                    <User className="inline-block mr-2" size={16} />
                    Profile
                  </a>
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    role="menuitem"
                  >
                    <LogOut className="inline-block mr-2" size={16} />
                    Logout
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

// Image Processing Component
const ImageProcessing = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [autoPrompt, setAutoPrompt] = useState(false);
  const [environment, setEnvironment] = useState("Professional Office");
  const [complexity, setComplexity] = useState(50);
  const [imageCount, setImageCount] = useState(1);
  const [rawOutput, setRawOutput] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleProcess = () => {
    setStep(2);
    setIsLoading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        setStep(3);
      }
    }, 500);
  };

  const handleGenerate = () => {
    setStep(4);
    // Implement image generation logic here
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-rich-black bg-opacity-50 backdrop-blur-md rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-cyber-blue glow-cyber-blue">
              Upload Training Images
            </h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed ${
                isDragActive ? "border-cyber-blue" : "border-gray-600"
              } rounded-lg p-8 text-center cursor-pointer transition-colors duration-300`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto text-cyber-blue mb-4" size={48} />
              <p className="text-gray-300">
                Drag & drop 15+ images here, or click to select files
              </p>
            </div>
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {files.map((file) => (
                  <div key={file.name} className="relative">
                    <Image
                      src={file.preview}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                    <button
                      onClick={() => setFiles(files.filter((f) => f !== file))}
                      className="absolute -top-2 -right-2 bg-hot-pink rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleProcess}
              disabled={files.length < 2}
              className="mt-6 w-full bg-gradient-to-r from-electric-purple to-hot-pink text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Process Images
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-rich-black bg-opacity-50 backdrop-blur-md rounded-xl p-8 shadow-2xl flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full border-4 border-cyber-blue border-t-transparent animate-spin mb-4"></div>
            <p className="text-xl font-semibold text-cyber-blue mb-2">
              Training in Progress
            </p>
            <p className="text-gray-400 mb-4">{progress}% Complete</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-rich-black bg-opacity-50 backdrop-blur-md rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-cyber-blue glow-cyber-blue">
              Generate Images
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  rows={3}
                  className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:border-cyber-blue focus:ring focus:ring-cyber-blue focus:ring-opacity-50 text-white"
                  placeholder="Describe your desired image..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="autoPrompt"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="autoPrompt"
                      className="sr-only"
                      checked={autoPrompt}
                      onChange={() => setAutoPrompt(!autoPrompt)}
                    />
                    <div className="w-10 h-6 bg-gray-700 rounded-full shadow-inner"></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                        autoPrompt
                          ? "transform translate-x-4 bg-cyber-blue"
                          : ""
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-300 text-sm">
                    AI-Enhanced Prompting
                  </div>
                </label>
                <div className="ml-2 group relative">
                  <Zap size={16} className="text-cyber-blue cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 hidden group-hover:block whitespace-nowrap">
                    Uses Claude AI for better prompts
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="environment"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Environment Preset
                </label>
                <select
                  id="environment"
                  className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:border-cyber-blue focus:ring focus:ring-cyber-blue focus:ring-opacity-50 text-white"
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                >
                  <option>Professional Office</option>
                  <option>School Environment</option>
                  <option>Conference Room</option>
                  <option>Therapy Setting</option>
                  <option>Training Area</option>
                  <option>Custom Space</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="complexity"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Scene Complexity
                </label>
                <input
                  type="range"
                  id="complexity"
                  min="0"
                  max="3"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>One-on-One</span>
                  <span>Small Group</span>
                  <span>Large Presentation</span>
                  <span>Interactive Workshop</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Number of Images
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setImageCount(num)}
                      className={`w-10 h-10 rounded-full ${
                        imageCount === num
                          ? "bg-cyber-blue text-white"
                          : "bg-gray-700 text-gray-300"
                      } font-semibold transition-colors duration-200`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="rawOutput"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="rawOutput"
                      className="sr-only"
                      checked={rawOutput}
                      onChange={() => setRawOutput(!rawOutput)}
                    />
                    <div className="w-10 h-6 bg-gray-700 rounded-full shadow-inner"></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                        rawOutput ? "transform translate-x-4 bg-cyber-blue" : ""
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-300 text-sm">Raw Output</div>
                </label>
              </div>
              <button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-electric-purple to-hot-pink text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Generate
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-rich-black bg-opacity-90 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-cyber-blue glow-cyber-blue">
                Generated Images
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(imageCount)].map((_, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src="/im2.jpeg"
                      alt={`Generated image ${index + 1}`}
                      width={400}
                      height={400}
                      className="rounded-lg"
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="bg-cyber-blue text-white px-4 py-2 rounded-md mr-2">
                        Download
                      </button>
                      <button className="bg-hot-pink text-white px-4 py-2 rounded-md">
                        Share
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(3)}
                className="mt-6 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Updated Gallery Component
const Gallery = () => {
  const images = [
    "/im1.jpeg",
    "/im2.jpeg",
    "/im3.jpg",
    "/im4.webp",
    "/im5.jpeg",
    "/im6.webp",
    "/im7.avif",
  ];
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAnimation = () => {
      container.scrollTop += 1;
      if (container.scrollTop >= container.scrollHeight / 2) {
        container.scrollTop = 0;
      }
    };

    const animationInterval = setInterval(scrollAnimation, 50);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[600px] overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="grid grid-cols-3 gap-4 animate-scroll">
        {[...images, ...images].map((src, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={200}
              height={200}
              className="rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 h-fit"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button className="bg-cyber-blue text-white px-4 py-2 rounded-md mr-2">
                Download
              </button>
              <button className="bg-hot-pink text-white px-4 py-2 rounded-md">
                Share
              </button>
            </div> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export function MainPageComponent() {
  return (
    <div className="min-h-screen bg-rich-black text-white overflow-hidden">
      <Navbar />

      {/* Colorful circles in the background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-electric-purple opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-blue opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-hot-pink opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5">
            <ImageProcessing />
          </div>
          <div className="lg:w-2/5 mt-8 lg:mt-0">
            {/* <h2 className="text-2xl font-bold mb-4 text-cyber-blue glow-cyber-blue">
              Gallery
            </h2> */}
            <Gallery />
          </div>
        </div>
      </main>
    </div>
  );
}
