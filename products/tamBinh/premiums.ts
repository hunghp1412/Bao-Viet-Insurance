import { TamBinhPlanLevel, AgeBracketPremium } from '../../types';

type PremiumData = {
    [key in TamBinhPlanLevel]: {
        main: AgeBracketPremium[];
        outpatient: AgeBracketPremium[];
        personalAccident: AgeBracketPremium[];
        lifeAndPersonalAccident: AgeBracketPremium[];
        dental: AgeBracketPremium[];
        maternity: AgeBracketPremium[];
    }
}

export const PREMIUM_DATA: PremiumData = {
  [TamBinhPlanLevel.CO_BAN]: {
    main: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 863000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 535000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 584000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 486000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 596000 },
    ],
    personalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 116000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 104000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 100000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 108000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 112000 },
    ],
    lifeAndPersonalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 132000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 116000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 108000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 120000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 128000 },
    ],
    outpatient: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 408000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 320000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 300000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 344000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 384000 },
    ],
    dental: [],
    maternity: [],
  },
  [TamBinhPlanLevel.MO_RONG]: {
    main: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 1510000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 936000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 1021000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 851000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 1042000 },
    ],
    personalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 176000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 156000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 152000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 164000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 172000 },
    ],
    lifeAndPersonalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 196000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 172000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 164000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 176000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 188000 },
    ],
    outpatient: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 408000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 320000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 300000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 344000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 384000 },
    ],
    dental: [],
    maternity: [],
  },
  [TamBinhPlanLevel.NANG_CAO]: {
    main: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 1972000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 1301000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 1420000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 1183000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 1449000 },
    ],
    personalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 292000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 160000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 252000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 272000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 284000 },
    ],
    lifeAndPersonalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 324000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 288000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 272000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 296000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 316000 },
    ],
    outpatient: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 816000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 644000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 600000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 684000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 772000 },
    ],
    dental: [],
    maternity: [],
  },
  [TamBinhPlanLevel.TOAN_DIEN]: {
    main: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 2414000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 1593000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 1738000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 1448000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 1774000 },
    ],
    personalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 408000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 364000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 352000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 380000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 400000 },
    ],
    lifeAndPersonalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 456000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 404000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 384000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 416000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 444000 },
    ],
    outpatient: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 1084000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 856000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 800000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 916000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 1028000 },
    ],
    dental: [],
    maternity: [],
  },
  [TamBinhPlanLevel.UU_VIET]: {
    main: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 3198000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 2111000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 2303000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 1919000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 2350000 },
    ],
    personalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 580000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 520000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 500000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 540000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 568000 },
    ],
    lifeAndPersonalAccident: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 652000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 576000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 548000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 592000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 632000 },
    ],
    outpatient: [
      { minAgeYears: 0, maxAgeYears: 6, premium: 1356000 },
      { minAgeYears: 7, maxAgeYears: 18, premium: 1072000 },
      { minAgeYears: 19, maxAgeYears: 40, premium: 1000000 },
      { minAgeYears: 41, maxAgeYears: 50, premium: 1144000 },
      { minAgeYears: 51, maxAgeYears: 65, premium: 1284000 },
    ],
    dental: [],
    maternity: [],
  },
};

export const TamBinhPlanLevels = Object.values(TamBinhPlanLevel);