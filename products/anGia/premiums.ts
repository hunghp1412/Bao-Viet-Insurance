// FIX: Import React to enable JSX syntax.
import React from 'react';
import { AnGiaPlanLevel, AgeBracketPremium } from '../../types';

type PremiumData = {
    [key in AnGiaPlanLevel]: {
        main: AgeBracketPremium[];
        outpatient: AgeBracketPremium[];
        dental: AgeBracketPremium[];
        maternity: AgeBracketPremium[];
    }
}

export const PREMIUM_DATA: PremiumData = {
  [AnGiaPlanLevel.DONG]: {
    main: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: null },
      { minAgeYears: 1, maxAgeYears: 3, premium: 2973000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 1914000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 1615000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 1445000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 1582000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 1866000 },
    ],
    outpatient: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: null },
      { minAgeYears: 1, maxAgeYears: 3, premium: 3744000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 2496000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 2106000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 1786000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 1956000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 2272000 },
    ],
    dental: [
      { minAgeYears: 1, maxAgeYears: 65, premium: 545000 },
    ],
    maternity: [
      { minAgeYears: 18, maxAgeYears: 45, premium: null },
    ]
  },
  [AnGiaPlanLevel.BAC]: {
    main: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: null },
      { minAgeYears: 1, maxAgeYears: 3, premium: 4264000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 2746000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 2317000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 2073000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 2270000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 2677000 },
    ],
    outpatient: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: null },
      { minAgeYears: 1, maxAgeYears: 3, premium: 4368000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 2912000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 2457000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 2083000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 2282000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 2650000 },
    ],
    dental: [
      { minAgeYears: 1, maxAgeYears: 65, premium: 545000 },
    ],
    maternity: [
      { minAgeYears: 18, maxAgeYears: 45, premium: 5520000 },
    ]
  },
  [AnGiaPlanLevel.VANG]: {
    main: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: null },
      { minAgeYears: 1, maxAgeYears: 3, premium: 6459000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 4160000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 3510000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 3140000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 3439000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 4056000 },
    ],
    outpatient: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: null },
      { minAgeYears: 1, maxAgeYears: 3, premium: 4992000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 3328000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 2808000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 2381000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 2608000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 3029000 },
    ],
    dental: [
      { minAgeYears: 1, maxAgeYears: 65, premium: 1350000 },
    ],
    maternity: [
      { minAgeYears: 18, maxAgeYears: 45, premium: 5520000 },
    ]
  },
  [AnGiaPlanLevel.BACH_KIM]: {
    main: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: 13648000 },
      { minAgeYears: 1, maxAgeYears: 3, premium: 9099000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 5616000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 4739000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 4423000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 4844000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 5704000 },
    ],
    outpatient: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: 9360000 },
      { minAgeYears: 1, maxAgeYears: 3, premium: 6240000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 4160000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 3510000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 3135000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 3433000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 4006000 },
    ],
    dental: [
      { minAgeYears: 1, maxAgeYears: 65, premium: 2300000 },
    ],
    maternity: [
      { minAgeYears: 18, maxAgeYears: 45, premium: 5520000 },
    ]
  },
  [AnGiaPlanLevel.KIM_CUONG]: {
    main: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: 16681000 },
      { minAgeYears: 1, maxAgeYears: 3, premium: 11121000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 6864000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 5792000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 5406000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 5921000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 6972000 },
    ],
    outpatient: [
      { minAgeDays: 15, minAgeYears: 0, maxAgeYears: 0, premium: 14040000 },
      { minAgeYears: 1, maxAgeYears: 3, premium: 9360000 },
      { minAgeYears: 4, maxAgeYears: 6, premium: 6240000 },
      { minAgeYears: 7, maxAgeYears: 9, premium: 5265000 },
      { minAgeYears: 10, maxAgeYears: 30, premium: 4840000 },
      { minAgeYears: 31, maxAgeYears: 50, premium: 5301000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 6223000 },
    ],
    dental: [
      { minAgeYears: 1, maxAgeYears: 65, premium: 3450000 },
    ],
    maternity: [
      { minAgeYears: 18, maxAgeYears: 45, premium: 6325000 },
    ]
  },
};

// FIX: Rewrote SVG icon definition using React.createElement to avoid using JSX in a .ts file.
export const LogoIcon = React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10", viewBox: "0 0 256 256" },
    React.createElement('path', { fill: "currentColor", d: "M168.25,104.59,131.75,128l36.5,23.41a12,12,0,0,1,6.25,10.68V196a12,12,0,0,1-12,12H93.5a12,12,0,0,1-12-12V162.09a12,12,0,0,1,6.25-10.68L124.25,128,87.75,104.59a12,12,0,0,1-6.25-10.68V60a12,12,0,0,1,12-12h73.5a12,12,0,0,1,12,12V93.91A12,12,0,0,1,168.25,104.59Z", opacity: "0.2" }),
    React.createElement('path', { fill: "currentColor", d: "M228,128a100,100,0,1,0-160.48,79.59L64,224v-4.83A100.1,100.1,0,0,0,228,128Zm-8,0A92,92,0,1,1,36,128,92.1,92.1,0,0,1,128,36,92,92,0,0,1,220,128Zm-39.75,34.09a4,4,0,0,1-2.09,3.57L131.75,192H93.5a4,4,0,0,1-4-4V162.09a4,4,0,0,1,2.09-3.57L124.25,140l-32.66-20.91a4,4,0,0,1-2.09-3.57V93.91a4,4,0,0,1,2.09-3.57L124.25,72l32.66,20.91a4,4,0,0,1,2.09,3.57V121.9a4,4,0,0,1-2.09,3.57L128,144l28.88,18.52a4,4,0,0,1,1.37.27Zm-48-26.21L128,138.12l-28.88-18.52L128,101.08Zm-8,17.43,32,20.51V184H93.5ZM128,80,97.5,99.69,128,119.38Zm32-1.69L128,60.83V88l32,20.51ZM164.5,99.69,128,119.38,158.5,139.08,128,158.77l36.5-23.4v-32.1A12,12,0,0,0,164.5,99.69Z" })
);

export const AnGiaPlanLevels = Object.values(AnGiaPlanLevel);
