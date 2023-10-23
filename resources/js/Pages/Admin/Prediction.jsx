import Jumbotron from '@/Components/Admin/Jumbotron';
import Navbar from '@/Components/Admin/Navbar';
import SocketSensor from '@/Components/Admin/SocketSensor';
import TableItem from '@/Components/Admin/TableItem';
import { Link, Head } from '@inertiajs/react';

export default function Prediction(props) {
    return (
        <>
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <div className="lg:p-6 mr-auto">
                    <div className="card bg-base-100 border shadow-sm p-2 m-2">
                        <div className="p-3 flex justify-center">
                            <h1>THIS IS PREDICTION</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
