import { ArrayField, ChipField, Datagrid, Edit, EditButton, EmailField, List, NumberField, NumberInput, ReferenceArrayField, ReferenceManyField, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, useResourceContext } from 'react-admin';

export interface Project {
    id: string
    name: string
}

export function ProjectList() {
    const resource = useResourceContext();
    return (
        <List sort={{ field: 'ID', order: 'ASC' }}>
            <Datagrid rowClick="edit" >
                <TextField source="name" />
            </Datagrid>
        </List>
    );
}

export function ProjectShow() {
    const resource = useResourceContext();
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="name" />
            </SimpleShowLayout>
        </Show>
    );
}

export const ProjectEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const ProjectCreate = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);