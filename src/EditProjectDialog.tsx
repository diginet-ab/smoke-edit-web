import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useDataProvider } from 'react-admin';
import { Project } from './Projects';

const MyDialog = ({ open, project, onClose }: any) => {
    const [data, setData] = useState<Project>(project);

    const handleNameChange = (event: any) => {
        if (data)
            setData({ ...project, name: event.target.value });
    };

    const handleCancel = () => {
        onClose(undefined); // Pass the data back to the parent component
    };

    const dataProvider = useDataProvider()

    const handleSave = async () => {
        let result: Project | undefined
        if (data) {
            delete (data as any).id
            const res = await dataProvider.create<Project>('projects', { data })
            result = res.data
        }
        onClose(result)
    }
    return <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>New project</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={data?.name}
                onChange={handleNameChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} disabled={!data || !data.name}>Submit</Button>
        </DialogActions>
    </Dialog>
};

export default MyDialog;
