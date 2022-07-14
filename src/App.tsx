import React from 'react';
import './App.css';
import { Helmet } from "react-helmet";
import { Header } from './Components/Header/header';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './Redux/store';


function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className='layout'>
        <Router />

      </div>
    </Provider>
  );
}

export default App;
