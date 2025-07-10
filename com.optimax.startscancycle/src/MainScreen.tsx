import React from 'react';
import { ModuleScreen } from 'dart-api';
import { Typography, ThemeProvider } from '@mui/material';

/** Écran racine obligatoire : aucun état, juste un texte */
export default class MainScreen extends ModuleScreen {
  render() {
    return (
      <ThemeProvider theme={this.systemTheme}>
        <Typography variant="h6" gutterBottom>
          Optimax - User Commands
        </Typography>
        <Typography variant="body2">
          Sélectionnez un bloc dans le Task Editor pour voir ses propriétés.
        </Typography>
      </ThemeProvider>
    );
  }
}

