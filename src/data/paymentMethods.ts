export interface BankAccountDetails {
  id: 'meezan';
  type: 'bank';
  name: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  instructions: string;
}

export interface MobileWalletDetails {
  id: 'jazzcash' | 'easypaisa';
  type: 'wallet';
  name: string;
  accountTitle: string;
  accountNumber: string;
  instructions: string;
}

export type PaymentMethodConfig = BankAccountDetails | MobileWalletDetails;

export const PAYMENT_METHODS: {
  meezan: BankAccountDetails;
  jazzcash: MobileWalletDetails;
  easypaisa: MobileWalletDetails;
} = {
  meezan: {
    id: 'meezan',
    type: 'bank',
    name: 'Meezan Bank',
    bankName: 'MEEZAN BANK LTD',
    accountTitle: 'Abdul Mughni Najeeb Shami',
    accountNumber: '02890107239281',
    iban: 'PK63MEZN0002890107239281',
    instructions: 'Transfer the exact order total using Meezan Mobile App, Internet Banking, or any bank 1Link transfer. Verify the recipient account title before sending.',
  },
  jazzcash: {
    id: 'jazzcash',
    type: 'wallet',
    name: 'JazzCash',
    accountTitle: 'Abdul Mughni',
    accountNumber: '03074957298',
    instructions: 'Send money to this JazzCash mobile account via JazzCash App or *786#. Confirm the recipient title is Abdul Mughni before authorization.',
  },
  easypaisa: {
    id: 'easypaisa',
    type: 'wallet',
    name: 'Easypaisa',
    accountTitle: 'Abdul Mughni',
    accountNumber: '03074957298',
    instructions: 'Send money to this Easypaisa mobile account via Easypaisa App or *786#. Confirm the recipient title is Abdul Mughni before sending.',
  },
};

// Configured official DEXYFIED business WhatsApp contact
export const WHATSAPP_CONFIG = {
  phoneNumber: '923194389617',
  displayPhone: '+92 319 4389617',
  baseWaUrl: 'https://wa.me/923194389617',
};
