import { ArrayField, ChipField, Datagrid, Edit, EditButton, EmailField, List, NumberField, NumberInput, ReferenceArrayField, ReferenceManyField, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, useResourceContext } from 'react-admin';

export interface FireDamper {
    id: string
    ID?: string
    type?: string
    fireCells?: string[]
    group?: number
    address?: number
}

export function FireDamperList() {
    const resource = useResourceContext();
    return (
        <List sort={{ field: 'ID', order: 'ASC' }}>
            <Datagrid rowClick="edit" >
                <TextField source="ID" label="ID" />
                <TextField source="type" />
                <ReferenceArrayField source="fireCells" reference='fireCells' />
                <NumberField source="group" />
                <NumberField source="address" />
            </Datagrid>
        </List>
    );
}

export function FireDamperShow() {
    const resource = useResourceContext();
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="ID" label="ID" />
                <TextField source="type" />
                <ReferenceArrayField source="fireCells" reference='fireCells' />
                <NumberField source="group" />
                <NumberField source="address" />
            </SimpleShowLayout>
        </Show>
    );
}

export const FireDamperEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="ID" source="ID" />
            <TextInput source="type" />
            <ReferenceArrayField source="fireCells" reference='fireCells' />
            <NumberInput source="group" />
            <NumberInput source="address" />
        </SimpleForm>
    </Edit>
);