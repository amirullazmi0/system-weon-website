import { ArcGauge, LinearGauge } from "@progress/kendo-react-gauges";
import { handler } from "daisyui";

import { useEffect, useState } from "react";


function SocketSensor({ sensor, latest }) {
    const [condition, setCondition] = useState([
        { id: 1, name: "ph", fullName: "ph", from: 7.5, to: 8.5, kondisi: "", ket: "" },
        { id: 2, name: "tds", fullName: "TDS", from: 0, to: 800, kondisi: "", ket: "" },
        { id: 3, name: "suhu", fullName: "Suhu", from: 26, to: 28, kondisi: "", ket: "" },
        { id: 4, name: "sal", fullName: "Salinitas", from: 2, to: 12, kondisi: "", ket: "" },
        { id: 5, name: "amo", fullName: "Amonia", from: 0, to: 1, kondisi: "", ket: "" },
    ])

    const renderCondition = () => {
        const rr = "low"
        const nn = "normal"
        const tt = "high"

        condition.map((cc, index) => {
            if (cc.name == "ph") {
                if (sensor.value1 < cc.from || (!sensor && latest.value1.toFixed(2) < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan kapur dengan dosis 2 - 5 ppm hingga nilai pH mencapai ≥ 7,5 atau lakukan penambahan air netral hingga pH mencapai ≥ 7,5";
                } else if (sensor.value1 > cc.to || (!sensor && latest.value1.toFixed(2) > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan molase (sumber karbon) dengan dosis 1 – 2 PPM hingga pH turun mencapai ≤ 8";
                } else if ((sensor.value1 <= cc.to && sensor.value1 >= cc.from) || (!sensor && latest.value1.toFixed(2) <= cc.to && latest.value1.toFixed(2) >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "tds") {
                if (sensor.value2 < cc.from || (!sensor && latest.value2.toFixed(2) < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "Cek Kembali Kalibrasi Alat , TDS tidak mungkin 0";
                } else if (sensor.value2 > cc.to || (!sensor && latest.value2.toFixed(2) > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan air baru sebanyak > 40% atau pergantian air baru.";

                } else if ((sensor.value2 <= cc.to && sensor.value2 >= cc.from) || (!sensor && latest.value2.toFixed(2) <= cc.to && latest.value2.toFixed(2) >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "suhu") {
                if (sensor.value3 < cc.from || (!sensor && latest.value3.toFixed(2) < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "Stabilkan suhu ruangan dengan rentang 26 - 28 Celcius";
                } else if (sensor.value3 > cc.to || (!sensor && latest.value3.toFixed(2) > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan penambahan paranet sehingga air tidak mengalami kenaikan suhu berlebih dan dapat menstabilkan suhu air. Jika suhu air luar toleransi dan kolam berapa didalam ruangan maka lakukan penstabilan suhu ruangan dengan rentang 26 – 28 derajat celcius.";
                } else if ((sensor.value3 <= cc.to && sensor.value3 >= cc.from) || (!sensor && latest.value3.toFixed(2) <= cc.to && latest.value3.toFixed(2) >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "sal") {
                if (sensor.value4 < cc.from || (!sensor && latest.value4.toFixed(2) < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan garam sebesar 1,5% dari total air kolam";
                } else if (sensor.value4 > cc.to || (!sensor && latest.value4.toFixed(2) > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "dilakukan tindakan penambahan air setinggi batas air awal sebelum menguap";
                } else if ((sensor.value4 <= cc.to && sensor.value4 >= cc.from) || (!sensor && latest.value4.toFixed(2) <= cc.to && latest.value4.toFixed(2) >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

            if (cc.name == "amo") {
                if (sensor.value5 < cc.from || (!sensor && latest.value5.toFixed(2) < cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan penambahan kecepatan aerasi > 0,5 kali dengan pemberian sumber Carbon molase 5% dari total pakan harian";
                } else if (sensor.value5 > cc.to || (!sensor && latest.value5.toFixed(2) > cc.to)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan dengan peningkatan aerasi (pengadukkan > 0,5 kali, pada pH kurang dari 6,5, akan tetapi ketika pH >6,5 maka tidak perlau dilakukan pengadukkan, dengan tetap dipantau pertambahan amonianya)";
                } else if ((sensor.value5 <= cc.to && sensor.value5 >= cc.from) || (!sensor && latest.value5.toFixed(2) <= cc.to && latest.value5.toFixed(2) >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "-";
                }
            }

        })
    }

    return (
        <>
            {renderCondition()}
            <div className="grid grid-cols-2 lg:gap-5 gap-3 md:grid-cols-3 lg:grid-cols-5 justify-center all-sensor lg:p-5 p-3 lg:mt-0 mt-5">
                {/* PH */}
                <div className="flex justify-center  card bg-white shadow-xl border aspect-square">
                    <div className="absolute top-0 left-0 p-4 font-bold lg:text-xl text-lg">pH</div>
                    <button
                        // onClick={() => handleModal("ph")}
                        className={condition[0].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                            : condition[0].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {(condition[0].kondisi == 'high') || (condition[0].kondisi == 'low') ?
                                <span className="badge badge-sm indicator-item border-white bg-[#ff2e2e]">

                                </span> : <span className="badge badge-sm indicator-item border-white bg-[#5ad13d]"></span>
                            }
                        </div>
                    </button>
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value1 ? latest.value1.toFixed(2).toFixed(2) : sensor.value1}<small className="text-sm">pH</small></div>
                    </div>
                </div>

                {/* TDS */}
                <div className="flex justify-center  card bg-white shadow-xl border aspect-square">
                    <div className="absolute top-0 left-0 p-4 font-bold lg:text-xl text-lg">TDS</div>
                    <button
                        // onClick={() => handleModal("tds")}
                        className={condition[1].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                            : condition[1].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[1].kondisi == 'high' || condition[1].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-white bg-[#ff2e2e]"></span> : <span className="badge badge-sm indicator-item border-white bg-[#5ad13d]"></span>
                            }
                        </div>
                    </button>
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value2 ? latest.value2.toFixed(2) : sensor.value2}<small className="text-sm">PPM</small></div>
                    </div>
                </div>

                {/* SUHU */}

                <div className="flex justify-center  card bg-white shadow-xl border aspect-square">
                    <div className="absolute top-0 left-0 p-4 font-bold lg:text-xl text-lg">Suhu</div>
                    <button
                        // onClick={() => handleModal("suhu")}
                        className={condition[2].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                            : condition[2].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[2].kondisi == 'high' || condition[2].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-white bg-[#ff2e2e]"></span> : <span className="badge badge-sm indicator-item border-white bg-[#5ad13d]"></span>
                            }
                        </div>
                    </button>
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value3 ? latest.value3.toFixed(2) : sensor.value3}<small className="text-sm">Celcius</small></div>
                    </div>
                </div>


                {/* SALINITAS */}
                <div className="flex justify-center  card bg-white shadow-xl border aspect-square">
                    <div className="absolute top-0 left-0 p-4 font-bold lg:text-xl text-lg">Salinitas</div>
                    <button
                        // onClick={() => handleModal("sal")}
                        className={condition[3].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                            : condition[3].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[3].kondisi == 'high' || condition[3].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-white bg-[#ff2e2e]"></span> : <span className="badge badge-sm indicator-item border-white bg-[#5ad13d]"></span>
                            }
                        </div>
                    </button>
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value4 ? latest.value4.toFixed(2) : sensor.value4}<small className="text-sm">PPT</small></div>
                    </div>
                </div>


                {/* AMONIA*/}
                <div className="flex justify-center  card bg-white shadow-xl border aspect-square">
                    <div className="absolute top-0 left-0 p-4 font-bold lg:text-xl text-lg">Amonia</div>
                    <button
                        // onClick={() => handleModal("amo")}
                        className={condition[4].kondisi == 'normal'
                            ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                            : condition[4].kondisi == 'low'
                                ? "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                                : "absolute rounded-none btn-square btn btn-alert shadow-lg top-0 right-0 z-10"
                        }>
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            {condition[4].kondisi == 'high' || condition[4].kondisi == 'low' ?
                                <span className="badge badge-sm indicator-item border-white bg-[#ff2e2e]"></span> : <span className="badge badge-sm indicator-item border-white bg-[#5ad13d]"></span>
                            }
                        </div>
                    </button>
                    <div className="grid justify-center items-center">
                        < div className="lg:text-5xl md:text-4xl text-3xl">{!sensor.value5 ? latest.value5.toFixed(2) : sensor.value5}<small className="text-sm">mg/L</small></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SocketSensor