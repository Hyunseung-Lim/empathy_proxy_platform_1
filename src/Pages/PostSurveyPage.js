import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';
import { firebaseDB } from '../firebase';
import { ref, push, set, get } from "firebase/database";

import './page.css';


export const PostSurveyPage = (props) => {

    // get user id from previous page
    const navigate = useNavigate();
    const location = useLocation();
    const history = window.history;

    const { id } = location.state;

    // prevent back & refresh button
    useEffect(() => {
        const preventGoBack = () => {
            history.pushState(history.state, null, location.href);
        }
        const preventRefresh = (e) => {
            e.preventDefault();
            e.returnValue = "";
        }

        history.pushState(history.state, null, location.href);
        window.addEventListener('popstate', preventGoBack);

        window.addEventListener("beforeunload", preventRefresh);

        return() => {
            window.removeEventListener('popstate', preventGoBack);
            window.removeEventListener('beforeunload', preventRefresh);
        }

    }, [])

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

    const [answer, setAnswer] = useState(Array(10).fill(''));

    function checkAllAnswered (answer) {
        const isAllAnswer = answer[0] !== '' && answer[3] !== '' && answer[4] !== '' && answer[5] !== '' && answer[6] !== '' && answer[7] !== '' && answer[8] !== '' && answer[9] !== ''
        return isAllAnswer;
    }

    const writeUserData = async () => {
        // create a reference to the user's specific location in the database
        const userRef = ref(firebaseDB, 'users/' + id.replace('.', '*'));
        const confirmRef = ref(firebaseDB, 'manage/isConfirmed');
    
        let dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            dataObject[`post_answer_${i < 9 ? '0' + String(i + 1): i + 1}`] = answer[i];
        }
        await push(userRef, dataObject);

        let confirmedBox = [];
        await get(confirmRef).then((snapshot) => {
            if (snapshot.exists()) {
                confirmedBox = snapshot.val();
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userNum = snapshot.val().user_num;
                        confirmedBox[userNum] = 1;
                        set(confirmRef, confirmedBox);
                    }}).catch((error)=>{
                        console.log("No data available");
                });
            }
        }).catch((error)=>{
            console.log("No data available");
        }); 
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
                            <>
                                Rate the following questions.
                            </>
                        }
                    </div>
                    {currentPageNum === 11 ?
                        <div className='questionsContainer'>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>1.</b> If we provide the given statements of perception, cognition, and action to general people, do you think it would help people understand the value of feminist movement?
                                </div>
                                <Multichoice val={answer[0]} setAnswer={(val) => setIthAnswer(0, val)} labels={['Very Not Helpful', 'Not Helpful', 'Neutral', 'Helpful', 'Very Helpful']}/>
                                <div className='extraQuestionContainer'>
                                    <div className='question'>
                                        <b>1-a.</b> (Optional) Why do you think so?
                                    </div>
                                    <input className='shortform' name={1} value={answer[1]} onChange={inputHandler}/>
                                </div>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>2.</b>  (Optional) Feel free to leave any feedbacks regarding our survey.
                                </div>
                                <input className='shortform' name={2} value={answer[2]} onChange={inputHandler}/>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    <b>3.</b> After the completion of this survey, we are planning to conduct <b>online in-depth interviews</b> with participants to further explore their study experiences. Are you interested in participating in these interviews? (For those who express interest, we will announce a recruitment notice, and there will be additional compensation provided for their participation in the interview.)
                                </div>
                                <Multichoice val={answer[3]} setAnswer={(val) => setIthAnswer(3, val)} labels={['Yes', 'No']}/>
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
                                        <Likertchoice val={answer[index + 4]} id={index + 4} setAnswer={(val) => setIthAnswer(index + 4, val)} labels={['Very Low', 'Low', 'Little Low', 'Neutral', 'Little High', 'High', 'Very High']}/>
                                    </div>
                                ))
                            }           
                        </div>
                    }

                    {
                        currentPageNum === 12 &&
                        <div className='explaination'>
                            Please note that once you proceed to the <b>next</b> page, you will not be able to come back to <b>Post-Survey</b> section. 
                            Make sure to carefully review and complete all the answers on this page before proceeding.
                        </div>
                    }

                    <div className='buttonContainer'>
                        {currentPageNum === 11 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 12 ? 
                            ( checkAllAnswered(answer) ?
                                <button onClick={clickLink} className='nextBtn'>Finish</button>
                                :
                                <button className='nextBtn disable'>Finish</button>
                            )
                            :
                            ( checkAllAnswered(answer.slice(0,4)) ?
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