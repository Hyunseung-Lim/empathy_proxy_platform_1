import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';
import { firebaseDB } from '../firebase';
import { ref, push } from "firebase/database";

import './page.css';


export const PostSurveyPage = (props) => {

    // get user id from previous page
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(11);

    const questions_qcae = [
        'I can easily tell if someone else wants to enter a conversation.',
        'I can pick up quickly if someone says one thing but means another.',
        'I am good at predicting how someone will feel.',
        'I am quick to spot when someone in a group is feeling awkward or uncomfortable.',
        'Other people tell me I am good at understanding how they are feeling and what they are thinking.',
        'I can easily tell if someone else is interested or bored with what I am saying',
        'I can sense if I am intruding, even if the other person does not tell me.',
        'I can easily work out what another person might want to talk about.',
        'I can tell if someone is masking their true emotion.',
        'I am good at predicting what someone will do.'
    ];

    const questions = [
        'How mentally demanding was the task?',
        'How physically demanding was the task?',
        'How hurried or rushed was the pace of the task?',
        'How successful were you in accomplishing what you were asked to do?',
        'How hard did you have to work to accomplish your level of performance?',
        'How insecure, discouraged, irritated, stressed, and annoyed were you?'
    ];

    const [answer, setAnswer] = useState(Array(20).fill(''));

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => item !== '');
        return isAllAnswer;
    }

    const writeUserData = async () => {
        // create a reference to the user's specific location in the database
        const userRef = ref(firebaseDB, 'users/' + id);
    
        const dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            dataObject[`post_answer_${i < 9 ? '0' + String(i + 1): i + 1}`] = answer[i];
        }
        await push(userRef, dataObject);
    }

    const clickLink = async () => {
        await writeUserData();
        navigate('/end', { state: { id } });
    }

    function setIthAnswer (i, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = val;
            return newAnswer;
        });
    }

    const inputHandler = (e) => {
        e.preventDefault();
        setIthAnswer(Number(e.target.name), e.target.value);
    }

    function prev () {
        setCurrentPageNum(currentPageNum- 1);
    }

    function next () {
        setCurrentPageNum(currentPageNum + 1);
    }

    return(
        <>
            <Topbar id={id} currentState={5}/>
            <div className='page'>
                <div className='survey'>
                <div className='explaination'>
                        {currentPageNum === 11 ?
                            <>
                                This is the post-survey about previous <b>Task 2</b>.
                                We would like to gather more detailed information about your experience with the task.
                                Please take a moment to answer the following questions.
                            </>
                            :
                            (currentPageNum === 12 ?
                                <>
                                    Read each statement and check a number that best reflects the degree to which a particular statement relates (or does not relate) to you.
                                    <br/><b>(4-point Likert scale; 1-Strongly disagree, 2-Disagree, 3-Agree, 4-Strongly agree)</b>
                                </>
                                :
                                <>
                                    Rate the following questions. (7-point Likert scale; 1-Very Low, 7-Very High)
                                </>

                                
                            )
                        }
                    </div>
                    {currentPageNum === 11 ?
                        <div className='questionsContainer'>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>1.</b> Do you think the given statements of <i>perception, cognition, and action</i> reflected your core <b>values</b> toward the 'Feminist Movement' in general?
                                </div>
                                <Multichoice val={answer[0]} setAnswer={(val) => setIthAnswer(0, val)} labels={['Not Strongly Reflected', 'Not Reflected', 'Reflected', 'Strongly Reflected']}/>
                                <div className='extraQuestionContainer'>
                                    <div className='question'>
                                        <b>1-a.</b> At what point did you think it reflected or not reflected your value?
                                    </div>
                                    <input className='shortform' name={1} value={answer[1]} onChange={inputHandler}/>
                                </div>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>2.</b> Do you think the given statements of <i>perception, cognition, and action</i> serve as a proxy that <b>empathizes</b> with your perspective? 
                                </div>
                                <Multichoice val={answer[2]} setAnswer={(val) => setIthAnswer(2, val)} labels={['Not Strongly Empathized', 'Not Empathized', 'Empathized', 'Strongly Empathized']}/>
                                <div className='extraQuestionContainer'>
                                    <div className='question'>
                                        <b>2-a.</b> At what point did you think it empathized or not empathized with your perspective?
                                    </div>
                                    <input className='shortform' name={3} value={answer[3]} onChange={inputHandler}/>
                                </div>
                            </div>
                        </div>
                        :
                        ( currentPageNum === 12 ?
                            <div className='questionsContainer'>
                                {
                                    questions_qcae.map((question, index) => (
                                        <div className= 'questionBox' key={question}>
                                            <div className='question'>
                                                {index+1}. {question}
                                            </div>
                                            <Likertchoice val={answer[index + 4]} id={index + 4} setAnswer={(val) => setIthAnswer(index + 4, val)} labels={['Strongly disagree', 'Disagree', 'Agree', 'Strongly Agree']} content={null}/>
                                        </div>
                                    ))
                                }           
                            </div>
                            :
                            <div className='questionsContainer'>
                                {
                                    questions.map((question, index) => (
                                        <div className= 'questionBox' key={question}>
                                            <div className='question'>
                                                {index+1}. {question}
                                            </div>
                                            <Likertchoice val={answer[index + 14]} id={index + 14} setAnswer={(val) => setIthAnswer(index + 14, val)} labels={['Very Low', 'Low', 'Little Low', 'Neutral', 'Little High', 'High', 'Very High']}/>
                                        </div>
                                    ))
                                }           
                            </div>
                        )
                    }

                    {
                        currentPageNum === 13 &&
                        <div className='explaination'>
                            Please note that once you proceed to the <b>next</b> page, you will not be able to come back to <b>Post-Survey</b> section. 
                            Make sure to carefully review and complete all the answers on this page before proceeding.
                        </div>
                    }

                    <div className='buttonContainer'>
                        {currentPageNum === 11 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 13 ? 
                            ( checkAllAnswered(answer) ?
                                <button onClick={clickLink} className='nextBtn'>Finish</button>
                                :
                                <button className='nextBtn disable'>Finish</button>
                            )
                            : (currentPageNum === 12 ? 
                                ( checkAllAnswered(answer.slice(0,14)) ?
                                    <button className='nextBtn' onClick={next}>Next</button>
                                    :
                                    <button className='nextBtn disable'>Next</button>
                                )
                                :
                                ( checkAllAnswered(answer.slice(0,4)) ?
                                    <button className='nextBtn' onClick={next}>Next</button>
                                    :
                                    <button className='nextBtn disable'>Next</button>
                                )                            
                            )

                        }
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}