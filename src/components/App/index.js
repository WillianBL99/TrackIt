import '../../css/reset.css'
import '../../css/index.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserContext from '../../providers/UserContext';
import Habits from '../Routes/Habits';
import History from '../Routes/History';
import Login from '../Routes/Login';
import Register from '../Routes/Register';
import Today from '../Routes/Today';
import APIUrlContext from '../../providers/APIUrlContext';


export default function App() {
    const [user, setUser] = useState({});
    const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

    /* useEffect(() => {
        updateUser();
    }, []);

    function updateUser(user) {
        if (!user) {
            const {
                token,
                image,
                name,
                email,
            } = JSON.parse(localStorage.getItem('userInfo'));
            setUser({...user, userData: {
                config: { headers: { Authorization: `Bearer ${token}` } },
                image,
                name,
                email
            }})
            console.log('atualizou App');
        }
        console.log('atualizou o usuario');
    } */

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <APIUrlContext.Provider value={{ url }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/cadastro' element={<Register />} />
                    <Route path='/habitos' element={<Habits />} />
                    <Route path='/hoje' element={<Today />} />
                    <Route path='/historico' element={<History />} />
                </Routes>
            </BrowserRouter>
            </APIUrlContext.Provider>
        </UserContext.Provider>
    );
}
