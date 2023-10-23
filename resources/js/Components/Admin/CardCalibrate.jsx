import { router } from '@inertiajs/react';
import React, { useState } from 'react'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    // key: '43b990a5bc74c642315a',
    key: '45d39f4664c31a6e0645',
    cluster: 'ap1',
    forceTLS: true
});

const CardCalibrate = ({ notif }) => {
    // console.log('notif', notif);
    const [calibrate, setCalibrate] = useState('ph')
    const [jumlah, setJumlah] = useState(3)
    const [maxJumlah, setMaxJumlah] = useState(15)
    const [iniSocket, setSocket] = useState('')

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [xy, setXY] = useState(0)
    const [x2, setX2] = useState(0)
    const [y2, setY2] = useState(0)
    const [a, setA] = useState()
    const [b, setB] = useState()

    window.Echo.channel('Sensor-Event').listen("SensorEvent", (event) => {
        setSocket(event.message);
    });

    const [value, setValue] = useState([
        { id: 1, real: '', analog: '' },
        { id: 2, real: '', analog: '' },
        { id: 3, real: '', analog: '' },
        { id: 4, real: '', analog: '' },
        { id: 5, real: '', analog: '' },
        { id: 6, real: '', analog: '' },
        { id: 7, real: '', analog: '' },
        { id: 8, real: '', analog: '' },
        { id: 9, real: '', analog: '' },
        { id: 10, real: '', analog: '' },
        { id: 11, real: '', analog: '' },
        { id: 12, real: '', analog: '' },
        { id: 13, real: '', analog: '' },
        { id: 14, real: '', analog: '' },
        { id: 15, real: '', analog: '' },
    ])
    // const [analog, setAnalog] = useState[[]]
    const handleCalibrate = (e) => {
        setCalibrate(e)
        setValue([
            { id: 1, real: '', analog: '' },
            { id: 2, real: '', analog: '' },
            { id: 3, real: '', analog: '' },
            { id: 4, real: '', analog: '' },
            { id: 5, real: '', analog: '' },
            { id: 6, real: '', analog: '' },
            { id: 7, real: '', analog: '' },
            { id: 8, real: '', analog: '' },
            { id: 9, real: '', analog: '' },
            { id: 10, real: '', analog: '' },
            { id: 11, real: '', analog: '' },
            { id: 12, real: '', analog: '' },
            { id: 13, real: '', analog: '' },
            { id: 14, real: '', analog: '' },
            { id: 15, real: '', analog: '' },
        ])

        setX(0)
        setY(0)
        setXY(0)
        setX2(0)
        setY2(0)
        setA(0)
        setB(0)
    }
    const handleTambah = () => {
        setJumlah(jumlah + 1)
    }

    console.log('socket : ', iniSocket);
    const handleKurang = () => {
        const updatedValue = value.map(item => {
            if (item.id === jumlah) {
                return { ...item, real: '', analog: '' };
            }
            return item;
        });

        setValue(updatedValue);
        setJumlah(jumlah - 1)
    }

    const [wew, setWew] = useState('')
    const HandleSubmiQuality = (e) => {
        const label = calibrate
        if (label == 'ph') {
            setWew(parseFloat(iniSocket.aPH))
        }
        if (label == 'tds') {
            setWew(parseFloat(iniSocket.aTDS))
        }
        if (label == 'suhu') {
            setWew(parseFloat(iniSocket.aSUHU))
        }
        if (label == 'sal') {
            setWew(parseFloat(iniSocket.aSAL))
        }
        if (label == 'amo') {
            setWew(parseFloat(iniSocket.aAMO))
        }
        const updatedValue = value.map(item => {
            if (item.id === e) {
                return { ...item, analog: wew };
            }
            return item;
        });

        setValue(updatedValue);
    }
    const handleInputChange = (e, id) => {
        const vv = parseFloat(e.target.value)
        const updatedValue = value.map(item => {
            if (item.id === id) {
                return { ...item, real: vv };
            }
            return item;
        });

        setValue(updatedValue);
    };

    const renderJumlah = () => {
        const formm = []
        for (let i = 0; i < jumlah; i++) {
            formm.push(
                <>
                    <div className="col-span-1 w-full mb-3 ">
                        <div className=" flex justify-between items-center w-full">
                            <label className="label">
                                <span className="label-text">Current Value {i + 1} : </span>
                            </label>
                            <div className="formm flex gap-2">
                                <input
                                    type="number"
                                    placeholder="input current value"
                                    className="input-profil w-full max-w-xs"
                                    value={value[i].real}
                                    onChange={(e) => handleInputChange(e, i + 1)} />
                                {value[i].analog ?
                                    <div className="analog p-3 lg:w-36 text-center bg-navy rounded-md text-gray-50">
                                        {value[i].analog}
                                    </div> : null
                                }
                                <button className={value[i].analog != '' ? "btn btn-circle btn-outline-yellow" : "btn btn-circle btn-outline-yellow"} onClick={() => HandleSubmiQuality(i + 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        return formm
    }
    const [rumus, setRumus] = useState(false)
    const handleCloseRumus = () => {
        setRumus(false)
    }
    const HandleCalibrate = () => {
        let totalx = 0;
        let totaly = 0;
        let totalxy = 0;
        let totalx2 = 0;
        let totaly2 = 0;

        for (let i = 0; i < jumlah; i++) {
            totalx += value[i].analog;
            totaly += value[i].real;
            totalxy += value[i].real * value[i].analog;
            totalx2 += value[i].analog * value[i].analog;
            totaly2 += value[i].real * value[i].real;
        }

        setX(totalx)
        setY(totaly)
        setXY(totalxy.toFixed(8))
        setX2(totalx2.toFixed(8))
        setY2(totaly2.toFixed(8))
        setA(((totaly * totalx2 - totalx * totalxy) / (jumlah * totalx2 - Math.pow(totalx, 2))).toFixed(8))
        setB(((jumlah * totalxy - totalx * totaly) / (jumlah * totalx2 - Math.pow(totalx, 2))).toFixed(8))
        setRumus(true)
    }

    const HandleSubmitCalibrate = () => {
        const data = {
            calibrate, a, b
        }
        // console.log('data', data);
        router.post('/calibrate', data)
    }
    return (
        <>
            <div className="mr-auto flex justify-center">
                <div className="card  card-calibrate card-compact lg:w-1/2 bg-base-100 border shadow-sm p-2 m-2 ">
                    {notif.message &&
                        <div className="alert flex justify-center">
                            <span>{notif.message}</span>
                        </div>
                    }
                    {/* <h1 className='text-center font-bold text-lg uppercase'>Calibrate Your Sensor</h1> */}
                    <div className="flex gap-2 justify-center mt-2 mb-4">
                        <div className="">
                            <button
                                className={calibrate === 'ph' ? "btn btn-yellow w-12" : "btn btn-outline-yellow w-12"}
                                onClick={() => handleCalibrate('ph')}>
                                ph
                            </button>
                        </div>
                        <div className="">
                            <button
                                className={calibrate === 'tds' ? "btn btn-yellow w-12" : "btn btn-outline-yellow w-12"}
                                onClick={() => handleCalibrate('tds')}>
                                tds
                            </button>
                        </div>
                        <div className="">
                            <button
                                className={calibrate === 'suhu' ? "btn btn-yellow w-12" : "btn btn-outline-yellow w-12"}
                                onClick={() => handleCalibrate('suhu')}>
                                Suhu
                            </button>
                        </div>
                        <div className="">
                            <button
                                className={calibrate === 'sal' ? "btn btn-yellow w-12" : "btn btn-outline-yellow w-12"}
                                onClick={() => handleCalibrate('sal')}>
                                sal
                            </button>
                        </div>
                        <div className="">
                            <button
                                className={calibrate === 'amo' ? "btn btn-yellow w-12" : "btn btn-outline-yellow w-12"}
                                onClick={() => handleCalibrate('amo')}>
                                amo
                            </button>
                        </div>
                    </div>
                    {renderJumlah()}
                    <div className="">
                        <div className="flex gap-2">
                            {jumlah >= maxJumlah ? "" :
                                <button
                                    className="btn btn-circle btn-sm btn-outline"
                                    onClick={() => handleTambah()}
                                >+</button>
                            }
                            {jumlah <= 3 ? "" :
                                <button
                                    className="btn btn-circle btn-sm btn-outline"
                                    onClick={() => handleKurang()}>-</button>
                            }
                        </div>
                        <div className={rumus == true ? "grid grid-cols-5 text-center mt-3" : "hidden"}>
                            <div className="col-span-5 p-3 ml-auto mr-auto border min-w-full rounded-md bg-slate-50">
                                <div className="flex justify-between p-2">
                                    <h2 className='uppercase font-bold'>Rumus</h2>
                                    <button className="btn btn-sm" onClick={() => handleCloseRumus()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {/* <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">x</div>
                                    <div className="col-span-3 border p-2">{x}</div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">y</div>
                                    <div className="col-span-3 border p-2">{y}</div>
                                </div> */}
                                {/* <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">xy</div>
                                    <div className="col-span-3 border p-2">{xy}</div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">x2</div>
                                    <div className="col-span-3 border p-2">{x2}</div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">y2</div>
                                    <div className="col-span-3 border p-2">{y2}</div>
                                </div> */}
                                {/* <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">a</div>
                                    <div className="col-span-3 border p-2">{a}</div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">b</div>
                                    <div className="col-span-3 border p-2">{b}</div>
                                </div> */}
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2 border p-2">y</div>
                                    <div className="col-span-3 border p-2 bg-green text-gray-50">{a} + {b}x</div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button className="btn btn-sm w-full mt-4" onClick={() => HandleCalibrate()}>Calibrate</button>
                            {a && b ?
                                <button className="btn btn-sm w-full btn-info mt-4" onClick={() => HandleSubmitCalibrate()}>Save</button>
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardCalibrate