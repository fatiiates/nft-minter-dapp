import Layout from '@/components/layout';
import Wallet from '@/components/wallet';
import { useTitle } from '@/utils/head';

export default function Home() {
    return (
        <Layout title={useTitle()} >
            <Wallet />
        </Layout>
    );
}
