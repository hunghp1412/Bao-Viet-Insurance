
import { Member, FinalQuote, AgeBracketPremium, MemberQuote, Product } from '../types';

// Rates for An Gia (0.1% for Accident, 0.25% for Life)
const PERSONAL_ACCIDENT_RATE = 0.001; 
const LIFE_INSURANCE_RATE = 0.0025;

export const parseDateString = (dobString: string): Date | null => {
    if (!dobString) return null;

    // First, try direct parsing which works well for ISO 8601 formats (YYYY-MM-DD)
    const isoDate = new Date(dobString);
    if (!isNaN(isoDate.getTime()) && dobString.includes('-')) {
        return isoDate;
    }

    // Next, try parsing formats like DD/MM/YYYY or DD.MM.YYYY
    const parts = dobString.match(/^(\d{1,2})[/\.](\d{1,2})[/\.](\d{4})$/);
    if (parts) {
        const day = parseInt(parts[1], 10);
        const month = parseInt(parts[2], 10);
        const year = parseInt(parts[3], 10);
        
        // Basic check for valid month and day ranges
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            // new Date() constructor month is 0-indexed
            const date = new Date(year, month - 1, day);
            // Verify that the created date is valid and wasn't rolled over (e.g., Feb 30 becomes Mar 1/2)
            if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
                return date;
            }
        }
    }

    return null; // Return null if format is not recognized or date is invalid
};


const calculateAge = (dobString: string): { years: number, days: number } => {
  const dob = parseDateString(dobString);
    if (!dob) {
      // This should be prevented by UI validation, but as a fallback:
      return { years: 0, days: 0 };
  }
  
  const today = new Date();
  const diff = today.getTime() - dob.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let years = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    years--;
  }
  return { years, days };
};

const findPremium = (ageYears: number, ageDays: number, brackets: AgeBracketPremium[]): number => {
    if (!brackets || brackets.length === 0) return 0;
    
    // Special case for infants under 1 year old (primarily for An Gia)
    if (ageYears < 1) {
        const bracket = brackets.find(b => 
            b.minAgeDays !== undefined && ageDays >= b.minAgeDays && ageYears <= (b.maxAgeYears ?? 0)
        );
        if (bracket) return bracket.premium ?? 0;
    }
    
    // Standard age bracket check
    const bracket = brackets.find(b => ageYears >= b.minAgeYears && ageYears <= b.maxAgeYears && b.minAgeDays === undefined);
    return bracket?.premium ?? 0;
}

export const calculateQuote = (members: Member[], product: Product, premiumData: any): FinalQuote | null => {
  if (members.length === 0) {
    return null;
  }
  
  let totalPremium = 0;
  const memberQuotes: MemberQuote[] = [];

  members.forEach(member => {
    const { years: age, days: ageInDays } = calculateAge(member.dob);
    const planData = premiumData[member.planLevel];
    const options = member.coverageOptions;

    const mainPremium = findPremium(age, ageInDays, planData.main);
    
    let outpatientPremium = 0;
    let dentalPremium = 0;
    let maternityPremium = 0;
    let personalAccidentPremium = 0;
    let lifeInsurancePremium = 0;

    if (product === Product.AN_GIA) {
        outpatientPremium = options.outpatient ? findPremium(age, ageInDays, planData.outpatient) : 0;
        dentalPremium = options.dental ? findPremium(age, ageInDays, planData.dental) : 0;
        maternityPremium = options.maternity ? findPremium(age, ageInDays, planData.maternity) : 0;
        personalAccidentPremium = options.personalAccident ? options.personalAccidentSumInsured * PERSONAL_ACCIDENT_RATE : 0;
        lifeInsurancePremium = options.lifeInsurance ? options.lifeInsuranceSumInsured * LIFE_INSURANCE_RATE : 0;
    } else if (product === Product.TAM_BINH) {
        outpatientPremium = options.outpatient ? findPremium(age, ageInDays, planData.outpatient) : 0;
        
        // Handle mutually exclusive accident/life benefits for Tam Binh
        if (options.accidentBenefit === 'PA') {
            personalAccidentPremium = findPremium(age, ageInDays, planData.personalAccident);
        } else if (options.accidentBenefit === 'LPA') {
            // We use the lifeInsurance premium field to store the combined "Life & PA" premium
            lifeInsurancePremium = findPremium(age, ageInDays, planData.lifeAndPersonalAccident);
        }
    }


    const totalMemberPremium = mainPremium + outpatientPremium + dentalPremium + maternityPremium + personalAccidentPremium + lifeInsurancePremium;

    memberQuotes.push({
      memberId: member.id,
      planLevel: member.planLevel,
      main: mainPremium,
      outpatient: outpatientPremium,
      dental: dentalPremium,
      maternity: maternityPremium,
      personalAccident: personalAccidentPremium,
      lifeInsurance: lifeInsurancePremium,
      total: totalMemberPremium,
      age: age,
      ...(age < 1 && { ageInDays: ageInDays })
    });

    totalPremium += totalMemberPremium;
  });

  return {
    memberQuotes,
    total: totalPremium,
  };
};