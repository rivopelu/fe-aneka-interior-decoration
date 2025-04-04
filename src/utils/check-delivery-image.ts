import { ASSETS } from '../constants/assets.ts';

export function checkDeliveryImage(service: string) {
  switch (service) {
    case 'BBM':
      return ASSETS.SICEPAT.BBM;
    case 'GOKIL':
      return ASSETS.SICEPAT.GOKIL;
    case 'HALU':
      return ASSETS.SICEPAT.HALU;
    case 'REG':
      return ASSETS.SICEPAT.REG;
    case 'REGVIP':
      return ASSETS.SICEPAT.REG_VIP;
    default:
      return undefined;
  }
}
