import './Tables.scss';
import { useContext, useState } from 'react';
import { Data } from '../../Data';

function Tables() {
    const [data, setData] = useContext(Data);

    return (
        <div className='tablesContainer'>
            <div className='table'>
                <div className='header' id='assets'>
                    <div className='headerLabel'>
                        Assets
                    </div>
                    <div className='headerTotal'>
                        ${data.assets.total}
                    </div>
                </div>
                <div className='rows'>
                    {data.assets.categories.map(category => 
                        <div className='category'>
                            <div id='categoryLabel'>
                                {category.category}
                                {Object.keys(category.cells).map(key => 
                                    <div className='cell'>
                                        <div className='cellKey'>{key}:</div>
                                        <div className='cellValue'>{category.cells[key]}</div>
                                    </div>
                                )}
                                <div className='categorySpacer'/>
                            </div>
                        </div>

                    )}
                </div>
            </div>
            <div className='table'>
                <div className='header' id='liabilities'>
                    <div className='headerLabel'>
                        Liabilities
                    </div>
                    <div className='headerTotal'>
                        ${data.liabilities.total}
                    </div>
                </div>
                <div className='rows'>
                    {data.liabilities.categories.map(category => 
                        <div className='category'>
                            <div id='categoryLabel'>
                                {category.category}
                                {Object.keys(category.cells).map(key => 
                                    <div className='cell'>
                                        <div className='cellKey'>{key}:</div>
                                        <div className='cellValue'>{category.cells[key]}</div>
                                    </div>
                                )}
                                <div className='categorySpacer'/>
                            </div>
                        </div>

                    )}
                </div>
            </div>

        </div>
    );
}

export default Tables;