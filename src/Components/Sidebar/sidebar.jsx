import React, { useContext, useState } from 'react'
import './sidebar.css'
import {assets} from '../../assets/Asset/assets';
import { Context } from '../../context/context';
const Sidebar = () => {
   const [extended,setExtended]=useState(false)
   const {onSent,prevPrompt,setRecentPrompt,newchat}=useContext(Context)
  const loadPrompt= async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className='sidebar'>
      <div className="top">
        <img  onClick={()=>{
          setExtended(prev=>!prev)
        }}className='menu' src={assets.menu_icon} alt="" />
        <div onClick={()=>newchat()} className="newchat">
          <img src={assets.plus_icon} alt="" />
          {extended ?<p>New Chat</p>:null}
        </div>
        {extended?
        <div className="recent">
          <p className='recent-title'>Recents</p>
          {prevPrompt.map((item,index)=>{
            return(
          <div onClick={()=>loadPrompt(item)} className="recent-entry">
            <img src={assets.message_icon} alt="" />
            <p>{item.slice(0,18)}...</p>
          </div>

            )
          })}
        </div>:null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <a href="https://www.linkedin.com/in/ritesh-bamola-45798224a/" target='_blank'><img src={assets.linkedin} alt="" /></a>
          {extended ?<p>Linkedin</p>:null}
          
        </div>
        <div className="bottom-item recent-entry">
          <a href="https://www.instagram.com/ritesh_.1359/?next=%2F" target='_blank'> <img src={assets.instagram} alt="" /></a>
         {extended ? <p>Instagram</p>:null}
         
        </div>
        <div className="bottom-item recent-entry">
          <a href="https://www.facebook.com/ritesh.bamola" target='_blank'><img src={assets.facebook} alt="" /></a>
          {extended ?<p>Facebook</p>:null}
        
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
