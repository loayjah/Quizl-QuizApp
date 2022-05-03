import '../Pages/QuestionsPage/QuestionsPage.css';
import './TimeUp.css'
import ClockImage from '../Pages/assets/time.svg'

export default function TimeUp({submitQuiz}) {

    return (
        <div id='main-wrapper'>
            <div id='main-container'>
            <h2 id='main-title'>Time is up!</h2>
            <img id='timeup-image' alt='clock image to indicate the end of time' src={ClockImage} />
            <button id='finish-quiz-button' onClick={() => submitQuiz()}>Finish the quiz</button>
            </div>
        </div>
        );

}