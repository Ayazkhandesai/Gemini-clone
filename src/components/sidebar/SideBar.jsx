import React, { useContext, useState } from 'react'
import "./SideBar.css"
import { assets } from '../../assets/assets'
import { Context_Main } from '../../context/Context'


function SideBar() {
    const [extended, setExtended] = useState(false)
    const { prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showresult,
        loading,
        resultData,
        input,
        setInput,
        newChat } = useContext(Context_Main)

    const callforPrevious = (val) => {
        onSent(val)
    }

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <img className='menu' src={assets.menu_icon} alt="" onClick={() => setExtended(!extended)} />
                <div  onClick={()=>newChat()}className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended &&
                    <div className="recent">
                        <p className="recent-title">
                            Recent
                        </p>
                        {prevPrompts?.map((val, index) => {
                            return (
                                <div onClick={()=>callforPrevious(val)} key={index} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{val.slice(0, 40).toString().concat("...")}</p>
                                </div>
                            )
                        })}

                    </div>
                }
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.send_icon} alt="" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default SideBar
