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
