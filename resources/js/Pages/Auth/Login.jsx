import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <div className="bg-body">
                <div className="flex h-screen w-screen">
                    <div className="flex flex-auto lg:flex-1 p-4 items-center justify-center sisi-form">
                        <div className="card-form p-5 lg:p-7  w-full lg:w-96 border">
                            <Head title="Log in" />
                            <img className='h-28 mb-4' src="/img/loggo.png" alt="" />

                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={handleOnChange}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                </div> */}

                                <div className="flex items-center justify-center mt-7 mb-12 lg:mb-4">
                                    <PrimaryButton className="w-8/12" disabled={processing}>
                                        Log in
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:flex-1 sisi-img">
                        {/* <img className='img-login' src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmediaindonesia.com%2Fekonomi%2F376838%2Fmenteri-kkp-ingin-ri-jadi-produsen-udang-vaname-terbesar-di-dunia&psig=AOvVaw1FPkd-0j1QLpmNWK3Z31Z3&ust=1687883326677000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMjo_sOt4f8CFQAAAAAdAAAAABAE" alt="" /> */}
                        <img className='img-login' src="/img/tambak-udang.jpg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}
