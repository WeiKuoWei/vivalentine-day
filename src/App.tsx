import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
const phrases = [
  "Are you sure?",
  "Really sure?",
  "Pookie please...",
  "Don't do this to me :(",
  "I'm gonna cry...",
  "You're breaking my heart ;(",
]

// const noGifs = [
//   // "images/cry01.gif",
//   "public/images/cry02.gif",
//   // "images/cry03.gif",
//   // "images/cry04.gif",
//   // "images/cry05.gif",
//   // "images/cry06.gif",
//   // "images/cry07.gif",
// ]

const selfies = [
  "images/hug-you.gif",
  "images/selfies/01.jpg",
  "images/selfies/02.jpg",
  "images/selfies/03.jpg",
  "images/selfies/04.jpg",
  "images/selfies/05.jpg",
  "images/selfies/06.jpg",
  "images/selfies/07.jpg",
  "images/selfies/08.jpg",
  "images/selfies/09.jpg",
  "images/selfies/10.jpg",
  "images/selfies/11.jpg",
  "images/selfies/12.jpg",
  "images/selfies/13.jpg",
  "images/selfies/14.jpg",
  "images/selfies/15.jpg",
  "images/selfies/16.jpg",
  "images/selfies/17.jpg",
  "images/selfies/18.jpg",
  "images/selfies/19.jpg",

  "images/selfies/21.jpg",
  "images/selfies/22.jpg",
  "images/selfies/23.jpg",
  "images/selfies/24.jpg",
  "images/selfies/25.jpg",
  "images/selfies/26.jpg",
  "images/selfies/27.jpg",
  "images/selfies/28.jpg",
  "images/selfies/29.jpg",
  "images/selfies/30.jpg",
  "images/selfies/31.jpg",
  "images/selfies/32.jpg",
  "images/selfies/33.jpg",

  "images/selfies/35.jpg",
  "images/selfies/36.jpg",
  "images/selfies/37.jpg",
  "images/selfies/38.jpg",
  "images/selfies/39.jpg",
  "images/selfies/40.jpg",
]

function App() {  
  // for rendering the selfie
  const [selfieIndex, setSelfieIndex] = useState(0);

  // // Array containing selfie image filenames
  // const selfieFilenames = Array.from({ length: 40 }, (_, i) => `images/selfies/${i + 1}.jpg`);

  
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
    //   window.open("https://google.com", "_blank"); // Replace with the URL you want to open
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
    // setSelfieIndex((prevIndex) => (prevIndex + 1) % selfieFilenames.length);
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
              // src={currentNoGif}
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
