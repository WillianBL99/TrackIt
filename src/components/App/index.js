import '../../css/reset.css'
import '../../css/index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from '../../providers/UserContext';
import APIUrlContext from '../../providers/APIUrlContext';
import TasksStateContext from '../../providers/TasksStateContext';

import Habits from '../Routes/Habits';
import History from '../Routes/History';
import Login from '../Routes/Login';
import Register from '../Routes/Register';
import Today from '../Routes/Today';
import Teste from '../Routes/Teste';


export default function App() {
    const [user, setUser] = useState({});
    const [tasksState, setTasksState] = useState({});
    const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <APIUrlContext.Provider value={{ url }}>
                <TasksStateContext.Provider value={{ tasksState, setTasksState }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='/cadastro' element={<Register />} />
                            <Route path='/habitos' element={<Habits />} />
                            <Route path='/hoje' element={<Today />} />
                            <Route path='/historico' element={<History />} />
                            <Route path='/teste' element={<Teste />} />
                        </Routes>
                    </BrowserRouter>
                </TasksStateContext.Provider>
            </APIUrlContext.Provider>
        </UserContext.Provider>
    );
}
