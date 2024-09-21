import "./App.css";
import { useEffect, useState } from "react";
import getUtils from "./utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "./redux/features/board";
import Board from "./components/Board/Board";
import Keyboard from "./components/Keyboard/Keyboard";
import PageLayout from "./components/Layouts/PageLayout/PageLayout";
import { boardSelector } from "./redux/features/board/boardSlice";
import GameOver from "./components/GameOver/GameOver";
import { modalSelector } from "./redux/features/modal/modalSlice";
import NotificationBox from "./components/NotificationBox/NotificationBox";
import StartScreen from "./components/StartScreen/StartScreen";
import RotatedScreen from "./components/RotatedScreen/RotatedScreen";

export default function App() {
  const [rotatedScreen, setRotatedScreen] = useState(false)
  const { generateWordSet } = getUtils();

  const game = useSelector(boardSelector.getGameOver);
  const modals = useSelector(modalSelector.getModals);
  const dispatch = useDispatch();

  useEffect(() => {
    generateWordSet().then((words) => {
      const wordArray = Array.from(words.wordSet);
      dispatch(boardActions.setWordSet(wordArray));
      dispatch(boardActions.setCorrectWord(words.todaysWord));
    });
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      if (screen.orientation.angle > 0) {
        setRotatedScreen(true);
      } else {
        setRotatedScreen(false);
      }
    };
    window.addEventListener('orientationchange', handleOrientationChange);
    handleOrientationChange();
  
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [])

  return (
    <PageLayout>
      {rotatedScreen ? (
        <RotatedScreen />
      ) : modals.startscreen ? (
        <StartScreen />
      ) : !game.gameOver ? (
        <>
          {modals.not_box_message.message !== "" && <NotificationBox />}
          <Board />
          <Keyboard />
        </>
      ) : <GameOver />}
    </PageLayout>
  );
}
