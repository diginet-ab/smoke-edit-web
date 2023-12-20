import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useTranslate } from "react-admin";
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Typography, Stack, Checkbox, IconButton, Modal, FormControl, InputLabel, Select, 
    MenuItem, SelectChangeEvent, TextField, FormControlLabel
} from '@mui/material'
import { Fireplace as InboxIcon } from '@mui/icons-material'
import { Close as CloseIcon } from '@mui/icons-material'
import React from "react";
import parse from 'html-react-parser'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function Dashboard() {
    const translate = useTranslate();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [checked, setChecked] = React.useState([0]);
    const [project, setProject] = React.useState('');
    const [system, setSystem] = React.useState('');
    const [allowImport, setAllowImport] = React.useState(false);
    const [showInstructions, setShowInstructions] = React.useState(true);

    const handleProjectChange = (event: SelectChangeEvent) => {
        setProject(event.target.value as string);
    };
    const handleSystemChange = (event: SelectChangeEvent) => {
        setSystem(event.target.value as string);
    };
    return (
        <>
            <p />
            <Card>
                <CardHeader title={translate("root.welcome")} />
                <CardContent>
                    { showInstructions ? <>
                    {parse(translate('root.instructions'))}
                    </> : <></> }
                    <FormControlLabel control={<Checkbox checked={ showInstructions } onClick={() => setShowInstructions(!showInstructions)} />} label={translate('root.showInstructions')} />
                    <p/>{parse(translate('root.wantToImportOld'))}<Checkbox checked={ allowImport } onClick={() => setAllowImport(!allowImport)} />
                </CardContent>
            </Card>
            <p />
            <Card>
                <CardHeader title={'Hantera projekt'} />
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" onClick={() => setProject('New')}>{'Nytt projekt'}</Button>
                        <Button variant="contained" color="primary" >{'Hämta projekt'}</Button>
                        <Button variant="contained" color="primary" >{'Spara projekt'}</Button>
                    </Stack>
                    <p />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary">{'Export to SX:ACCESS file(s)'}</Button>
                        <Button variant="contained" color="primary">{'Validera projektet'}</Button>
                        <Button variant="contained" color="primary">{'Beställ moduler'}</Button>
                    </Stack>
                </CardContent>
            </Card>
            {project ? <>
                <p />
                <Card>
                    <CardHeader title={'System (centralenheter)'} />
                    <CardContent>
                        <Box sx={{ width: 1 / 4 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">System</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={system}
                                    label="System"
                                    onChange={handleSystemChange}
                                >
                                    <MenuItem value={'a'}>Våning 1</MenuItem>
                                    <MenuItem value={'b'}>Våning 2</MenuItem>
                                    <MenuItem value={'c'}>Våning 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <p />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary">{'Ny'}</Button>
                            <Button variant="contained" color="primary">{'Ändra'}</Button>
                            <Button variant="contained" color="primary">{'Ta bort'}</Button>
                            { allowImport ? <Button variant="contained" color="primary">{'Importera från SX:ACCESS-fil'}</Button> : <></> }
                        </Stack>
                    </CardContent>
                </Card>
                <p />
                <Card>
                    <CardHeader title={'Importera spjäll'} />
                    <CardContent>
                        <Stack sx={{ width: 1 / 4 }} spacing={2}>
                            <Button variant="contained" color="primary">{'Importera från fil'}</Button>
                            { allowImport ? <Button variant="contained" color="primary">{'Importera från SX:ACCESS-fil'}</Button> : <></> }
                        </Stack>
                    </CardContent>
                </Card>
                <p />
                <Card>
                    <CardHeader title={'Importera larmingångar'} />
                    <CardContent>
                    <Stack sx={{ width: 1 / 4 }} spacing={2}>
                            <Button variant="contained" color="primary">{'Importera från fil'}</Button>
                            { allowImport ? <Button variant="contained" color="primary">{'Importera från SX:ACCESS-fil'}</Button> : <></> }
                        </Stack>
                    </CardContent>
                </Card>
            </> : <></>}
        </>
    );
}