import { ArrayField, ChipField, Datagrid, Edit, EditButton, EmailField, List, NumberField, NumberInput, ReferenceArrayField, ReferenceManyField, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, useResourceContext } from 'react-admin';

export interface System {
    id: string
    ID?: string
    ip?: string
    watchdog?: number
}

export function SystemList() {
    const resource = useResourceContext();
    return (
        <List sort={{ field: 'ID', order: 'ASC' }}>
            <Datagrid rowClick="edit" >
                <TextField source="ID" label="ID" />
                <TextField source="ip"/>
                <NumberField source="watchdog"/>
            </Datagrid>
        </List>
    );
}

export function SystemShow() {
    const resource = useResourceContext();
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="ID" label="ID" />
                <TextField source="ip"/>
                <NumberField source="watchdog"/>
            </SimpleShowLayout>
        </Show>
    );
}

export const SystemEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="ID" source="ID" />
            <TextInput source="ip"/>
            <NumberInput source="watchdog"/>
        </SimpleForm>
    </Edit>
);

export const SystemCreate = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="ID" source="ID" />
            <TextInput source="ip"/>
            <NumberInput source="watchdog"/>
        </SimpleForm>
    </Edit>
);