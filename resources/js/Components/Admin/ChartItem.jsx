import React, { useEffect, useState } from 'react';
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


const ChartItem = ({ title, values }) => {
    console.log('vales', values);
    const [iniTitle, setTitle] = useState(title)

    const [iniLabel, setLabel] = useState(values.map((v) => v.name))
    const [value1, setValue1] = useState(values.map((vv) => vv.value1))
    const [value2, setValue2] = useState(values.map((vv) => vv.value2))
    const [value3, setValue3] = useState(values.map((vv) => vv.value3))
    const [value4, setValue4] = useState(values.map((vv) => vv.value4))
    const [value5, setValue5] = useState(values.map((vv) => vv.value5))


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

    const options = {
        type: 'line',
        responsive: true,
        plugins: {
            legend: {
                // position: 'top',
            },
            title: {
                display: false,
                // text: iniTitle,
            },
            filler: {
                propagate: true
            }
        },
        interaction: {
            intersect: false,
        },
    };
    const labels = iniLabel;

    const data = {
        labels,
        datasets: [
            {
                label: 'pH',
                data: value1,
                borderColor: '#ffb703',
                backgroundColor: '#ffb703',
                tension: 0.4,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'TDS',
                data: value2,
                borderColor: '#fb8500',
                backgroundColor: '#fb8500',
                tension: 0.4,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'Suhu',
                data: value3,
                borderColor: '#023047',
                backgroundColor: '#023047',
                tension: 0.4,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'Salinitas',
                data: value4,
                borderColor: '#219ebc',
                backgroundColor: '#219ebc',
                tension: 0.4,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
            {
                label: 'Amonia',
                data: value5,
                borderColor: '#8ecae6',
                backgroundColor: '#8ecae6',
                tension: 0.4,
                // fill: true
                borderWidth: 2, // Lebar garis
            },
        ],
    };
    return (
        <>
            <div className="flex justify-center card lg:p-3 m-2">
                <Line options={options} data={data} height={80} width={100} />
            </div>
        </>
    );
}

export default ChartItem