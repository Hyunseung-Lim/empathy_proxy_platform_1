import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';
import { firebaseDB } from '../firebase';
import { ref, push } from "firebase/database";
import './page.css';


export const PreSurveyPage = (props) => {

    // get user id from previous page
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(5);
 
    const questions = [
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

    const [answer, setAnswer] = useState(Array(12).fill(''));

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => item !== '');
        return isAllAnswer;
    }

    const writeUserData = async () => {
        // create a reference to the user's specific location in the database
        const userRef = ref(firebaseDB, 'users/' + id);
    
        const dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            dataObject[`pre_answer_${i < 10 ? '0' + String(i + 1): i + 1}`] = answer[i];
        }
        await push(userRef, dataObject);
    }

    const clickLink = async () => {
        await writeUserData();
        navigate('/task1', { state: { id } });
    }

    const inputHandler = (e) => {
        e.preventDefault();
        setIthAnswer(1, e.target.value);
    }

    function setIthAnswer (i, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = val;
            return newAnswer;
        });
    }

    function prev () {
        setCurrentPageNum(currentPageNum- 1);
    }

    function next () {
        setCurrentPageNum(currentPageNum + 1);
    }

    return(
        <>
            <Topbar id={id} currentState={2}/>
            <div className='page'>
                <div className='survey'>
                    <div className='explaination'>
                        {currentPageNum === 5 ?
                            <>Before the study, please answer the following questions.</>
                            :
                            <>
                                Read each statement and check a number that best reflects the degree to which a particular statement relates (or does not relate) to you.
                                <br/><b>(4-point Likert scale; 1-Strongly disagree, 2-Disagree, 3-Agree, 4-Strongly agree)</b>
                            </>
                        }
                    </div>
                    {currentPageNum === 5 ?
                        <div className='questionsContainer'>
                            <div className='questionBox'>
                                <div className='question'>
                                    1. Do you consider yourself to be a 
                                </div>
                                <Multichoice val={answer[0]} setAnswer={(val) => setIthAnswer(0, val)} labels={['strong feminist', 'feminist', 'not a feminist', 'anti-feminist', 'no opinion']} content={null}/>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    2. Why do you consider yourself to be a (answer in first question)?
                                </div>
                                <input className='shortform' value={answer[1]} onChange={inputHandler}/>
                            </div>
                        </div>
                        :
                        <div className='questionsContainer'>
                            {
                                questions.map((question, index) => (
                                    <div className= 'questionBox' key={question}>
                                        <div className='question'>
                                            {index+1}. {question}
                                        </div>
                                        <Likertchoice val={answer[index + 2]} id={index + 2} setAnswer={(val) => setIthAnswer(index + 2, val)} labels={['Strongly disagree', 'Disagree', 'Agree', 'Strongly agree']} content={null}/>
                                    </div>
                                ))
                            }           
                        </div>
                    }

                    {
                        currentPageNum === 6 &&
                        <div className='explaination'>
                            Please note that once you proceed to the <b>next</b> page, you will not be able to come back to <b>Pre-Survey</b> section. 
                            Make sure to carefully review and complete all the answers on this page before proceeding.
                        </div>
                    }

                    <div className='buttonContainer'>
                        {currentPageNum === 5 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 6 ? 
                            ( checkAllAnswered(answer) ?
                                <button onClick={clickLink} className='nextBtn'>Next</button>
                                :
                                <button className='nextBtn disable'>Next</button>
                            )
                            :
                            (   checkAllAnswered(answer.slice(0,2)) ?
                                <button className='nextBtn' onClick={next}>Next</button>
                            :
                                <button className='nextBtn disable'>Next</button>
                            )
                        }
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}