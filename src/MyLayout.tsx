import { Layout } from 'react-admin';

import { MyMenu } from './MyMenu';
import { AppLocationContext } from '@react-admin/ra-navigation';

export function MyLayout(props: any) {
    return <AppLocationContext>
        <Layout {...props} menu={MyMenu} />
    </AppLocationContext>;
}