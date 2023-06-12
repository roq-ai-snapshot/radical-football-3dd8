import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPlayerProfile } from 'apiSdk/player-profiles';
import { Error } from 'components/error';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';
import { getPlayers } from 'apiSdk/players';
import { getCoaches } from 'apiSdk/coaches';
import { PlayerProfileInterface } from 'interfaces/player-profile';

function PlayerProfileCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PlayerProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPlayerProfile(values);
      resetForm();
      router.push('/player-profiles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PlayerProfileInterface>({
    initialValues: {
      performance: '',
      skills: '',
      growth: '',
      notes: '',
      player_id: (router.query.player_id as string) ?? null,
      coach_id: (router.query.coach_id as string) ?? null,
    },
    validationSchema: playerProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Player Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="performance" mb="4" isInvalid={!!formik.errors?.performance}>
            <FormLabel>Performance</FormLabel>
            <Input type="text" name="performance" value={formik.values?.performance} onChange={formik.handleChange} />
            {formik.errors.performance && <FormErrorMessage>{formik.errors?.performance}</FormErrorMessage>}
          </FormControl>
          <FormControl id="skills" mb="4" isInvalid={!!formik.errors?.skills}>
            <FormLabel>Skills</FormLabel>
            <Input type="text" name="skills" value={formik.values?.skills} onChange={formik.handleChange} />
            {formik.errors.skills && <FormErrorMessage>{formik.errors?.skills}</FormErrorMessage>}
          </FormControl>
          <FormControl id="growth" mb="4" isInvalid={!!formik.errors?.growth}>
            <FormLabel>Growth</FormLabel>
            <Input type="text" name="growth" value={formik.values?.growth} onChange={formik.handleChange} />
            {formik.errors.growth && <FormErrorMessage>{formik.errors?.growth}</FormErrorMessage>}
          </FormControl>
          <FormControl id="notes" mb="4" isInvalid={!!formik.errors?.notes}>
            <FormLabel>Notes</FormLabel>
            <Input type="text" name="notes" value={formik.values?.notes} onChange={formik.handleChange} />
            {formik.errors.notes && <FormErrorMessage>{formik.errors?.notes}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <AsyncSelect<CoachInterface>
            formik={formik}
            name={'coach_id'}
            label={'Select Coach'}
            placeholder={'Select Coach'}
            fetcher={getCoaches}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player_profile',
  operation: AccessOperationEnum.CREATE,
})(PlayerProfileCreatePage);
