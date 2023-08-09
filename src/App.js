import './App.scss';
import { useState } from 'react';
import { Data } from './Data'
import AppHeader from './components/AppHeader/AppHeader';

function App() {
  const [data, setData] = useState({
    firstName: 'Eric',
    lastName: 'Chun',
    age: '21',
    job: 'Software Developer'
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
