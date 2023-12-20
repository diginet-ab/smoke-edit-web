import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  defaultTheme,
} from "react-admin";
import { UserList } from "./users";
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
  const damper = await dataProvider.create<Damper>('fireDampers', { data: { name: 'hej',  }})
  await dataProvider.create<Damper>('fireCells', { data: { name: 'hej',  }})
  await dataProvider.create<Damper>('fireCells', { data: { name: 'hej',  }})
  await dataProvider.create<Damper>('alarms', { data: { name: 'hej',  }})
  await dataProvider.create<Damper>('modules', { data: { name: 'hej',  }})
  const res = await dataProvider.getOne<Damper>('fireDampers', { id: damper.data.id })
}

type Damper = {
  id: number
  name: string
}
testNedb()


export function App() {
  return <Admin darkTheme={darkTheme} i18nProvider={i18nProvider} loginPage={MyLoginPage} theme={lightTheme} authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource name="fireDampers" list={UserList} />
    <Resource name="fireCells" list={UserList} />
    <Resource name="alarms" list={UserList} />
    <Resource name="modules" list={UserList} />
  </Admin>;
}
