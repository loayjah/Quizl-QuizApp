
import './QuestionsPage.css';
import axios from "axios"
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Options from '../../Components/Options'
import TimeUp from '../../Components/TimeUp';
import Countdown from 'react-countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import ScorePage from '../ScorePage/ScorePage'
import { BarLoader, DoubleBubble } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

export default function QuestionsPage() {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [chosenAnswer, setChosenAnswer] = useState();
    const [score, setScore] = useState(0);
    const [time] = useState(Date.now());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);
 
    var countdownApi = null;

    //const data = {"response_code":0,"results":[{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"How many Hz does the video standard PAL support?","correct_answer":"50","incorrect_answers":["59","60","25"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"On which computer hardware device is the BIOS chip located?","correct_answer":"Motherboard","incorrect_answers":["Hard Disk Drive","Central Processing Unit","Graphics Processing Unit"]},{"category":"Science: Computers","type":"multiple","difficulty":"easy","question":"What does the Prt Sc button do?","correct_answer":"Captures what&#039;s on the screen and copies it to your clipboard","incorrect_answers":["Nothing","Saves a .png file of what&#039;s on the screen in your screenshots folder in photos","Closes all windows"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"What was the first commerically available computer processor?","correct_answer":"Intel 4004","incorrect_answers":["Intel 486SX","TMS 1000","AMD AM386"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"The internet domain .fm is the country-code top-level domain for which Pacific Ocean island nation?","correct_answer":"Micronesia","incorrect_answers":["Fiji","Tuvalu","Marshall Islands"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"Generally, which component of a computer draws the most power?","correct_answer":"Video Card","incorrect_answers":["Hard Drive","Processor","Power Supply"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"In the programming language &quot;Python&quot;, which of these statements would display the string &quot;Hello World&quot; correctly?","correct_answer":"print(&quot;Hello World&quot;)","incorrect_answers":["console.log(&quot;Hello World&quot;)","echo &quot;Hello World&quot;","printf(&quot;Hello World&quot;)"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"In computing terms, typically what does CLI stand for?","correct_answer":"Command Line Interface","incorrect_answers":["Common Language Input","Control Line Interface","Common Language Interface"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"Which of the following is a personal computer made by the Japanese company Fujitsu?","correct_answer":"FM-7","incorrect_answers":["PC-9801","Xmillennium ","MSX"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"What does the International System of Quantities refer 1024 bytes as?","correct_answer":"Kibibyte","incorrect_answers":["Kylobyte","Kilobyte","Kelobyte"]},{"category":"Science: Computers","type":"multiple","difficulty":"medium","question":"Laserjet and inkjet printers are both examples of what type of printer?","correct_answer":"Non-impact printer","incorrect_answers":["Impact printer","Daisywheel printer","Dot matrix printer"]},{"category":"Science: Computers","type":"multiple","difficulty":"hard","question":"According to DeMorgan&#039;s Theorem, the Boolean expression (AB)&#039; is equivalent to:","correct_answer":"A&#039; + B&#039;","incorrect_answers":["A&#039;B + B&#039;A","A&#039;B&#039;","AB&#039; + AB"]}]};

    const setRef = countdown => {
      if (countdown) {
        countdownApi = countdown.getApi();
      }
    };  


    // fetching the data from API. It runs once when the page gets rendered
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              `https://opentdb.com/api.php?amount=12&category=18&type=multiple`
            );
            setData(response.data);
            setError(null);
          } catch (err) {
            setError(err.message);
            setData(null);
          } finally {
            setLoading(false);
          }
        };
        getData();
    }, []);

    // to decode any html special characters such as 	&#8216; to it's character equivalent
    const decodeHTML = (input) => {
      var txt = document.createElement("textarea");
      txt.innerHTML = input;
      return txt.value;
    }

    // append to quesiton data object extra informatino in the key-value pair format
    const appendToQuestionData = (_key, value) => {
      const results = data.results.map((el, index) => index === questionIndex ? {...data.results[questionIndex], [_key] : value} : el);
      const newData = {...data, "results" : results};
      setData(newData);
    }

    // increases the question index to move to the next question
    const increaseQuestionIndexByOne = () => {
      questionIndex+1 < 12 && setQuestionIndex(questionIndex+1);
    }

    // when the question is to be changed
    const changeQuestion = () => {
      // append the current question answer's first
      appendToQuestionData("chosen_answer", chosenAnswer);

      // if the chosen answer is correct increment score by one
      if (chosenAnswer?.answerText === data.results[questionIndex]["correct_answer"]) {
        setScore(score+1);
      }
      increaseQuestionIndexByOne();
      // reset the chosen answer
      setChosenAnswer(undefined);
    }

    // when the test is to be submitted
    const submitQuiz = () => {
      // if we are in testing state: change the question to save current quesiton's data first and then submit
      if (!isReviewing)
        changeQuestion();
      // stop the timer
      countdownApi && countdownApi.stop();
      setIsTimeUp(false);
      // to display score's page
      setIsSubmitting(true);
    }

    // when the "next" or "submit" buttons clicked
    const goNext = () => {
      // if we're finish quiz or finish reviewing quiz
      if (questionIndex+1 >= 12) {
        // to show the score's page
        submitQuiz();
      }
      // if in question page (testing state)
      else if(!isReviewing) {
        // move to the next question
        changeQuestion();
      }
      // if in revision page
      else increaseQuestionIndexByOne();
    }

    // when the review button is clicke in the score page
    const reviewQuizAnswers = () => {
      setQuestionIndex(0);
      setIsTimeUp(false);
      setIsSubmitting(false);
      setIsReviewing(true);
    }

    if (loading) return (
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <DoubleBubble text={"Loading..."} bgColor={"#F2F2F2"} width={"150px"} height={"150px"} center={false} />
      </div>);

    if (isTimeUp) return (<TimeUp submitQuiz={submitQuiz}/>);

    if (isSubmitting) return (<ScorePage score={score} reviewQuizAnswers={reviewQuizAnswers} />);
    return (
        <div id='main-wrapper'>
          <div id='main-container'>
            <div id='upper-container'>
                <h3 id='question-number'>Question {questionIndex+1}: </h3>
                {!isReviewing && <div className='countdown-timer'>
                <FontAwesomeIcon icon={faClock} />
                <Countdown date={time + 300000} renderer={({ formatted }) => (
                <h3>&zwj;{formatted.minutes}:{formatted.seconds}</h3>)}
                    autoStart={true}
                    onComplete={() => setIsTimeUp(true)}
                    ref={setRef}
                    />
                  </div>}
            </div>
            <h2 id='question-text'>{decodeHTML(data?.results[questionIndex]?.question)}</h2>
            <Options optionsClassName='question-options' data={data?.results[questionIndex]} chooseAnswer={(answer) => setChosenAnswer(answer) } decodeHTML={(input) => decodeHTML(input)} isReviewing={isReviewing} appendToQuestionData={appendToQuestionData}/>
            <div id='progressbar-button-wrapper'>
            <ProgressBar className='progress-bar' labelClassName='progressbar-label' baseBgColor='#F2F2F2' bgColor='#EFAD4B' completed={Math.floor((questionIndex)*100/12) || 2} />
            <button id='next-button' disabled={!isReviewing && chosenAnswer === undefined} onClick={goNext}>{questionIndex+1 < 12 ? "Next" : (isReviewing ? "Finish" : "Submit")}</button>
            </div>
          </div>
        </div>);

}