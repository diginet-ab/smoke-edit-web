import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { useDataProvider, useTranslate } from "react-admin";
import {
    Box, Stack, FormControl, InputLabel, Select, 
    MenuItem
} from '@mui/material'
import React, { useEffect, useRef, useState } from "react";
import parse from 'html-react-parser'
import { System } from "./Systems";
import { useIsVisible } from 'react-is-visible'
import { Project } from "./Projects";
import { useQuery } from "@tanstack/react-query";
import EditProjectDialog from "./EditProjectDialog";
import EditSystemDialog from "./EditSystemDialog";
import FileInputButton from "./FileInputButton";
import { NedbDataProvider } from "./NedbDataProvider";

export function Dashboard() {
    const t = useTranslate();
    const dataProvider = useDataProvider()
    const [project, setProject] = useState<Project>();
    const [system, setSystem] = useState<System>();
    const [allowImport, setAllowImport] = useState(false);

    const projectQuery = useQuery({
        queryKey: ['resource.projects'], queryFn: async () => {
            const data = await dataProvider.getList('projects', { filter: {}, pagination: { page: 1, perPage: 1000 }, sort: { field: 'name', order: 'ASC' } })
            setProjects(data.data)
            return data
        }
    })
    const [openEditProject, setOpenEditProject] = useState(false);
    function handleOpenEditProject() {
        return setOpenEditProject(true);
    }
    const handleCloseEditProject = () => setOpenEditProject(false);
    const [openCreateProject, setOpenCreateProject] = useState(false);
    const handleOpenCreateProject = () => setOpenCreateProject(true);
    const handleCloseCreateProject = async (project?: Project) => {
        setOpenCreateProject(false);
        if (project) {
            const projs = await fetchProjects()
            setProjects(projs)
            setProject(project)
            changeProjectId(projs, project.id)
        }
    }
    const [projectId, setProjectId] = useState('');
    const [projectIDtext, setProjectIDtext] = useState('');
    const [projects, setProjects] = useState([] as Project[]);
    
    useEffect(() => {
        
    }, [projects, projectId])
    const systemQuery = useQuery({
        queryKey: ['resource.systems'], queryFn: async () => {
            const data = await dataProvider.getList('systems', { filter: {}, pagination: { page: 1, perPage: 1000 }, sort: { field: 'name', order: 'ASC' } })
            setSystems(data.data)
            return data
        }
    })
    const [openEditSystem, setOpenEditSystem] = useState(false);
    const handleOpenEditSystem = () => setOpenEditSystem(true);
    const handleCloseEditSystem = () => setOpenEditSystem(false);
    const [openCreateSystem, setOpenCreateSystem] = useState(false);
    const handleOpenCreateSystem = () => setOpenCreateSystem(true);
    const handleCloseCreateSystem = async (system?: System) => {
        setOpenCreateSystem(false);
        if (system) {
            const sys = await fetchSystems()
            setSystems(sys)
            setSystem(system)
            changeSystemId(sys, system.id)
        }
    }
    const [systemId, setSystemId] = useState('');
    const [systemIDtext, setSystemIDtext] = useState('');
    const [systems, setSystems] = useState([] as System[]);

    const lastDivRef = useRef<HTMLDivElement>(null)
    const isLastDivVisible = useIsVisible(lastDivRef)

    const changeProjectId = (projs: Project[], id: string) => {
        setProjectId(id);
        projs.forEach(proj => {
            if (proj.id === id)
                setProjectIDtext(proj.name!)
        })
    };
    const changeSystemId = (syses: System[], id: string) => {
        setSystemId(id);
        syses.forEach(sys => {
            if (sys.id === id)
                setSystemIDtext(sys.ID!)
        })
    };
    const fetchProjects = async () => {
        const res = await dataProvider.getList<Project>('projects', { pagination: { page: 1, perPage: 1000 }, sort: { field: 'name', order: 'ASC' }, filter: {} })
        return res.data
    }
    const fetchSystems = async () => {
        const res = await dataProvider.getList<System>('systems', { pagination: { page: 1, perPage: 1000 }, sort: { field: 'ID', order: 'ASC' }, filter: {} })
        return res.data
    }
    const handleFileSelect = (file: Blob) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target!.result as string);
                console.log('JSON data:', json);
                // Process the JSON data here
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        reader.readAsText(file);
    };
    const getProjectAsJson = async () => {
        const d = dataProvider as NedbDataProvider
        return d.getAsObject()
    }
    const downloadJson = async () => {
        const jsonString = JSON.stringify(await getProjectAsJson(), null, 2); // Convert the object to a JSON string
        const blob = new Blob([jsonString], { type: 'application/json' }); // Create a new Blob object using the JSON string
        const href = URL.createObjectURL(blob); // Create an URL for the Blob object

        // Create a link and set the URL and download attribute
        const link = document.createElement('a');
        link.href = href;
        link.download = project?.name + ".json"; // File name for download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };
    const clearProject = () => {
        dataProvider.clearAll()
        setProject(undefined)
        setProjectId('')
        setProjectIDtext('')
        setSystem(undefined)
        setSystemId('')
        setSystemIDtext('')
    }
    return (
        <>
            <p />
            <Card>
                <CardHeader title={t("root.welcome")} />
                <CardContent>
                    {parse(t('root.instructions'))}
                    <p />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" onClick={clearProject} >{t('root.newProjectFile')}</Button>
                        <FileInputButton variant="contained" color="primary" onFileSelect={handleFileSelect} >{t('root.open')}</FileInputButton>
                        <Button variant="contained" color="primary" onClick={downloadJson} disabled={!project}>{t('root.saveProject')}</Button>
                    </Stack>
                    <p />
                    {parse(t('root.instructionsw'))}
                    <p />
                    {parse(t('root.instructionsSteps'))}
                </CardContent>
            </Card>
            <p />
            <Card>
                <CardHeader title={'1. ' + t('root.manageProjects')} />
                <CardContent>
                    {parse(t('root.instructionsProject'))}
                    {(project && !isLastDivVisible) ? <>
                        Scroll down to show all project features
                    </> : <></>}
                    <p />
                    <Box sx={{ width: 1 / 4 }}>
                        Select project
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Project</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={projectId}
                                label="Project"
                                onChange={ev => changeProjectId(projects, ev.target.value)}
                            >
                                {
                                    projects.map(project => <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <p />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" onClick={handleOpenCreateProject} >{t('root.new')}</Button>
                        <EditProjectDialog open={openCreateProject} project={{ name: 'New project' }} onClose={handleCloseCreateProject} />
                        <Button variant="contained" color="primary" onClick={handleOpenEditProject} disabled={projectId === ''}>{t('root.edit')}</Button>
                        <EditProjectDialog open={openEditProject} onClose={handleCloseEditProject} project={project} />
                    </Stack>
                    <p />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary">{'A. ' + t('root.validateProject')}</Button>
                        <Button variant="contained" color="primary">{'B. ' + t('root.orderModules')}</Button>
                        <Button variant="contained" color="primary">{'C. ' + t('root.exportToCentralUnits')}</Button>
                    </Stack>
                    <p />
                    {/*parse(t('root.instructionsProject2'))*/}
                </CardContent>
            </Card>
            {projectId ? <>
                <p />
                <Card>
                    <CardHeader title={'2. ' + t('root.system')} />
                    <CardContent>
                        {parse(t('root.instructionsSystem'))}
                        <p />
                        <Box sx={{ width: 1 / 4 }}>
                            {t('root.selectSystem')}
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">System</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={systemId}
                                    label="System"
                                    onChange={ev => changeSystemId(systems, ev.target.value)}
                                >
                                    {
                                        systems.map(system => <MenuItem key={system.id} value={system.id}>{system.ID}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <p />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleOpenCreateSystem} >{t('root.new')}</Button>
                            <EditSystemDialog open={openCreateSystem} onClose={handleCloseCreateSystem} system={{ ID: 'New system' }} />
                            <Button variant="contained" color="primary" onClick={handleOpenEditSystem} disabled={systemId === ''}>{t('root.edit')}</Button>
                            <EditSystemDialog open={openEditSystem} onClose={handleCloseEditSystem} system={system} />
                            <Button variant="contained" color="primary">{t('root.remove')}</Button>
                            {allowImport ? <Button variant="contained" color="primary">{t('root.importFromCentralUnitFile')}</Button> : <></>}
                        </Stack>
                        {systemId ? <>
                            <p />
                            <Card>
                                <CardHeader title={'3. ' + t('root.importDampers') + ` '${systemIDtext}'`} />
                                <CardContent>
                                    <Stack sx={{ width: 1 / 4 }} spacing={2}>
                                        <Button variant="contained" color="primary">{t('root.importFromFile')}</Button>
                                        {allowImport ? <Button variant="contained" color="primary">{t('root.importFromCentralUnitFile')}</Button> : <></>}
                                    </Stack>
                                </CardContent>
                            </Card>
                            <p />
                            <Card>
                                <CardHeader title={'4. ' + t('root.importAlarmInputs') + ` '${systemIDtext}'`} />
                                <CardContent>
                                    <Stack sx={{ width: 1 / 4 }} spacing={2}>
                                        <div>
                                            <Button variant="contained" color="primary">{t('root.importFromFile')}</Button>
                                            {allowImport ? <Button variant="contained" color="primary">{t('root.importFromCentralUnitFile')}</Button> : <></>}
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