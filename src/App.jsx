
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const PHOTOS = ['/photos/1.jpg','/photos/2.jpg','/photos/3.jpg']

const LETTER = `My love,

From the day you walked into my life,
everything felt warmer, brighter, and softer.

You are not just my girlfriend,
you are my safe place, my smile, and my home.

Thank you for your patience,
your kindness, and your heart.

Today is yours, but I’m the lucky one.
Always yours.`

export default function App() {
  const [showSurprise, setShowSurprise] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowSurprise(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-100 text-center p-6 overflow-hidden">
      <audio ref={audioRef} src="/music/love.mp3" />

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{ left: `${Math.random() * 100}%`, bottom: '-10%' }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -900, opacity: 1 }}
            transition={{ duration: 6, delay: i * 0.3, repeat: Infinity }}
          >
            💗
          </motion.div>
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-pink-600 drop-shadow-md mt-6"
      >
        Happy Birthday, My Love 💖
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        {PHOTOS.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-3 rounded-2xl shadow-lg border-4 border-pink-400"
          >
            <img
              src={src}
              alt={`memory-${i}`}
              className="w-56 h-56 object-cover rounded-xl"
            />
          </motion.div>
        ))}
      </motion.div>

      {showSurprise && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="mt-8 flex gap-4"
        >
          <button
            onClick={() => { playMusic(); setShowLetter(true); }}
            className="bg-pink-500 text-white px-7 py-3 rounded-full shadow-lg hover:bg-pink-600 transition"
          >
            Play Music & Read Letter 💌
          </button>
        </motion.div>
      )}

      {showLetter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 bg-white/70 backdrop-blur p-6 rounded-2xl shadow-md max-w-2xl whitespace-pre-line text-gray-700"
        >
          {LETTER}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-10 text-sm text-gray-500"
      >
        Made with love by you 💘
      </motion.div>
    </div>
  )
}
