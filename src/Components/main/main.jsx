import React from 'react'
import './main.css'
import { Context } from '../../context/context'
import { useContext } from 'react'
import { assets } from '../../assets/Asset/assets'
const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,setRecentPrompt,setPrevPrompt,prevPrompt}= useContext(Context);
    const loadPrompt= async(prompt)=>{
      setPrevPrompt([...prevPrompt,prompt])
      setRecentPrompt(prompt)
      await onSent(prompt)
    }

  return (
    <div className='main'>
      <div className="nav">
        <p>ChatVerse <span>AI</span></p>
        <div className="about">
          <p>Developed by <span>Ritesh Bamola</span></p>
        <img src={assets.ritesh} alt="" />

        </div>
      </div>
      <div className="main-content">

        {!showResult ?
        <>
        
        
        <div className="greet">
          <p><span>Hello there</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className="cards">
            <div onClick={()=>loadPrompt("Suggest beautiful places to see on an upcoming road trip")} className="card">
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div onClick={()=>loadPrompt("Briefly summarize this concept : urban planning")}  className="card">
              <p>Briefly summarize this concept : urban planning</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div onClick={()=>loadPrompt("Brainstorm  team bonding activities for our work retreat")}  className="card">
              <p>Brainstorm  team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div onClick={()=>loadPrompt("Improve the readability of the following code")}  className="card">
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>

        </div>
        </>:
        <div className='result'>
          <div className="result-title">

          <img src={assets.ritesh} alt="" />
          <p>{recentPrompt}</p>
          </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          {loading ? 
          <div className='loader'>
              <hr />
              <hr />
              <hr />
          </div> :
          
          <p dangerouslySetInnerHTML={{__html:resultData}}></p>
          }
        </div>
        </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)}value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>onSent()}src={assets.send_icon} alt="" />:null }
            </div>
          </div>
          <p className="bottom-info">
          ChatVerse AI may display inaccurate info , including about people ,so double-check its responses.Your privacy and ChatVerse AI Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
