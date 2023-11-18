import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import ChartItem from './ChartItem'
import { ThreeCircles } from "react-loader-spinner"

const ChartHarian = () => {
    const today = moment()

    const [day, setDay] = useState(today.format('YYYY-MM'))
    const [rataRata, setRataRata] = useState()

    const [month, setMonth] = useState(today.format('MM'))
    const [year, setYear] = useState(today.format('YYYY'))

    const getRataHarian = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `http://103.175.220.210:3000/api/iot/average/month?start=${year}-${month}`,
            });

            setRataRata(data.data.data)
            // if (data.data.data) {
            // }
        } catch (error) {

        }
    }

    const bulan = [
        { id: 1, name: `Januari` },
        { id: 2, name: `Februari` },
        { id: 3, name: `Maret` },
        { id: 4, name: `April` },
        { id: 5, name: `Mei` },
        { id: 6, name: `Juni` },
        { id: 7, name: `Juli` },
        { id: 8, name: `Agustus` },
        { id: 9, name: `September` },
        { id: 10, name: `Oktober` },
        { id: 11, name: `November` },
        { id: 12, name: `Desember` },
    ]

    const tahun = [
        { id: 2015 },
        { id: 2016 },
        { id: 2017 },
        { id: 2018 },
        { id: 2019 },
        { id: 2020 },
        { id: 2021 },
        { id: 2022 },
        { id: 2023 },
        { id: 2024 },
        { id: 2025 },
        { id: 2026 },
        { id: 2027 },
        { id: 2028 },
        { id: 2029 },
        { id: 2030 },
    ]

    useEffect(() => {
        getRataHarian()
    }, [month, year])

    return (
        <>
            {rataRata ?
                <>
                    <div className="grid lg:grid-cols-2 p-3 gap-2">
                        <div className="">
                            <label htmlFor="">Pilih Bulan</label>
                            <select value={month} onChange={(e) => setMonth(e.target.value)} className="select select-bordered w-full">
                                {bulan.map((item, index) => {
                                    if (month == item.id) {
                                        return (
                                            <option selected key={index} value={item.id}>{item.name}</option>
                                        )
                                    } else {
                                        return (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    }
                                })}
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="">Pilih Tahun</label>
                            <select value={year} onChange={(e) => setYear(e.target.value)} className="select select-bordered w-full">
                                {tahun.map((item, index) => {
                                    if (year == item.id) {
                                        return (
                                            <option selected key={index} value={item.id}>{item.id}</option>
                                        )
                                    } else {
                                        return (
                                            <option key={index} value={item.id}>{item.id}</option>
                                        )
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                    <ChartItem
                        title={""}
                        values={rataRata}
                    />
                </>
                :
                <>
                    <div className="flex justify-center items-center p-4 h-full w-full">
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
        </>
    )
}

export default ChartHarian