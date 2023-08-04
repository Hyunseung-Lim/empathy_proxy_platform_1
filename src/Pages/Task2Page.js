import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';
import { firebaseDB } from '../firebase';
import { ref, push, get } from "firebase/database";

import feminist_sample_1 from '../Data/Study1/sample_feminist_200(1).json';
import feminist_sample_2 from '../Data/Study1/sample_feminist_200(2).json';
import feminist_sample_3 from '../Data/Study1/sample_feminist_200(3).json';
import feminist_sample_4 from '../Data/Study1/sample_feminist_200(4).json';
import feminist_sample_5 from '../Data/Study1/sample_feminist_200(5).json';
import feminist_sample_6 from '../Data/Study1/sample_feminist_200(6).json';
import feminist_sample_7 from '../Data/Study1/sample_feminist_200(7).json';
import feminist_sample_8 from '../Data/Study1/sample_feminist_200(8).json';

import './page.css';


export const Task2Page = (props) => {

    // get user id from previous page
    const navigate = useNavigate();
    const location = useLocation();
    const history = window.history;

    const { id } = location.state;
    const [tweetData, setTweetData] = useState([]);

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
        getUserNum();

        return() => {
            window.removeEventListener('popstate', preventGoBack);
            window.removeEventListener('beforeunload', preventRefresh);
        }

    }, [])

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(9);
    const [answer, setAnswer] = useState([]);

    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => 
            item[0] !== '' && item[1] !== '' && item[2] !== '' && item[3] !== '' && item[4] !== ''
        );
        return isAllAnswer;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    const getUserNum = async () => {
        const userRef = ref(firebaseDB, 'users/' + id);
        await get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userNum = snapshot.val().user_num;
                if(userNum % 8 === 0) {
                    setTweetData(shuffleArray(feminist_sample_1));
                    setAnswer(Array(feminist_sample_1.length).fill(['', '']));
                }
                else if (userNum % 8 === 1) {
                    setTweetData(shuffleArray(feminist_sample_2));
                    setAnswer(Array(feminist_sample_2.length).fill(['', '']));
                }
                else if (userNum % 8 === 2) {
                    setTweetData(shuffleArray(feminist_sample_3));
                    setAnswer(Array(feminist_sample_3.length).fill(['', '']));
                }
                else if (userNum % 8 === 3) {
                    setTweetData(shuffleArray(feminist_sample_4));
                    setAnswer(Array(feminist_sample_4.length).fill(['', '']));
                }
                else if (userNum % 8 === 4) {
                    setTweetData(shuffleArray(feminist_sample_5));
                    setAnswer(Array(feminist_sample_5.length).fill(['', '']));
                }
                else if (userNum % 8 === 5) {
                    setTweetData(shuffleArray(feminist_sample_6));
                    setAnswer(Array(feminist_sample_5.length).fill(['', '']));
                }
                else if (userNum % 8 === 6) {
                    setTweetData(shuffleArray(feminist_sample_7));
                    setAnswer(Array(feminist_sample_7.length).fill(['', '']));
                }
                else {
                    setTweetData(shuffleArray(feminist_sample_8));
                    setAnswer(Array(feminist_sample_8.length).fill(['', '']));
                }
            } else {
                console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
        });
    }

    const writeUserData = async () => {
        // create a reference to the user's specific location in the database
        const userRef = ref(firebaseDB, 'users/' + id);
    
        const dataObject = {};
        for (let i = 0; i < answer.length; i++) {
            const tweetId = tweetData[i]['ID'].toString().padStart(4, '0');
            dataObject[`task2_answer_${tweetId}`] = answer[i];
        }
        await push(userRef, dataObject);
    }

    const clickLink = async () => {
        await writeUserData();
        navigate('/post', { state: { id } });
    }

    const inputHandler = (e) => {
        e.preventDefault();
        setIthAnswer(Number(e.target.name), Number(e.target.id), e.target.value);
    }


    function setIthAnswer (i, j, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = [...newAnswer[i]];
            newAnswer[i][j] = val;
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
            <Topbar id={id} currentState={4}/>
            <div className='page'>
                <div className='survey'>
                    {currentPageNum === 9 ?
                        <>
                            <div className='explaination'>
                            In <b>task2</b>, you will be rating the opinion alignment of each cognitive information processing step generated by the large language model(LLM) as if they were seen tweets.
                            The LLM generates three key steps in cognitive information processing: <b>perception</b>, <b>cognition</b>, and <b>action</b>.
                            Your task is to assess the opinion alignment of these steps in relation to the given context. 
                            Please carefully read the instructions below to complete the ratings.
                            </div>
                            <div className='explainBox'>
                                <b>Definition for each cognitive information processing steps:</b>
                                <br/>
                                <b> • &nbsp;Perception:</b> process of extracting relevant information, perceiving tone, and sentiment. 
                                <br/>
                                <b> • &nbsp;Cognition:</b> process to understand and interpret its meaning (e.g., analysis, evaluation)
                                <br/>
                                <b> • &nbsp;Action:</b> formulate response or reply to corresponding tweet 
                            </div>
                            <div className='explaination'>
                                For each cognitive information processing step (perception, cognition, and action), please rate the <b>opinion alignment</b> based on the given context.
                                This assessment will help us examine the alignment between LLM’s cognitive reasoning and your own perspectives.
                            </div>
                        </>
                    : 
                        <>
                            <div className='explaination'>
                            On a scale of 1 to 5, rate the level of agreement with the statement: 
                            <b>“The given statements of perception/cognition/action accurately reflect the opinion of the group who support feminist movement.”</b>
                            </div>
                            <div className='explainBox'>
                                <b>Definition for each cognitive information processing steps:</b>
                                <br/>
                                <b> • &nbsp;Perception:</b> process of extracting relevant information, perceiving tone, and sentiment. 
                                <br/>
                                <b> • &nbsp;Cognition:</b> process to understand and interpret its meaning (e.g., analysis, evaluation)
                                <br/>
                                <b> • &nbsp;Action:</b> formulate response or reply to corresponding tweet 
                            </div>
                            <div className='questionsContainer'>
                                {
                                    tweetData.map((data, index) => (
                                        <div className='questionBox' key={index}>
                                            <div className='question tweet'>
                                                <b>{index + 1}. Tweet: "</b><i>{data.Tweet}</i><b>"</b>
                                            </div>
                                            <div className='extraQuestionContainer'>
                                                <div style={{color: "#888888"}}><i>* "The person" = "People who support the feminist movement"</i></div>
                                                <div className='question'>
                                                    <b>{index + 1}-a. Perception:</b> {data.perception}
                                                </div>
                                                <Likertchoice key={data.Tweet + 1} val={answer[index][0]} id={index * 7 + 1} setAnswer={(val) => setIthAnswer(index, 0, val)} labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}/>
                                                <div className='question'>
                                                    <b>{index + 1}-b. Cognition:</b> {data.cognition}
                                                </div>
                                                <Likertchoice key={data.Tweet + 2} val={answer[index][1]} id={index * 7 + 2} setAnswer={(val) => setIthAnswer(index, 1, val)} labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}/>
                                                <div className='question'>
                                                    <b>{index + 1}-c. Action:</b> <i>"{data.action}"</i>
                                                </div>
                                                <Likertchoice key={data.Tweet + 3} val={answer[index][2]} id={index * 7 + 3} setAnswer={(val) => setIthAnswer(index, 2, val)} labels={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}/>
                                                <div className='divider'/>
                                                <br/>
                                                <div className='question'>
                                                    <b>{index + 1}-d.</b> How believable do you find the above perception, cognition, and action?
                                                </div>
                                                <Likertchoice key={data.Tweet + 4} val={answer[index][3]} id={index * 7 + 4} setAnswer={(val) => setIthAnswer(index, 3, val)} labels={['Strongly Not Believable', 'Not Believable', 'Neutral', 'Believable', 'Strongly Belivable']}/>
                                                <div className='question'>
                                                    <b>{index + 1}-e.</b> How well does the above perception, cognition, and action represent the  perspectives of people who support feminist?
                                                </div>
                                                <Likertchoice key={data.Tweet + 5} val={answer[index][4]} id={index * 7 + 5} setAnswer={(val) => setIthAnswer(index, 4, val)} labels={['Strongly Not Representative', 'Not Representative', 'Neutral', 'Representative', 'Strongly Representative']}/>
                                                <div className='question'>
                                                    <b>{index + 1}-e*.</b> (Optional) Why do you think it’s well represented or not?
                                                </div>
                                                LLM Related: <input className='shortform' name={index} id={5} value={answer[index][5]} onChange={inputHandler}></input>
                                                Content Related: <input className='shortform' name={index} id={6} value={answer[index][6]} onChange={inputHandler}></input>
                                                 
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }    

                    {
                        currentPageNum === 10 &&
                        <div className='explaination'>
                            Please note that once you proceed to the <b>next</b> page, you will not be able to come back to <b>Task 2</b> section. 
                            Make sure to carefully review and complete all the answers on this page before proceeding.
                        </div>
                    }

                    <div className='buttonContainer'>
                        {currentPageNum === 9 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 10 ? 
                            ( checkAllAnswered(answer) ?
                                <button onClick={clickLink} className='nextBtn'>Next</button>
                                :
                                <button className='nextBtn disable'>Next</button>
                            )    
                            : <button className='nextBtn' onClick={next}>Next</button>}
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}