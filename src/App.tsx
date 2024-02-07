import { useState } from "react";
import { useEffect } from "react";
import { selfies } from "./imagesData.ts";

import "./App.css";
const phrases = [
  "Are you sure?",
  "Really sure?",
  "Pookie please...",
  "Don't do this to me :(",
  "I'm gonna cry...",
  "You're breaking my heart ;(",
]

function App() {  
  // for rendering the selfie
  const [selfieIndex, setSelfieIndex] = useState(0);
  
  // for controlling the state of background music
  const [playBeforeAudio, setPlayBeforeAudio] = useState(true);
  const [playAfterAudio, setPlayAfterAudio] = useState(false);

  // for controlling the no gif
  // const [currentNoGif, setCurrentNoGif] = useState(noGifs[0]);

  // for controlling the size of the yes button
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 20;

  // for controlling the state of the yes button
  const handleYesClick = () => {
    setYesPressed(true);
    setPlayAfterAudio(true);

    // // Open a new tab after 10 seconds
    // setTimeout(() => {
    //   window.open("https://google.com", "_blank"); 
    // }, 10000);
  };

  useEffect(() => {
    const playAudio = async (audioPath:string) => {
      try {
        const audio = new Audio(audioPath);
        await audio.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    if (playBeforeAudio) {
      playAudio("audios/beforeClick.mp3");
      setPlayBeforeAudio(false);
    }

    if (playAfterAudio) {
      playAudio("audios/afterClick.mp3");
      setPlayAfterAudio(false);
    }
  }, [playBeforeAudio, playAfterAudio]);

  function handleNoClick() {
    setNoCount(noCount + 1);
    // setCurrentNoGif(noGifs[noCount % noGifs.length]);
  }

  function getNoButtonText() {
    // return phrases[Math.min(noCount, phrases.length - 1)];
    if (noCount === 0) return "No";
    return phrases[noCount % phrases.length];
  }

  function handleNextSelfie() {
    // Increment the selfie index
    setSelfieIndex((prevIndex) => (prevIndex + 1) % selfies.length);
  }

  return (
    <div className="valentine-container">
      {yesPressed ? (
        <>
          <img
            alt="hug-you"
            // src={selfies[selfieIndex]}
            src={selfies[selfieIndex]}
            style = {{ 
              width: "300px", 
              borderRadius: "10px",
              marginBottom: "20px"
            }}
          />
          <div className="confirmation-text"> Yay!! 
            <div className="additional-text"> 
              I love you bby <span role="img" aria-label="heart">❤️</span>
            </div>
            <div className="additional-text"> 
              Also, happy 300 days my love :)
            </div>
          </div>
          <button 
            onClick={handleNextSelfie}
            style={{marginTop: "30px"}}
          >
          Click Me!!</button>
        </>
      ) : (
        <>
          {/* render will-you image if user hasn't clicked no yet */}
          {noCount === 0 && (
            <img
              alt="will-you"
              src="images/will-you.gif"
              style={{ 
                width: "300px",
                marginBottom: "20px",
              }}
            />
          )}

          {/* render no gif if user has clicked no */}
          {noCount > 0 && (
            <img
              alt={`no-gif-${noCount}`}
              src = "images/cry02.gif"
              style={{ marginTop: "20px" }}
            />
          )}
                  
          <div className="will-you-text"> Will you be me valentine? </div>
          <div
            className="button-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
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
              className="no-button"
              onClick={handleNoClick}
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
