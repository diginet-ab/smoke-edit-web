import React, { useEffect, useState } from 'react';
import { NumberInput, SimpleForm, TextInput, useDataProvider } from 'react-admin';
import { Form } from 'react-final-form';
import {
    Box, IconButton, Modal
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { RecordFetcher } from './Dashboard';
import { System } from './Systems';

interface FormValues {
    [key: string]: any; // Replace 'any' with more specific type based on your data structure
}

interface EditSystemProps {
    initialData?: FormValues;
    handleSave: (data: any) => any
}

const EditSystem: React.FC<EditSystemProps> = ({ initialData, handleSave }) => {
    const dataProvider = useDataProvider();
    const [record] = useState<FormValues>(initialData || {});

    const save = async (values: FormValues) => {
        // Define how to save your data.
        console.log('Form Values:', values);
        // Implement your save logic here, e.g., calling `dataProvider.update`
        handleSave(values)
    };

    return (
        <SimpleForm onSubmit={save}>
            <TextInput label="ID" source="ID" />
            <TextInput source="ip" />
            <NumberInput source="watchdog" />
        </SimpleForm>
    );
};

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

export const EditSystemModal = ({ createNew, open, onClose, systemId }: any) => {
    let openNow = open
    const dataProvider = useDataProvider()
    const [useSystemId, setUseSystemId] = useState(systemId)
    useEffect(() => {
        const createSystem = async () => {
            const res = await dataProvider.create<System>('systems', { data: {ID: 'new one'}})
            setUseSystemId(res.data.id)
            return () => { }
        }
        if (open && createNew)
            createSystem().catch(console.error)
    }, [dataProvider, open])
    if (!createNew) {
        if (systemId !== useSystemId)
            setUseSystemId(systemId)
        if (open && useSystemId)
            openNow = true
    }
    const handleSave = async (data: System) => {
        const res = await dataProvider.update<System>('systems', { id: useSystemId, data, previousData: undefined})
        onClose()
    }
    const handleOnClose = () => {        
    }
    return (open && useSystemId) ? <Modal
        open={open}
        //onClose={handleOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <IconButton onClick={onClose} >
                <CloseIcon  onClick={onClose}  />
            </IconButton>
            <RecordFetcher id={useSystemId} resource="systems" recordProp="initialData">
                <EditSystem handleSave={handleSave} />
            </RecordFetcher>
        </Box>
    </Modal> : null
}

export default EditSystem;
