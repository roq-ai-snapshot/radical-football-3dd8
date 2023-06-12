import { PlayerProfileInterface } from 'interfaces/player-profile';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  created_at?: any;
  updated_at?: any;
  player_profile?: PlayerProfileInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {
    player_profile?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  academy_id?: string;
}
