import { TamBinhPlanLevel, CoverageOptions } from '../../types';

export type BenefitLimits = { [key in TamBinhPlanLevel]: string };

export interface BenefitItem {
  label_vi: string;
  label_en: string;
  limits: Partial<BenefitLimits>;
  isSubItem?: boolean;
}

export interface BenefitSection {
  title_vi: string;
  title_en: string;
  items: BenefitItem[];
  optionKey?: string;
}

const partialDisabilityText = 'Trả theo Bảng tỷ lệ';
const partialDisabilityTextEn = 'Paid according to rate table';

export const BENEFITS_DATA: BenefitSection[] = [
  {
    title_vi: 'QUYỀN LỢI BẢO HIỂM CHÍNH – ĐIỀU TRỊ NỘI TRÚ',
    title_en: 'MAIN INSURANCE BENEFITS – INPATIENT TREATMENT',
    items: [
      {
        label_vi: 'Số tiền bảo hiểm/người/năm',
        label_en: 'Sum insured/person/year',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '60.000.000',
          [TamBinhPlanLevel.MO_RONG]: '100.000.000',
          [TamBinhPlanLevel.NANG_CAO]: '160.000.000',
          [TamBinhPlanLevel.TOAN_DIEN]: '220.000.000',
          [TamBinhPlanLevel.UU_VIET]: '330.000.000',
        },
      },
      {
        label_vi: '1. Nằm viện & phẫu thuật (Tối đa 60 ngày/năm)',
        label_en: '1. Hospitalization & Surgery (Max 60 days/year)',
        limits: {},
      },
      {
        label_vi: 'Chi phí nằm viện',
        label_en: 'Hospitalization costs',
        isSubItem: true,
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '400.000/ngày, lên đến 21.000.000/năm',
          [TamBinhPlanLevel.MO_RONG]: '600.000/ngày, lên đến 36.000.000/năm',
          [TamBinhPlanLevel.NANG_CAO]: '1.000.000/ngày, lên đến 60.000.000/năm',
          [TamBinhPlanLevel.TOAN_DIEN]: '1.400.000/ngày, lên đến 84.000.000/năm',
          [TamBinhPlanLevel.UU_VIET]: '2.000.000/ngày, lên đến 120.000.000/năm',
        },
      },
      {
        label_vi: 'Chi phí phẫu thuật',
        label_en: 'Surgical expenses',
        isSubItem: true,
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '18.000.000/năm',
          [TamBinhPlanLevel.MO_RONG]: '30.000.000/năm',
          [TamBinhPlanLevel.NANG_CAO]: '50.000.000/năm',
          [TamBinhPlanLevel.TOAN_DIEN]: '60.000.000/năm',
          [TamBinhPlanLevel.UU_VIET]: '97.000.000/năm',
        },
      },
      {
        label_vi: '2. Trợ cấp nằm viện (Tối đa 60 ngày/năm)',
        label_en: '2. Hospital cash allowance (Max 60 days/year)',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '100.000/ngày',
          [TamBinhPlanLevel.MO_RONG]: '150.000/ngày',
          [TamBinhPlanLevel.NANG_CAO]: '200.000/ngày',
          [TamBinhPlanLevel.TOAN_DIEN]: '250.000/ngày',
          [TamBinhPlanLevel.UU_VIET]: '400.000/ngày',
        },
      },
      {
        label_vi: '3. Chi phí khám trước/sau khi nhập/xuất viện',
        label_en: '3. Pre/post hospitalization expenses',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '500.000/năm',
          [TamBinhPlanLevel.MO_RONG]: '1.000.000/năm',
          [TamBinhPlanLevel.NANG_CAO]: '1.500.000/năm',
          [TamBinhPlanLevel.TOAN_DIEN]: '2.000.000/năm',
          [TamBinhPlanLevel.UU_VIET]: '3.000.000/năm',
        },
      },
      {
        label_vi: '4. Xe cứu thương',
        label_en: '4. Ambulance',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '1.000.000/người/năm',
          [TamBinhPlanLevel.MO_RONG]: '2.000.000/người/năm',
          [TamBinhPlanLevel.NANG_CAO]: '2.500.000/người/năm',
          [TamBinhPlanLevel.TOAN_DIEN]: '3.000.000/người/năm',
          [TamBinhPlanLevel.UU_VIET]: '3.500.000/người/năm',
        },
      },
      {
        label_vi: '5. Hỗ trợ giáo dục (tối đa 2 con)',
        label_en: '5. Education support (max 2 children)',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '500.000/con',
          [TamBinhPlanLevel.MO_RONG]: '1.000.000/con',
          [TamBinhPlanLevel.NANG_CAO]: '2.000.000/con',
          [TamBinhPlanLevel.TOAN_DIEN]: '2.000.000/con',
          [TamBinhPlanLevel.UU_VIET]: '2.500.000/con',
        },
      },
    ],
  },
  {
    title_vi: 'QUYỀN LỢI BẢO HIỂM BỔ SUNG',
    title_en: 'SUPPLEMENTARY INSURANCE BENEFITS',
    items: [],
  },
  {
    title_vi: 'I. Tử vong/Thương tật vĩnh viễn (Chọn 1 trong 2)',
    title_en: 'I. Death/Permanent Disability (Choose 1 of 2)',
    items: [],
  },
  {
    title_vi: '1. Bảo hiểm tai nạn cá nhân',
    title_en: '1. Personal Accident Insurance',
    optionKey: 'accidentBenefit_PA',
    items: [
       {
        label_vi: 'Tử vong/Thương tật toàn bộ vĩnh viễn do tai nạn',
        label_en: 'Death/Total permanent disability due to accident',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '20.000.000',
          [TamBinhPlanLevel.MO_RONG]: '30.000.000',
          [TamBinhPlanLevel.NANG_CAO]: '50.000.000',
          [TamBinhPlanLevel.TOAN_DIEN]: '70.000.000',
          [TamBinhPlanLevel.UU_VIET]: '100.000.000',
        },
      },
      {
        label_vi: 'Thương tật bộ phận vĩnh viễn do tai nạn',
        label_en: 'Partial permanent disability due to accident',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: partialDisabilityText,
          [TamBinhPlanLevel.MO_RONG]: partialDisabilityText,
          [TamBinhPlanLevel.NANG_CAO]: partialDisabilityText,
          [TamBinhPlanLevel.TOAN_DIEN]: partialDisabilityText,
          [TamBinhPlanLevel.UU_VIET]: partialDisabilityText,
        },
      }
    ]
  },
   {
    title_vi: '2. Bảo hiểm Sinh mạng và Tai nạn cá nhân',
    title_en: '2. Life and Personal Accident Insurance',
    optionKey: 'accidentBenefit_LPA',
    items: [
       {
        label_vi: 'Tử vong/Thương tật toàn bộ vĩnh viễn do mọi nguyên nhân',
        label_en: 'Death/Total permanent disability due to any cause',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '20.000.000',
          [TamBinhPlanLevel.MO_RONG]: '30.000.000',
          [TamBinhPlanLevel.NANG_CAO]: '50.000.000',
          [TamBinhPlanLevel.TOAN_DIEN]: '70.000.000',
          [TamBinhPlanLevel.UU_VIET]: '100.000.000',
        },
      },
      {
        label_vi: 'Thương tật bộ phận vĩnh viễn do tai nạn',
        label_en: 'Partial permanent disability due to accident',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: partialDisabilityText,
          [TamBinhPlanLevel.MO_RONG]: partialDisabilityText,
          [TamBinhPlanLevel.NANG_CAO]: partialDisabilityText,
          [TamBinhPlanLevel.TOAN_DIEN]: partialDisabilityText,
          [TamBinhPlanLevel.UU_VIET]: partialDisabilityText,
        },
      }
    ]
  },
  {
    title_vi: 'II. Điều trị ngoại trú',
    title_en: 'II. Outpatient Treatment',
    optionKey: 'outpatient',
    items: [
      {
        label_vi: 'Số tiền bảo hiểm',
        label_en: 'Sum insured',
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '3.000.000',
          [TamBinhPlanLevel.MO_RONG]: '3.000.000',
          [TamBinhPlanLevel.NANG_CAO]: '6.000.000',
          [TamBinhPlanLevel.TOAN_DIEN]: '8.000.000',
          [TamBinhPlanLevel.UU_VIET]: '10.000.000',
        },
      },
      {
        label_vi: 'Giới hạn/lần khám',
        label_en: 'Limit/visit',
        isSubItem: true,
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '600.000/lần',
          [TamBinhPlanLevel.MO_RONG]: '600.000/lần',
          [TamBinhPlanLevel.NANG_CAO]: '900.000/lần',
          [TamBinhPlanLevel.TOAN_DIEN]: '1.200.000/lần',
          [TamBinhPlanLevel.UU_VIET]: '1.500.000/lần',
        },
      },
       {
        label_vi: 'Vật lý trị liệu (Tối đa 20 ngày/năm)',
        label_en: 'Physical therapy (Max 20 days/year)',
        isSubItem: true,
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '100.000/ngày',
          [TamBinhPlanLevel.MO_RONG]: '100.000/ngày',
          [TamBinhPlanLevel.NANG_CAO]: '100.000/ngày',
          [TamBinhPlanLevel.TOAN_DIEN]: '100.000/ngày',
          [TamBinhPlanLevel.UU_VIET]: '100.000/ngày',
        },
      },
       {
        label_vi: 'Điều trị răng',
        label_en: 'Dental Treatment',
        isSubItem: true,
        limits: {
          [TamBinhPlanLevel.CO_BAN]: '600.000/năm',
          [TamBinhPlanLevel.MO_RONG]: '600.000/năm',
          [TamBinhPlanLevel.NANG_CAO]: '900.000/năm',
          [TamBinhPlanLevel.TOAN_DIEN]: '1.200.000/năm',
          [TamBinhPlanLevel.UU_VIET]: '1.500.000/năm',
        },
      },
    ]
  },
];