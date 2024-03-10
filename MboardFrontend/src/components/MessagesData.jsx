import { useEffect, useState } from "react"

const Data = ()=>{
    return(
        <>
         <div className="md:w-[100%] md:h-[100vh] bg-slate-200 md:flex md:justify-center md:items-center ">
          <div className="md:w-[650px] md:h-[500px] bg-slate-50 md:flex md:flex-col md:items-center md:justify-between shadow-lg rounded-lg scroll-smooth scrollbar scrollbar-thumb-gray-100 scrollbar-track-gray-100">
            <CodedBy/>
            <p  className="text-[30px] text-slate-800 font-medium"> Message Board</p>
            <FetchData/>
            <SendMessages/>
          </div>
         </div>
        </>
    )
}

const FetchData = ()=>{

    const [messages,setMessages] = useState([])

  useEffect(()=>{
     const dataFromBackend = fetch('https://message-board-backend-7gzv.onrender.com/getMessages')
     .then(async(res)=>{
         const data = await res.json()
         console.log(data)
         setMessages(data)
     })
  },[])  

  const randomColor = '#B0C4DE'
   
    return(
        <>
          <div id="scrollbar" className=" md:w-[80%] md:h-[300px] overflow-scroll">
            {
                messages.map((item)=>{
                   return <div className="mt-7 mb-7 flex justify-between">
                      <div>
                         <p className="text-slate-800 font-medium ">{item.username}</p>
                         <p style={{backgroundColor:randomColor}} className="text-gray-700 w-fit h-fit p-5 rounded-md">{item.message}</p>
                    </div>
                    <p className="text-slate-500 mr-3">{item.time}</p>
                    </div>
                })
            }
          </div>
        </>
    )
}

const SendMessages = ()=>{

    const[username,setUsername] = useState('')
    const[message,setMessage] = useState('')

    const addMessage = ()=>{


      if(!username && !message){
        alert('Enter username and message')
        return
      }


          fetch('http://localhost:3000/sendMessage',{
            method:"POST",
            body: JSON.stringify({
                username: username,
                message: message,
            }),
            headers:{
                "content-Type": "application/json"
            }
          })
          .then(async(req)=>{
            await req.json()
          })
    }

    return(
        <> 
          <div className=" md:flex md:w-[600px] md:justify-evenly md:items-center md:h-[70px] md:mb-7">
           {/* <button className="bg-slate-100 md:w-[70px] md:h-[70px] flex justify-center items-center rounded-md">
              <img src="https://static-00.iconduck.com/assets.00/black-smiling-face-emoji-2048x2048-vmfi1gk5.png" className="w-[30px] h-[30px]" alt="" />
           </button> */}
           <div className="md:flex md:flex-col bg-slate-50 ">
            <input className="bg-slate-50 text-slate-600 border-b-2 md:text-lg hover:border-slate-400 md:w-[430px] outline-none md:h-[35px] md:pl-2 transition-all ease-in-out duration-500" type="text" onChange={e=>{setUsername(e.target.value)}} placeholder="username"/>
            <input className="bg-slate-50 text-slate-600 outline-none md:w-[430px] md:h-[35px] border-b-2 md:text-lg hover:border-slate-400 transition-all ease-in-out duration-500 md:pl-2" type="text" onChange={e=>{setMessage(e.target.value)}} placeholder="messages"/>
            </div>
            <button className="bg-slate-300 md:w-[70px] md:h-[70px] flex justify-center items-center rounded-md" onClick={addMessage}>
                <img className="w-[30px] h-[30px]" src="https://static-00.iconduck.com/assets.00/send-icon-512x512-gji4a5du.png" alt="" />
            </button>
         </div>
        </>
    )
}

const CodedBy = ()=>{
  return(
    <>
       <div className="md:w-full md:h-[30px] bg-slate-800 flex justify-center items-center flex-wrap rounded-lg text-slate-100">
            <p>Coded by</p>
              <img className="w-[17px] h-[17px] ml-2 bg-slate-800 rounded-full" src="https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png" alt="" />
              <a href="https://github.com/pranav-94">pranav-94</a>
       </div>
    </>
  )
}

export default Data
