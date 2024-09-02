"use client";

import React, { useEffect, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader';
import { useRecoilState } from 'recoil';
import { currentStageAtom } from '../atoms/progress';
import axios from 'axios';

interface Dealership {
  name: string;
  dealershipCode: string;
  address: string;
  email: string;
  telephone: string;
  website: string;
  position: {
    coordinates: [number, number];
    type: string;
  };
}

export default function Dealership() {
  const [currentStage, setCurrentStage] = useRecoilState(currentStageAtom);
  const [dealerships, setDealerships] = useState<Dealership[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ lat: 0, lng: 0 });
  const [info, setInfo] = useState({ title: "", description: "" });

  useEffect(() => {
    setCurrentStage(2);
  }, [setCurrentStage]);

  useEffect(() => {
	const backendUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
    axios.get(`${backendUrl}/core/models`)

    const fetchDealerships = async () => {
      try {
        const response = await axios.get(`${backendUrl}/core/dealerships`);
        setDealerships(response.data);
      } catch (error) {
        console.error('Error fetching dealerships:', error);
      }
    };

    fetchDealerships();
  }, []);

  const mapRef = React.useRef<HTMLDivElement>(null);

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
        mapId: 'HLive_Mock',
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      dealerships.forEach((dealership) => {
        const [lng, lat] = dealership.position.coordinates;

        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat, lng },
          title: dealership.name,
        });

        marker.addListener("click", () => {
          setShowPopup(true);
          setPopupPosition({ lat, lng });
          setInfo({
            title: dealership.name,
            description: dealership.address,
          });
        });
      });
    };

    if (dealerships.length > 0) {
      initMap();
    }
  }, [dealerships]);

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
