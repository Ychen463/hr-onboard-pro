export interface DisplayedVisa {
        userAccountId: string;
        name: string;
        visaTitle: string;
        startDate: Date;
        endDate: Date;
        daysRemaining: number;
        nextStep: string;
        visaStatus?: string;
        docs: {optReceipt: string,
                optEAD?: string | null,
                i20?: string | null,
                i983?: string | null,
        }
        lastDocUploadedKey: string | undefined;
      }