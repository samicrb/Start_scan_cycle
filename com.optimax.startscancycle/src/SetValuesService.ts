import {
    Context, ModuleService, IModuleChannel,
    IProgramManager, ProgramSaveMode, Message
  } from 'dart-api';
  import drlCode from './UserCommand/set_values.drl';
  
  interface Params {          // structure des 10 valeurs
    values: number[];
  }
  
  export default class SetValuesService extends ModuleService {
  
    // Valeurs par défaut si l’écran ne les fournit pas
    private defaultParams: Params = { values: Array(10).fill(0) };
  
    onBind(msg: Message, ch: IModuleChannel): boolean {
      const pm = this.moduleContext.getSystemManager(Context.PROGRAM_MANAGER) as IProgramManager;
  
      /* 1. Enregistrer le DRL comme Sub-Program */
      ch.receive('req_to_save_commands_def_as_sub_program',
        async ({ programName }) => {
          const ok = await pm.saveSubProgram(
            ProgramSaveMode.SAVE, programName,
            `from DRCF import *\r\n${drlCode}`
          );
          ch.send('req_to_save_commands_def_as_sub_program', ok);
        });
  
      /* 2. Génération du code DRL dans la timeline */
      ch.receive('gen_command_call',
        ({ componentId, data }) => {                      // data ← params UI
          if (componentId !== 'set_values') return;
  
          const p: Params = data ?? this.defaultParams;
          const args = p.values.join(', ');
          ch.send('gen_command_call', `set_values(${args});`);
        });
  
      return true;
    }
  }