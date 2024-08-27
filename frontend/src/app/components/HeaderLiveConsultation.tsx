import React from 'react';
import './HeaderLiveConsultation.css';

const HeaderLiveConsultation = () => {
    return (
        <header className="relative">
            <div className="absolute inset-0 flex flex-col pl-20 pt-4 z-20">
                <h1 className="text-6xl text-black font-bold">
                    LOGO
                </h1>
            </div>
            <div className="styled-div">
            </div>
            <div className="absolute inset-0 flex flex-col justify-end items-start pl-20 pb-2 z-20">
                <h1 className="text-4xl text-white font-bold">
                    Live Consultation.
                </h1>
                <h3 className="text-xl text-white font-bold">
                    Purchase your next Hyundai from the comfort of your own home.
                </h3>
            </div>
        </header>
    );
};

export default HeaderLiveConsultation;



            {/* <img 
                src="/images/header_standin.jpg" 
                alt="Header Background" 
                className="w-full h-64 object-cover z-0"
            />

            <div className="absolute inset-0 z-10">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 m-8 backdrop-blur-md bg-white opacity-60"></div>
                </div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end items-start pl-8 pb-2 z-20">
                <h1 className="text-4xl text-black font-bold">Live Consultation</h1>
                <h3 className="text-xl text-black font-bold">
                    Purchase your next Hyundai from the comfort of your own home.
                </h3>
            </div> */}