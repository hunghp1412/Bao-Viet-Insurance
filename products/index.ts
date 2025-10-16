import { Product } from '../types';
import { PREMIUM_DATA as AN_GIA_PREMIUM_DATA, AnGiaPlanLevels } from './anGia/premiums';
import { BENEFITS_DATA as AN_GIA_BENEFITS_DATA } from './anGia/benefits';
import { PREMIUM_DATA as TAM_BINH_PREMIUM_DATA, TamBinhPlanLevels } from './tamBinh/premiums';
import { BENEFITS_DATA as TAM_BINH_BENEFITS_DATA } from './tamBinh/benefits';
import { translations } from '../translations';

export const getProductData = (product: Product, language: 'vi' | 'en') => {
    if (product === Product.TAM_BINH) {
        return {
            premiumData: TAM_BINH_PREMIUM_DATA,
            benefitsData: TAM_BINH_BENEFITS_DATA,
            planLevels: TamBinhPlanLevels,
            planNames: translations[language].tamBinhPlanNames,
            productName: translations[language].productNames.TAM_BINH,
        }
    }
    // Default to AN_GIA
    return {
        premiumData: AN_GIA_PREMIUM_DATA,
        benefitsData: AN_GIA_BENEFITS_DATA,
        planLevels: AnGiaPlanLevels,
        planNames: translations[language].anGiaPlanNames,
        productName: translations[language].productNames.AN_GIA,
    }
}
