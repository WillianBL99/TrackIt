import '../../css/reset.css'
import '../../css/index.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Habits from '../Routes/Habits';
import Header from '../Routes/Header';
import History from '../Routes/History';
import Login from '../Routes/Login';
import Register from '../Routes/Register';
import Today from '../Routes/Today';
import Teste from '../Routes/Teste';
import Footer from '../Routes/Footer';


export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>                
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<Register />} />
                <Route path='/habitos' element={<Habits />} />
                <Route path='/hoje' element={<Today />} />
                <Route path='/historico' element={<History />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
