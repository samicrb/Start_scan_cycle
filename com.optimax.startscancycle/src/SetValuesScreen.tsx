import React, { useState, useEffect } from 'react';
import { ModuleScreen, IModuleChannel, Message } from 'dart-api';
import { Grid, TextField, Typography, ThemeProvider } from '@mui/material';

export default class SetValuesScreen extends ModuleScreen {
    private channel!: IModuleChannel;

    onBind(message: Message, ch: IModuleChannel): boolean {
        this.channel = ch;

        // Le Task Editor veut récupérer les paramètres courants
        ch.receive('get_current_data', () => {
            ch.send('get_current_data', { values: this.state.values });
        });

        // Si d’autres composants mettent à jour les données
        ch.receive('set_current_data', ({ data }) => {
            if (Array.isArray(data?.values)) this.setState({ values: data.values });
        });

        return true;
    }

    state = { values: Array<number>(10).fill(0) };

    /** pousse les nouvelles valeurs vers le service */
    push(values: number[]) {
        this.setState({ values });
        this.channel?.send('set_current_data', { values });
    }

    render() {
        return (
            <ThemeProvider theme={this.systemTheme}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Set Values Modbus 130 → 139
                </Typography>

                <Grid container spacing={1}>
                    {this.state.values.map((v, i) => (
                        <Grid item xs={6} key={i}>
                            <TextField
                                label={`#${i} → ${130 + i}`}
                                type="number"
                                size="small"
                                fullWidth
                                value={v}
                                onChange={e => {
                                    const clone = [...this.state.values];
                                    clone[i] = Number(e.target.value);
                                    this.push(clone);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </ThemeProvider>
        );
    }
}