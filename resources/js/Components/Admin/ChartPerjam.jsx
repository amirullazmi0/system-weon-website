import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import ChartItem from './ChartItem'
import { ThreeCircles } from "react-loader-spinner"

const ChartPerjam = () => {
    const today = moment()

    const [day, setDay] = useState(today.format('YYYY-MM-DD'))
    const [rataRata, setRataRata] = useState()

    const getRataHarian = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `http://103.175.220.210:3000/api/iot/average/hour?start=${day}`,
            });
            if (data.data.data) {
                setRataRata(data.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getRataHarian()
    }, [day])

    return (
        <>
            {rataRata ?
                <>
                    <div className="grid lg:grid-cols-2 p-3 gap-2">
                        <div className="">
                            <label htmlFor="">Pilih Tanggal</label>
                            <input value={day} onChange={(e) => setDay(e.target.value)} type="date" placeholder="Type here" className="input input-bordered w-full" />
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

export default ChartPerjam