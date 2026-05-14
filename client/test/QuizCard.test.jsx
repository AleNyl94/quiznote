import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QuizCard } from '../src/components/quizCard/quizCard.jsx'

const mockData = {
  question = 'What is the capital of France?',
  trueAnswer = 'Paris',
  falseAnswer = 'Stockholm'
}


