import CardProfil from '@/Components/Admin/CardProfil';
import Jumbotron from '@/Components/Admin/Jumbotron';
import Navbar from '@/Components/Admin/Navbar';
import { Link, Head } from '@inertiajs/react';
import Footer from './Footer';

export default function Profil(props) {
    return (
        <>
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <CardProfil auth={props.auth} errors={props.errors} notif={props.flash} />
                <Footer />
            </div>
        </>
    );
}
