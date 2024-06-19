'use client';

import { Controller, FieldValues, useForm } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import { Button, Input, Stack, TextField } from '@mui/material';
import * as yup from "yup"


const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: { path: any; type: any; message: any; }) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

interface AddComponentProps {
  btnLabel: string;
  onAdd: (name: FieldValues) => void;
}

const AddComponent: React.FC<AddComponentProps> = ({ btnLabel, onAdd }) => {

  const validationSchema = yup.object({
    name: yup.string().required("Required"),
  })
  const resolver = useYupValidationResolver(validationSchema)


  const { control, handleSubmit, formState: { errors } } = useForm({ resolver });
  const [mode, setMode] = useState<string>('btn');

  const onSubmit = (input: FieldValues) => {
    console.log('input', input)
    onAdd(input)
    setMode('btn');
  }

  return mode === 'btn' ? (
    <Button onClick={() => setMode('form')}>{btnLabel}</Button>
  ) : (
    <Stack p={2} spacing={1} component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            error={errors?.name}
            {...field}
          />
        )}
        control={control}
        name='name'
        defaultValue={''}
      />

      <Stack direction='row' justifyContent='space-between'>
        <Button onClick={() => setMode('btn')}>Cancel</Button>
        <Button variant='contained' type='submit'>
          Add
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddComponent;
