import React, {useState} from 'react';
import Layout from "../components/Layout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import vmis from '/public/images/vmislogin.png';
import Image from 'next/image';
import Head from 'next/head';

const Login = () => {

    const [error, setError] = useState({ isError: false, message: "" });
    const router = useRouter();
    const handleFormSubmit = async(e) => {
        e.preventDefault();

        let username = e.target.elements.username?.value;
        let password = e.target.elements.password?.value;

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
      
            if (res?.ok) {
                router.push("/");
            } else {
                setError({ ...error, isError: true, message: res?.error });
            }
      
    };

    return (
        <Layout>
            <Head>
        <title>CJSys Login</title> {/* Set the title here */}
      </Head>
      <div className='w-full max-w-md h-full m-auto bg-white rounded-lg border-1 border-primaryBorder shadow-default py-3 px-12 mt-10'>
                
                <div className='pt-5' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              
                                <Image
                                    src={vmis}
                                    alt="Picture of the author"
                                    width={150}
                                    height={150}
                                />
                            </div>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='username' className='text-lg font-bold text-blue-800'>Username</label>
                        <input
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            placeholder='Username'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='text-lg font-bold text-blue-800'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Password'
                        />
                    </div>

                    <div className='flex flex-col justify-center items-center mt-2'>
                {error.isError && (
                    <p className="text-sm font-semibold my-2 text-center">
                    <span className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                        {" "}
                        {error.message}{" "}
                    </span>
                    </p>
                )}
        <div className="text-center lg:text-left">
                <button
                type="submit" className="w-32">
                    <div className={`bg-blue-500 cursor-pointer px-3 text-white font-bold text-center hover:shadow-lg shadow-blue-500 hover:ring-blue-500 hover:ring-offset-2 hover:ring-2 rounded-full p-2 animateBtn`}>
                        Log In
                    </div>
                </button>
            
            </div><div className="pb-5 px-3"></div>
                    </div>
                </form>
            </div>
            
        </Layout>
    );
};

export default Login;
