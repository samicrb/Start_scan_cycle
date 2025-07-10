import React from 'react';
import { ModuleScreen, IModuleChannel, Message } from 'dart-api';
import { Typography, ThemeProvider } from '@mui/material';

export default class StarScanCycleScreen extends ModuleScreen {

  /** Enregistre les événements requis par le Task Editor */
  onBind(message: Message, channel: IModuleChannel): boolean {
    // Aucune donnée à sauvegarder : on renvoie juste un objet vide
    channel.receive('get_current_data', () => {
      channel.send('get_current_data', {});
    });
    return true;
  }

  /** Rendu de l’écran */
  render() {
    return (
      <ThemeProvider theme={this.systemTheme}>
        <Typography variant="subtitle1">
          This function starts a scan cycle
        </Typography>
      </ThemeProvider>
    );
  }
}
