import { createContext, useState } from "react";
import runChat from "../Config/Gemini";

export const Context_Main = createContext()

function ContextProvider({ children }) {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState([]);
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showresult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }
    function formatText(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        text = text.split("*").join("</br>")
        // text = text.replace(/\*/g, '<br>');
        return text;
    }
    const  delay=(index,nextword)=>{
        setTimeout(()=>{
            setResultData(prev => prev+nextword)
        },75*index)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)

        !prompt && setPrevPrompts(prev =>[...prev,input])
        let data = prompt ? await runChat(prompt) : await runChat(input)
        data = formatText(data)
        data = data.split(" ")
        // const datad=async()
        data?.map((element,index ) => {
            delay(index,element+" ")
        })

        // setResultData(data)
        setLoading(false)
        setInput("")
    }




    // onSent("Who is Virat Kholi")
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showresult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context_Main.Provider value={contextValue}>
            {children}
        </Context_Main.Provider>
    )
}

export default ContextProvider