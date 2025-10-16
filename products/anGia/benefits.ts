import { AnGiaPlanLevel, CoverageOptions } from '../../types';

export type BenefitLimits = { [key in AnGiaPlanLevel]: string };

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
  optionKey?: keyof Omit<CoverageOptions, 'personalAccidentSumInsured' | 'lifeInsuranceSumInsured'>;
}

export const BENEFITS_DATA: BenefitSection[] = [
  {
    title_vi: 'I. QUYỀN LỢI BẢO HIỂM CHÍNH - Điều trị nội trú',
    title_en: 'I. MAIN INSURANCE BENEFITS - Inpatient Treatment',
    items: [
      {
        label_vi: 'Tổng hạn mức quyền lợi chính/người/năm',
        label_en: 'Total main benefit limit/person/year',
        limits: {
          [AnGiaPlanLevel.DONG]: '94.000.000',
          [AnGiaPlanLevel.BAC]: '138.000.000',
          [AnGiaPlanLevel.VANG]: '230.000.000',
          [AnGiaPlanLevel.BACH_KIM]: '342.000.000',
          [AnGiaPlanLevel.KIM_CUONG]: '454.000.000',
        },
      },
      {
        label_vi: '1. Chi phí nằm viện (tối đa 60 ngày/năm)',
        label_en: '1. Hospitalization expenses (max 60 days/year)',
        limits: {
          [AnGiaPlanLevel.DONG]: '2.000.000 / ngày',
          [AnGiaPlanLevel.BAC]: '3.000.000 / ngày',
          [AnGiaPlanLevel.VANG]: '5.000.000 / ngày',
          [AnGiaPlanLevel.BACH_KIM]: '7.500.000 / ngày',
          [AnGiaPlanLevel.KIM_CUONG]: '10.000.000 / ngày',
        },
      },
      {
        label_vi: 'Chi phí phòng và giường',
        label_en: 'Room and board expenses',
        isSubItem: true,
        limits: {
          [AnGiaPlanLevel.DONG]: 'Lên đến 40.000.000',
          [AnGiaPlanLevel.BAC]: 'Lên đến 60.000.000',
          [AnGiaPlanLevel.VANG]: 'Lên đến 100.000.000',
          [AnGiaPlanLevel.BACH_KIM]: 'Lên đến 150.000.000',
          [AnGiaPlanLevel.KIM_CUONG]: 'Lên đến 200.000.000',
        },
      },
      {
        label_vi: '2. Chi phí khám trước khi nhập viện',
        label_en: '2. Pre-hospitalization consultation expenses',
        limits: {
          [AnGiaPlanLevel.DONG]: '2.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '3.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '5.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '7.500.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '10.000.000 / năm',
        },
      },
      {
        label_vi: '3. Chi phí tái khám sau khi xuất viện',
        label_en: '3. Post-hospitalization follow-up expenses',
        limits: {
          [AnGiaPlanLevel.DONG]: '2.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '3.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '5.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '7.500.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '10.000.000 / năm',
        },
      },
       {
        label_vi: '4. Dịch vụ xe cứu thương',
        label_en: '4. Ambulance service',
        limits: {
          [AnGiaPlanLevel.DONG]: '5.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '5.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '10.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '10.000.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '10.000.000 / năm',
        },
      },
      {
        label_vi: '5. Chi phí phẫu thuật',
        label_en: '5. Surgical expenses',
        limits: {
          [AnGiaPlanLevel.DONG]: '40.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '60.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '100.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '150.000.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '200.000.000 / năm',
        },
      },
      {
        label_vi: '6. Phục hồi chức năng',
        label_en: '6. Rehabilitation',
        limits: {
          [AnGiaPlanLevel.DONG]: '4.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '6.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '10.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '15.000.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '20.000.000 / năm',
        },
      },
      {
        label_vi: '7. Trợ cấp bệnh viện công',
        label_en: '7. Public hospital cash benefit',
        limits: {
          [AnGiaPlanLevel.DONG]: '80.000 / ngày',
          [AnGiaPlanLevel.BAC]: '120.000 / ngày',
          [AnGiaPlanLevel.VANG]: '200.000 / ngày',
          [AnGiaPlanLevel.BACH_KIM]: '300.000 / ngày',
          [AnGiaPlanLevel.KIM_CUONG]: '400.000 / ngày',
        },
      },
      {
        label_vi: '8. Trợ cấp mai táng phí',
        label_en: '8. Funeral allowance',
        limits: {
          [AnGiaPlanLevel.DONG]: '1.000.000 / vụ',
          [AnGiaPlanLevel.BAC]: '1.000.000 / vụ',
          [AnGiaPlanLevel.VANG]: '1.000.000 / vụ',
          [AnGiaPlanLevel.BACH_KIM]: '1.000.000 / vụ',
          [AnGiaPlanLevel.KIM_CUONG]: '1.000.000 / vụ',
        },
      },
    ],
  },
  {
    title_vi: 'II. QUYỀN LỢI BẢO HIỂM BỔ SUNG',
    title_en: 'II. SUPPLEMENTARY INSURANCE BENEFITS',
    items: [],
  },
  {
    title_vi: '1. Điều trị ngoại trú',
    title_en: '1. Outpatient Treatment',
    optionKey: 'outpatient',
    items: [
       {
        label_vi: 'Giới hạn quyền lợi',
        label_en: 'Benefit limit',
        limits: {
          [AnGiaPlanLevel.DONG]: '6.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '7.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '8.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '10.000.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '15.000.000 / năm',
        },
      },
      {
        label_vi: 'Giới hạn/lần khám',
        label_en: 'Limit/consultation',
        isSubItem: true,
        limits: {
          [AnGiaPlanLevel.DONG]: '1.200.000 / lần',
          [AnGiaPlanLevel.BAC]: '1.400.000 / lần',
          [AnGiaPlanLevel.VANG]: '1.600.000 / lần',
          [AnGiaPlanLevel.BACH_KIM]: '2.000.000 / lần',
          [AnGiaPlanLevel.KIM_CUONG]: '3.000.000 / lần',
        },
      },
      {
        label_vi: 'Vật lý trị liệu',
        label_en: 'Physiotherapy',
        isSubItem: true,
        limits: {
          [AnGiaPlanLevel.DONG]: '60.000 / ngày',
          [AnGiaPlanLevel.BAC]: '70.000 / ngày',
          [AnGiaPlanLevel.VANG]: '80.000 / ngày',
          [AnGiaPlanLevel.BACH_KIM]: '100.000 / ngày',
          [AnGiaPlanLevel.KIM_CUONG]: '150.000 / ngày',
        },
      },
    ]
  },
  {
    title_vi: '2. Bảo hiểm Tai nạn cá nhân',
    title_en: '2. Personal Accident Insurance',
    optionKey: 'personalAccident',
    items: [
      {
        label_vi: 'Số tiền bảo hiểm',
        label_en: 'Sum insured',
        limits: {
          [AnGiaPlanLevel.DONG]: 'Lên đến 1 tỷ',
          [AnGiaPlanLevel.BAC]: 'Lên đến 1 tỷ',
          [AnGiaPlanLevel.VANG]: 'Lên đến 1 tỷ',
          [AnGiaPlanLevel.BACH_KIM]: 'Lên đến 1 tỷ',
          [AnGiaPlanLevel.KIM_CUONG]: 'Lên đến 1 tỷ',
        }
      }
    ]
  },
  {
    title_vi: '3. Bảo hiểm Sinh mạng cá nhân',
    title_en: '3. Personal Life Insurance',
    optionKey: 'lifeInsurance',
    items: [
      {
        label_vi: 'Số tiền bảo hiểm',
        label_en: 'Sum insured',
        limits: {
          [AnGiaPlanLevel.DONG]: 'Lên đến 200 triệu',
          [AnGiaPlanLevel.BAC]: 'Lên đến 300 triệu',
          [AnGiaPlanLevel.VANG]: 'Lên đến 500 triệu',
          [AnGiaPlanLevel.BACH_KIM]: 'Lên đến 700 triệu',
          [AnGiaPlanLevel.KIM_CUONG]: 'Lên đến 1 tỷ',
        }
      }
    ]
  },
  {
    title_vi: '4. Bảo hiểm Nha khoa',
    title_en: '4. Dental Insurance',
    optionKey: 'dental',
    items: [
      {
        label_vi: 'Giới hạn quyền lợi',
        label_en: 'Benefit limit',
        limits: {
          [AnGiaPlanLevel.DONG]: '2.000.000 / năm',
          [AnGiaPlanLevel.BAC]: '2.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '5.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '10.000.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '15.000.000 / năm',
        },
      },
      {
        label_vi: 'Giới hạn/lần khám',
        label_en: 'Limit/visit',
        isSubItem: true,
        limits: {
          [AnGiaPlanLevel.DONG]: '1.000.000 / lần',
          [AnGiaPlanLevel.BAC]: '1.000.000 / lần',
          [AnGiaPlanLevel.VANG]: '2.500.000 / lần',
          [AnGiaPlanLevel.BACH_KIM]: '5.000.000 / lần',
          [AnGiaPlanLevel.KIM_CUONG]: '7.500.000 / lần',
        },
      },
    ]
  },
  {
    title_vi: '5. Bảo hiểm Thai sản',
    title_en: '5. Maternity Insurance',
    optionKey: 'maternity',
    items: [
      {
        label_vi: 'Giới hạn quyền lợi',
        label_en: 'Benefit limit',
        limits: {
          [AnGiaPlanLevel.DONG]: 'Không',
          [AnGiaPlanLevel.BAC]: '21.000.000 / năm',
          [AnGiaPlanLevel.VANG]: '21.000.000 / năm',
          [AnGiaPlanLevel.BACH_KIM]: '21.000.000 / năm',
          [AnGiaPlanLevel.KIM_CUONG]: '31.500.000 / năm',
        },
      },
    ]
  }
];
