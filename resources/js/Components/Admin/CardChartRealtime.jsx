import React, { useState, useEffect, useMemo } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const CardChartRealtime = ({ title, label, batasMaksimum, batasMinimum, data, name }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const [condition, setCondition] = useState([
        { id: 1, name: "ph", fullName: "ph", from: batasMinimum, to: batasMaksimum, kondisi: "", ket: "" },
        { id: 2, name: "tds", fullName: "TDS", from: batasMinimum, to: batasMaksimum, kondisi: "", ket: "" },
        { id: 3, name: "suhu", fullName: "Suhu", from: batasMinimum, to: batasMaksimum, kondisi: "", ket: "" },
        { id: 4, name: "sal", fullName: "Salinitas", from: batasMinimum, to: batasMaksimum, kondisi: "", ket: "" },
        { id: 5, name: "amo", fullName: "Amonia", from: batasMinimum, to: batasMaksimum, kondisi: "", ket: "" },
    ])

    const renderCondition = useMemo(() => {
        const rr = "low"
        const nn = "normal"
        const tt = "high"

        condition.map((cc, index) => {
            if (cc.name == "ph") {
                if (data[data.length - 1] < cc.from) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan kapur dengan dosis 2 - 5 ppm hingga nilai pH mencapai ≥ 7,5 atau lakukan penambahan air netral hingga pH mencapai ≥ 7,5";
                } else if (data[data.length - 1] > cc.to) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan molase (sumber karbon) dengan dosis 1 – 2 PPM hingga pH turun mencapai ≤ 8";
                } else if ((data[data.length - 1] <= cc.to && data[data.length - 1] >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "Normal";
                }
            }

            if (cc.name == "tds") {
                if (data[data.length - 1] < cc.from) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "Cek Kembali Kalibrasi Alat , TDS tidak mungkin 0";
                } else if (data[data.length - 1] > cc.to) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan air baru sebanyak > 40% atau pergantian air baru.";

                } else if ((data[data.length - 1] <= cc.to && data[data.length - 1] >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "Normal";
                }
            }

            if (cc.name == "suhu") {
                if (data[data.length - 1] < cc.from) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "Stabilkan suhu ruangan dengan rentang 26 - 28 Celcius";
                } else if (data[data.length - 1] > cc.to) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan penambahan paranet sehingga air tidak mengalami kenaikan suhu berlebih dan dapat menstabilkan suhu air. Jika suhu air luar toleransi dan kolam berapa didalam ruangan maka lakukan penstabilan suhu ruangan dengan rentang 26 – 28 derajat celcius.";
                } else if ((data[data.length - 1] <= cc.to && data[data.length - 1] >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "Normal";
                }
            }

            if (cc.name == "sal") {
                if (data[data.length - 1] < cc.from) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan tindakan penambahan garam sebesar 1,5% dari total air kolam";
                } else if (data[data.length - 1] > cc.to) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "dilakukan tindakan penambahan air setinggi batas air awal sebelum menguap";
                } else if ((data[data.length - 1] <= cc.to && data[data.length - 1] >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "Normal";
                }
            }

            if (cc.name == "amo") {
                if (data[data.length - 1] < cc.from) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = rr;
                    newCondition[cc.id - 1].ket = "lakukan penambahan kecepatan aerasi > 0,5 kali dengan pemberian sumber Carbon molase 5% dari total pakan harian";
                } else if (data[data.length - 1] > cc.to) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = tt;
                    newCondition[cc.id - 1].ket = "lakukan dengan peningkatan aerasi (pengadukkan > 0,5 kali, pada pH kurang dari 6,5, akan tetapi ketika pH >6,5 maka tidak perlau dilakukan pengadukkan, dengan tetap dipantau pertambahan amonianya)";
                } else if ((data[data.length - 1] <= cc.to && data[data.length - 1] >= cc.from)) {
                    const newCondition = [...condition];
                    newCondition[cc.id - 1].kondisi = nn;
                    newCondition[cc.id - 1].ket = "Normal";
                }
            }

        })
    }, [data])

    const options = {
        responsive: true,
        stacked: false,
        plugins: {
            title: {
                display: false,
                text: title,
            },
        },
        animations: {
            y: {
                // duration: 2000,
                delay: 500
            }
        },
    };

    const labels = [
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', '',
    ];
    const config = {
        labels,
        datasets: [
            {
                label: label,
                data: data,
                borderColor: '#FFC300',
                backgroundColor: '#FFC300',
                pointRadius: 7,
                pointHoverRadius: 10,
                tension: 0.2
                // yAxisID: 'y',
            },
            {
                label: 'Batas Maksimum',
                data: labels.map((item) => batasMaksimum),
                borderColor: '#25a18e4a',
                backgroundColor: '#25a18e4a',
                fill: 2,
                tension: 0.5
                // yAxisID: 'y1',
            },
            {
                label: 'Batas Minimum',
                data: labels.map((item) => batasMinimum),
                borderColor: '#0035664a',
                backgroundColor: '#0035664a',
                // yAxisID: 'y1',
            },
        ],
    };


    return (
        <div className='lg:p-5 p-3 lg:mt-0 mt-5'>
            <div className="card bg-white shadow-xl border">
                <div className="card-body">
                    <div className="font-bold text-xl">
                        {title}
                    </div>
                    <div className="grid lg:grid-cols-6">
                        <div className="lg:col-span-4">
                            <Line options={options} data={config} />
                        </div>
                        <div className="lg:col-span-2">
                            <div className="rounded-lg shadow-lg overflow-hidden bg-white">
                                {/* <div className="p-3 text-center font-bold uppercase">Kondisi</div> */}
                                <div className={`p-3 text-center font-bold uppercase text-white ${data[data.length - 1] > batasMaksimum || data[data.length - 1] < batasMinimum ? `bg-red ` : `bg-lime-500`}`}>
                                    {data[data.length - 1] > batasMaksimum && `KONDISI MELEWATI BATAS MAKSIMUM`}
                                    {data[data.length - 1] < batasMinimum && `KONDISI MELEWATI BATAS MINIMUM`}
                                    {data[data.length - 1] >= batasMinimum && data[data.length - 1] <= batasMaksimum && `KONDISI NORMAL`}
                                </div>
                                <div className="p-3 font-bold">
                                    <ul>
                                        {name == 'ph' &&
                                            <li className='uppercase'>{condition[0].ket}</li>
                                        }
                                        {name == 'tds' &&
                                            <li className='uppercase'>{condition[1].ket}</li>
                                        }
                                        {name == 'suhu' &&
                                            <li className='uppercase'>{condition[2].ket}</li>
                                        }
                                        {name == 'sal' &&
                                            <li className='uppercase'>{condition[3].ket}</li>
                                        }
                                        {name == 'amo' &&
                                            <li className='uppercase'>{condition[4].ket}</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardChartRealtime