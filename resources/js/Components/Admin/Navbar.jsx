import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

const Navbar = ({ auth, active }) => {
    const [iniActive, setIniActive] = useState(active)
    const [sidebar, setSidebar] = useState(false);
    const myRef = useRef(null);

    useEffect(() => {
        // Fungsi untuk menyembunyikan elemen ketika pengguna mengklik di luar elemen tersebut
        function handleClickOutside(event) {
            if (myRef.current && !myRef.current.contains(event.target)) {
                myRef.current.classList.remove("show");
                setSidebar(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
    }, [myRef]);

    const closeSidebar = () => {
        setSidebar(false)
    }

    const openSidebar = () => {
        setSidebar(true)
    }

    const iniSidebar = () => {
        return (
            <>
                <div className="">
                    <div className="sidebar-brand mb-2">
                        <div className="flex items-center">
                            {/* <div className="">
                                Water Echoes
                            </div> */}
                            <img className="h-16" src="/img/loggo.png" alt="" />
                            <button className="btn btn-ghost btn-circle hover:bg-transparent sidebar-button ml-auto" onClick={() => closeSidebar()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="grid mt-3">
                        <ul className="">
                            <li className="sidebar-list">
                                <Link className={iniActive === 'dashboard' ? 'flex sidebar-item active' : 'flex sidebar-item'} method="get" href={route('home')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                    <div className="ml-3">
                                        Dashboard
                                    </div>
                                </Link>
                            </li>
                            <li className="sidebar-list">
                                <Link className={iniActive === 'allTable' ? 'flex sidebar-item active' : 'flex sidebar-item'} method="get" href={route('allTable')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                    <div className="ml-3">
                                        Data Tabel
                                    </div>
                                </Link>
                            </li>
                            <hr className="mb-3" />
                            {auth.level == 1 ?
                                <li className="sidebar-list ">
                                    <Link className={iniActive === 'calibrate' ? 'flex sidebar-item active' : 'flex sidebar-item'} method="get" href={route('calibrate')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                        </svg>
                                        <div className="ml-3">
                                            Kalibrasi
                                        </div>
                                    </Link>
                                </li> : null
                            }
                            {/* <li className="sidebar-list ">
                                <Link className={iniActive === 'prediction' ? 'flex sidebar-item active' : 'flex sidebar-item'} method="get" href={route('prediction')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                    <div className="ml-3">
                                        Prediction
                                    </div>
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {/* style={{ display: sidebar ? 'block' : 'none'}} */}
            {/* id={sidebar ? 'sidebar-on' : 'sidebar-off'} */}
            <div id={sidebar ? 'sidebar-on' : 'sidebar-off'} ref={myRef} >{iniSidebar()}</div>
            <div className="navbar mt-0 bg-ku lg:pr-6 lg:pl-6">
                <div className="flex-1 nav-header">
                    <div className="flex mr-2 items-center">
                        <button className="btn btn-ghost hover:bg-transparent" onClick={() => openSidebar()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 nav-side-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    {/* <img className="h-16 nav-img" src="/img/WEon-white.png" alt="" /> */}
                    <img className="h-12 nav-img" src="/img/loggo.png" alt="" />
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            {/* <div className="rounded-full"> */}
                            {/* <img className="h-7 h-7" src="/img/profil.png" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>

                            {/* </div> */}
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-7 gap-2 p-2 shadow-lg bg-white rounded-box w-52 ">
                            <li>
                                <Link className={iniActive == 'profil' ? "btn btn-ghost btn-blue" : "btn btn-ghost"} method="get" href={route('profil')} as="button" >
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <Link className="btn btn-ghost" method="post" href={route('logout')} as="button" >Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar