"use client"

import { useState, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"

// Define the structure of a card
interface Card {
  id: number
  title: string
  content: string
  color: string
}
const baseHue = Math.random() * 360;
// Function to generate an array of cards with random colors
const generateCards = (count: number): Card[] => {
  // const baseHue = Math.random() * 360
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    content: `This is the content of card ${i + 1}`,
    color: `hsl(${(baseHue + i * 60) % 360}, 70%, 80%)`,
  }))
}

export default function Component() {
  // State to store the cards
  const [cards, setCards] = useState(() => generateCards(4))
  // State to track if a card is being dragged
  const [dragging, setDragging] = useState(false)
  // Ref for the container to constrain card movement
  const constraintsRef = useRef(null)
  // State to track which cards are being animated
  const [animatingCards, setAnimatingCards] = useState<number[]>([])

  // Handler for when drag starts
  const handleDragStart = () => {
    setDragging(true)
  }

  // Handler for when drag ends
  const handleDragEnd = useCallback((cardId: number) => {
    setDragging(false)
    setAnimatingCards((prev) => [...prev, cardId])
    
    setTimeout(() => {
      setCards((prevCards) => {
        const cardIndex = prevCards.findIndex((card) => card.id === cardId)
        const updatedCards = [...prevCards]
        const [movedCard] = updatedCards.splice(cardIndex, 1)
        updatedCards.push(movedCard)
        return updatedCards
      })
      
      setTimeout(() => {
        setAnimatingCards((prev) => prev.filter((id) => id !== cardId))
      }, 300) // Adjust this timing to match your transition duration
    }, 0)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div ref={constraintsRef} className="relative w-full max-w-xs aspect-[3/4]">
        <AnimatePresence>
          {cards.map((card, index) => {
            // Motion values for x and y position
            const x = useMotionValue(0)
            const y = useMotionValue(0)
            // Transform x position to rotation
            const rotateZ = useTransform(x, [-200, 0, 200], [-15, 0, 15])

            const isAnimating = animatingCards.includes(card.id)

            return (
              <motion.div
                key={card.id}
                className="absolute inset-0 rounded-2xl shadow-lg p-4 flex flex-col justify-between cursor-grab active:cursor-grabbing"
                style={{
                  backgroundColor: card.color,
                  originX: 0.5,
                  originY: 0.5,
                  x,
                  y,
                  rotateZ,
                }}
                // Initial animation state
                initial={{ scale: 1, rotate: 0, y: 0 }}
                // Animate based on card position in the stack
                animate={{
                  scale: isAnimating ? 1 - (cards.length - 1) * 0.04 : 1 - index * 0.04,
                  rotate: isAnimating ? (cards.length - 1) * 2 : (index === 0 ? 0 : (cards.length - 1 - index) * 2),
                  y: isAnimating ? (cards.length - 1) * -8 : index * -8,
                  zIndex: isAnimating ? 0 : cards.length - index,
                  transition: { duration: 0.3 },
                }}
                // Exit animation
                exit={{ x: 300, opacity: 0 }}
                // Animation settings
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                // Drag properties
                drag
                dragConstraints={constraintsRef}
                onDragStart={handleDragStart}
                onDragEnd={() => handleDragEnd(card.id)}
                whileDrag={{ scale: 1.05, zIndex: cards.length + 1 }}
                dragElastic={0.5}
              >
                <div>
                  <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                  <p className="text-sm text-gray-700">{card.content}</p>
                </div>
                <div className="text-xs text-gray-600">
                  {index + 1} / {cards.length}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}