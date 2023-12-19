import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import useClipboard from "react-use-clipboard";
import { FaStopCircle } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { BsEmojiWink } from "react-icons/bs";
import { MdNotStarted } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const [text, setText] = useState();
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration:1000
});

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support Voice recognition.</span>;
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
          <div className='col-md-3'>
          </div>  
          <div className='col-md-6'>

            <h2 className='text-center'>Voice To Text Converter</h2>
            <p className='text-justify'> Your Words, Instantly Typed! Elevate your productivity with our cutting-edge Voice-to-Text Converter. Effortless communication, seamless transcription. Turn your thoughts into text effortlessly. Precision and speed in every spoken word. Your voice, our technology—making typing a thing of the past!</p>
            <div className='typing-con shadow-lg rounded mt-5 p-3'>

                <div className='text-con p-2' style={{height:"250px" }}>
                  {transcript}
                </div>
              
                <div className='d-flex mt-2 justify-content-between'>

                  <Button variant="success" onClick={startListening}> <MdNotStarted /> Start Listening</Button>
                  <Button variant="success" onClick={setCopied} onMouseOver={() => setText(transcript)}>
                    {isCopied ? " Copied" : " Copy To Clipboard"}
                  </Button>
                  <Button variant="success" onClick={SpeechRecognition.stopListening}><FaStopCircle /> Stop Listening</Button>
                </div>
            </div>
          </div>
          <div className='col-md-3'>
          </div>
      </div>
        
    </div>
  )
}

export default App