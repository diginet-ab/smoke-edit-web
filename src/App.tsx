import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultTheme,
} from "react-admin";
import { FireDamper, FireDamperEdit, FireDamperList, FireDamperShow } from "./fireDampers";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import indigo from '@mui/material/colors/indigo';
import pink from '@mui/material/colors/pink';
import red from '@mui/material/colors/red';
import green from '@mui/material/colors/green';
import { MyLoginPage } from "./MyLoginPage";
import { i18nProvider } from './i18nProvider'
import Datastore from '@seald-io/nedb'
import { EventEmitter } from 'events'
import { NedbDataProvider } from "./NedbDataProvider";
import { FireCell, FireCellEdit, FireCellList, FireCellShow } from "./fireCells";
import nextTick from 'next-tick'
import { AlarmEdit, AlarmList, AlarmShow } from "./Alarms";
import { ModuleEdit, ModuleList, ModuleShow, Module, SioxModule } from "./Modules";

if (!globalThis.process)
globalThis.process = {} as any
globalThis.process.nextTick = nextTick;

const darkTheme = {
  ...defaultTheme,
  palette: {
    mode: 'dark' as 'dark' | undefined,
    secondary: {
      main: "#ADD03C",
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    ...defaultTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ADD03C',
        },
      },
    },
  },
};

const lightTheme = {
  ...defaultTheme,
  palette: {
    mode: 'light' as 'light' | undefined,
    secondary: {
      main: "#ADD03C",
    },
  },
  /*
    palette: {
      mode: 'light',
      primary: { main: "#2E7D32" },
      secondary: { main: "#ADD03C" },
      error: red,
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  */
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },

  components: {
    ...defaultTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ADD03C',
        },
      },
    },
  },

};

const dataProvider = new NedbDataProvider(['fireDampers', 'fireCells', 'modules', 'alarms'])

const testNedb = async () => {
  const fireDampers: FireDamper[] = []
  for (let n = 0; n < 10000; n++) {
    const damper = (await dataProvider.create<FireDamper>('fireDampers', {
      data: {
        ID: 'DM-' + n,
        type: '8SC2-1:004',
        fireCells: [],
        group: 0,
        address: n
      }
    })).data
    fireDampers.push(damper)
  };
  for (let n = 0; n < 200; n++) {
    const fdStart = n * 50
    const fds = fireDampers.slice(fdStart, fdStart + 50)
    const fc = (await dataProvider.create<FireCell>('fireCells', { data: { ID: 'FC-' + n, fireDampers: [ ...(fds.map(elem => elem.id ))] } })).data
    for (let m = 0; m< fds.length; m++) {
      const elem = fds[m]
      elem.fireCells!.push(fc.id)
      await dataProvider.update<FireDamper>('fireDampers', { id: elem.id, data: elem, previousData: undefined })
    }
  };
  for (let n = 1; n <= 50; n++) {
    await dataProvider.create<FireDamper>('alarms', { data: { ID: 'AL-' + n, module: 'S27', input: n} })
  }
  for (let n = 0; n < fireDampers.length / 200; n++) {
    await dataProvider.create<Module>('modules', { data: { ID: 'CU-' + n, type: 'SX:ACCESS', ip: '192.168.0.' + (100 + n)} })
  }
  for (let n = 0; n < fireDampers.length; n++) {
    const fd = fireDampers[n]
    await dataProvider.create<SioxModule>('modules', { data: { ID: fd.ID, type: fd.type, group: fd.group, address: fd.address} })
  }
  await dataProvider.create<SioxModule>('modules', { data: { ID: 'S27', type: '8S27:017', group: 0, address: 59} })
}

testNedb()


export function App() {
  return <Admin darkTheme={darkTheme} i18nProvider={i18nProvider} loginPage={MyLoginPage} theme={lightTheme} authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="fireDampers" list={FireDamperList} show={FireDamperShow} edit={FireDamperEdit} recordRepresentation={(record) => `${record.ID}`} />
    <Resource name="fireCells" list={FireCellList} show={FireCellShow} edit={FireCellEdit} recordRepresentation={(record) => `${record.ID}`} />
    <Resource name="alarms" list={AlarmList} show={AlarmShow} edit={AlarmEdit} recordRepresentation={(record) => `${record.ID}`} />
    <Resource name="modules" list={ModuleList} show={ModuleShow} edit={ModuleEdit} recordRepresentation={(record) => `${record.ID}`} />
  </Admin>;
}
