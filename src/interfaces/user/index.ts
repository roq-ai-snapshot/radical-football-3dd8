import { CoachInterface } from 'interfaces/coach';
import { PlayerInterface } from 'interfaces/player';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  coach: CoachInterface[];
  player: PlayerInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  filter: {
    roq_user_id?: string;
    tenant_id?: string;
  };
}
