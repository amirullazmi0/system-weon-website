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
import CardChartRealtime from '@/Components/Admin/CardChartRealtime';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    // key: '43b990a5bc74c642315a',
    key: '45d39f4664c31a6e0645',
    cluster: 'ap1',
    forceTLS: true
});


export default function Home(props) {
    const [iniSocket, setSocket] = useState('')
    const [sensor, setSensor] = useState(props.allSensor)
    const [realDataPH, setRealDataPH] = useState([])
    const [realDataTDS, setRealDataTDS] = useState([])
    const [realDataSUHU, setRealDataSUHU] = useState([])
    const [realDataSAL, setRealDataSAL] = useState([])
    const [realDataAMO, setRealDataAMO] = useState([])
    const base_url = props.base_url

    const getRealDataPH = useCallback(() => {
        const newData = [];
        for (let i = 0; i < sensor.length; i++) {
            newData.push(sensor[i].value1);
        }
        return newData;
    }, [sensor])

    const getRealDataTDS = useCallback(() => {
        const newData = [];
        for (let i = 0; i < sensor.length; i++) {
            newData.push(sensor[i].value2)
        }
        return newData;
    }, [sensor])
    const getRealDataSUHU = useCallback(() => {
        const newData = [];
        for (let i = 0; i < sensor.length; i++) {
            newData.push(sensor[i].value3)
        }
        return newData;
    }, [sensor])
    const getRealDataSAL = useCallback(() => {
        const newData = [];
        for (let i = 0; i < sensor.length; i++) {
            newData.push(sensor[i].value4)
        }
        return newData;
    }, [sensor])
    const getRealDataAMO = useCallback(() => {
        const newData = [];
        for (let i = 0; i < sensor.length; i++) {
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
            for (let i = 0; i < sensor.length - 1; i++) {
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
                newData[sensor.length - 1] = event.message.value1;
                return newData;
            });
            setRealDataTDS(prevRealDataTDS => {
                const newData = [...prevRealDataTDS];
                newData[sensor.length - 1] = event.message.value2;
                return newData;
            });
            setRealDataSUHU(prevRealDataSUHU => {
                const newData = [...prevRealDataSUHU];
                newData[sensor.length - 1] = event.message.value3;
                return newData;
            });
            setRealDataSAL(prevRealDataSAL => {
                const newData = [...prevRealDataSAL];
                newData[sensor.length - 1] = event.message.value4;
                return newData;
            });
            setRealDataAMO(prevRealDataAMO => {
                const newData = [...prevRealDataAMO];
                newData[sensor.length - 1] = event.message.value5;
                return newData;
            });
        }
    });

    return (
        <>
            <div className='bg-body'>
                <Head title={props.title} />
                <Navbar auth={props.auth} active={props.active} />
                <Jumbotron />
                <div className="flex justify-between mt-3 lg:ml-7 lg:mr-7 pl-5 pr-5">
                    <div className={!iniSocket ? "disconnected" : "connected"}></div>
                </div>
                <div className="lg:p-6 mr-auto">
                    <SocketSensor sensor={iniSocket} latest={props.sensor} />
                    <CardChartRealtime
                        title={'Data Realtime pH'}
                        label={'ph'}
                        name={'ph'}
                        batasMaksimum={8.5}
                        batasMinimum={7.5}
                        data={realDataPH} />
                    <CardChartRealtime
                        title={'Data Realtime TDS'}
                        label={'TDS'}
                        name={'tds'}
                        batasMaksimum={800}
                        batasMinimum={0}
                        data={realDataTDS} />
                    <CardChartRealtime
                        title={'Data Realtime Suhu'}
                        label={'Suhu'}
                        name={'suhu'}
                        batasMaksimum={28}
                        batasMinimum={26}
                        data={realDataSUHU} />
                    <CardChartRealtime
                        title={'Data Realtime Salinitas'}
                        label={'Salinitas'}
                        name={'sal'}
                        batasMaksimum={12}
                        batasMinimum={2}
                        data={realDataSAL} />
                    <CardChartRealtime
                        title={'Data Realtime Amonia'}
                        label={'Amonia'}
                        name={'amo'}
                        batasMaksimum={1}
                        batasMinimum={0}
                        data={realDataAMO} />
                    {/* <Graph base_url={base_url} /> */}
                </div>
                <Footer />
            </div >
        </>
    );
}
