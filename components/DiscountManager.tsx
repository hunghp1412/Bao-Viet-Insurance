import React from 'react';
import { Translation } from '../translations';

interface DiscountManagerProps {
  familyDiscount: number;
  setFamilyDiscount: (discount: number) => void;
  promoDiscount: number;
  setPromoDiscount: (discount: number) => void;
  t: Translation['discountManager'];
}

const DiscountManager: React.FC<DiscountManagerProps> = ({ 
  familyDiscount, 
  setFamilyDiscount, 
  promoDiscount, 
  setPromoDiscount,
  t
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
    const value = e.target.value;
    if (value === '' || value === '-') {
      setter(0);
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setter(numValue);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-4">{t.title}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="familyDiscount" className="block text-sm font-medium text-slate-600 mb-1">
            {t.familyDiscountLabel}
          </label>
          <div className="flex items-center space-x-3">
            <input
              id="familyDiscount"
              type="number"
              step="any"
              value={familyDiscount}
              onChange={(e) => handleChange(e, setFamilyDiscount)}
              placeholder="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-xl font-semibold text-slate-600">%</span>
          </div>
        </div>
        <div>
          <label htmlFor="promoDiscount" className="block text-sm font-medium text-slate-600 mb-1">
            {t.promoDiscountLabel}
          </label>
          <div className="flex items-center space-x-3">
            <input
              id="promoDiscount"
              type="number"
              step="any"
              value={promoDiscount}
              onChange={(e) => handleChange(e, setPromoDiscount)}
              placeholder="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-xl font-semibold text-slate-600">%</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        {t.description}
      </p>
    </div>
  );
};

export default DiscountManager;