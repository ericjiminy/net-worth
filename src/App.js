import './App.scss';
import { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import TitleHeader from './components/TitleHeader/TitleHeader';
import Tables from './components/Tables/Tables';

function App() {

  const getDate = () => {
    const d = new Date();
    let ret = '';
    ret += (d.toLocaleString('default',{month: 'short'}));
    ret += ` ${d.getDate()} ${d.getFullYear()}`;
    return ret;
  }

  const initialAssets = [
    {
      category: 'Bank',
      cells: [
        {
          Name: 'Checkings',
          Value: '10,000'
        },
        {
          Name: 'Savings',
          Value: '20,000'
        }
      ]
    },
    {
      category: 'Property',
      cells: [
        {
          Name: 'House',
          Value: '500,000'
        }
      ]
    }
  ]

  const initialLiabilities = [
    {
      category: 'Loan',
      cells: [
        {
          Name: 'Student Loan',
          Value: '10,000'
        },
        {
          Name: 'Mortgage',
          Value: '100,000'
        }
      ]
    }
  ]

  const [user, setUser] = useState({});
  const [date, setDate] = useState(getDate);
  const [netWorth, setNetWorth] = useState('');
  const [totalAssets, setTotalAssets] = useState('');
  const [totalLiabilities, setTotalLiabilities] = useState('');
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);

  useEffect(() => {
    if (assets.length > 0) {
      setTotalAssets(() => {
        numToStr(assets.reduce((allTotal, asset) => {
          if (assets.cells && assets.cells.length > 0) {
            const sum = asset.cells.reduce((total, cell) => {
              return total + strToNum(cell.Value);
            }, 0);
            return allTotal + sum;
          } else return 0;
        }, 0));
      });
    }

    setTotalLiabilities(() => {
      if (liabilities.length > 0) {
        numToStr(liabilities.reduce((allTotal, liability) => {
          if (liabilities.cells && liabilities.ceels.length > 0) {
            const sum = liability.cells.reduce((total, cell) => {
              return total + strToNum(cell.Value);
            }, 0);
            return allTotal + sum;
          } else return 0;
        }, 0));
      }
    });

    setNetWorth(() => totalAssets - totalLiabilities);
  }, [assets, liabilities, totalAssets, totalLiabilities]);

  function numToStr(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function strToNum(str) {
    return parseFloat(str.replaceAll(/[^0-9]/g, ''));
  }

  return (
    <div className='container'>
      <AppHeader />
      <TitleHeader
        date={date}
        netWorth={netWorth}
      />
      <Tables 
        date={date}
        totalAssets={totalAssets}
        assets={assets}
        setAssets={setAssets}
        totalLiabilities={totalLiabilities}
        liabilities={liabilities}
        setLiabilities={setLiabilities}
      />
    </div>
  );
}

export default App;
