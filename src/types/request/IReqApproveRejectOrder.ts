import { APPROVE_REJECT_ENUM } from '../../enums/approve-reject-enum.ts';

export interface IReqApproveRejectOrder {
  type: APPROVE_REJECT_ENUM;
  reason?: string;
}
