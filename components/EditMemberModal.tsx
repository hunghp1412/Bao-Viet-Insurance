
import React, { useState, useEffect } from 'react';
import { Member, CoverageOptions, PlanLevel, Product } from '../types';
import { parseDateString } from '../services/calculator';
import { Translation, translations } from '../translations';

interface EditMemberModalProps {
  member: Member;
  onSave: (updatedMember: Member) => void;
  onClose: () => void;
  t: Translation['editModal'];
  language: 'vi' | 'en';
  product: Product;
  planLevels: PlanLevel[];
  planNames: { [key: string]: string };
}

const formatNumberInput = (value: number) => new Intl.NumberFormat('vi-VN').format(value);
const parseNumberInput = (value: string) => parseInt(value.replace(/\./g, ''), 10) || 0;

type BenefitConfig = {
    name: keyof Omit<CoverageOptions, 'personalAccidentSumInsured' | 'lifeInsuranceSumInsured' | 'accidentBenefit'>;
    label: string;
    sumInsuredKey?: keyof Pick<CoverageOptions, 'personalAccidentSumInsured' | 'lifeInsuranceSumInsured'>;
    product: Product[];
};

const EditMemberModal: React.FC<EditMemberModalProps> = ({ member, onSave, onClose, t, language, product, planLevels, planNames }) => {
  const [name, setName] = useState(member.name);
  const [dob, setDob] = useState(member.dob);
  const [planLevel, setPlanLevel] = useState(member.planLevel);
  const [coverageOptions, setCoverageOptions] = useState(member.coverageOptions);
  const [error, setError] = useState('');

  const benefits: BenefitConfig[] = [
    { name: 'outpatient', label: t.benefits.outpatient, product: [Product.AN_GIA, Product.TAM_BINH] },
    { name: 'dental', label: t.benefits.dental, product: [Product.AN_GIA] },
    { name: 'maternity', label: t.benefits.maternity, product: [Product.AN_GIA] },
    { name: 'personalAccident', label: t.benefits.personalAccident, sumInsuredKey: 'personalAccidentSumInsured', product: [Product.AN_GIA] },
    { name: 'lifeInsurance', label: t.benefits.lifeInsurance, sumInsuredKey: 'lifeInsuranceSumInsured', product: [Product.AN_GIA] },
  ];
  const visibleBenefits = benefits.filter(b => b.product.includes(product));


  useEffect(() => {
    setName(member.name);
    setDob(member.dob);
    setPlanLevel(member.planLevel);
    setCoverageOptions(member.coverageOptions);
    setError('');
  }, [member]);
  
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

  const handleSave = (e: React.FormEvent) => {
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

    onSave({ ...member, name: name.trim(), dob, planLevel, coverageOptions });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-slate-800 mb-4">{t.title}</h2>
        <form onSubmit={handleSave} className="space-y-4">
            <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-slate-600 mb-1">{t.nameLabel}</label>
                <input id="edit-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full input"/>
            </div>
            <div>
                <label htmlFor="edit-dob" className="block text-sm font-medium text-slate-600 mb-1">{t.dobLabel}</label>
                <input id="edit-dob" type="text" value={dob} onChange={(e) => setDob(e.target.value)} placeholder={t.dobPlaceholder} className="w-full input"/>
            </div>
            <div>
                <label htmlFor="edit-planLevel" className="block text-sm font-medium text-slate-600 mb-1">{t.mainPlanLabel}</label>
                <select id="edit-planLevel" value={planLevel} onChange={(e) => setPlanLevel(e.target.value as PlanLevel)} className="w-full input">
                    {planLevels.map(p => <option key={p} value={p}>{planNames[p]}</option>)}
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">{t.additionalBenefitsLabel}</label>
                <div className="space-y-3">
                     {visibleBenefits.map(benefit => (
                        <div key={benefit.name}>
                            <label className="flex items-center text-slate-700 font-medium">
                                <input type="checkbox" name={benefit.name} checked={!!coverageOptions[benefit.name]} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                                <span className="ml-2">{benefit.label}</span>
                            </label>
                            {product === Product.AN_GIA && benefit.sumInsuredKey && coverageOptions[benefit.name] && (
                                <div className="mt-2 pl-6">
                                    <label className="text-xs text-slate-500">{t.sumInsuredLabel}</label>
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
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-200">{t.cancelButton}</button>
            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">{t.saveButton}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;