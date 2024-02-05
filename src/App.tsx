import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Pookie please",
  "Don't do this to me",
  "I'm gonna cry...",
  "You're breaking my heart ;(",
]
function App() {
  // for controlling the state of background music
  const [playBeforeAudio, setPlayBeforeAudio] = useState(true);
  const [playAfterAudio, setPlayAfterAudio] = useState(false);

  const handleYesClick = () => {
    setYesPressed(true);
    setPlayAfterAudio(true);
  };

  useEffect(() => {
    if (playBeforeAudio) {
      const beforeAudio = new Audio("audios/beforeClick.mp3");
      beforeAudio.play();
      setPlayBeforeAudio(false);
    }

    if (playAfterAudio) {
      const afterAudio = new Audio("audios/afterClick.mp3");
      afterAudio.play();
      setPlayAfterAudio(false);
    }
  }, [playBeforeAudio, playAfterAudio]);

  // for controlling the size of the yes button
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  return (
    <div className="valentine-container">
      {
        yesPressed ? (
          <>
            <img
              alt = "hug-you" // Add alt text
              src = "images/hug-you.gif" // Add image source
            />
            <div className = "confirmation-text"> Yay!! </div>
          </>
        ) : (
          <>
            <img
              alt = "will-you" // Add alt text here
              src = "images/will-you.gif" // Add image source here
            />

            <div className = "will-you-text"> Will you be me valentine? </div>
            <div
              className="button-container"
              style={{
                display: "flex",
                justifyContent: "space-between", // Adjust the alignment
                marginTop: "20px",  // Add margin at the top
              }}
            >
              <button
                className="yes-button"
                style={{
                  fontSize: yesButtonSize,
                }}
                onClick={() => {
                  handleYesClick();
                  setYesPressed(true);
                }}
              >
                Yes
              </button>
              <button
                className="noButton"
                onClick={handleNoClick}
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
