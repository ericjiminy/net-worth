import './App.scss';
import { useState } from 'react';
import { Data } from './Data'
import AppHeader from './components/AppHeader/AppHeader';

function App() {
  const [data, setData] = useState({
    user: {
      Name: 'Eric Chun',
      Age: '21',
      Job: 'Software Developer'
    },
    netWorth: 0
  });
  return (
    <Data.Provider value={[data, setData]}>
      <div className='container'>
        <AppHeader/>
      </div>
    </Data.Provider>
  );
}

export default App;
