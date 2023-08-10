import './AppHeader.scss';
import { useState } from 'react';
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel
} from '@carbon/react';
import { Settings } from '@carbon/icons-react';

function AppHeader() {
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
                <></>
            </HeaderPanel>
        </Header>
    );
}

export default AppHeader;