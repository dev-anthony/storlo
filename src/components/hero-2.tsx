// 'use client';

// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// interface HeroProps {
//   breadcrumb: string[];
// }

// export function Hero({ breadcrumb }: HeroProps) {
//   return (
//     <div className="relative w-full h-30 overflow-hidden">
//       {/* Background image */}
//       <img
//         src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&auto=format&fit=crop&q=60"
//         alt="Hero background"
//         className="absolute inset-0 w-full h-full object-cover object-center"
//       />
//       {/* Blue overlay */}
//       {/* <div className="absolute inset-0 bg-blue-600/75" /> */}
//       {/* Gradient overlay — strong at bottom, fades to transparent at top */}
// <div className="absolute inset-0 bg-gradient-to-t from-blue-600/70 via-blue-600/40 to-transparent" />

//       {/* Breadcrumb */}
//       <div className="relative z-10 flex items-center justify-center h-full px-6 max-w-7xl mx-auto">
//         {breadcrumb.map((crumb, index) => {
//           const isLast = index === breadcrumb.length - 1;
//           return (
//             <React.Fragment key={index}>
//               <span
//                 className={` text-center text-sm font-medium transition-colors ${
//                   isLast ? 'text-white' : 'text-blue-200 hover:text-white cursor-pointer'
//                 }`}
//               >
//                 {crumb}
//               </span>
//               {!isLast && (
//                 <ChevronRight className="w-4 h-4 text-blue-300 mx-1 shrink-0" />
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  breadcrumb: string[];
  onBreadcrumbClick: (index: number) => void;
}

export function Hero({ breadcrumb, onBreadcrumbClick }: HeroProps) {
  return (
    <div className="relative w-full h-30 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&auto=format&fit=crop&q=60"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/70 via-blue-600/40 to-transparent" />

      <div className="relative z-10 flex items-center justify-center h-full px-6 max-w-7xl mx-auto">
        {breadcrumb.map((crumb, index) => {
          const isLast = index === breadcrumb.length - 1;
          return (
            <React.Fragment key={index}>
              <span
                onClick={() => !isLast && onBreadcrumbClick(index)}
                className={`text-center text-sm font-medium transition-colors ${
                  isLast
                    ? 'text-white cursor-default'
                    : 'text-blue-200 hover:text-white cursor-pointer'
                }`}
              >
                {crumb}
              </span>
              {!isLast && <ChevronRight className="w-4 h-4 text-blue-300 mx-1 shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}