import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useDataProvider, useTranslate } from "react-admin";
import {
    Box, Stack, Checkbox, FormControl, InputLabel, Select, FormLabel, IconButton,
    MenuItem, SelectChangeEvent, FormControlLabel, TextField as MuiTextField
} from '@mui/material'
import React, { useEffect, useRef } from "react";
import parse from 'html-react-parser'
import { useGetOne, RecordContextProvider } from 'react-admin';
import { System } from "./Systems";
import { EditSystemModal } from "./EditSystem";
import { Settings as SettingsIcon } from '@mui/icons-material'
import { useIsVisible } from 'react-is-visible'

export const RecordFetcher = ({ id, resource, children }: any) => {
    const { data: record, isLoading, error } = useGetOne(resource, { id });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <RecordContextProvider value={record}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { record } as any);
                }
                return child;
            })}
        </RecordContextProvider>
    );
};

export function Dashboard() {
    const translate = useTranslate();
    const dataProvider = useDataProvider()
    const [project, setProject] = React.useState('');
    const [allowImport, setAllowImport] = React.useState(false);
    const [showInstructions, setShowInstructions] = React.useState(true);
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = async () => {
        setOpenCreate(false);
        await fetchSystems()
    }
    const [systemId, setSystemId] = React.useState('');
    const [systemIDtext, setSystemIDtext] = React.useState('');
    const [systems, setSystems] = React.useState([] as System[]);
    const lastDivRef = useRef<HTMLDivElement>(null)
    const isLastDivVisible = useIsVisible(lastDivRef)

    const handleProjectChange = (event: SelectChangeEvent) => {
        setProject(event.target.value as string);
    };
    const handleSystemChange = (event: SelectChangeEvent) => {
        setSystemId(event.target.value as string);
        systems.forEach(sys => {
            if (sys.id === event.target.value)
                setSystemIDtext(sys.ID!)
        })
    };
    const fetchSystems = async () => {
        const res = await dataProvider.getList<System>('systems', { pagination: { page: 1, perPage: 1000 }, sort: { field: 'ID', order: 'ASC' }, filter: {} })
        setSystems(res.data)
    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchSystems()
            return () => { }
        }
        fetchData().catch(console.error)
    }, [dataProvider, systemId])

    const onSettings = () => {

    }
    return (
        <>
            <p />
            <Card>
                <CardHeader title={translate("root.welcome")} />
                <CardContent>
                    {showInstructions ? <>
                        {parse(translate('root.instructions'))}
                    </> : <></>}
                    <FormControlLabel control={<Checkbox checked={showInstructions} onClick={() => setShowInstructions(!showInstructions)} />} label={translate('root.showInstructions')} />
                    <p />{parse(translate('root.wantToImportOld'))}<Checkbox checked={allowImport} onClick={() => setAllowImport(!allowImport)} />
                </CardContent>
            </Card>
            <p />
            <Card>
                <CardHeader title={translate('root.manageProjects')} />
                <CardContent>
                    {(project && !isLastDivVisible) ? <>
                        Scroll down to show all project features
                    </> : <></>}
                    <p />
                    {project ? <>
                        <Stack direction="row" spacing={2}>
                            <MuiTextField
                                id="filled-read-only-input"
                                label="Project name"
                                defaultValue={project}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                            <IconButton onClick={onSettings} >
                                <SettingsIcon onClick={onSettings} />
                            </IconButton>
                        </Stack>
                    </> : <></>
                    }
                    <p />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" onClick={() => setProject('<new>')}>{translate('root.newProject')}</Button>
                        <Button variant="contained" color="primary" >{translate('root.getProject')}</Button>
                        <Button variant="contained" color="primary" >{translate('root.saveProject')}</Button>
                    </Stack>
                    <p />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary">{translate('root.exportToCentralUnits')}</Button>
                        <Button variant="contained" color="primary">{translate('root.validateProject')}</Button>
                        <Button variant="contained" color="primary">{translate('root.orderModules')}</Button>
                    </Stack>
                </CardContent>
            </Card>
            {project ? <>
                <p />
                <Card>
                    <CardHeader title={translate('root.system')} />
                    <CardContent>
                        <Box sx={{ width: 1 / 4 }}>
                            Select system
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">System</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={systemId}
                                    label="System"
                                    onChange={handleSystemChange}
                                >
                                    {
                                        systems.map(system => <MenuItem key={system.id} value={system.id}>{system.ID}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <p />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleOpenCreate} >{translate('root.new')}
                                <EditSystemModal createNew open={openCreate} onClose={handleCloseCreate} systemId={''} />
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleOpenEdit} disabled={systemId === ''}>{translate('root.edit')}
                                <EditSystemModal open={openEdit} onClose={handleCloseEdit} systemId={systemId} />
                            </Button>
                            <Button variant="contained" color="primary">{translate('root.remove')}</Button>
                            {allowImport ? <Button variant="contained" color="primary">{translate('root.importFromCentralUnitFile')}</Button> : <></>}
                        </Stack>
                        {systemId ? <>
                            <p />
                            <Card>
                                <CardHeader title={translate('root.importDampers') + ` for ${systemIDtext}`} />
                                <CardContent>
                                    <Stack sx={{ width: 1 / 4 }} spacing={2}>
                                        <Button variant="contained" color="primary">{translate('root.importFromFile')}</Button>
                                        {allowImport ? <Button variant="contained" color="primary">{translate('root.importFromCentralUnitFile')}</Button> : <></>}
                                    </Stack>
                                </CardContent>
                            </Card>
                            <p />
                            <Card>
                                <CardHeader title={translate('root.importAlarmInputs') + ` for ${systemIDtext}`} />
                                <CardContent>
                                    <Stack sx={{ width: 1 / 4 }} spacing={2}>
                                        <div>
                                            <Button variant="contained" color="primary">{translate('root.importFromFile')}</Button>
                                            {allowImport ? <Button variant="contained" color="primary">{translate('root.importFromCentralUnitFile')}</Button> : <></>}
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </> : <></>}
                    </CardContent>
                </Card>
            </> : <></>}
            <div ref={lastDivRef}>
                <br />
            </div>
        </>
    );
}