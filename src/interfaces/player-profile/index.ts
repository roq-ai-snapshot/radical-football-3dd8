import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';
import { GetQueryInterface } from 'interfaces';

export interface PlayerProfileInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  performance?: string;
  skills?: string;
  growth?: string;
  notes?: string;
  created_at?: any;
  updated_at?: any;

  player?: PlayerInterface;
  coach?: CoachInterface;
  _count?: {};
}

export interface PlayerProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  performance?: string;
  skills?: string;
  growth?: string;
  notes?: string;
}
