import React, { useContext } from 'react'
import "./main.css"
import { assets } from '../../assets/assets'
import { Context_Main } from '../../context/Context'

function Main() {
  const { prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showresult,
    loading,
    resultData,
    input,
    setInput } = useContext(Context_Main)

    const handleKey=(e)=>{
      if(e.key==="Enter"){
        onSent()
      }
    }
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini </p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showresult ?
          <>
            <div className="greet">
              <p><span>Hello, Ayaz</span></p>
              <p>How can i help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest a beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly Summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activities for our work retreat </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the Readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div> </>
          : <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? <div className='loader'>
                <hr />
                <hr />
                <hr />
              </div> :
                (resultData ? (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                ) : (
                  <p>{resultData}</p>
                ))
              }


            </div>
          </div>

        }
        <div className="main-bottom">
          <div className="searchbox">
            <input onKeyUp={(e)=>{ handleKey(e)}} onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={(e)=>{onSent()}} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may provide inaccurate info, including about people, so double-check its response,Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
