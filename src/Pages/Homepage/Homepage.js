import React from 'react'; 
import './Homepage.css';
import Image from "../assets/homepage-image.svg";

function Hompage() { 

  return(
        <div id='main-container'>
            <h1 id='website-name'>Quizl</h1>
            <div id='wrapper'>
            <div id='title-container'>
                <h2 id='first-line'>Test your tech knowledge</h2>
                <h2 id='second-line'>in five minutes</h2>
                <button id='cta-button'>Start the quiz</button>
            </div>
            <div id='image-container'>
            <img id='homepage-image' src={Image} alt=""></img>
            </div>
            </div>

        </div>
        )
};

export default Hompage;  