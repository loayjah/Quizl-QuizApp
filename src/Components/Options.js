import './Options.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import _ from 'lodash';


export default function OptionsGrid({optionsClassName, data, chooseAnswer, decodeHTML, isReviewing, appendToQuestionData}) {

        const correctAnswer = data["correct_answer"];
        const options = [correctAnswer, ...data["incorrect_answers"]];
        const optionLetters = ['A', 'B', 'C', 'D'];

        const [checked, setChecked] = useState(0);
	const [shuffledOptions, setShuffledOptions] = useState([]);

        // style for onSelecting an option
        const onSelectStyles = {
                outline: '3px solid #F2F2F2',
                backgroundColor: '#EFAD4B'
        }

        // style for revision page; the correct answer
        const correctAnswerStyle = {
                outline: '3px solid green'
        }

        // style for revision page; the chosen incorrect answer
        const wrongAnswerStyle = {
                outline: '3px solid red'
        }

        // when quesiton data changes
        useEffect(() => {
                // if the opitons are not shuffled yet; shuffle them and add them to data
                if (!('options' in data)) {
                        let shuffled = _.shuffle(options);
                        appendToQuestionData("options", shuffled);
                        setShuffledOptions(shuffled);
                }
                // if they are already shuffled set the option state to the shuffled options
                else if (data) {
                        setChecked(0);
                        setShuffledOptions(data["options"]);
                }

                // if we are in reviewing state; set the check the chosen answer
                if (isReviewing) {
                        if (data.chosen_answer) {
                                setChecked(data?.chosen_answer?.answerLetter);
                        }
                }
        }, [data]);
        

        // the styles for the option box style
        const applyAppropriateBoxStyle = (optionLetter, index) => {
                // if we are in testing mode and we are clicking an option
                if (!isReviewing && checked === optionLetter) {
                        return onSelectStyles;
                }

                // if we are in revision mode
                if (isReviewing) {
                        // do the style for the correct answer
                        if (shuffledOptions[index] === correctAnswer) {
                                return correctAnswerStyle;
                        }
                        // do the style for the chosen incorrect option
                        else if (shuffledOptions[index] === (data.chosen_answer && data?.chosen_answer?.answerText)) {
                                return wrongAnswerStyle;
                        }
                }
        }

        
        const displayingCheckIcon = (optionLetter) => {
                // if in testing page and clicking an option
                if (!isReviewing && checked === optionLetter)
                        return true;
                // if in revision page and the chosen answer is correct
                else if (isReviewing && checked === optionLetter && data.chosen_answer && data?.chosen_answer?.answerText === correctAnswer)
                        return true;
                return false;
        }

        // when clicking an option on testing page
        const onOptionClick = (optionLetter, index) => {
                if (!isReviewing) {
                setChecked(optionLetter);
                chooseAnswer({answerText: shuffledOptions[index], answerLetter: optionLetter})
        }};

        return (
                <div id='options-grid' className={optionsClassName}>
                        {/* map through the option letters and for each set the option box along with the option text */}
                        {optionLetters.map((optionLetter, index) => {
                        return (
                        <div className='option-box' key={optionLetter} style={applyAppropriateBoxStyle(optionLetter, index)}>
                                <input type="radio" className='radio-input' name="options" value={shuffledOptions[index]} onClick={() => onOptionClick(optionLetter, index)}/>
                                <div className='option-number-wrapper'><span className='option-order'>{optionLetter}</span><span className='vertical-line'></span>
                                
                                <span className='option-text'>{decodeHTML(shuffledOptions[index])}
                                { displayingCheckIcon(optionLetter) && 
                                <FontAwesomeIcon id='check-icon' icon={faCircleCheck} />
                                }
                                
                                {/* displaying the x mark in the revision page when the selected option in incorrect */}
                                {isReviewing && (checked === optionLetter) && (data.chosen_answer && data?.chosen_answer.answerText !== correctAnswer) && <FontAwesomeIcon id='check-icon' icon={faCircleXmark} style={{color: 'red'}}/>}</span>
                                </div>
                        </div>)
                    })}

                </div>
        )

}
    