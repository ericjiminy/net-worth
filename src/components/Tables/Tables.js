import './Tables.scss';
import { TextInput } from '@carbon/react';
import { Add } from '@carbon/icons-react';

function Tables(props) {
    const date = props.date;
    const totalAssets = props.totalAssets;
    const assets = props.assets;
    const setAssets = props.setAssets;
    const totalLiabilities = props.totalLiabilities;
    const liabilities = props.liabilities;
    const setLiabilities = props.setLiabilities;

    function addAsset() {
        setAssets((prevState) => [
            ...prevState,
            {
                Category: '',
                Cells: []
            }
        ])
    }

    function addLiability() {
        setLiabilities((prevState) => [
            ...prevState,
            {
                Category: '',
                Cells: []
            }
        ])
    }

    return (
        <div className='tablesContainer'>
            <div className='table'>
                <div className='header' id='assets'>
                    <div className='headerLabel'>
                        Assets
                    </div>
                    <div className='headerTotal'>
                        ${totalAssets}
                    </div>
                </div>
                <div className='rows'>
                    {assets.map((asset) => (
                        <div className='category'>
                            <TextInput
                                className='categoryLabel'
                                placeholder='Category'
                            />
                            <div className='cell'>
                                <TextInput
                                    className='cellKey'
                                    placeholder='Name'
                                    helperText={date}
                                />
                                <TextInput
                                    className='cellValue'
                                    placeholder='Value'
                                />

                            </div>
                            <div className='categorySpacer'/>
                        </div>
                    ))}
                        {/* <div className='category'>
                            <div id='categoryLabel'>
                                <div className='cell'>
                                    <div className='cellKey'></div>
                                    <div className='cellValue'></div>
                                </div>
                                <div className='categorySpacer'/>
                            </div>
                        </div> */}
                </div>
                <div 
                    className='addAsset'
                    onClick={addAsset}
                >
                    <Add size={36} />
                </div>
            </div>
            <div className='table'>
                <div className='header' id='liabilities'>
                    <div className='headerLabel'>
                        Liabilities
                    </div>
                    <div className='headerTotal'>
                        ${totalLiabilities}
                    </div>
                </div>
                <div className='rows'>
                    {liabilities.map((liability) => (
                        <div className='category'>
                            <TextInput
                                className='categoryLabel'
                                placeholder='Category'
                            />
                            <div className='cell'>
                                <TextInput
                                    className='cellKey'
                                    placeholder='Name'
                                    helperText={date}
                                />
                                <TextInput
                                    className='cellValue'
                                    placeholder='Value'
                                />

                            </div>
                            <div className='categorySpacer'/>
                        </div>
                    ))}
                        {/* <div className='category'>
                            <div id='categoryLabel'>
                                    <div className='cell'>
                                        <div className='cellKey'></div>
                                        <div className='cellValue'></div>
                                    </div>
                                <div className='categorySpacer'/>
                            </div>
                        </div> */}
                </div>
                <div 
                    className='addLiability'
                    onClick={addLiability}
                >
                    <Add size={36} />
                </div>
            </div>

        </div>
    );
}

export default Tables;