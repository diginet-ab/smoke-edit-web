import { Menu, useDataProvider, useGetList, useTranslate } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import { useEffect, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { MultiLevelMenu } from '@react-admin/ra-navigation'

export function MyMenu() {
    const t = useTranslate()
    const dataProvider = useDataProvider()
    const resourcesList = ['systems', 'fireDampers', 'fireCells', 'alarms', 'modules']
    const queries: { [key: string]: UseQueryResult<number> } = {}
    resourcesList.map(r => {
        queries[r] = useQuery({
            queryKey: ['resource.' + r], queryFn: async () => {
                const data = await dataProvider.getList(r, { filter: {}, pagination: { page: 1, perPage: 1 }, sort: { field: 'id', order: 'ASC' } })
                return data.total ?? 0
            }
        })
    })
    const getTotalCount = () => {
        const result = Object.values(queries).reduce((previous, current, index, array) => {
            return previous + (current.data ? current.data : 0)
        }, 0)
        return result
    }
    return (
        <MultiLevelMenu>
            <Menu.DashboardItem />
            { getTotalCount() ? <MultiLevelMenu.Item name="items" label={t('root.items')}>
                {resourcesList.map(r => {
                    //return queries[r].data ? <Menu.ResourceItem key={r} name={r} /> : undefined
                    return <Menu.ResourceItem key={r} name={r} />
                })}
            </MultiLevelMenu.Item> : undefined }
            {/*
            <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />} placeholder={undefined} />
            */}
        </MultiLevelMenu>
    );
}