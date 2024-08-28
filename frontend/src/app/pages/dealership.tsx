// "use client"

// import React, { useEffect } from "react";
// import { Loader } from '@googlemaps/js-api-loader';
// import { useRecoilState } from 'recoil';

// export default function Dealership() {

// 	const mapRef = React.useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const initMap = async() => {
// 			const loader = new Loader({
// 				apiKey: process.env.NEXT_PUBLIC_GMAP_API as string,
// 				version: 'weekly'
// 			});

// 			const { Map } = await loader.importLibrary('maps');
// 			const { AdvancedMarkerElement } = await loader.importLibrary('marker');

// 			const position = {
// 				lat: 41.902782,
// 				lng: 12.496366
// 			}

// 			const mapOptions: google.maps.MapOptions = {
// 				center: position,
// 				zoom: 10,
// 				mapId: 'MY_NEXTJS_MAPID'
// 			}

// 			const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
// 			const marker = new AdvancedMarkerElement({
// 				map: map,
// 				position: position,
// 				title: "Dealership Location",
// 			});
// 		}

// 		initMap();
// 	}, []);

//   return (
//     <div className="w-full min-h-screen h-screen">
// 			<div className="relative w-full h-[10%]">
// 				<p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-5xl p-8">Select a dealership</p>
// 			</div>
// 			<div className="relative w-full h-[80%]" ref={mapRef}>
// 			</div>
//     </div>
//   );  
// }

"use client";

import React, { useEffect, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader';

interface MarkerInfo {
	lat: number;
	lng: number;
	title: string;
	description: string;
}

export default function Dealership() {
	const mapRef = React.useRef<HTMLDivElement>(null);
	const [showPopup, setShowPopup] = useState(false);
	const [popupPosition, setPopupPosition] = useState({ lat: 0, lng: 0 });
	const [info, setInfo] = useState({ title: "", description: "" });

	// Sample data for multiple markers
	const markersData: MarkerInfo[] = [
		{
			lat: 41.902782,
			lng: 12.496366,
			title: "Dealership 1",
			description: "Detailed information about Dealership 1.",
		},
		{
			lat: 41.890251,
			lng: 12.492373,
			title: "Dealership 2",
			description: "Detailed information about Dealership 2.",
		},
		{
			lat: 41.911745,
			lng: 12.476735,
			title: "Dealership 3",
			description: "Detailed information about Dealership 3.",
		},
	];

	useEffect(() => {
		const initMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_GMAP_API as string,
				version: 'weekly',
			});

			const { Map } = await loader.importLibrary('maps');
			const { AdvancedMarkerElement } = await loader.importLibrary('marker');

			const mapOptions: google.maps.MapOptions = {
				center: { lat: 41.902782, lng: 12.496366 },
				zoom: 10,
				mapId: 'MY_NEXTJS_MAPID',
			};

			const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

			markersData.forEach((markerData) => {
				const marker = new AdvancedMarkerElement({
					map: map,
					position: { lat: markerData.lat, lng: markerData.lng },
					title: markerData.title,
				});

				marker.addListener("click", () => {
					setShowPopup(true);
					setPopupPosition({ lat: markerData.lat, lng: markerData.lng });
					setInfo({ title: markerData.title, description: markerData.description });
				});
			});
		};

		initMap();
	}, []);

	return (
		<div className="w-full min-h-screen h-screen relative">
			<div className="relative w-full h-[10%]">
				<p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-5xl p-8">
					Select a dealership
				</p>
			</div>
			<div className="relative w-full h-[80%]" ref={mapRef}></div>
			
			{showPopup && (
				<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-white shadow-lg rounded-lg z-50">
					<h2 className="text-xl text-black font-bold">{info.title}</h2>
					<p className="text-black">{info.description}</p>
					<button
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
						onClick={() => setShowPopup(false)}
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
}
