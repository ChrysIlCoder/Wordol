import { useDispatch } from "react-redux";
import "./StartScreen.scss";
import { format } from "date-fns";
import { modalActions } from "../../redux/features/modal";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function StartScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true); // Trigger fade-in after initial render
  }, []);

  const play = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(modalActions.setStartScreen(false));
    }, 1000);
  };

  return (
    <div className="startscreen_container">
      <CSSTransition
        in={isVisible}
        timeout={750}
        classNames={"fade"}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="startscreen_container__content">
          <div className="startscreen_container__content__top">
            <img
              className="startscreen_container__content__top__img"
              src="/wordle-icon.svg"
              alt="wordle icon"
            />
            <span className="startscreen_container__content__top__worlde">
              Wordle
            </span>
          </div>
          <div className="startscreen_container__content__center">
            <h1 className="startscreen_container__content__center__title">
              Hola!
            </h1>
            <p className="startscreen_container__content__center__desc">
              This is a copy of the original{" "}
              <a
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
              >
                "The New York Times - Wordle"
              </a>{" "}
              game made in React
            </p>
            <button
              className="startscreen_container__content__center__play"
              onClick={play}
            >
              Play
            </button>
          </div>
          <div className="startscreen_container__content__bottom">
            <span>{format(new Date(), "MMMM dd, yyyy")}</span>
            <a
              href="https://github.com/ChrysIlCoder"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Github
            </a>
            <span>Made by Christian Boffa</span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
