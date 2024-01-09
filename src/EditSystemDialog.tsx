import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useDataProvider } from 'react-admin';
import { System } from './Systems';

const MyDialog = ({ open, system, onClose }: any) => {
    const [data, setData] = useState<System>(system);

    const handleNameChange = (event: any) => {
        if (data)
            setData({ ...system, ID: event.target.value });
    };

    const handleCancel = () => {
        onClose(undefined); // Pass the data back to the parent component
    };

    const dataProvider = useDataProvider()

    const handleSave = async () => {
        let result: System | undefined
        if (data) {
            delete (data as any).id
            const res = await dataProvider.create<System>('systems', { data })
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
                label="ID"
                type="text"
                fullWidth
                variant="standard"
                value={data?.ID}
                onChange={handleNameChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} disabled={!data || !data.ID}>Submit</Button>
        </DialogActions>
    </Dialog>
};

export default MyDialog;
