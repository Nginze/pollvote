import { useEffect, useState } from 'react';
import './App.css';
import Landing from './components/Landing';
import Nav from './components/Nav';
import ModalProvider from './contexts/modalContext';
import UserProvider from './contexts/userContext';
import PollProvider from './contexts/pollContext';
import ReactModal from 'react-modal'
import Footer from './components/Footer.js';
import PollForm from './components/PollForm';
import PollFeed from './components/PollFeed';
import Login from './components/LoginModal';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PollResult from './components/PollResult';
import Poll from './components/Poll';


ReactModal.setAppElement('#root');


function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <UserProvider>
      <ModalProvider>
      <PollProvider>
         <Nav/>
         <Login />
             <Routes>
                  <Route path='/' element={<Landing/>}/>
                  <Route path='/public' element={<PollFeed/>}/>
                  <Route path='/new' element={<PollForm/>}/>
                  <Route path='poll/result/:id' element={<PollResult/>}/>
                  <Route path= 'poll/:id' element={<Poll/>}/>
              </Routes>
              <Footer/>
      </PollProvider>
      </ModalProvider>
      </UserProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
