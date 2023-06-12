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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPlayerProfileById, updatePlayerProfileById } from 'apiSdk/player-profiles';
import { Error } from 'components/error';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';
import { getPlayers } from 'apiSdk/players';
import { getCoaches } from 'apiSdk/coaches';

function PlayerProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerProfileInterface>(
    () => (id ? `/player-profiles/${id}` : null),
    () => getPlayerProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PlayerProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePlayerProfileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/player-profiles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PlayerProfileInterface>({
    initialValues: data,
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
            Edit Player Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player_profile',
  operation: AccessOperationEnum.UPDATE,
})(PlayerProfileEditPage);
