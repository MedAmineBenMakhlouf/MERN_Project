import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const Chat = () => {
    const [socket] = useState(() => io(':8000'));
    const [input,setInput]= useState("")
    const [msgs,setMsgs] = useState([])
    useEffect(() => {
        console.log('Is this running?');
        socket.on('post chat:', msg => 
        {
            console.log('====================================');
            console.log(msg);
            console.log('====================================');
            setMsgs(premsgs=> {
                console.log(premsgs)
                return [...premsgs,msg]
                
            })
            console.log(msgs)
        });
        return () => socket.disconnect(true);
    }, [socket]);
    const onChangeHandler =(e) =>{
        setInput(e.target.value)
    }
    const onSubmitHandler = (e)=>{
        e.preventDefault()
        socket.emit('chat',input)
    }
    return (
        <div>
            <h1>Socket Test</h1>
            <form onSubmit={onSubmitHandler}>
            <input type='text' name='msg' autoComplete='off' onChange={onChangeHandler}/>
            <input type='submit' value='Submit'/>

            </form>
            <h1>All Messages {JSON.stringify(msgs)} </h1>
            {
                msgs.map((m,i) => 
                <h4 style={{color:'white'}} key={i}>{m}</h4>
                )
            }
        </div>
    )
}

export default Chat