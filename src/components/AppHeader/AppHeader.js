import './AppHeader.scss';
import { useContext, useState } from 'react';
import { Data } from '../../Data';
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    TextInput,
} from '@carbon/react';
import { Settings } from '@carbon/icons-react';

function AppHeader() {
    const [data, setData] = useContext(Data);
    const [isSettingsActive, setIsSettingsActive] = useState(false);
    
    return (
        <Header aria-label='Net Worth'>
            <HeaderName className='headerName' href='/' prefix=''>
                Net Worth
            </HeaderName>
            <HeaderGlobalBar>
                <HeaderGlobalAction
                    aria-label='Settings'
                    tooltipAlignment='end'
                    isActive={isSettingsActive}
                    onClick={() => {setIsSettingsActive(!isSettingsActive)}}
                >
                    <Settings size='25' />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
            <HeaderPanel
                className='settingsPanel'
                expanded={isSettingsActive}
                onHeaderPanelFocus={() => {}}
            >
                {Object.keys(data.user).map(key => 
                    <TextInput
                        className='field'
                        labelText={key}
                        placeholder={data.user[key]}
                    />
                )}
            </HeaderPanel>
        </Header>
    );
}

export default AppHeader;