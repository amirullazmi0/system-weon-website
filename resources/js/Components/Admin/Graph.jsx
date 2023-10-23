import { useEffect, useState } from "react"
import ChartItem from "./ChartItem"

const Graph = ({ rata }) => {
    return (
        <>
            <div className="card-graph lg:p-4 p-2">
                <div className="card-graph-body p-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center all-sensor overflow-x-auto">
                        <ChartItem
                            title={"Grafik Per Jam"}
                            values={rata.perjam}
                        />
                        <ChartItem
                            title={"Grafik Per Hari"}
                            values={rata.harian}
                        />
                        <ChartItem
                            title={"Grafik Per Minggu"}
                            values={rata.mingguan}
                        />
                        <ChartItem
                            title={"Grafik Per Bulan"}
                            values={rata.bulanan}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Graph    