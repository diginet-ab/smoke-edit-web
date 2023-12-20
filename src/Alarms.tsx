import { ArrayField, ChipField, Datagrid, Edit, EditButton, EmailField, List, NumberField, NumberInput, ReferenceArrayField, ReferenceManyField, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, useResourceContext } from 'react-admin';

export interface Alarm {
    id: string
    ID?: string
    module?: string
    input?: number
}

export function AlarmList() {
    const resource = useResourceContext();
    return (
        <List sort={{ field: 'ID', order: 'ASC' }}>
            <Datagrid rowClick="edit" >
                <TextField source="ID" label="ID" />
                <TextField source="module"/>
                <NumberField source="input"/>
            </Datagrid>
        </List>
    );
}

export function AlarmShow() {
    const resource = useResourceContext();
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="ID" label="ID" />
            </SimpleShowLayout>
        </Show>
    );
}

export const AlarmEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="ID" source="ID" />
        </SimpleForm>
    </Edit>
);