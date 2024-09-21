import { CSSTransition } from "react-transition-group";
import Letter from "../Letter/Letter";
import "./Board.scss";
import { useState, useEffect, useRef } from "react";

export default function Board() {
  const nodeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const numLetters = 5;
  const numAttempts = 6;

  useEffect(() => {
    setIsVisible(true); // Trigger fade-in after initial render
  }, []);

  return (
    <CSSTransition
      in={isVisible}
      timeout={750}
      classNames={"fade"}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="board_container">
        {isVisible &&
          Array.from({ length: numAttempts }).map((_, attemptIndex) =>
            Array.from({ length: numLetters }).map((_, letterIndex) => (
              <Letter
                key={`${attemptIndex}-${letterIndex}`}
                letter_pos={letterIndex}
                attempt_val={attemptIndex}
              />
            ))
          )}
      </div>
    </CSSTransition>
  );
}
