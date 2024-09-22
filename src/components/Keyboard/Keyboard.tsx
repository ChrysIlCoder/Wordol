import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import KeyboardKey from "./KeyboardKey/KeyboardKey";
import { useCallback, useEffect, useRef, useState } from "react";
import getUtils from "../../utils/Utils";
import { useSelector } from "react-redux";
import { boardSelector } from "../../redux/features/board/boardSlice";
import "./Keyboard.scss";
import { CSSTransition } from "react-transition-group";

export default function Keyboard() {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);
  const curr_attempt = useSelector(boardSelector.getCurrentAttempt);
  const letters = useSelector(boardSelector.getLetters);
  const game = useSelector(boardSelector.getGameOver);
  const { onEnter, onDelete, onSelectLetter } = getUtils();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onEnter();
      } else if (e.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (e.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
        });
        keys2.forEach((key) => {
          if (e.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
        });
        keys3.forEach((key) => {
          if (e.key.toLowerCase() === key.toLowerCase()) onSelectLetter(key);
        });
      }
    },
    [curr_attempt]
  );

  useEffect(() => {
    if (!game.gameOver) {
      document.addEventListener("keydown", handleKeyboard);
    }
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard, game]);

  return (
    <CSSTransition
      in={isVisible}
      timeout={750}
      classNames={"fade"}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        style={{ pointerEvents: game.gameOver ? "none" : undefined }}
        className="keyboard_container"
        onKeyDown={(e: any) => handleKeyboard(e)}
        ref={nodeRef}
      >
        <div className="keyboard_container__line">
          {keys1.map((key, index) => (
            <KeyboardKey
              disabled={letters.disabled.includes(key)}
              almost={letters.almost.includes(key) && !letters.correct.includes(key)}
              correct={letters.correct.includes(key)}
              key={index}
              key_val={key}
            />
          ))}
        </div>
        <div className="keyboard_container__line">
          {keys2.map((key, index) => (
            <KeyboardKey
              disabled={letters.disabled.includes(key)}
              almost={letters.almost.includes(key) && !letters.correct.includes(key)}
              correct={letters.correct.includes(key)}
              key={index}
              key_val={key}
            />
          ))}
        </div>
        <div className="keyboard_container__line">
          <KeyboardKey key_val="ENTER" big_key />
          {keys3.map((key, index) => (
            <KeyboardKey
              disabled={letters.disabled.includes(key)}
              almost={letters.almost.includes(key) && !letters.correct.includes(key)}
              correct={letters.correct.includes(key)}
              key={index}
              key_val={key}
            />
          ))}
          <KeyboardKey key_val="DELETE" icon={faDeleteLeft} big_key />
        </div>
      </div>
    </CSSTransition>
  );
}
