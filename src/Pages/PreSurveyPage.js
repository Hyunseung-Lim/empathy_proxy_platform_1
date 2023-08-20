import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Multichoice } from '../Components/Multichoice/Multichoice';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';
import { firebaseDB } from '../firebase';
import { ref, push, set, get } from "firebase/database";
import './page.css';


export const PreSurveyPage = (props) => {

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

    const [answer, setAnswer] = useState(Array(5).fill(''));

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => item !== '');
        return isAllAnswer;
    }

    const writeUserData = async () => {

        // const userTotalRef = ref(firebaseDB, 'users/');
        const userRef = ref(firebaseDB, 'users/' + id.replace('.', '*'));
        const dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            dataObject[`pre_answer_${i < 10 ? '0' + String(i + 1): i + 1}`] = answer[i];
        }
        const pointerRef = ref(firebaseDB, 'manage/pointer');
        let updatePointer = 0;

        await get(pointerRef).then((snapshot) => {
            if (snapshot.exists()) {
                updatePointer = snapshot.val() ;
                const confirmRef = ref(firebaseDB, 'manage/isConfirmed');
                let confirmedBox = [];

                get(confirmRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        confirmedBox = snapshot.val();
                        while (true) {
                            if (updatePointer >= 40) {
                                updatePointer = 0;
                                const isAllConfirmed = confirmedBox.every(val => val === 1);
                                if(isAllConfirmed) {
                                    updatePointer += 1;
                                    set(confirmRef, new Array(40).fill(0));
                                    set(pointerRef, updatePointer);
                                    break;
                                }
                            }
                            if (confirmedBox[updatePointer] === 1) {
                                updatePointer += 1;
                            }
                            if (confirmedBox[updatePointer] === 0) {
                                updatePointer += 1;
                                set(pointerRef, updatePointer);
                                break;
                            }
                        }
                    }
                    set(userRef, {user_num: updatePointer-1, user_name: id});
                    push(userRef, dataObject);
                }).catch((error)=>{
                    console.log("No data available");
                }); 
            } else {
                console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
        });
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
        setCurrentPageNum(currentPageNum - 1);
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
                            <>Please tell us a bit about yourself.</>
                        }
                    </div>
                    {currentPageNum === 5 ?
                        <div className='questionsContainer'>
                            <div className='questionBox'>
                                <div className='question'>
                                    1. Do you support <b>feminist movement</b>?
                                </div>
                                <Multichoice val={answer[0]} setAnswer={(val) => setIthAnswer(0, val)} labels={['Yes', 'No']} content={null}/>
                            </div>
                        </div>
                        :
                        <div className='questionsContainer'>
                             <div className='questionBox'>
                                <div className='question'>
                                    1. What gender do you identify as?
                                </div>
                                <Multichoice val={answer[1]} setAnswer={(val) => setIthAnswer(1, val)} labels={['Male', 'Female', 'Non-binary', 'Prefer not to say']} content={null}/>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    2. What is your age?
                                </div>
                                <Multichoice val={answer[2]} setAnswer={(val) => setIthAnswer(2, val)} labels={['Under 18', '18 - 30 years old', '30 - 45 years old', '45+','Prefer not to say']} content={null}/>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    3. What is your ethnicity?
                                </div>
                                <Multichoice val={answer[3]} setAnswer={(val) => setIthAnswer(3, val)} labels={['White', 'Hispanic/Latino', 'Black/African American', 'Asian', 'American Indian', 'Other', 'Prefer not to say']} content={null}/>
                            </div>
                            <div className='questionBox'>
                                <div className='question'>
                                    4. What is the highest degree or level of education you have completed?
                                </div>
                                <Multichoice val={answer[4]} setAnswer={(val) => setIthAnswer(4, val)} labels={['Less than a high school', 'High school degree', "Bachelor's degree", "Master's degree", 'Doctorate', 'Other', 'Prefer not to say']} content={null}/>
                            </div>
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
                            (   checkAllAnswered(answer.slice(0,1)) ?
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