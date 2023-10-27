import { router } from "@inertiajs/react";
import { format } from "date-fns";

import { useEffect, useRef, useState } from "react";


const TableItem = ({ sensor }) => {
    const jumlah = 100
    const [prevNumber, setPrevNumber] = useState(0)
    const [nextNumber, setNextNumber] = useState(1)

    const handlePrev = () => {
        if (prevNumber > 0) {
            setNextNumber(nextNumber - 1)
            setPrevNumber(prevNumber - 1)
            window.scrollTo({
                top: 0,
            });
        }
    }

    const handlNext = () => {
        const jj = sensor.length
        if ((jj / (jumlah * nextNumber)) >= 1) {
            setNextNumber(nextNumber + 1)
            setPrevNumber(prevNumber + 1)
            window.scrollTo({
                top: 0,
            });
        }
    }


    const [id, setID] = useState(null)
    const [notif, setNotif] = useState(false)
    const handleDelete = (e) => {
        setID(e)
        setNotif(true)
    }

    const submitDelete = () => {
        router.post('/sensor/' + id)
        setNotif(false)
        setID(null)
    }

    const renderNotif = () => {
        return (
            <div className={notif == true ? "cardNotifDelete" : "cardNotifDelete-off"}>
                <div className="flex justify-end">
                    <button onClick={() => setNotif(false)} className="btn btn-sm btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="mb-4">Anda yakin untuk menghapus data ?</p>
                <button onClick={() => submitDelete()} className="btn btn-sm btn-warning">
                    Yakin
                </button>
            </div >
        )
    }

    return (
        <>
            {renderNotif()}
            <div className="flex justify-center card bg-base-100 border shadow-sm p-2 m-2">
                <div className="overflow-x-auto">
                    {sensor || sensor == true ?
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr className="text-center">
                                    <td>No</td>
                                    <th>Tanggal</th>
                                    <th>Waktu</th>
                                    <th>PH</th>
                                    <th>TDS</th>
                                    <th>suhu</th>
                                    <th>salinitas</th>
                                    <th>Amonia</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sensor.map((s, index) => {
                                    const dateTime = new Date(s.created_at)
                                    const tanggal = format(dateTime, 'dd MMMM yyyy')
                                    const waktu = format(dateTime, 'HH:mm')

                                    if (index >= prevNumber * jumlah && index < jumlah * nextNumber) {
                                        return (
                                            < tr key={s.id} className="text-center" >
                                                <td className="font-bold">{index = index + 1}</td>
                                                <td>{tanggal}</td>
                                                <td>{waktu}</td>
                                                <td>{s.value1.toFixed(2)}</td>
                                                <td>{s.value2.toFixed(2)}</td>
                                                <td>{s.value3.toFixed(2)}</td>
                                                <td>{s.value4.toFixed(2)}</td>
                                                <td>{s.value5.toFixed(2)}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => handleDelete(s.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                        :
                        <div className="p-5 text-center">
                            <h1 className="font-bold">TIDAK ADA SENSOR</h1>
                        </div>
                    }
                    <div className="flex justify-center mt-4">
                        <div className="join flex gap-3">
                            <button onClick={() => handlePrev()} className="join-item btn btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button className="join-item btn btn-ghost">{nextNumber}</button>
                            <button onClick={() => handlNext()} className="join-item btn btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TableItem