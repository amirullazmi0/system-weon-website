import Graph from '@/Components/Admin/Graph';
import Jumbotron from '@/Components/Admin/Jumbotron';
import Navbar from '@/Components/Admin/Navbar';
import { Link, Head } from '@inertiajs/react';
import Footer from './Footer';

export default function Chart(props) {
    const base_url = props.base_url
    return (
        <>
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <div className="lg:p-6 mr-auto">
                    <div className="p-3 font-bold">GRAFIK HISTORI</div>
                    <Graph base_url={base_url} />
                </div>
                <Footer />
            </div>
        </>
    );
}