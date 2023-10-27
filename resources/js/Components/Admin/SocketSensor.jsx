import { ArcGauge, LinearGauge } from "@progress/kendo-react-gauges";
import { handler } from "daisyui";

import { useEffect, useState } from "react";


function SocketSensor({ sensor, latest }) {
    const [modal, setModal] = useState(false)
    const [labelModal, setLabelModal] = useState('')

    const handleModal = (e) => {
        setModal(true)
        setLabelModal(e)
    }
    const handleModalClose = () => {
        setModal(false)
    }

    const [condition, setCondition] = useState([
        { id: 1, name: "ph", fullName: "ph", from: 7.5, to: 8.5, kondisi: "", ket: "" },
        { id: 2, name: "tds", fullName: "TDS", from: 0, to: 800, kondisi: "", ket: "" },
        { id: 3, name: "suhu", fullName: "Suhu", from: 26, to: 28, kondisi: "", ket: "" },
        { id: 4, name: "sal", fullName: "Salinitas", from: 2, to: 12, kondisi: "", ket: "" },
        { id: 5, name: "amo", fullName: "Amonia", from: 0, to: 2, kondisi: "", ket: "" },
    ])

    const renderCondition = () => {
        const rr = "low"
        const nn = "normal"
        const tt = "high"

        condition.map((cc, index) => {
            if (cc.name == "ph") {
                if (sensor.value1 < cc.from || (!sensor && latest.value1 < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan penambahan kapur dengan dosis 2 - 5 ppm hingga nilai pH mencapai ≥ 7,5";
                } else if (sensor.value1 > cc.to || (!sensor && latest.value1 > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan penambahan molase (sumber karbon) dengan dosis 1 - 2 ppm hingga pH turun mencapai ≤ 8";
                } else if ((sensor.value1 <= cc.to && sensor.value1 >= cc.from) || (!sensor && latest.value1 <= cc.to && latest.value1 >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "tds") {
                if (sensor.value2 < cc.from || (!sensor && latest.value2 < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "Cek Kembali Kalibrasi Alat , TDS tidak mungkin 0";
                } else if (sensor.value2 > cc.to || (!sensor && latest.value2 > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan penambahan air baru sebanyak lebih dari 40% atau penggantian air baru";

                } else if ((sensor.value2 <= cc.to && sensor.value2 >= cc.from) || (!sensor && latest.value2 <= cc.to && latest.value2 >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "suhu") {
                if (sensor.value3 < cc.from || (!sensor && latest.value3 < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "Stabilkan suhu ruangan dengan rentang 26 - 28 Celcius";
                } else if (sensor.value3 > cc.to || (!sensor && latest.value3 > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "Pada suhu diatas batas toleransi tertinggi perlu dilakukan penambahan paranet sehingga naungan akan menstabilkan suhu di air <br /> Jika kolam berada di dalam ruangan lakukan penstablan suhu ruangan dengan rentang 26 - 28 Celcius";
                } else if ((sensor.value3 <= cc.to && sensor.value3 >= cc.from) || (!sensor && latest.value3 <= cc.to && latest.value3 >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "sal") {
                if (sensor.value4 < cc.from || (!sensor && latest.value4 < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan penambahan garam sebesar 1,5% dari total air kolam";
                } else if (sensor.value4 > cc.to || (!sensor && latest.value4 > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "dilakukan penambahan air setinggi batas air awal sebelum menguap ";
                } else if ((sensor.value4 <= cc.to && sensor.value4 >= cc.from) || (!sensor && latest.value4 <= cc.to && latest.value4 >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "amo") {
                if (sensor.value5 < cc.from || (!sensor && latest.value5 < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "dilakukan penambahan kecepatan aerasi > 0,5 kali dengan pemberian sumber Carbon molase 5% dari total pakan harian";
                } else if (sensor.value5 > cc.to || (!sensor && latest.value5 > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "dilakukan dengan peningkatan aerasi (pengadukkan > 0,5 kali, pada pH kurang dari 6,5, akan tetapi ketika pH >6,5 maka tidak perlau dilakukan pengadukkan, dengan tetap dipantau pertambahan amonianya)";
                } else if ((sensor.value5 <= cc.to && sensor.value5 >= cc.from) || (!sensor && latest.value5 <= cc.to && latest.value5 >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

        })
    }

    const renderModal = () => {
        return (
            <>
                <div className={modal == true ? "my-modal" : "my-modal-none"}>
                    <div className="item shadow-md pt-3 pb-3">
                        {condition.map((cc, index) => (
                            cc.name == labelModal &&
                            <>
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-bold uppercase">{cc.fullName}</h2>
                                    <button className="btn btn-sm btn-ghost" onClick={() => handleModalClose()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <hr className="m-3" />
                                <div className="grid grid-cols-6 items-center gap-3 p-3">
                                    <>
                                        <div className="col-span-2">Kondisi</div>
                                        <div className="col-span-1">:</div>
                                        <div className="col-span-3 ">
                                            {cc.kondisi == 'low' &&
                                                <>
                                                    <div className="LowCondition">
                                                        Rendah
                                                    </div>
                                                </>}
                                            {cc.kondisi == 'high' &&
                                                <>
                                                    <div className="HighCondition">
                                                        Tinggi
                                                    </div>
                                                </>}
                                            {cc.kondisi == 'normal' &&
                                                <>
                                                    <div className="NormalCondition">
                                                        Normal
                                                    </div>
                                                </>}
                                        </div>
                                    </>
                                    <>
                                        <div className="col-span-2">Aksi</div>
                                        <div className="col-span-1">:</div>
                                        <div className="col-span-3">
                                            <p className="text-justify capitalize">
                                                {cc.ket}
                                            </p>
                                        </div>
                                    </>
                                </div >
                            </>
                        ))}
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            {renderCondition()}
            {renderModal()}
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 justify-center all-sensor p-7 lg:mt-0 mt-5">
                {/* PH */}
                <div className="flex justify-center card bg-white shadow aspect-square">
                    <button
                        onClick={() => handleModal("ph")}
                        className={condition[0].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                            : condition[0].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {(condition[0].kondisi == 'high') || (condition[0].kondisi == 'low') ?
                                <span className="badge badge-sm indicator-item border-none bg-red-500">!</span> : ""
                            }
                        </div>
                    </button>

                    {/* <ArcGauge
                        className="gauge-socket"
                        value={!sensor.value1 ? latest.value1 / 14 * 100 : sensor.value1 / 14 * 100}
                        color="#00a6fb" /> */}
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value1 ? latest.value1 : sensor.value1}<small className="text-sm">pH</small></div>
                        {/* <div className="label-sensor uppercase">PH</div> */}
                    </div>
                </div>

                {/* TDS */}
                <div className="flex justify-center card bg-white shadow aspect-square">
                    <button
                        onClick={() => handleModal("tds")}
                        className={condition[1].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                            : condition[1].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[1].kondisi == 'high' || condition[1].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-none bg-red-500">!</span> : ""
                            }
                        </div>
                    </button>
                    {/* <ArcGauge
                        className="gauge-socket"
                        value={!sensor.value2 ? latest.value2 / 1000 * 100 : sensor.value2 / 1000 * 100}
                        color="#00a6fb" /> */}
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value2 ? latest.value2 : sensor.value2}<small className="text-sm">PPM</small></div>
                        {/* <div className="label-sensor uppercase">TDS</div> */}
                    </div>
                </div>

                {/* SUHU */}

                <div className="flex justify-center card bg-white shadow aspect-square">
                    <button
                        onClick={() => handleModal("suhu")}
                        className={condition[2].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                            : condition[2].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[2].kondisi == 'high' || condition[2].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-none bg-red-500">!</span> : ""
                            }
                        </div>
                    </button>
                    {/* <ArcGauge
                        className="gauge-socket"
                        value={!sensor.value3 ? latest.value3 / 50 * 100 : sensor.value3 / 50 * 100}
                        color="#00a6fb" /> */}
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value3 ? latest.value3 : sensor.value3}<small className="text-sm">Celcius</small></div>
                        {/* <div className="label-sensor uppercase">Suhu</div> */}
                    </div>
                </div>


                {/* SALINITAS */}
                <div className="flex justify-center card bg-white shadow aspect-square">
                    <button onClick={() => handleModal("sal")}
                        className={condition[3].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                            : condition[3].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[3].kondisi == 'high' || condition[3].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-none bg-red-500">!</span> : ""
                            }
                        </div>
                    </button>
                    {/* <ArcGauge className="gauge-socket" value={!sensor.value4 ? latest.value4 / 15 * 100 : sensor.value4 / 15 * 100} color="#00a6fb" /> */}
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value4 ? latest.value4 : sensor.value4}<small className="text-sm">PPT</small></div>
                        {/* <div className="label-sensor uppercase">Salinitas</div> */}
                    </div>
                </div>


                {/* AMONIA*/}
                <div className="flex justify-center card bg-white shadow aspect-square">
                    <button
                        onClick={() => handleModal("amo")}
                        className={condition[4].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                            : condition[4].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[4].kondisi == 'high' || condition[4].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-none bg-red-500">!</span> : ""
                            }
                        </div>
                    </button>
                    {/* <ArcGauge className="gauge-socket" value={!sensor.value5 ? latest.value5 / 100 * 100 : sensor.value5 / 5 * 100} color="#00a6fb" /> */}
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value5 ? latest.value5 : sensor.value5}<small className="text-sm">mg/L</small></div>
                        {/* <div className="label-sensor uppercase">AMONIA</div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SocketSensor