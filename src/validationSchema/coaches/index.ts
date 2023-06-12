import * as yup from 'yup';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';

export const coachValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
  player_profile: yup.array().of(playerProfileValidationSchema),
});
