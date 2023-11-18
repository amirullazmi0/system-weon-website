import { useEffect, useState } from "react"
import ChartItem from "./ChartItem"
import axios from "axios"
import { ThreeCircles } from "react-loader-spinner"
import moment from "moment/moment"
import ChartHarian from "./ChartHarian"
import ChartPerjam from "./ChartPerjam"
import ChartMingguan from "./ChartMingguan"
import ChartBulanan from "./ChartBulanan"

const Graph = ({ base_url }) => {
    const [rataBulanan, setRataBulanan] = useState(null)
    const [rataMingguan, setRataMingguan] = useState(null)
    const [rataHarian, setRataHarian] = useState(null)
    const [rataPerjam, setRataPerjam] = useState(null)

    const today = moment()

    const [day, setDay] = useState(today.format('YYYY-MM-DD'))
    // console.log(day);
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
            <div className="">
                <div className="grid lg:gap-4 gap-3 lg:p-5 p-3 lg:pb-10 pb-10 grid-cols-1 lg:grid-cols-2 justify-center all-sensor overflow-x-auto">
                    {/* <div className="card border shadow-xl bg-white lg:min-h-[510px] min-h-[320px]">
                        <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Jam</div>
                        {rataPerjam ?
                            (
                                <>
                                    <div className="grid lg:grid-cols-2 p-3 gap-2">
                                        <div className="">
                                            <label htmlFor="">Pilih Tanggal</label>
                                            <input value={day} onChange={(e) => setDay(e.target.value)} type="date" placeholder="Type here" className="input input-bordered w-full" />
                                        </div>
                                    </div>
                                    <ChartItem
                                        title={"Grafik Per Jam"}
                                        values={rataPerjam}
                                    />
                                </>
                            )
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
                    </div> */}
                    <div className="card  shadow-xl border bg-white lg:min-h-[510px] min-h-[320px]">
                        <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Jam</div>
                        <ChartPerjam />
                    </div>
                    <div className="card  shadow-xl border bg-white lg:min-h-[510px] min-h-[320px]">
                        <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Hari</div>
                        <ChartHarian />
                    </div>
                    <div className="card  shadow-xl border bg-white lg:min-h-[510px] min-h-[320px]">
                        <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Mingguan</div>
                        <ChartMingguan />
                    </div>
                    <div className="card  shadow-xl border bg-white lg:min-h-[510px] min-h-[320px]">
                        <div className="p-3 text-center text-xl uppercase font-bold text-[#1c1e1f]">Grafik Per Bulanan</div>
                        <ChartBulanan />
                    </div>
                    {/* <div className="card  shadow-xl border bg-white lg:min-h-[510px] min-h-[320px]">
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
                    </div>
                    <div className="card  shadow-xl border bg-white lg:min-h-[510px] min-h-[320px]">
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Graph    