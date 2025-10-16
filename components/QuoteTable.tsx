
import React from 'react';
import { FinalQuote, Member, CoverageOptions, MemberQuote, PlanLevel, Product, AnGiaPlanLevel, TamBinhPlanLevel } from '../types';
import { Translation } from '../translations';

interface QuoteTableProps {
  quote: FinalQuote;
  members: Member[];
  familyDiscount: number;
  promoDiscount: number;
  t: Translation['quoteTable'];
  language: 'vi' | 'en';
  planNames: { [key: string]: string };
  product: Product;
}

const formatCurrency = (value: number) => {
  if (value === 0) return '—';
  return new Intl.NumberFormat('vi-VN').format(Math.round(value));
};

const PlanHeader: React.FC<{ plan: PlanLevel; planName: string }> = ({ plan, planName }) => {
    let bgColor = 'bg-slate-200';
    let textColor = 'text-slate-800';
    switch (plan) {
        case AnGiaPlanLevel.DONG: bgColor = 'bg-amber-600'; textColor = 'text-white'; break;
        case AnGiaPlanLevel.BAC: bgColor = 'bg-slate-400'; textColor = 'text-white'; break;
        case AnGiaPlanLevel.VANG: bgColor = 'bg-yellow-400'; textColor = 'text-slate-900'; break;
        case AnGiaPlanLevel.BACH_KIM: bgColor = 'bg-cyan-500'; textColor = 'text-white'; break;
        case AnGiaPlanLevel.KIM_CUONG: bgColor = 'bg-indigo-500'; textColor = 'text-white'; break;
        case TamBinhPlanLevel.CO_BAN: bgColor = 'bg-lime-600'; textColor = 'text-white'; break;
        case TamBinhPlanLevel.MO_RONG: bgColor = 'bg-emerald-500'; textColor = 'text-white'; break;
        case TamBinhPlanLevel.NANG_CAO: bgColor = 'bg-teal-500'; textColor = 'text-white'; break;
        case TamBinhPlanLevel.TOAN_DIEN: bgColor = 'bg-sky-500'; textColor = 'text-white'; break;
        case TamBinhPlanLevel.UU_VIET: bgColor = 'bg-purple-600'; textColor = 'text-white'; break;
    }
    return <span className={`px-2 py-1 text-xs font-bold rounded ${bgColor} ${textColor}`}>{planName}</span>
}

