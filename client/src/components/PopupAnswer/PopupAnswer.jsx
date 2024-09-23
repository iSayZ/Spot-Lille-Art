import PropTypes from "prop-types";
import "./PopupAnswer.css";

function PopupAnswer({
  title,
  content,
  choiceOne,
  roleOne,
  choiceTwo,
  roleTwo,
}) {
  return (
    <div className="popup-answer">
      <div className="popup-answer-container">
        <div className="popup-answer-content">
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        {(choiceOne || choiceTwo) && (
          <div className="popup-answer-choice">
            {choiceOne && (
              <button
                type="button"
                className="popup-answer-btn yes btn"
                onClick={roleOne}
              >
                {choiceOne}
              </button>
            )}
            {choiceTwo && (
              <button
                type="button"
                className="popup-answer-btn no btn"
                onClick={roleTwo}
              >
                {choiceTwo}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

PopupAnswer.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  choiceOne: PropTypes.string,
  roleOne: PropTypes.func,
  choiceTwo: PropTypes.string,
  roleTwo: PropTypes.func,
};

PopupAnswer.defaultProps = {
  choiceOne: "",
  roleOne: () => {},
  choiceTwo: "",
  roleTwo: () => {},
};

export default PopupAnswer;
