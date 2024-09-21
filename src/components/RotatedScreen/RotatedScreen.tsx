import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RotatedScreen.scss";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function RotatedScreen() {
  return (
    <div className="rotated_screen_container">
      <FontAwesomeIcon
        icon={faRotateLeft}
        className="rotated_screen_container__icon"
        size="3x"
      />
      <div className="rotated_screen_container__text">
        <span className="rotated_screen_container__text__uhoh">
          Oh. We can't fit the game in here
        </span>
        <span className="rotated_screen_container__text__rotate">Rotate to play</span>
      </div>
    </div>
  );
}
