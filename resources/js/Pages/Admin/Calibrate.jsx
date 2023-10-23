import CardCalibrate from '@/Components/Admin/CardCalibrate';
import Jumbotron from '@/Components/Admin/Jumbotron';
import Navbar from '@/Components/Admin/Navbar';
import { Link, Head } from '@inertiajs/react';
import Footer from './Footer';

export default function Calibrate(props) {
    console.log('props : ', props);
    return (
        <>
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <div className="lg:p-6 mr-auto">
                    <CardCalibrate notif={props.flash} />
                </div>
                <Footer />
            </div>
        </>
    );
}
