import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../ScorePage/ScorePage.css'
import '../../Components/TimeUp.css'
import Homepage from '../Homepage/Homepage';

import { useState } from 'react';

export default function QuestionsPage({score, reviewQuizAnswers}) {

    const percentage = Math.round(score*100/12);
    const [viewingHomepage, setViewingHomepage] = useState(false);


    if (viewingHomepage) return (<Homepage />)
    return (
        <div id='main-wrapper'>
            <div id='main-container'>
                <h2 id='main-title'>Your score is</h2>
                <div id='circularBar-container'>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                        textColor: "#F2F2F2",
                        pathColor: "#EFAD4B",
                        trailColor: "#F2F2F2",
                    })}/>
                </div>
                <div id='buttons-container'>
                    <button onClick={() => reviewQuizAnswers()} id='finish-quiz-button' className='cta-button'>Review your answers</button>
                    <button onClick={() => setViewingHomepage(true)} id='finish-quiz-button' className='cta-button'>Take the quiz again</button>
                </div>
            </div>
        </div>
    );
}