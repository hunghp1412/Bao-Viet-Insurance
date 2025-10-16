
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Member, FinalQuote, Product, PlanLevel, CoverageOptions } from './types';
import { calculateQuote } from './services/calculator';
import MemberManager from './components/MemberManager';
import QuoteTable from './components/QuoteTable';
import { LogoIcon } from './products/anGia/premiums';
import DiscountManager from './components/DiscountManager';
import BenefitsTable from './components/BenefitsTable';
import { translations } from './translations';
import { getProductData } from './products';

type Language = 'vi' | 'en';

const App: React.FC = () => {
  const [product, setProduct] = useState<Product>(Product.AN_GIA);
  const [members, setMembers] = useState<Member[]>([]);
  const [quote, setQuote] = useState<FinalQuote | null>(null);
  const [familyDiscount, setFamilyDiscount] = useState(0);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [language, setLanguage] = useState<Language>('vi');
  const [copySuccess, setCopySuccess] = useState(false);

  // Load state from URL on initial mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
        try {
            const decodedData = JSON.parse(atob(data));
            
            if (decodedData.product && Array.isArray(decodedData.members)) {
                setProduct(decodedData.product);
                setMembers(decodedData.members);
                setFamilyDiscount(decodedData.familyDiscount || 0);
                setPromoDiscount(decodedData.promoDiscount || 0);
                setLanguage(decodedData.language || 'vi');
            }
            window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
            console.error("Failed to parse shared data from URL:", error);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
  }, []);

  const t = translations[language];

  const { premiumData, benefitsData, planLevels, planNames, productName } = useMemo(
    () => getProductData(product, language),
    [product, language]
  );
  
  const handleProductChange = (newProduct: Product) => {
    if (newProduct !== product) {
        setProduct(newProduct);
        setMembers([]);
        setQuote(null);
    }
  }

  const handleCalculateQuote = useCallback(() => {
    if (members.length > 0) {
      const result = calculateQuote(members, product, premiumData);
      setQuote(result);
    } else {
      setQuote(null);
    }
  }, [members, product, premiumData]);

  useEffect(() => {
    handleCalculateQuote();
  }, [handleCalculateQuote]);
  
  const activePlans = useMemo(() => {
    const plans = members.map(m => m.planLevel);
    // Return unique plans, preserving the original enum order
    return planLevels.filter(p => plans.includes(p));
  }, [members, planLevels]);

  const activeCoverageOptions = useMemo(() => {
    const initialOptions: Partial<CoverageOptions> = {
      outpatient: members.some(m => m.coverageOptions.outpatient),
      dental: members.some(m => m.coverageOptions.dental),
      maternity: members.some(m => m.coverageOptions.maternity),
      personalAccident: members.some(m => m.coverageOptions.personalAccident),
      lifeInsurance: members.some(m => m.coverageOptions.lifeInsurance),
      accidentBenefit: 'NONE',
    };

    // Determine the highest selected accident benefit for Tâm Bình
    if (product === Product.TAM_BINH) {
        if(members.some(m => m.coverageOptions.accidentBenefit === 'LPA')) {
            initialOptions.accidentBenefit = 'LPA';
        } else if (members.some(m => m.coverageOptions.accidentBenefit === 'PA')) {
            initialOptions.accidentBenefit = 'PA';
        }
    }
    
    return initialOptions;
  }, [members, product]);

  const handleShare = () => {
    const stateToShare = {
      product,
      members,
      familyDiscount,
      promoDiscount,
      language,
    };
    try {
      const encodedData = btoa(JSON.stringify(stateToShare));
      const url = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      });
    } catch (error) {
      console.error("Failed to create share link:", error);
      alert('Could not create share link.');
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 relative">
            <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-blue-700">{LogoIcon}</span>
                 <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    {t.appTitle.main} <span className="text-blue-600">{productName}</span>
                 </h1>
            </div>
          <p className="text-slate-600">{t.appSubtitle}</p>
          <div className="flex justify-center mt-6">
            <div role="radiogroup" className="flex p-1 bg-slate-200 rounded-full shadow-inner">
                <button 
                    role="radio"
                    aria-checked={product === Product.AN_GIA}
                    onClick={() => handleProductChange(Product.AN_GIA)} 
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${product === Product.AN_GIA ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-300'}`}
                >
                    Bảo Việt An Gia
                </button>
                <button 
                    role="radio"
                    aria-checked={product === Product.TAM_BINH}
                    onClick={() => handleProductChange(Product.TAM_BINH)} 
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${product === Product.TAM_BINH ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:bg-slate-300'}`}
                >
                    Bảo Việt Tâm Bình
                </button>
            </div>
          </div>
           <div className="absolute top-0 right-0 flex items-center gap-2">
                <button
                    onClick={handleShare}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${copySuccess ? 'bg-green-500 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                    title={t.shareButton.title}
                    aria-label={t.shareButton.title}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {copySuccess ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        )}
                    </svg>
                    <span>{copySuccess ? t.shareButton.copied : t.shareButton.share}</span>
                </button>

                <div className="flex items-center border border-slate-300 rounded-full">
                    <button 
                        onClick={() => setLanguage('vi')}
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${language === 'vi' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                        VI
                    </button>
                    <button 
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                        EN
                    </button>
                </div>
            </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <MemberManager 
                members={members} 
                setMembers={setMembers} 
                t={t.memberManager} 
                language={language}
                product={product}
                planLevels={planLevels}
                planNames={planNames}
            />
            <DiscountManager
              familyDiscount={familyDiscount}
              setFamilyDiscount={setFamilyDiscount}
              promoDiscount={promoDiscount}
              setPromoDiscount={setPromoDiscount}
              t={t.discountManager}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            {quote ? (
              <>
                <QuoteTable 
                  quote={quote} 
                  members={members} 
                  familyDiscount={familyDiscount} 
                  promoDiscount={promoDiscount}
                  t={t.quoteTable} 
                  language={language}
                  planNames={planNames}
                  product={product}
                />
                {activePlans.length > 0 && 
                  <BenefitsTable 
                    plans={activePlans} 
                    options={activeCoverageOptions} 
                    t={t.benefitsTable} 
                    language={language}
                    benefitsData={benefitsData}
                    planNames={planNames}
                  />
                }
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center text-slate-500 h-full flex items-center justify-center">
                <p>{t.noMembersPlaceholder}</p>
              </div>
            )}
          </div>
        </main>
         <footer className="text-center mt-12 text-sm text-slate-500">
            <p>{t.footer.line1(productName)}</p>
            <p>{t.footer.line2}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
