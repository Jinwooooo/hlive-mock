import React from 'react';

const Footer = () => {
  return (
    <div className="relative w-full h-64">
        <div className="relative w-full h-1/2 bg-red-50">
            <div className="pt-3 px-14">
                <p className="text-gray-500 dark:text-gray-400">Disclaimer</p>
            </div>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-9/12 h-px bg-gray-200 border-0 dark:bg-gray-400"></hr>
            </div>
            <div className="px-14">
                <p className="text-gray-500 dark:text-gray-400 text-sm">The information on this site relating to Hyundai Motor Company and its products is provided for information only without any express or implied warranty of any kind. The information published may contain direct or indirect references even to products not available in your country. For details about the products available in your country, contact the nearest dealer directly.</p>
            </div>
        </div>
        <div className="relative w-full h-1/2 bg-stone-800 flex">
            <div className="w-1/2 h-full p-4">
                <h3 className="text-6xl text-white font-bold">LOGO</h3>
                <p>© Copyright 2023 Hyundai Motor Company. All rights reserved.</p>
            </div>
            <div className="w-1/4 h-full p-4">
                <ul className="flex space-x-10">
                    <li className="px-4 py-2 whitespace-nowrap">Imprint</li>
                    <li className="px-4 py-2 whitespace-nowrap">Privacy Policy</li>
                    <li className="px-4 py-2 whitespace-nowrap">Disclaimer</li>
                    <li className="px-4 py-2 whitespace-nowrap">Contact</li>
                    <li className="px-4 py-2 whitespace-nowrap">Cookies</li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default Footer;
