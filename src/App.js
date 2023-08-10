import './App.scss';
import { useState } from 'react';
import { Data } from './Data'
import AppHeader from './components/AppHeader/AppHeader';
import TitleHeader from './components/TitleHeader/TitleHeader';
import Tables from './components/Tables/Tables';

function App() {
  const [data, setData] = useState({
    user: {
      Name: 'Eric Chun',
      Age: '21',
      Job: 'Software Developer'
    },
    netWorth: '950,000',
    assets: {
      total: '1,150,000',
      categories: [
        {
          category: 'Bank',
          cells: {
            Checkings: '50,000',
            Savings: '300,000',
          }
        },
        {
          category: 'Investment',
          cells: {
            '401k': '400,00',
            Roth: '350,000',
            Independent: '50,000'
          }
        },
        {
          category: 'Vehicle',
          cells: {
            Ferrari: '500,000'
          }
        }
      ]
    },
    liabilities: {
      total: '200,000',
      categories: [
        {
          category: 'Loan',
          cells: {
            'Student Loan': '100,000',
            'Car Loan': '100,000'
          }
        }
      ]
    },
    date: 'Aug 9, 2023'
  });
  return (
    <Data.Provider value={[data, setData]}>
      <div className='container'>
        <AppHeader/>
        <TitleHeader/>
        <Tables />
      </div>
    </Data.Provider>
  );
}

export default App;
