import React from 'react'
import './topbar.css'


export const Topbar = (props) => {

    return(
        <>
            <nav className='topbar'>
                <div className='worker'>
                   Email Address: {props.id}
                </div>
            </nav>
            <div className='progressbarContainer'>
                <div className='progressbar'>
                    {   props.currentState < 1 ?
                        <svg className='circle' height="16" width="16">
                            <circle cx="8" cy="8" r="6" stroke="#dddddd" strokeWidth="2" fill="white" />
                        </svg>
                        :
                        ( props.currentState === 1 ?
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="white" />
                            </svg>
                            :
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="#0481FF" />
                            </svg>                            
                        )
                    }
                    {
                        props.currentState <= 1 ?
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#dddddd"/>
                        </svg>
                        :
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#0481FF"/>
                        </svg>
                    }
                    {   props.currentState < 2 ?
                        <svg className='circle' height="16" width="16">
                            <circle cx="8" cy="8" r="6" stroke="#dddddd" strokeWidth="2" fill="white" />
                        </svg>
                        :
                        ( props.currentState === 2 ?
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="white" />
                            </svg>
                            :
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="#0481FF" />
                            </svg>                            
                        )
                    }
                    {
                        props.currentState <= 2 ?
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#dddddd"/>
                        </svg>
                        :
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#0481FF"/>
                        </svg>
                    }
                    {   props.currentState < 3 ?
                        <svg className='circle' height="16" width="16">
                            <circle cx="8" cy="8" r="6" stroke="#dddddd" strokeWidth="2" fill="white" />
                        </svg>
                        :
                        ( props.currentState === 3 ?
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="white" />
                            </svg>
                            :
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="#0481FF" />
                            </svg>                            
                        )
                    }
                    {
                        props.currentState <= 3 ?
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#dddddd"/>
                        </svg>
                        :
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#0481FF"/>
                        </svg>
                    }
                    {   props.currentState < 4 ?
                        <svg className='circle' height="16" width="16">
                            <circle cx="8" cy="8" r="6" stroke="#dddddd" strokeWidth="2" fill="white" />
                        </svg>
                        :
                        ( props.currentState === 4 ?
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="white" />
                            </svg>
                            :
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="#0481FF" />
                            </svg>                            
                        )
                    }
                    {
                        props.currentState <= 4 ?
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#dddddd"/>
                        </svg>
                        :
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#0481FF"/>
                        </svg>
                    }
                    {   props.currentState < 5 ?
                        <svg className='circle' height="16" width="16">
                            <circle cx="8" cy="8" r="6" stroke="#dddddd" strokeWidth="2" fill="white" />
                        </svg>
                        :
                        ( props.currentState === 5 ?
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="white" />
                            </svg>
                            :
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="#0481FF" />
                            </svg>                            
                        )
                    }
                    {
                        props.currentState <= 5 ?
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#dddddd"/>
                        </svg>
                        :
                        <svg height="2" width="100">
                            <rect width="100" height="2" fill="#0481FF"/>
                        </svg>
                    }
                    {   props.currentState < 6 ?
                        <svg className='circle' height="16" width="16">
                            <circle cx="8" cy="8" r="6" stroke="#dddddd" strokeWidth="2" fill="white" />
                        </svg>
                        :
                        ( props.currentState === 6 ?
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="white" />
                            </svg>
                            :
                            <svg className='circle' height="16" width="16">
                                <circle cx="8" cy="8" r="6" stroke="#0481FF" strokeWidth="2" fill="#0481FF" />
                            </svg>                            
                        )
                    }
                </div>
                <div className='progresslabels'>
                    <div className={props.currentState < 1 ?'label': 'selectLabel label'}>
                        Introduction
                    </div>
                    <div className={props.currentState < 2 ?'label': 'selectLabel label'}>
                        Pre-Survey
                    </div>
                    <div className={props.currentState < 3 ?'label': 'selectLabel label'}>
                        Task 1
                    </div>
                    <div className={props.currentState < 4 ?'label': 'selectLabel label'}>
                        Task 2
                    </div>
                    <div className={props.currentState < 5 ?'label': 'selectLabel label'}>
                        Post-Survey
                    </div>
                    <div className={props.currentState < 6 ?'label': 'selectLabel label'}>
                        End
                    </div>
                </div>
            </div>
        </>
    )
}