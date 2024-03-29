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
    setPlayBeforeAudio(false);

    // // Open a new tab after 10 seconds
    // setTimeout(() => {
    //   window.open("https://google.com", "_blank"); 
    // }, 10000);
  };

  useEffect(() => {
    const audioBefore = new Audio("audios/beforeClick.mp3");
    const audioAfter = new Audio("audios/afterClick.mp3");
  
    // audioBefore.preload = "auto";
    // audioAfter.preload = "auto";

    // // HERE TO BE FIXED; right now cannot stop the audio once it starts playing
    // if (playBeforeAudio) {
    //   // play before audio
    //   audioBefore.play();
    //   // playAudio("audios/beforeClick.mp3");
    //   setPlayBeforeAudio(false);
    // }

    if (playAfterAudio) {
      // pause before audio if it's playing
      audioBefore.pause();
      audioBefore.onpause = () => {
        // After the audio has been paused, reset its currentTime to 0
        audioBefore.currentTime = 0;
      }

      // play after audio
      audioAfter.play();
      // playAudio("audios/afterClick.mp3");
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
          <a href="https://www.moonpig.com/us/ecard/?key=c2hhcmUvZXUtd2VzdC0xLzEybS9iZGM4OGMxZjMwMjhkNjU3OWMyODlmZmNkMDAyNGRlNjRjMTMwYjM3MGE2YWI0MGZiNmNiYWU4MDY1NzBjMTJk&noapp=true&utm_source=Sailthru&utm_medium=email&utm_campaign=mpgECardDelivery_US_EN">
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
          </a>
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
            style={{marginTop: "30px", color: "white"}}
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
              style={{ fontSize: yesButtonSize }}
              onClick={() => { handleYesClick(); }}
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
