import Graph from '@/Components/Admin/Graph';
import Jumbotron from '@/Components/Admin/Jumbotron';
import Navbar from '@/Components/Admin/Navbar';
import SocketSensor from '@/Components/Admin/SocketSensor';
import { Link, Head } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Footer from './Footer';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    // key: '43b990a5bc74c642315a',
    key: '45d39f4664c31a6e0645',
    cluster: 'ap1',
    forceTLS: true
});

const options = {
    type: 'line',
    responsive: true,
    plugins: {
        legend: {
            // position: 'top',
        },
        title: {
            display: true,
            // text: "iniTitle",
        },
        filler: {
            propagate: true
        }
    },
    interaction: {
        intersect: true,
    },
};

export default function Home(props) {
    const [iniSocket, setSocket] = useState('')
    const [modal, setModal] = useState(false)
    const [sensor, setSensor] = useState(props.allSensor)
    const [realDataPH, setRealDataPH] = useState([])
    const [realDataTDS, setRealDataTDS] = useState([])
    const [realDataSUHU, setRealDataSUHU] = useState([])
    const [realDataSAL, setRealDataSAL] = useState([])
    const [realDataAMO, setRealDataAMO] = useState([])
    const base_url = props.base_url

    const data = {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',],
        datasets: [
            {
                label: 'pH',
                data: realDataPH,
                borderColor: '#ffb703',
                backgroundColor: '#ffb703',
                tension: 0.5,
                // fill: true,
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'TDS',
                data: realDataTDS,
                borderColor: '#fb8500',
                backgroundColor: '#fb8500',
                tension: 0.5,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'Suhu',
                data: realDataSUHU,
                borderColor: '#023047',
                backgroundColor: '#023047',
                tension: 0.5,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'Salinitas',
                data: realDataSAL,
                borderColor: '#219ebc',
                backgroundColor: '#219ebc',
                tension: 0.5,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'Amonia',
                data: realDataAMO,
                borderColor: '#8ecae6',
                backgroundColor: '#8ecae6',
                tension: 0.5,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
        ],
    };
    const getRealDataPH = useCallback(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
            newData.push(sensor[i].value1);
        }
        return newData;
    }, [sensor])

    const getRealDataTDS = useCallback(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
            newData.push(sensor[i].value2)
        }
        console.log('amo', newData);
        return newData;
    }, [sensor])
    const getRealDataSUHU = useCallback(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
            newData.push(sensor[i].value3)
        }
        return newData;
    }, [sensor])
    const getRealDataSAL = useCallback(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
            newData.push(sensor[i].value4)
        }
        return newData;
    }, [sensor])
    const getRealDataAMO = useCallback(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
            newData.push(sensor[i].value5)
        }
        return newData;
    }, [sensor])

    useEffect(() => {
        const value1 = getRealDataPH()
        const value2 = getRealDataTDS()
        const value3 = getRealDataSUHU()
        const value4 = getRealDataSAL()
        const value5 = getRealDataAMO()
        setRealDataPH(value1)
        setRealDataTDS(value2)
        setRealDataSUHU(value3)
        setRealDataSAL(value4)
        setRealDataAMO(value5)
        // setRealData(newData);
    }, [sensor])


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        LineController,
        Filler,
        Title,
        Tooltip,
        Legend
    );

    window.Echo.channel('Sensor-Event').listen("SensorEvent", (event) => {
        setSocket(event.message);

        if (event.message) {
            for (let i = 0; i < 19; i++) {
                setRealDataPH(prevRealDataPH => {
                    const newData = [...prevRealDataPH];
                    newData[i] = realDataPH[i + 1];
                    return newData;
                });
                setRealDataTDS(prevRealDataTDS => {
                    const newData = [...prevRealDataTDS];
                    newData[i] = realDataTDS[i + 1];
                    return newData;
                });
                setRealDataSUHU(prevRealDataSUHU => {
                    const newData = [...prevRealDataSUHU];
                    newData[i] = realDataSUHU[i + 1];
                    return newData;
                });
                setRealDataSAL(prevRealDataSAL => {
                    const newData = [...prevRealDataSAL];
                    newData[i] = realDataSAL[i + 1];
                    return newData;
                });
                setRealDataAMO(prevRealDataAMO => {
                    const newData = [...prevRealDataAMO];
                    newData[i] = realDataAMO[i + 1];
                    return newData;
                });

            }
            setRealDataPH(prevRealDataPH => {
                const newData = [...prevRealDataPH];
                newData[19] = event.message.value1;
                return newData;
            });
            setRealDataTDS(prevRealDataTDS => {
                const newData = [...prevRealDataTDS];
                newData[19] = event.message.value2;
                return newData;
            });
            setRealDataSUHU(prevRealDataSUHU => {
                const newData = [...prevRealDataSUHU];
                newData[19] = event.message.value3;
                return newData;
            });
            setRealDataSAL(prevRealDataSAL => {
                const newData = [...prevRealDataSAL];
                newData[19] = event.message.value4;
                return newData;
            });
            setRealDataAMO(prevRealDataAMO => {
                const newData = [...prevRealDataAMO];
                newData[19] = event.message.value5;
                return newData;
            });
        }
    });


    const renderModal = () => {
        return (
            <>
                <div className={modal == true ? "chartModal" : "chartModal-off"}>
                    <div className="item shadow-xl">
                        <div className="flex justify-between">
                            <h1 className='text-lg uppercase font-bold'>Real Time Grafik</h1>
                            <button onClick={() => setModal(false)} className='btn btn-ghost btn-circle'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="lg:flex justify-center hidden">
                            <Line options={options} data={data} height={50} width={100} />
                        </div>
                        <div className="flex justify-center lg:hidden">
                            <Line options={options} data={data} height={200} width={100} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {renderModal()}
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <div className="flex justify-between mt-3 lg:ml-7 lg:mr-7 pl-5 pr-5">
                    <div className={!iniSocket ? "disconnected" : "connected"}></div>
                    <button onClick={() => setModal(true)} className="btn bg-white btn-ghost shadow-lg flex items-center">
                        grafik realtime
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                        </svg>
                    </button>
                </div>
                <div className="lg:p-6 mr-auto">
                    <SocketSensor sensor={iniSocket} latest={props.sensor} />
                    <Graph base_url={base_url} />
                </div>
                <Footer />
            </div >
        </>
    );
}
