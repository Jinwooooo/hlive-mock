"use client";

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { currentStageAtom, selectedModelAtom } from '../atoms/progress';
import { useEffect } from 'react';

export default function Model() {
  const [currentStage, setCurrentStage] = useRecoilState(currentStageAtom);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelAtom);
  const router = useRouter();

  useEffect(() => {
    setCurrentStage(1);
  }, [setCurrentStage]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    router.push('/dealership');
  };

  return (
    <div className="min-h-screen h-screen">
      <div className="relative w-full h-1/3 flex" onClick={() => handleModelSelect('Model 1')}>
        <div className="w-1/5 h-full bg-orange-700"></div>
        <div className="w-4/5 h-full bg-orange-300"></div>
      </div>
      <div className="relative w-full h-1/3 flex" onClick={() => handleModelSelect('Model 2')}>
        <div className="w-1/5 h-full bg-blue-700"></div>
        <div className="w-4/5 h-full bg-blue-300"></div>
      </div>
      <div className="relative w-full h-1/3 flex" onClick={() => handleModelSelect('Model 3')}>
        <div className="w-1/5 h-full bg-green-700"></div>
        <div className="w-4/5 h-full bg-green-300"></div>
      </div>
    </div>
  );
}
