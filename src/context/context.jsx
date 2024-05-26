import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara=(index ,nextword)=>{
    setTimeout(function (){
      setResultData(prev=>prev+nextword);
    },75*index)
  }
  const newchat= ()=>{
    setLoading(false)
    setShowResult(false)
  }
  
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt !==undefined){
        response= await run(prompt);
        setRecentPrompt(prompt)
    }
    else{
        setRecentPrompt(input);
        setPrevPrompt(prev=>[...prev,input]);
         response = await run(input);
    }
    
    let responseArray=response.split("**");
    let newArray="";
    for(let i=0;i<responseArray.length ;i++)
    {
      if(i=== 0 || i%2 !==1)
        {
          newArray+=responseArray[i];
        }
      else{
        newArray+="<b>"+responseArray[i]+"</b>"
      }
    }
    let newResponse2= newArray.split("*").join("</br>")
    let newResponseArray= newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++)
      {
        const nextWord=newResponseArray[i];
        delayPara(i,nextWord+" ");
      }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newchat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
