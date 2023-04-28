import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import InstructorHome from './InstructorHome'
import axios from 'axios';
import Header from './Header';
import { backendURL } from '../utils/config';

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [fileUrl2, setFileUrl2] = useState('')
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('New Room Created!');
    };

    const setFileURL = async () => {
        try {
            const response = await axios.post(`${backendURL}/sessionsget`,  { sessionId: roomId } );

            const sessionData = response.data;
            if (!sessionData) {
                toast.error('Session not found.');
                return;
            }

            console.log(sessionData)

            const { fileUrl } = sessionData;
            if (!fileUrl) {
                toast.error('File URL not found in session data.');
                return;
            }
            localStorage.setItem("fileUrl", fileUrl)
            setFileUrl2(fileUrl)
            return null
    }catch (error) {
        console.error(error);
        toast.error('Failed to join room.');
    }
}

    const joinRoom = async () => {
        await setFileURL()
        navigate(`/editor/${roomId}`, {
            state: {
                username,
                fileUrl: fileUrl2,
            },
        });
    };


    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        (localStorage.getItem('type') === 'Instructor') ?
            (
                <InstructorHome />

            ) : (localStorage.getItem('type') === 'Student') ? (
                <div >
                    <Header />
                <div className="homePageWrapper">
                    <div className="formWrapper">
                        <h4 className="mainLabel">Enter Room ID</h4>
                        <div className="inputGroup">
                            <input
                                type="text"
                                className="inputBox"
                                placeholder="ROOM ID"
                                onChange={(e) => setRoomId(e.target.value)}
                                value={roomId}
                                onKeyUp={handleInputEnter}
                            />
                            <input
                                type="text"
                                className="inputBox"
                                placeholder={localStorage.getItem('username')}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                onKeyUp={handleInputEnter}
                            />
                            <button className="btn joinBtn" onClick={joinRoom}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            ) : (
                <Navigate replace to='/signin' />
            )
    )
};

export default Home;
