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
import Dashboard from './components/Dashboard';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PollResult from './components/PollResult';
import Poll from './components/Poll';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectPoll from './components/ProtectPoll';


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
                  <Route element={<ProtectPoll/>}>
                       <Route path= 'poll/:id' element={<Poll/>}/>
                  </Route>
                  <Route element={<ProtectedRoutes/>}>
                       <Route path='/dashboard/:id' element= {<Dashboard/>}/>
                  </Route>
                  <Route path= '*' element={<Landing/>}/>
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
