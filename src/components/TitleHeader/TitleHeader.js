import './TitleHeader.scss';
import { useContext, useState } from 'react';
import { Data } from '../../Data';

function TitleHeader() {
    const [data, setData] = useContext(Data);

    return (
        <div className='titleHeader'>
            <div className='mainTitle'>
                <div className='label'>Net Worth: </div>
                <div className='netWorth'>${data.netWorth}</div>
            </div>
            <div className='details'>
                Total assets - Total liabilities. As of {data.date}
            </div>
        </div>
    );
}

export default TitleHeader;