import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const LETTER = `My love,

From the day you walked into my life,
everything felt warmer, brighter, and softer.

You are not just my girlfriend,
you are my safe place, my smile, and my home.

Thank you for your patience,
your kindness, and your heart.

Today is yours, but I’m the lucky one.
Always yours.`;

export default function LetterPage({ onBack }) {
  const audioRef = useRef(null);

  // Just play music, nothing else
  useEffect(() => {
    audioRef.current?.play();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff2f7] flex items-center justify-center">

      <audio ref={audioRef} src="/music/love.mp3" />

      {/* Spiral flowers, NOT synced to music */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: 1100,
              x: [0, 80, -80, 0],   // spiral drift
              rotate: [0, 180, 360],
              opacity: 0.9,
            }}
            transition={{
              duration: 10 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Back button that works */}
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={onBack}
        className="absolute top-6 left-6 bg-white text-pink-600 px-5 py-2 rounded-full shadow-lg border border-pink-200 hover:bg-pink-50 transition z-20"
      >
        ← Back
      </motion.button>

      {/* Love letter card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-2xl bg-[#fff7f2] p-10 rounded-xl shadow-2xl border border-pink-200 z-10"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/paper.png')`,
          fontFamily: "'Dancing Script', cursive",
        }}
      >
        <div className="absolute -top-3 -left-3 bg-pink-300 text-white px-3 py-1 text-xs rounded-full">
          Love Letter
        </div>

        <h2 className="text-3xl text-pink-600 mb-6">A Letter for You 💌</h2>

        <p className="whitespace-pre-line text-gray-700 text-xl leading-relaxed">
          {LETTER}
        </p>

        <div className="mt-6 text-right text-pink-400">
          With love, always 💗
        </div>
      </motion.div>
    </div>
  );
}
