
import React, { useState, useEffect } from 'react';
import { Member, PlanLevel, CoverageOptions, Product, AnGiaPlanLevel, TamBinhPlanLevel } from '../types';
import EditMemberModal from './EditMemberModal';
import { parseDateString } from '../services/calculator';
import { Translation, translations } from '../translations';

interface MemberManagerProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  t: Translation['memberManager'];
  language: 'vi' | 'en';
  product: Product;
  planLevels: PlanLevel[];
  planNames: { [key: string]: string };
}

const initialAnGiaOptions: CoverageOptions = {
    outpatient: true,
    dental: false,
    maternity: false,
    personalAccident: false,
    lifeInsurance: false,
    personalAccidentSumInsured: 50000000,
    lifeInsuranceSumInsured: 50000000,
    accidentBenefit: 'NONE',
};

const initialTamBinhOptions: CoverageOptions = {
    outpatient: true,
    dental: false,
    maternity: false,
    personalAccident: false,
    lifeInsurance: false,
    personalAccidentSumInsured: 0,
    lifeInsuranceSumInsured: 0,
    accidentBenefit: 'NONE',
};


const formatNumberInput = (value: number) => new Intl.NumberFormat('vi-VN').format(value);
const parseNumberInput = (value: string) => parseInt(value.replace(/\./g, ''), 10) || 0;

type BenefitConfig = {
    name: keyof Omit<CoverageOptions, 'personalAccidentSumInsured' | 'lifeInsuranceSumInsured' | 'accidentBenefit'>;
    label: string;
    sumInsuredKey?: keyof Pick<CoverageOptions, 'personalAccidentSumInsured' | 'lifeInsuranceSumInsured'>;
    product: Product[];
};

