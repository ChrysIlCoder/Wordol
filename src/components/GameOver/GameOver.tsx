import { useDispatch, useSelector } from "react-redux";
import { boardSelector } from "../../redux/features/board/boardSlice";
import "./GameOver.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { boardActions } from "../../redux/features/board";
import getUtils from "../../utils/Utils";

export default function GameOver() {
  const { restartGame } = getUtils()
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);
  const game = useSelector(boardSelector.getGameOver);
  const curr_attempt = useSelector(boardSelector.getCurrentAttempt);
  const correct_word = useSelector(boardSelector.getCorrectWord);
  const dispatch = useDispatch()

  useEffect(() => {
    setIsVisible(true); // Trigger fade-in after initial render
  }, []);

  const close = () => {
    setIsVisible(false)
    setTimeout(() => {
      dispatch(boardActions.setGameOver({ gameOver: false, guessed: true }))
    }, 1000)
  }

  const replay = () => {
    setIsVisible(false)
    setTimeout(() => {
      restartGame()
    }, 1000) 
  }

  return (
    <CSSTransition
      in={isVisible}
      timeout={750}
      classNames={"fade"}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="gameover_container"
        ref={nodeRef}
      >
        <div className="gameover_container__content">
          <FontAwesomeIcon
            icon={faClose}
            className="gameover_container__content__close"
            onClick={close}
            size="xl"
          />
          <img src="/wordle-icon.svg" alt="wordle icon" />
          <span className="gameover_container__content__phrase">
            {game.guessed
              ? "Yay! You guessed the word"
              : "Uh oh! It seems that you didn't guess the word..."}
          </span>
          <button
            onClick={replay}
            className="gameover_container__content__play"
          >
            Play Again
          </button>
          <span className="gameover_container__content__results">
            {game.guessed
              ? `${curr_attempt.attempt}/6 attempts | Wordle: ${correct_word}`
              : `Wordle: ${correct_word}`}
          </span>
        </div>
      </div>
    </CSSTransition>
  );
}
