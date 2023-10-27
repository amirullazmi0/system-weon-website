import { useEffect, useState } from "react"
import ChartItem from "./ChartItem"
import axios from "axios"
import { ThreeCircles } from "react-loader-spinner"

const Graph = ({ base_url }) => {
    const [rataBulanan, setRataBulanan] = useState(null)
    const [rataMingguan, setRataMingguan] = useState(null)
    const [rataHarian, setRataHarian] = useState(null)
    const [rataPerjam, setRataPerjam] = useState(null)


    const getRataBulanan = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `${base_url}/rataBulanan`,
            });
            if (data.data.data) {
                setRataBulanan(data.data.data)
            }
        } catch (error) {

        }
    }
    const getRataMingguan = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `${base_url}/rataMingguan`,
            });
            if (data.data.data) {
                setRataMingguan(data.data.data)
            }
        } catch (error) {

        }
    }
    const getRataHarian = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `${base_url}/rataHarian`,
            });
            if (data.data.data) {
                setRataHarian(data.data.data)
            }
        } catch (error) {

        }
    }
    const getRataPerjam = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: `${base_url}/rataPerjam`,
            });
            if (data.data.data) {
                setRataPerjam(data.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getRataPerjam()
        getRataHarian()
        getRataMingguan()
        getRataBulanan()
    }, [])
    return (
        <>
            <div className="card-graph lg:p-4 p-2">
                <div className="p-3">
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 justify-center all-sensor overflow-x-auto">
                        <div className="card bg-white lg:min-h-[510px] min-h-[320px]">
                            <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Jam</div>
                            {rataPerjam !== null ?
                                <ChartItem
                                    title={"Grafik Per Jam"}
                                    values={rataPerjam}
                                />
                                :
                                <>
                                    <div className="flex justify-center items-center p-4 h-full w-full">
                                        <ThreeCircles
                                            height="70"
                                            width="70"
                                            color="#00a6fb"
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
                        <div className="card bg-white lg:min-h-[510px] min-h-[320px]">
                            <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Hari</div>
                            {rataHarian ?
                                <ChartItem
                                    title={"Grafik Per Hari"}
                                    values={rataHarian}
                                />
                                :
                                <>
                                    <div className="flex justify-center items-center p-4 h-full w-full">
                                        <ThreeCircles
                                            height="70"
                                            width="70"
                                            color="#00a6fb"
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
                        <div className="card bg-white lg:min-h-[510px] min-h-[320px]">
                            <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Minggu</div>
                            {rataMingguan ?
                                <ChartItem
                                    title={"Grafik Per Minggu"}
                                    values={rataMingguan}
                                />
                                :
                                <>
                                    <div className="flex justify-center items-center p-4 h-full w-full">
                                        <ThreeCircles
                                            height="70"
                                            width="70"
                                            color="#00a6fb"
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
                        <div className="card bg-white lg:min-h-[510px] min-h-[320px]">
                            <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Bulan</div>
                            {rataBulanan ?
                                <ChartItem
                                    title={"Grafik Per Bulan"}
                                    values={rataBulanan}
                                />
                                :
                                <>
                                    <div className="flex justify-center items-center p-4 h-full w-full">
                                        <ThreeCircles
                                            height="70"
                                            width="70"
                                            color="#00a6fb"
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Graph    