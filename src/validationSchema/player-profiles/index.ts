import * as yup from 'yup';

export const playerProfileValidationSchema = yup.object().shape({
  performance: yup.string(),
  skills: yup.string(),
  growth: yup.string(),
  notes: yup.string(),
  player_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
