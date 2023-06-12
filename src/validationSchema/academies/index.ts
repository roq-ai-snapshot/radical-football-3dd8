import * as yup from 'yup';
import { coachValidationSchema } from 'validationSchema/coaches';
import { playerValidationSchema } from 'validationSchema/players';

export const academyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  coach: yup.array().of(coachValidationSchema),
  player: yup.array().of(playerValidationSchema),
});
