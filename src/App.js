import './App.scss';
import { useState } from 'react';
import { Data } from './Data'
import AppHeader from './components/AppHeader/AppHeader';
import TitleHeader from './components/TitleHeader/TitleHeader';

function App() {
  const [data, setData] = useState({
    user: {
      Name: 'Eric Chun',
      Age: '21',
      Job: 'Software Developer'
    },
    netWorth: '30,000',
    date: 'Aug 9, 2023'
  });
  return (
    <Data.Provider value={[data, setData]}>
      <div className='container'>
        <AppHeader/>
        <TitleHeader/>
      </div>
    </Data.Provider>
  );
}

export default App;
