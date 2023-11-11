import Jumbotron from '@/Components/Admin/Jumbotron';
import Navbar from '@/Components/Admin/Navbar';
import SocketSensor from '@/Components/Admin/SocketSensor';
import TableItem from '@/Components/Admin/TableItem';
import { Link, Head } from '@inertiajs/react';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function AllTable(props) {
    const [allData, setAllData] = useState()
    const base_url = props.base_url;
    console.log(base_url);
    const getAllData = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `${base_url}/sensor`,
            });
            if (data.data.data) {
                console.log(data.data.data.sensor);
                setAllData(data.data.data.sensor)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllData()
    }, [])
    return (
        <>
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <div className="lg:p-6 mr-auto">
                    <div className="flex justify-between items-center pl-6 pr-6">
                        <div className="text-section flex items-center">
                            <small className='mr-3 '>Total Data</small>
                            <h1 className='text-2xl  font-bold'>
                                {props.jumlahData}
                            </h1>
                        </div>
                        {props.flash.delete &&
                            <div className='bg-lime-500 p-2 rounded-lg text-white'>{props.flash.delete}</div>
                        }
                    </div>
                    {allData ?
                        <TableItem notif={props.flash} sensor={allData} />
                        :
                        <>
                            <div className="flex justify-center items-center card bg-white border shadow-lg p-4 m-2 h-96">
                                <ThreeCircles
                                    height="70"
                                    width="70"
                                    color="rgb(210, 210, 210)"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="three-circles-rotating"
                                    outerCircleColor=""
                                    innerCircleColor=""
                                    middleCircleColor=""
                                />
                            </div>
                        </>
                    }
                </div>
                <Footer />
            </div>
        </>
    );
}