const QuoteTable: React.FC<QuoteTableProps> = ({ quote, members, familyDiscount, promoDiscount, t, language, planNames, product }) => {
  const familyDiscountMultiplier = 1 - familyDiscount / 100;
  const promoDiscountMultiplier = 1 - promoDiscount / 100;
  
  const subTotal = quote.total * familyDiscountMultiplier;
  const finalTotal = subTotal * promoDiscountMultiplier;

  const memberMap = members.reduce((acc, member) => {
    acc[member.id] = member;
    return acc;
  }, {} as Record<string, Member>);

  const hasOptionSelected = (option: keyof Omit<CoverageOptions, 'personalAccidentSumInsured' | 'lifeInsuranceSumInsured' | 'accidentBenefit'>) => {
    return quote.memberQuotes.some(mq => memberMap[mq.memberId]?.coverageOptions[option]);
  };
  
  const hasTamBinhAccidentBenefit = (type: 'PA' | 'LPA') => {
      return product === Product.TAM_BINH && quote.memberQuotes.some(mq => memberMap[mq.memberId]?.coverageOptions.accidentBenefit === type);
  }

  const optionVisibility = {
    outpatient: hasOptionSelected('outpatient'),
    dental: hasOptionSelected('dental') && product === Product.AN_GIA,
    maternity: hasOptionSelected('maternity') && product === Product.AN_GIA,
    personalAccident: (hasOptionSelected('personalAccident') && product === Product.AN_GIA) || hasTamBinhAccidentBenefit('PA'),
    lifeInsurance: (hasOptionSelected('lifeInsurance') && product === Product.AN_GIA) || hasTamBinhAccidentBenefit('LPA'),
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                        <th className="p-3 text-sm font-bold tracking-wider bg-slate-200 text-slate-800">{t.header.member}</th>
                        <th className="p-3 text-sm font-bold tracking-wider text-center bg-slate-200 text-slate-800">{t.header.premiumDetails}</th>
                        <th className="p-3 text-sm font-bold tracking-wider text-center bg-slate-200 text-slate-800">{t.header.afterFamilyDiscount}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {quote.memberQuotes.map(mq => {
                        const member = memberMap[mq.memberId];
                        if (!member) return null;

                        const discountedTotal = mq.total * familyDiscountMultiplier;
                        
                        return (
                            <tr key={mq.memberId}>
                                <td className="p-3 font-semibold">
                                    <div className="flex flex-col">
                                        <span>{member.name}</span>
                                        <span className="text-xs text-slate-500 font-normal">
                                           ({mq.age < 1 
                                                ? `${mq.ageInDays} ${t.age.days}` 
                                                : `${mq.age} ${t.age.years}`})
                                        </span>
                                        <PlanHeader plan={mq.planLevel} planName={planNames[mq.planLevel]} />
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                        <span>{t.benefits.main}:</span><span className="text-right font-medium">{formatCurrency(mq.main)}</span>
                                        {optionVisibility.outpatient && mq.outpatient > 0 && <span>{t.benefits.outpatient}:</span>}
                                        {optionVisibility.outpatient && mq.outpatient > 0 && <span className="text-right font-medium">{formatCurrency(mq.outpatient)}</span>}
                                        {optionVisibility.dental && mq.dental > 0 && <span>{t.benefits.dental}:</span>}
                                        {optionVisibility.dental && mq.dental > 0 && <span className="text-right font-medium">{formatCurrency(mq.dental)}</span>}
                                        {optionVisibility.maternity && mq.maternity > 0 && <span>{t.benefits.maternity}:</span>}
                                        {optionVisibility.maternity && mq.maternity > 0 && <span className="text-right font-medium">{formatCurrency(mq.maternity)}</span>}
                                        
                                        {product === Product.AN_GIA && optionVisibility.personalAccident && mq.personalAccident > 0 && <span>{t.benefits.personalAccident}:</span>}
                                        {product === Product.AN_GIA && optionVisibility.personalAccident && mq.personalAccident > 0 && <span className="text-right font-medium">{formatCurrency(mq.personalAccident)}</span>}
                                        
                                        {product === Product.AN_GIA && optionVisibility.lifeInsurance && mq.lifeInsurance > 0 && <span>{t.benefits.lifeInsurance}:</span>}
                                        {product === Product.AN_GIA && optionVisibility.lifeInsurance && mq.lifeInsurance > 0 && <span className="text-right font-medium">{formatCurrency(mq.lifeInsurance)}</span>}

                                        {product === Product.TAM_BINH && member.coverageOptions.accidentBenefit === 'PA' && <span>{t.benefits.personalAccident}:</span>}
                                        {product === Product.TAM_BINH && member.coverageOptions.accidentBenefit === 'PA' && <span className="text-right font-medium">{formatCurrency(mq.personalAccident)}</span>}
                                        
                                        {product === Product.TAM_BINH && member.coverageOptions.accidentBenefit === 'LPA' && <span>{t.benefits.lifeAndPersonalAccident}:</span>}
                                        {product === Product.TAM_BINH && member.coverageOptions.accidentBenefit === 'LPA' && <span className="text-right font-medium">{formatCurrency(mq.lifeInsurance)}</span>}
                                    </div>
                                </td>
                                <td className="p-3 text-center font-bold text-blue-700">
                                   {familyDiscount !== 0 && mq.total > 0 ? (
                                        <div>
                                            <span className="text-xs line-through text-slate-500">{formatCurrency(mq.total)}</span>
                                            <br/>
                                            <span className="text-base">{formatCurrency(discountedTotal)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-base">{formatCurrency(mq.total)}</span>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr className="bg-slate-100 text-slate-700">
                        <td colSpan={2} className="p-3 font-semibold text-right border-t-2 border-slate-300">{t.footer.totalOriginal}</td>
                        <td className="p-3 text-center font-semibold border-t-2 border-slate-300">{formatCurrency(quote.total)} VNĐ</td>
                    </tr>
                    {familyDiscount !== 0 && (
                        <tr className="bg-slate-100 text-slate-700">
                            <td colSpan={2} className="p-3 text-right">{t.footer.familyDiscount} ({familyDiscount}%)</td>
                            <td className="p-3 text-center text-red-600">- {formatCurrency(quote.total - subTotal)} VNĐ</td>
                        </tr>
                    )}
                    <tr className="bg-slate-200 text-slate-800 font-bold">
                        <td colSpan={2} className="p-3 text-right">{t.footer.totalAfterFamilyDiscount}</td>
                        <td className="p-3 text-center">{formatCurrency(subTotal)} VNĐ</td>
                    </tr>
                    {promoDiscount !== 0 && (
                        <tr className="bg-slate-100 text-slate-700">
                            <td colSpan={2} className="p-3 text-right">{t.footer.promoDiscount} ({promoDiscount}%)</td>
                            <td className="p-3 text-center text-red-600">- {formatCurrency(subTotal - finalTotal)} VNĐ</td>
                        </tr>
                    )}
                    <tr className="bg-slate-800 text-white font-bold">
                        <td colSpan={2} className="p-4 text-base uppercase">{t.footer.grandTotal}</td>
                        <td className="p-4 text-center text-lg">{formatCurrency(finalTotal)} VNĐ</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  );
};

export default QuoteTable;