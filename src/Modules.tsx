import { ArrayField, ChipField, Datagrid, Edit, EditButton, EmailField, FunctionField, List, NumberField, NumberInput, ReferenceArrayField, ReferenceManyField, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, useListContext, useResourceContext, useTranslate } from 'react-admin';
import {
    Typography, Stack
} from '@mui/material'
import parse from 'html-react-parser'

export interface Module {
    id: string
    ID?: string
    type?: string
}

export interface EthernetModule extends Module {
    ip: string
    subNetMask: string;
}

export interface CentralModule extends EthernetModule {
    watchdog: number
    pinCode: string
    language: string
}

export interface SioxModule extends Module {
    group: number
    address: number
}

const getSettings = (module: any) => {
    let result = ''
    if (module.ip !== undefined)
        result += `IP: ${module.ip}`
    if (module.group !== undefined)
        result += `Group: ${module.group} | Address: ${module.address}`
    return result
};

export function ModuleList() {
    const t = useTranslate();
    return (
        <List emptyWhileLoading sort={{ field: 'ID', order: 'ASC' }}>
            <Datagrid rowClick="show" >
                <TextField source="ID" label="ID" />
                <TextField source="type"/>
                <FunctionField label={t('resources.modules.fields.settings')} render={(record: any) => { return `${getSettings(record)}`}} />
            </Datagrid>
        </List>
    );
}

export function ModuleShow() {
    const resource = useResourceContext();
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="ID" label="ID" />
                <TextField source="type" />
                <NumberField source="group" />
                <NumberField source="address" />
            </SimpleShowLayout>
        </Show>
    );
}

export const ModuleEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="ID" source="ID" />
            <TextInput source="type" />
            <NumberInput source="group" />
            <NumberInput source="address" />
        </SimpleForm>
    </Edit>
);