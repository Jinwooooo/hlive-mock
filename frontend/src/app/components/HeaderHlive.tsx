import React from 'react';

const HeaderHlive = () => {
  return (
    <div className="relative w-full h-64">
      <img
        src="/images/header_temp.jpg"
        alt="Header"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-x-20 bottom-0 h-4/5 backdrop-blur-md bg-transparent">
        <div className="absolute inset-0 flex flex-col justify-center items-center pl-20 pb-2 z-20">
            <h1 className="text-6xl text-sky-700 font-bold">
                H-LIVE
            </h1>
            <h3 className="text-xl text-black font-bold">
                Enjoy face-to-face live consultation whenever and wherever you need it.
            </h3>
        </div>
      </div>

    </div>
  );
};

export default HeaderHlive;