const MemberManager: React.FC<MemberManagerProps> = ({ members, setMembers, t, language, product, planLevels, planNames }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState<string>('');
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const initialCoverageOptions = product === Product.AN_GIA ? initialAnGiaOptions : initialTamBinhOptions;
  const defaultPlan = product === Product.AN_GIA ? AnGiaPlanLevel.VANG : TamBinhPlanLevel.NANG_CAO;

  const [planLevel, setPlanLevel] = useState<PlanLevel>(defaultPlan);
  const [coverageOptions, setCoverageOptions] = useState<CoverageOptions>(initialCoverageOptions);

  const benefits: BenefitConfig[] = [
    { name: 'outpatient', label: t.benefits.outpatient, product: [Product.AN_GIA, Product.TAM_BINH] },
    { name: 'dental', label: t.benefits.dental, product: [Product.AN_GIA] },
    { name: 'maternity', label: t.benefits.maternity, product: [Product.AN_GIA] },
    { name: 'personalAccident', label: t.benefits.personalAccident, sumInsuredKey: 'personalAccidentSumInsured', product: [Product.AN_GIA] },
    { name: 'lifeInsurance', label: t.benefits.lifeInsurance, sumInsuredKey: 'lifeInsuranceSumInsured', product: [Product.AN_GIA] },
  ];
  
  useEffect(() => {
    // Reset form to defaults when product changes
    setPlanLevel(defaultPlan);
    setCoverageOptions(initialCoverageOptions);
  }, [product, defaultPlan]);


  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob) {
      setError(t.errors.formIncomplete);
      return;
    }
    const birthDate = parseDateString(dob);
    if (!birthDate) {
      setError(t.errors.invalidDob);
      return;
    }
    setError('');

    const newMember: Member = {
      id: crypto.randomUUID(),
      name: name.trim(),
      dob,
      planLevel,
      coverageOptions,
    };
    setMembers([...members, newMember]);
    setName('');
    setDob('');
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };
  
  const handleSaveEdit = (updatedMember: Member) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    setEditingMember(null);
  };
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoverageOptions(prev => ({ ...prev, [event.target.name]: event.target.checked }));
  };
  
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoverageOptions(prev => ({ ...prev, accidentBenefit: event.target.value as 'NONE' | 'PA' | 'LPA' }));
  };

  const handleSumInsuredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCoverageOptions(prev => ({ ...prev, [name]: parseNumberInput(value) }));
  };

  const getPlanClassName = (plan: PlanLevel) => {
    // This styling logic might need adjustment if plan names overlap, but it's fine for now
    switch (plan) {
        case AnGiaPlanLevel.DONG: return 'border-amber-600';
        case AnGiaPlanLevel.BAC: return 'border-slate-400';
        case AnGiaPlanLevel.VANG: return 'border-yellow-400';
        case AnGiaPlanLevel.BACH_KIM: return 'border-cyan-500';
        case AnGiaPlanLevel.KIM_CUONG: return 'border-indigo-500';
        case TamBinhPlanLevel.CO_BAN: return 'border-lime-600';
        case TamBinhPlanLevel.MO_RONG: return 'border-emerald-500';
        case TamBinhPlanLevel.NANG_CAO: return 'border-teal-500';
        case TamBinhPlanLevel.TOAN_DIEN: return 'border-sky-500';
        case TamBinhPlanLevel.UU_VIET: return 'border-purple-600';
        default: return 'border-slate-300';
    }
  }
  
  const visibleBenefits = benefits.filter(b => b.product.includes(product));

  const renderMemberBenefits = (member: Member) => {
    const opts = member.coverageOptions;
    if (product === Product.AN_GIA) {
        return (
            <>
                {opts.outpatient && <span>{t.benefits.outpatient}</span>}
                {opts.dental && <span>{t.benefits.dental}</span>}
                {opts.maternity && <span>{t.benefits.maternity}</span>}
                {opts.personalAccident && <span>{t.benefits.personalAccident}</span>}
                {opts.lifeInsurance && <span>{t.benefits.lifeInsurance}</span>}
            </>
        )
    }
    if (product === Product.TAM_BINH) {
         return (
            <>
                {opts.outpatient && <span>{t.benefits.outpatient}</span>}
                {opts.accidentBenefit === 'PA' && <span>{t.benefits.personalAccident}</span>}
                {opts.accidentBenefit === 'LPA' && <span>{t.benefits.lifeAndPersonalAccident}</span>}
            </>
        )
    }
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-4">{t.title}</h2>
      <form onSubmit={addMember} className="space-y-4 p-4 border border-slate-200 rounded-lg">
        <h3 className="font-semibold text-slate-700 -mb-2">{t.form.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">{t.form.nameLabel}</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.form.namePlaceholder} className="w-full input"/>
            </div>
             <div>
              <label htmlFor="dob" className="block text-sm font-medium text-slate-600 mb-1">{t.form.dobLabel}</label>
              <input id="dob" type="text" value={dob} onChange={(e) => setDob(e.target.value)} placeholder={t.form.dobPlaceholder} className="w-full input"/>
            </div>
        </div>
        <div>
            <label htmlFor="planLevel" className="block text-sm font-medium text-slate-600 mb-1">{t.form.mainPlanLabel}</label>
            <select id="planLevel" value={planLevel} onChange={(e) => setPlanLevel(e.target.value as PlanLevel)} className="w-full input">
                {planLevels.map(p => <option key={p} value={p}>{planNames[p]}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">{t.form.additionalBenefitsLabel}</label>
            <div className="space-y-3">
                 {visibleBenefits.map(benefit => (
                    <div key={benefit.name}>
                        <label className="flex items-center text-slate-700 font-medium">
                            <input type="checkbox" name={benefit.name} checked={!!coverageOptions[benefit.name]} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                            <span className="ml-2">{benefit.label}</span>
                        </label>
                        {product === Product.AN_GIA && benefit.sumInsuredKey && coverageOptions[benefit.name] && (
                            <div className="mt-2 pl-6">
                                <label className="text-xs text-slate-500">{t.form.sumInsuredLabel}</label>
                                <input type="text" name={benefit.sumInsuredKey} value={formatNumberInput(coverageOptions[benefit.sumInsuredKey] || 0)} onChange={handleSumInsuredChange} className="w-full input text-sm" />
                            </div>
                        )}
                    </div>
                ))}
                 {product === Product.TAM_BINH && (
                    <div role="radiogroup" className="space-y-2">
                        <span className="text-slate-700 font-medium">{t.benefits.accidentSectionTitle}</span>
                        <label className="flex items-center">
                            <input type="radio" name="accidentBenefit" value="NONE" checked={coverageOptions.accidentBenefit === 'NONE'} onChange={handleRadioChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500"/>
                            <span className="ml-2">{t.benefits.none}</span>
                        </label>
                         <label className="flex items-center">
                            <input type="radio" name="accidentBenefit" value="PA" checked={coverageOptions.accidentBenefit === 'PA'} onChange={handleRadioChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500"/>
                            <span className="ml-2">{t.benefits.personalAccident}</span>
                        </label>
                         <label className="flex items-center">
                            <input type="radio" name="accidentBenefit" value="LPA" checked={coverageOptions.accidentBenefit === 'LPA'} onChange={handleRadioChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500"/>
                            <span className="ml-2">{t.benefits.lifeAndPersonalAccident}</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          {t.form.addButton}
        </button>
      </form>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.list.title}</h3>
        <ul className="space-y-3">
          {members.map(member => (
            <li key={member.id} className={`flex justify-between items-start bg-slate-50 p-3 rounded-md border-l-4 ${getPlanClassName(member.planLevel)}`}>
              <div className="flex-grow">
                <p className="font-semibold text-slate-800">{member.name} <span className="font-normal text-slate-500">- {planNames[member.planLevel]}</span></p>
                <p className="text-xs text-slate-500">{parseDateString(member.dob)?.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-GB')}</p>
                 <div className="text-xs text-slate-600 mt-1 space-x-2">
                    {renderMemberBenefits(member)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 ml-2">
                 <button onClick={() => setEditingMember(member)} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">{t.list.editButton}</button>
                 <button onClick={() => removeMember(member.id)} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">{t.list.deleteButton}</button>
              </div>
            </li>
          ))}
          {members.length === 0 && <p className="text-sm text-slate-400 text-center py-2">{t.list.empty}</p>}
        </ul>
      </div>
      {editingMember && (
        <EditMemberModal 
            member={editingMember}
            onSave={handleSaveEdit}
            onClose={() => setEditingMember(null)}
            t={translations[language].editModal}
            language={language}
            product={product}
            planLevels={planLevels}
            planNames={planNames}
        />
      )}
    </div>
  );
};

export default MemberManager;