import './App.css';
import React, { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainScreen } from './components/MainScreen';
import { LaunchDetails } from './components/LaunchDetails';

export const DataContext = createContext();

function App() {
  const [data, setData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ 
          <DataContext.Provider value={{data, setData}}>
            <MainScreen /> 
          </DataContext.Provider>
        }/>
        <Route path="/details" element={ 
          <DataContext.Provider value={{data, setData}}>
            <LaunchDetails /> 
          </DataContext.Provider>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
