"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { currentStageAtom, selectedModelAtom } from '../atoms/progress';

interface CarModel {
  modelId: string;
  modelDescription: string;
  image: string;
  carType1Desc: string;
}

export default function Model() {
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [currentStage, setCurrentStage] = useRecoilState(currentStageAtom);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelAtom);
  const router = useRouter();

  useEffect(() => {
    setCurrentStage(1);

    const backendUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    axios.get(`${backendUrl}/core/models`)
      .then(response => {
        setCarModels(response.data);
      })
      .catch(error => {
        console.error('Error fetching car models:', error);
      });
  }, [setCurrentStage]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    router.push('/dealership');
  };

  const uniqueCarTypes = Array.from(new Set(carModels.map(car => car.carType1Desc)));

  return (
    <div className="flex flex-col flex-grow">
      {uniqueCarTypes.map((carType) => (
        <div key={carType} className="w-full p-4">
          <h2 className="text-lg font-bold mb-4">{carType}</h2>
          <div className="flex flex-wrap gap-4">
            {carModels.filter(car => car.carType1Desc === carType).map((car) => (
              <div key={car.modelId} className="cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4" onClick={() => handleModelSelect(car.modelDescription)}>
                <img src={car.image} alt={car.modelDescription} className="w-full h-auto" />
                <p className="text-center mt-2">{car.modelDescription}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
