import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getUtils from "../../../utils/Utils";
import "./KeyboardKey.scss";

interface IKeyProps {
  key_val: string;
  icon?: IconProp;
  big_key?: boolean;
  disabled?: boolean;
  almost?: boolean;
  correct?: boolean;
}

export default function KeyboardKey({ ...props }: IKeyProps) {
  const { onSelectLetter, onDelete, onEnter } = getUtils();

  const selectLetter = () => {
    if (props.key_val === "ENTER") {
      onEnter();
    } else if (props.key_val === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(props.key_val);
    }
  };

  return (
    <div
      className="key_container"
      id={props.big_key ? "big" : props.disabled ? "disabled" : props.almost ? "almost" : props.correct ? "correct" : undefined}
      onClick={selectLetter}
    >
      {!props.icon ? props.key_val : <FontAwesomeIcon icon={props.icon} />}
    </div>
  );
}
