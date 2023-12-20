import { ArrayField, ChipField, Datagrid, Edit, EmailField, List, NumberField, NumberInput, ReferenceArrayField, Show, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput, useResourceContext } from 'react-admin';

export interface FireCell {
    id: string
    ID?: string
    fireDampers?: string[]
}

export function FireCellList() {
    const resource = useResourceContext();
    return (
        <List sort={{ field: 'ID', order: 'ASC' }}>
            <Datagrid rowClick="show">
                <TextField source="ID" label="ID" />
                <ReferenceArrayField source="fireDampers" reference='fireDampers' />
            </Datagrid>
        </List>
    );
}

export function FireCellShow() {
    const resource = useResourceContext();
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="ID" label="ID" />
                <ReferenceArrayField source="fireDampers" reference='fireDampers' />
            </SimpleShowLayout>
        </Show>
    );
}

export const FireCellEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput label="ID" source="ID" />
            <ReferenceArrayField source="fireDampers" reference='fireDampers' />
        </SimpleForm>
    </Edit>
);