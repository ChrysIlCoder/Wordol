import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../redux/features/board";
import { boardSelector } from "../redux/features/board/boardSlice";
import wordleBank from "./wordle-bank-english.txt";
import { modalActions } from "../redux/features/modal";

export default function getUtils() {
  const board = useSelector(boardSelector.getBoard);
  const curr_attempt = useSelector(boardSelector.getCurrentAttempt);
  const word_set = useSelector(boardSelector.getWordSet);
  const correct_word = useSelector(boardSelector.getCorrectWord);
  const dispatch = useDispatch();

  const onSelectLetter = (key_val: string) => {
    if (curr_attempt.letter_pos > 4) return
    const new_board = board.map((row) => [...row]);
    new_board[curr_attempt.attempt][curr_attempt.letter_pos] = key_val;
    dispatch(boardActions.setBoard(new_board));
    dispatch(
      boardActions.setCurrentAttempt({
        ...curr_attempt,
        letter_pos: curr_attempt.letter_pos + 1
      })
    );
  };

  const onDelete = () => {
    if (curr_attempt.letter_pos === 0) return;
    const new_board = board.map((row) => [...row]);
    new_board[curr_attempt.attempt][curr_attempt.letter_pos - 1] = "";
    dispatch(boardActions.setBoard(new_board));
    dispatch(
      boardActions.setCurrentAttempt({
        ...curr_attempt,
        letter_pos: curr_attempt.letter_pos - 1
      })
    );
  };

  const onEnter = () => {
    if (curr_attempt.letter_pos !== 5) {
      dispatch(modalActions.setNotBoxMessage({ message: 'Not enough letters', exp_time: 1500 }))
      return
    };

    let curr_word = "";
    for (let i = 0; i < 5; i++) {
      curr_word += board[curr_attempt.attempt][i];
    }

    const words = new Set(word_set)    

    if (words.has(curr_word)) {
      dispatch(
        boardActions.setCurrentAttempt({
          attempt: curr_attempt.attempt + 1,
          letter_pos: 0
        })
      );
    } else {
      dispatch(modalActions.setNotBoxMessage({ message: 'Not in word list', exp_time: 1500 }))
    }

    if (curr_word === correct_word) {
      dispatch(modalActions.setNotBoxMessage({ message: correct_word, exp_time: 3750 }))
      setTimeout(() => {
        dispatch(boardActions.setGameOver({ gameOver: true, guessed: true }))
      }, 3750)
      return
    }
    if (curr_attempt.attempt === 5 && words.has(curr_word)) {
      dispatch(modalActions.setNotBoxMessage({ message: correct_word, exp_time: 3750 }))
      setTimeout(() => {
        dispatch(boardActions.setGameOver({ gameOver: true, guessed: false }))
      }, 3750)
      return
    }
  };

  const generateWordSet = async () => {
    let wordSet: any;
    let todaysWord: any;

    await fetch(wordleBank)
      .then((res: Response) => res.text())
      .then((result: any) => {
        const wordArray = result.split(" ");
        for (let word in wordArray) {
          wordArray[word] = wordArray[word].toUpperCase()
        }
        todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)]
        console.log(todaysWord, wordArray)
        wordSet = new Set(wordArray);
      });

    return { wordSet, todaysWord };
  };

  const restartGame = () => {
    generateWordSet().then((words) => {
      const wordArray = Array.from(words.wordSet);
      dispatch(boardActions.setWordSet(wordArray));
      dispatch(boardActions.setCorrectWord(words.todaysWord));
    });
    dispatch(boardActions.reset())
    dispatch(modalActions.setNotBoxMessage({ message: '', exp_time: 0 }))
  }

  return { onSelectLetter, onDelete, onEnter, generateWordSet, restartGame };
}
