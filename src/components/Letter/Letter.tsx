import { useDispatch, useSelector } from 'react-redux';
import { boardSelector } from '../../redux/features/board/boardSlice';
import { useEffect } from 'react';
import { boardActions } from '../../redux/features/board';
import './Letter.scss'

interface LetterProps {
  letter_pos: number;
  attempt_val: number;
}

export default function Letter({ ...props }: LetterProps) {
  const board = useSelector(boardSelector.getBoard)
  const curr_attempt = useSelector(boardSelector.getCurrentAttempt)
  const correct_word = useSelector(boardSelector.getCorrectWord)
  const letters = useSelector(boardSelector.getLetters)
  const dispatch = useDispatch()
  const letter = board[props.attempt_val][props.letter_pos]

  const correct = correct_word[props.letter_pos] === letter
  const almost = !correct && letter !== '' && correct_word.includes(letter)
  
  useEffect(() => {
    if (letter !== "") {
      if (!correct && !almost && !letters.disabled.includes(letter)) {
        dispatch(boardActions.setLetters({ disabled: [letter], almost: [], correct: [] }));
      } else if (!correct && almost && !letters.almost.includes(letter) && !letters.correct.includes(letter)) {
        dispatch(boardActions.setLetters({ almost: [letter], disabled: [], correct: [] }));
      } else if (correct && !almost && !letters.correct.includes(letter)) {
        dispatch(boardActions.setLetters({ correct: [letter], almost: [], disabled: [] }));
      }
    }
  }, [curr_attempt.attempt])

  const id = curr_attempt.attempt > props.attempt_val ? (correct ? 'correct' : almost ? 'almost' : 'error') : undefined
  return (
    <div className='letter_container' id={id}>
      {letter}
    </div>
  )
}
