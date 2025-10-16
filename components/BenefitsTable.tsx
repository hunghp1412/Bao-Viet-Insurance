
import React from 'react';
import { PlanLevel, CoverageOptions, AnGiaPlanLevel, TamBinhPlanLevel } from '../types';
import { BenefitSection } from '../products/anGia/benefits';
import { Translation } from '../translations';

interface BenefitsTableProps {
  plans: PlanLevel[];
  options: Partial<CoverageOptions>;
  t: Translation['benefitsTable'];
  language: 'vi' | 'en';
  benefitsData: BenefitSection[];
  planNames: { [key: string]: string };
}

const formatValue = (value: string) => {
    // Attempt to format numbers with thousand separators
    const formattedValue = value.replace(/\b(\d{1,3}(?=(\d{3})+(?!\d)))\b/g, (match) => 
        new Intl.NumberFormat('vi-VN').format(parseInt(match.replace(/\./g, '')))
    );
    // Add non-breaking space for better readability with units
    return formattedValue.replace(/ \/ /g, '&nbsp;/&nbsp;');
}


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
    return <th className={`p-3 text-sm font-bold uppercase tracking-wider text-center ${bgColor} ${textColor} sticky top-0 z-20`}>{planName}</th>
}

const BenefitsTable: React.FC<BenefitsTableProps> = ({ plans, options, t, language, benefitsData, planNames }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-xl font-bold text-slate-800 p-4 border-b border-slate-200">
            {t.title}
        </h2>
        <div className="overflow-x-auto max-h-[600px] relative">
            <table className="w-full text-sm text-left text-slate-600 border-collapse">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                        <th className="p-3 text-sm font-bold uppercase tracking-wider bg-slate-200 text-slate-800 sticky top-0 left-0 z-30 w-1/3 min-w-[250px]">{t.header}</th>
                        {plans.map(plan => <PlanHeader key={plan} plan={plan} planName={planNames[plan]} />)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {benefitsData.map(section => {
                        let shouldRender = true;
                        if (section.optionKey) {
                            if (section.optionKey.startsWith('accidentBenefit_')) {
                                const benefitType = section.optionKey.split('_')[1];
                                shouldRender = options.accidentBenefit === benefitType;
                            } else {
                                shouldRender = !!options[section.optionKey as keyof CoverageOptions];
                            }
                        }
                        
                        if (!shouldRender) {
                            return null;
                        }
                        
                        const sectionTitle = language === 'vi' ? section.title_vi : section.title_en;

                        return (
                            <React.Fragment key={sectionTitle}>
                                {section.items.length > 0 ? (
                                    <tr className="bg-slate-100 font-semibold">
                                        <td colSpan={plans.length + 1} className="p-3 bg-slate-100 sticky left-0 z-10 font-bold text-slate-700">
                                            {sectionTitle}
                                        </td>
                                    </tr>
                                ) : (
                                     <tr className="bg-white">
                                        <td colSpan={plans.length + 1} className="p-3 pt-6 font-bold text-slate-800 text-lg">
                                            {sectionTitle}
                                        </td>
                                    </tr>
                                )}
                                
                                {section.items.map(item => {
                                    const itemLabel = language === 'vi' ? item.label_vi : item.label_en;
                                    return (
                                        <tr key={itemLabel} className="hover:bg-slate-50">
                                            <td className={`p-2 bg-white sticky left-0 z-10 ${item.isSubItem ? 'pl-8' : 'pl-4'}`}>
                                                {itemLabel}
                                            </td>
                                            {plans.map(plan => (
                                                <td key={plan} className="p-2 text-center" dangerouslySetInnerHTML={{ __html: formatValue(item.limits[plan as PlanLevel] || '—') }}>
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default BenefitsTable;