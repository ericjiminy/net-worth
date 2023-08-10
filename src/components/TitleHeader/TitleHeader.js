import './TitleHeader.scss';

function TitleHeader(props) {
    const date = props.date;
    const netWorth = props.netWorth;

    return (
        <div className='titleHeader'>
            <div className='mainTitle'>
                <div className='label'>Net Worth: </div>
                <div className='netWorth'>${netWorth}</div>
            </div>
            <div className='details'>
                Total assets - Total liabilities. As of {date}
            </div>
        </div>
    );
}

export default TitleHeader;