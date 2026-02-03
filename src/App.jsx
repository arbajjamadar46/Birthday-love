import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LetterPage from "./LetterPage";

const PHOTOS = ["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg"];

export default function App() {
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState("home");
  const audioRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const openMoment = () => {
    audioRef.current?.play();
    setPage("letter");
  };

  if (page === "letter") {
    return <LetterPage onBack={() => setPage("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffd7e6] via-[#ffe6f0] to-[#fff2f7] overflow-hidden relative">
      <audio ref={audioRef} src="/music/love.mp3" />

      {/* Cinematic floating light blobs */}
      <motion.div
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-pink-300 opacity-20 blur-[140px]"
        animate={{ x: [0, 140, -90, 0], y: [0, 90, -70, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-rose-400 opacity-15 blur-[140px]"
        animate={{ x: [0, -140, 90, 0], y: [0, -90, 70, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
      />

      {/* Layer 1: Slow floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-3xl"
            style={{ left: `${Math.random() * 100}%`, bottom: "-15%" }}
            initial={{ y: 0, opacity: 0, scale: 0.6 }}
            animate={{ y: -900, opacity: 0.7, scale: 1.05 }}
            transition={{
              duration: 14 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💞
          </motion.div>
        ))}
      </div>

      {/* Layer 2: Soft floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center p-6">

        {/* Hero Title with depth */}
        <motion.h1
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold text-pink-600 drop-shadow-xl mt-6"
        >
          Happy Birthday, My Love ✨💖
        </motion.h1>

        {/* Subtitle for emotional impact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-lg text-gray-600 max-w-xl"
        >
          A little moment made just for you, filled with love, memories, and magic.
        </motion.p>

        {/* Photo trio with staggered entrance */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.25 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10"
        >
          {PHOTOS.map((src, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.12,
                rotate: i % 2 === 0 ? 3 : -3,
              }}
              className="bg-white p-3 rounded-3xl shadow-2xl border-4 border-pink-400 backdrop-blur"
            >
              <div className="bg-gradient-to-br from-pink-100 to-white p-2 rounded-2xl">
                <img
                  src={src}
                  alt={`memory-${i}`}
                  className="w-64 h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={openMoment}
              className="mt-12 bg-pink-600 text-white px-10 py-3 rounded-full shadow-xl hover:bg-pink-700 transition"
            >
              Open Your Letter 💌
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-12 text-sm text-gray-500"
        >
          Crafted with intention, not chaos 💘
        </motion.div>
      </div>
    </div>
  );
}
