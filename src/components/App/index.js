import '../../css/reset.css'
import '../../css/index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from '../../providers/UserContext';
import APIUrlContext from '../../providers/APIUrlContext';
import TasksStateContext from '../../providers/TasksStateContext';
import axios from 'axios';

import Habits from '../Routes/Habits';
import History from '../Routes/History';
import Login from '../Routes/Login';
import Register from '../Routes/Register';
import Today from '../Routes/Today';


export default function App() {
    const [user, setUser] = useState(persistUser);
    const [tasksState, setTasksState] = useState(persistTasksState);
    const url = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

    function persistUser() {
        if (localStorage.getItem('userInfo')) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            return userInfo;
        }
        return {};
    }

    function persistTasksState() {
        if (localStorage.getItem('tasksState')) {
            const tasksState = JSON.parse(localStorage.getItem('tasksState'));
            return tasksState;
        }
        return {};
    }

    function updateLocalStorageTasksState() {
        const {config} = JSON.parse(localStorage.getItem('userInfo'));
        const promise = axios.get(`${url}/today`, config);
        promise.then(response => {
            const tasks = response.data;
            const qtdCompleted = tasks.filter(task => task.done).length;
            const qtdTotal = tasks.length;
            localStorage.setItem('tasksState',
                JSON.stringify({ qtdCompleted, qtdTotal }));
            
            if(!dataIsIquals()) setTasksState({ qtdCompleted, qtdTotal });
        });
        promise.catch(error => console.error(error.response.data));
    }

    function dataIsIquals () {
        const tasksStateLocalStorage = JSON.parse(localStorage.getItem('tasksState'));
        const {qtdTotal} = tasksStateLocalStorage;

        if(qtdTotal === tasksState.qtdTotal) return true;
        return false;
    }


    useEffect(() => {
        if(localStorage.getItem('userInfo'))
            updateLocalStorageTasksState();
    }, [tasksState]);

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
                        </Routes>
                    </BrowserRouter>
                </TasksStateContext.Provider>
            </APIUrlContext.Provider>
        </UserContext.Provider>
    );
}
