import { useDispatch, useSelector } from "react-redux";
import "./NotificationBox.scss";
import { modalSelector } from "../../redux/features/modal/modalSlice";
import { useEffect, useRef, useState } from "react";
import { modalActions } from "../../redux/features/modal";
import { CSSTransition } from "react-transition-group";

export default function NotificationBox() {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef(null);
  const modals = useSelector(modalSelector.getModals);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true);
    if (modals.not_box_message.exp_time !== undefined) {
      const removeNotBox = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          dispatch(modalActions.setNotBoxMessage({ message: "", exp_time: 0 }));
        }, 750)
      }, modals.not_box_message.exp_time);

      return () => clearTimeout(removeNotBox);
    }
  }, [modals.not_box_message]);

  return (
    <CSSTransition
      in={isVisible}
      timeout={750}
      classNames={"fade"}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} className="notification_box_container">
        <span className="notification_box_container__message">
          {modals.not_box_message.message}
        </span>
      </div>
    </CSSTransition>
  );
}
