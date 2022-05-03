import React, { useState } from 'react'; 
import './Homepage.css';
import Image from "../assets/homepage-image.svg";
import QuestionsPage from '../QuestionsPage/QuestionsPage';

export default function Hompage() {

  const [viewingQuestions, setViewingQuesiton] = useState(false);


  if (viewingQuestions) return (<QuestionsPage />)
  return(
        <div id='main-container'>
            <h1 id='website-name'>Quizl</h1>
            <div id='wrapper'>
                <div id='title-container'>
                    <h2 id='first-line'>Test your tech knowledge</h2>
                    <h2 id='second-line'>in five minutes</h2>
                    <button onClick={() => setViewingQuesiton(true)} id='cta-button'>Start the quiz</button>
                </div>
                <div id='image-container'>
                <img id='homepage-image' src={Image} alt=""></img>
                </div>
            </div>
        </div>
        )
}