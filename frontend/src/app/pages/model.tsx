"use client"

import { useRecoilState } from 'recoil';
import { exampleAtom } from '../atoms/temp';

export default function Model() {
  const [text, setText] = useRecoilState(exampleAtom);

  return (
    <div className="min-h-screen h-screen">
      <div className="relative w-full h-1/3 flex">
        <div className="w-1/5 h-full bg-orange-700">
        </div>
        <div className="w-4/5 h-full bg-orange-300">
        </div>
      </div>
      <div className="relative w-full h-1/3 flex">
        <div className="w-1/5 h-full bg-blue-700">
        </div>
        <div className="w-4/5 h-full bg-blue-300">
        </div>
      </div>
      <div className="relative w-full h-1/3 flex">
        <div className="w-1/5 h-full bg-green-700">
        </div>
        <div className="w-4/5 h-full bg-green-300">
        </div>
      </div>
    </div>
  );  
}
