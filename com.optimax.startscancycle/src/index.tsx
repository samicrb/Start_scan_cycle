/*
    BSD 3-Clause License    
    Copyright (c) 2023, Doosan Robotics Inc.
*/
//Dart-api
import { System, BaseModule, ModuleContext, ModuleScreen, ModuleScreenProps, ModuleService, logger} from 'dart-api';
import DrlUtils from './DrlUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, ThemeProvider } from '@mui/material';
// Screens
import MainScreenReact       from './MainScreen';
import StartScanCycleScreen from './StartScanCycleScreen';
import SetValuesScreen from './SetValuesScreen';
// Services
import StartScanCycleService  from './StartScanCycleService';
import SetValuesService      from './SetValuesService';


// IIFE for register a function to create an instance of main class which is inherited BaseModule.
(() => {
    System.registerModuleMainClassCreator((packageInfo) => new Module(packageInfo));
})();

class Module extends BaseModule {
    getModuleScreen(componentId: string) {
        if (componentId === 'MainScreen') {
            return MainScreen;
        }
        
        //for pip screen that opened when usr clicked the property tab in task editor module of dart-platform.
        if (componentId === 'StartScanCycleScreen') {
            return StartScanCycleScreen;
        }
        if (componentId === 'SetValuesScreen') {
            return SetValuesScreen;
        }
        return null;
    }
    /* 2. Quel service fournir ? */
    getModuleService(componentId: string): typeof ModuleService | null {
        logger.debug(`getModuleService: ${this.packageInfo.packageName}, ${componentId}`);

        switch (componentId) {
        case 'start_scan_cycle':   
            return StartScanCycleService;      
        case 'set_values':
            return SetValuesService;
        default:
            return null;
        }
    }
}


class MainScreen extends ModuleScreen {
    constructor(props: ModuleScreenProps) {
        super(props);
    }
    componentWillUnmount() {
        // Must delete DrlUtils Instance to free up memory
        DrlUtils.deleteInstance();
    }
    render() {
        return (
            <ThemeProvider theme={this.systemTheme}>
                <App moduleContext={this.moduleContext} />
            </ThemeProvider>
        );
    }
}
interface IAppProps {
    moduleContext: ModuleContext;
}
function App(props: IAppProps) {
    const moduleContext = props.moduleContext;
    const { t } = useTranslation();
    return (
        <div
          style={{
            'width': '100%',
            'height': '100%',
            'position': 'relative',
          }}
          data-gjs-type="ContainerAbsolute"
        >
        </div>
      );
}
