export enum Product {
  AN_GIA = 'AN_GIA',
  TAM_BINH = 'TAM_BINH',
}

export enum AnGiaPlanLevel {
  DONG = 'ĐỒNG',
  BAC = 'BẠC',
  VANG = 'VÀNG',
  BACH_KIM = 'BẠCH KIM',
  KIM_CUONG = 'KIM CƯƠNG'
}

export enum TamBinhPlanLevel {
  CO_BAN = 'CƠ BẢN',
  MO_RONG = 'MỞ RỘNG',
  NANG_CAO = 'NÂNG CAO',
  TOAN_DIEN = 'TOÀN DIỆN',
  UU_VIET = 'ƯU VIỆT'
}

export type PlanLevel = AnGiaPlanLevel | TamBinhPlanLevel;

export const AnGiaPlanLevels = Object.values(AnGiaPlanLevel);
export const TamBinhPlanLevels = Object.values(TamBinhPlanLevel);


export interface CoverageOptions {
  outpatient: boolean;
  
  // An Gia specific options
  dental: boolean;
  maternity: boolean;
  personalAccidentSumInsured: number;
  lifeInsuranceSumInsured: number;
  personalAccident: boolean;
  lifeInsurance: boolean;

  // Tam Binh specific option
  accidentBenefit: 'NONE' | 'PA' | 'LPA'; // PA: Personal Accident, LPA: Life & Personal Accident
}

export interface Member {
  id: string;
  name: string;
  dob: string;
  planLevel: PlanLevel;
  coverageOptions: CoverageOptions;
}

export interface PremiumBreakdown {
  main: number;
  outpatient: number;
  dental: number;
  maternity: number;
  personalAccident: number;
  lifeInsurance: number;
  total: number;
  age: number;
  ageInDays?: number;
}

export interface MemberQuote extends PremiumBreakdown {
  memberId: string;
  planLevel: PlanLevel;
}

export interface FinalQuote {
  memberQuotes: MemberQuote[];
  total: number;
}


export interface AgeBracketPremium {
    minAgeYears: number;
    maxAgeYears: number;
    minAgeDays?: number; // For infants
    premium: number | null; // null for "Không bảo hiểm"
}