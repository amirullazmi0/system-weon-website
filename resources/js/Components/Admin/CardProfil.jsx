import React, { useState } from 'react'
import InputError from '../InputError';
import { router } from '@inertiajs/react';

const CardProfil = ({ auth, errors, notif }) => {
    const [email, setEmail] = useState(auth.email)
    const [name, setName] = useState(auth.name)
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    console.log('notif ', notif);
    const handleUpdateProfil = () => {
        const data = {
            name, email
        }
        router.post('/profil', data)
    }

    const handleUpdatePassword = () => {
        const data = {
            password, password2
        }
        router.post('/password', data)
        setPassword('')
        setPassword2('')
    }

    const renderNotifProfil = () => {
        if (notif.message) {
            return (
                < div className="p-5" >
                    < div className="alert col-span-6 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div className="flex">
                            <span className='capitalize'>{notif.message}</span>
                        </div>
                    </div>
                </div >
            )
        }
    }
    const renderNotifPassword = () => {
        if (notif.success) {
            return (
                < div className="p-5" >
                    < div className="alert col-span-6 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div className="flex">
                            <span className='capitalize'>{notif.success}</span>
                        </div>
                    </div>
                </div >
            )
        }
        if (errors.password) {
            return (
                < div className="p-5" >
                    < div className="alert col-span-6 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-red-600 shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div className="flex">
                            <span className='capitalize text-red-600'>{errors.password}</span>
                        </div>
                    </div>
                </div >
            )
        }
        if (notif.error) {
            return (
                < div className="p-5" >
                    < div className="alert col-span-6 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-red-600 shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div className="flex">
                            <span className='capitalize text-red-600'>{notif.error}</span>
                        </div>
                    </div>
                </div >
            )
        }

    }
    return (
        <>
            <div className="lg:pl-6 lg:pr-6 mr-auto flex justify-center">
                <div className="card bg-base-100 border lg:w-1/2 w-full shadow-sm p-2 m-2">
                    {renderNotifProfil()}
                    <div className="p-3 flex justify-center">
                        <img className='h-16' src="/img/profil.png" alt="" />
                    </div>
                    <div className="grid grid-cols-6 gap-4 p-5 items-center">
                        <>
                            <div className="lg:col-span-2 col-span-6">Nama</div>
                            <div className="lg:col-span-1 lg:block hidden">:</div>
                            <div className="lg:col-span-3 col-span-6">
                                <input className='w-full input-profil' value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                {errors.name &&
                                    <InputError message={errors.name} className="mt-2" />
                                }
                            </div>
                        </>
                        <>
                            <div className="lg:col-span-2 col-span-6">Email</div>
                            <div className="lg:col-span-1 lg:block hidden">:</div>
                            <div className="lg:col-span-3 col-span-6">
                                <input className='w-full input-profil' value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                                {errors.email &&
                                    <InputError message={errors.email} className="mt-2" />
                                }
                            </div>
                        </>
                        <>
                            <div className="col-span-6 flex justify-start mt-3">
                                <button
                                    className="btn btn-sm btn-yellow w-full lg:btn-wide"
                                    onClick={() => handleUpdateProfil()}
                                >
                                    Simpan
                                </button>
                            </div>
                        </>
                    </div>
                </div>
            </div >
            <div className="lg:pl-6 lg:pr-6 mr-auto flex justify-center">
                <div className="card bg-base-100 border lg:w-1/2 w-full shadow-sm p-2 m-2">
                    {renderNotifPassword()}
                    <div className="grid grid-cols-6 gap-4 p-5 items-center">
                        <>
                            <div className="lg:col-span-2 col-span-6">Password Baru</div>
                            <div className="lg:col-span-1 lg:block hidden">:</div>
                            <div className="lg:col-span-3 col-span-6">
                                <input className='w-full input-profil' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password Baru' />
                            </div>
                        </>
                        <>
                            <div className="lg:col-span-2 col-span-6">Konfirmasi Password Baru</div>
                            <div className="lg:col-span-1 lg:block hidden">:</div>
                            <div className="lg:col-span-3 col-span-6">
                                <input className={password2 != '' && password2 != password ? 'w-full input-profil-error' : 'rounded-md w-full input-profil'} value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder='Konfirmasi Password Baru' />
                                {password2 != '' && password2 != password &&
                                    <InputError message={"Konfirmasi Password Tidak Sama"} className="mt-2" />
                                }
                            </div>
                        </>
                        <>
                            <div className="col-span-6 flex justify-start mt-3">
                                <button onClick={() => handleUpdatePassword()} className="btn btn-sm btn-yellow w-full lg:btn-wide">
                                    Simpan
                                </button>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardProfil