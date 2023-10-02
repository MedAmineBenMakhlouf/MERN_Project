import styled from "styled-components"
import { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host, allServiceProvidersRoute } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";


export default function Chats() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [isLoaded, setIsLoaded] = useState(false);


  
  useEffect(() => {
    axios.get(baseUrl + '/loggedUser', { withCredentials: true })
        .then(res => {
          setIsLoaded(true);
          setCurrentUser(res.data)
        })
        .catch(error => console.log(error))
}, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        {isLoaded &&
          currentChat === undefined ?
          <Welcome currentUser={currentUser} /> :
          <ChatContainer currentChat={currentChat} socket={socket} currentUser={currentUser} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
