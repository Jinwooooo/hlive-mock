// import React from 'react';

// interface FourStageProgressBarProps {
//   stage: number;
//   selectedModel: string;
// }

// export default function FourStageProgressBar({ stage, selectedModel }: FourStageProgressBarProps) {
//   const stages = ['Model', 'Dealership', 'Schedule', 'Contact'];

//   return (
//     <div className="flex items-center justify-center mb-8">
//       {stages.map((stageName, index) => (
//         <div key={index} className="flex items-center">
//           <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index + 1 <= stage ? 'bg-blue-500' : 'bg-gray-300'}`}>
//             {index + 1}
//           </div>
//           <span className="mx-2">{stageName}</span>
//           {index < stages.length - 1 && <div className="w-8 h-1 bg-gray-300" />}
//         </div>
//       ))}
//       <div className="ml-4 text-lg font-bold">
//         {selectedModel && `Selected Model: ${selectedModel}`}
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentStageAtom, selectedModelAtom } from '../atoms/progress';

export default function FourStageProgressBar() {
  const currentStage = useRecoilValue(currentStageAtom);
  const selectedModel = useRecoilValue(selectedModelAtom);

  const stages = ['Model', 'Dealership', 'Schedule', 'Contact'];

  return (
    <div className="flex items-center justify-center mb-8">
      {stages.map((stageName, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index + 1 <= currentStage ? 'bg-blue-500' : 'bg-gray-300'}`}>
            {index + 1}
          </div>
          <span className="mx-2">{stageName}</span>
          {index < stages.length - 1 && <div className="w-8 h-1 bg-gray-300" />}
        </div>
      ))}
      <div className="ml-4 text-lg font-bold">
        {selectedModel ? `Selected Model: ${selectedModel}` : 'No model selected'}
      </div>
    </div>
  );
}
