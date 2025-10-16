
import { AnGiaPlanLevel, TamBinhPlanLevel } from './types';

export const translations = {
  vi: {
    appTitle: {
      main: 'Bảng chào phí',
    },
    productNames: {
      AN_GIA: 'Bảo Việt An Gia',
      TAM_BINH: 'Bảo Việt Tâm Bình',
    },
    appSubtitle: 'Tự động tính phí bảo hiểm cho gia đình bạn một cách nhanh chóng và chính xác.',
    noMembersPlaceholder: 'Vui lòng thêm thành viên để bắt đầu tính phí.',
    shareButton: {
      share: 'Chia sẻ',
      copied: 'Đã sao chép!',
      title: 'Sao chép link báo giá để chia sẻ',
    },
    anGiaPlanNames: {
      [AnGiaPlanLevel.DONG]: 'Đồng',
      [AnGiaPlanLevel.BAC]: 'Bạc',
      [AnGiaPlanLevel.VANG]: 'Vàng',
      [AnGiaPlanLevel.BACH_KIM]: 'Bạch Kim',
      [AnGiaPlanLevel.KIM_CUONG]: 'Kim Cương',
    },
    tamBinhPlanNames: {
      [TamBinhPlanLevel.CO_BAN]: 'Cơ Bản',
      [TamBinhPlanLevel.MO_RONG]: 'Mở Rộng',
      [TamBinhPlanLevel.NANG_CAO]: 'Nâng Cao',
      [TamBinhPlanLevel.TOAN_DIEN]: 'Toàn Diện',
      [TamBinhPlanLevel.UU_VIET]: 'Ưu Việt',
    },
    memberManager: {
      title: 'Quản lý thành viên & Quyền lợi',
      form: {
        title: 'Thêm thành viên mới',
        nameLabel: 'Tên',
        namePlaceholder: 'VD: Bố',
        dobLabel: 'Ngày sinh',
        dobPlaceholder: 'DD/MM/YYYY',
        mainPlanLabel: 'Chương trình chính',
        additionalBenefitsLabel: 'Quyền lợi bổ sung',
        sumInsuredLabel: 'Số tiền bảo hiểm',
        addButton: 'Thêm thành viên',
      },
      list: {
        title: 'Danh sách gia đình',
        editButton: 'Chỉnh sửa',
        deleteButton: 'Xóa',
        empty: 'Chưa có thành viên nào.',
      },
      benefits: {
        outpatient: 'Điều trị ngoại trú',
        dental: 'Bảo hiểm nha khoa',
        maternity: 'Bảo hiểm thai sản',
        personalAccident: 'Bảo hiểm Tai nạn cá nhân',
        lifeInsurance: 'Bảo hiểm Sinh mạng',
        lifeAndPersonalAccident: 'Bảo hiểm Sinh mạng và Tai nạn',
        accidentSectionTitle: 'Tử vong/Thương tật vĩnh viễn',
        none: 'Không tham gia',
      },
      errors: {
        formIncomplete: 'Vui lòng nhập đầy đủ thông tin.',
        invalidDob: 'Định dạng ngày sinh không hợp lệ. Vui lòng nhập theo DD/MM/YYYY.',
      }
    },
    editModal: {
        title: 'Chỉnh sửa thành viên',
        nameLabel: 'Tên',
        dobLabel: 'Ngày sinh',
        dobPlaceholder: 'DD/MM/YYYY',
        mainPlanLabel: 'Chương trình chính',
        additionalBenefitsLabel: 'Quyền lợi bổ sung',
        sumInsuredLabel: 'Số tiền bảo hiểm',
        cancelButton: 'Hủy',
        saveButton: 'Lưu thay đổi',
        benefits: {
            outpatient: 'Điều trị ngoại trú',
            dental: 'Bảo hiểm nha khoa',
            maternity: 'Bảo hiểm thai sản',
            personalAccident: 'Bảo hiểm Tai nạn cá nhân',
            lifeInsurance: 'Bảo hiểm Sinh mạng',
            lifeAndPersonalAccident: 'Bảo hiểm Sinh mạng và Tai nạn',
            accidentSectionTitle: 'Tử vong/Thương tật vĩnh viễn',
            none: 'Không tham gia',
        },
        errors: {
            formIncomplete: 'Vui lòng nhập đầy đủ thông tin.',
            invalidDob: 'Định dạng ngày sinh không hợp lệ. Vui lòng nhập theo DD/MM/YYYY.',
        }
    },
    discountManager: {
        title: 'Chiết khấu / Giảm giá',
        familyDiscountLabel: 'Giảm giá gia đình tham gia mới',
        promoDiscountLabel: 'Giảm giá chương trình khuyến mãi',
        description: 'Nhập % giảm giá. Có thể là số thập phân (vd: 13.25) hoặc số âm để tăng phí.'
    },
    quoteTable: {
        header: {
            member: 'Thành viên',
            premiumDetails: 'Chi tiết phí (VNĐ)',
            afterFamilyDiscount: 'Phí sau giảm giá gia đình',
        },
        age: {
            years: 'tuổi',
            days: 'ngày',
        },
        benefits: {
            main: 'Quyền lợi chính',
            outpatient: 'Ngoại trú',
            dental: 'Nha khoa',
            maternity: 'Thai sản',
            personalAccident: 'Tai nạn cá nhân',
            lifeInsurance: 'Sinh mạng',
            lifeAndPersonalAccident: 'Sinh mạng & TNCN',
        },
        footer: {
            totalOriginal: 'Tổng phí gốc',
            familyDiscount: 'Giảm giá gia đình',
            totalAfterFamilyDiscount: 'Tổng sau giảm giá gia đình',
            promoDiscount: 'Giảm giá khuyến mãi',
            grandTotal: 'Tổng cộng thanh toán',
        }
    },
    benefitsTable: {
        title: 'Bảng Quyền Lợi Chi Tiết',
        header: 'Quyền lợi',
    },
    footer: {
        line1: (productName: string) => `Biểu phí tham khảo dựa trên quy tắc bảo hiểm ${productName}.`,
        line2: 'Đây là công cụ ước tính. Vui lòng liên hệ tư vấn viên để có thông tin chính xác nhất.',
    }
  },
  en: {
    appTitle: {
      main: 'Premium Quote for',
    },
     productNames: {
      AN_GIA: 'Bao Viet An Gia',
      TAM_BINH: 'Bao Viet Tam Binh',
    },
    appSubtitle: 'Quickly and accurately calculate insurance premiums for your family.',
    noMembersPlaceholder: 'Please add a member to start calculating the premium.',
    shareButton: {
      share: 'Share',
      copied: 'Copied!',
      title: 'Copy quote link to share',
    },
    anGiaPlanNames: {
      [AnGiaPlanLevel.DONG]: 'Copper',
      [AnGiaPlanLevel.BAC]: 'Silver',
      [AnGiaPlanLevel.VANG]: 'Gold',
      [AnGiaPlanLevel.BACH_KIM]: 'Platinum',
      [AnGiaPlanLevel.KIM_CUONG]: 'Diamond',
    },
    tamBinhPlanNames: {
      [TamBinhPlanLevel.CO_BAN]: 'Basic',
      [TamBinhPlanLevel.MO_RONG]: 'Extended',
      [TamBinhPlanLevel.NANG_CAO]: 'Advanced',
      [TamBinhPlanLevel.TOAN_DIEN]: 'Comprehensive',
      [TamBinhPlanLevel.UU_VIET]: 'Premium',
    },
    memberManager: {
      title: 'Member & Benefit Management',
      form: {
        title: 'Add a new member',
        nameLabel: 'Name',
        namePlaceholder: 'E.g., Father',
        dobLabel: 'Date of Birth',
        dobPlaceholder: 'DD/MM/YYYY',
        mainPlanLabel: 'Main Program',
        additionalBenefitsLabel: 'Additional Benefits',
        sumInsuredLabel: 'Sum Insured',
        addButton: 'Add Member',
      },
      list: {
        title: 'Family List',
        editButton: 'Edit',
        deleteButton: 'Delete',
        empty: 'No members yet.',
      },
      benefits: {
        outpatient: 'Outpatient Treatment',
        dental: 'Dental Insurance',
        maternity: 'Maternity Insurance',
        personalAccident: 'Personal Accident',
        lifeInsurance: 'Life Insurance',
        lifeAndPersonalAccident: 'Life & Personal Accident',
        accidentSectionTitle: 'Death/Permanent Disability',
        none: 'Not included',
      },
      errors: {
        formIncomplete: 'Please fill in all required fields.',
        invalidDob: 'Invalid date format. Please use DD/MM/YYYY.',
      }
    },
    editModal: {
        title: 'Edit Member',
        nameLabel: 'Name',
        dobLabel: 'Date of Birth',
        dobPlaceholder: 'DD/MM/YYYY',
        mainPlanLabel: 'Main Program',
        additionalBenefitsLabel: 'Additional Benefits',
        sumInsuredLabel: 'Sum Insured',
        cancelButton: 'Cancel',
        saveButton: 'Save Changes',
        benefits: {
            outpatient: 'Outpatient Treatment',
            dental: 'Dental Insurance',
            maternity: 'Maternity Insurance',
            personalAccident: 'Personal Accident',
            lifeInsurance: 'Life Insurance',
            lifeAndPersonalAccident: 'Life & Personal Accident',
            accidentSectionTitle: 'Death/Permanent Disability',
            none: 'Not included',
        },
        errors: {
            formIncomplete: 'Please fill in all required fields.',
            invalidDob: 'Invalid date format. Please use DD/MM/YYYY.',
        }
    },
    discountManager: {
        title: 'Discounts',
        familyDiscountLabel: 'New Family Discount',
        promoDiscountLabel: 'Promotional Discount',
        description: 'Enter % discount. Can be a decimal (e.g., 13.25) or negative to add a fee.'
    },
    quoteTable: {
        header: {
            member: 'Member',
            premiumDetails: 'Premium Details (VND)',
            afterFamilyDiscount: 'Fee After Family Discount',
        },
        age: {
            years: 'y.o.',
            days: 'days',
        },
        benefits: {
            main: 'Main Benefit',
            outpatient: 'Outpatient',
            dental: 'Dental',
            maternity: 'Maternity',
            personalAccident: 'Personal Accident',
            lifeInsurance: 'Life',
            lifeAndPersonalAccident: 'Life & PA',
        },
        footer: {
            totalOriginal: 'Total Original Premium',
            familyDiscount: 'Family Discount',
            totalAfterFamilyDiscount: 'Total After Family Discount',
            promoDiscount: 'Promotional Discount',
            grandTotal: 'Grand Total Payable',
        }
    },
    benefitsTable: {
        title: 'Detailed Benefits Table',
        header: 'Benefit',
    },
    footer: {
        line1: (productName: string) => `Premiums are based on the ${productName} insurance policy.`,
        line2: 'This is an estimation tool. Please contact an advisor for the most accurate information.',
    }
  },
};

export type Translation = typeof translations.vi;
