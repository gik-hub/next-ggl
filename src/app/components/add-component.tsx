'use client';

import React, { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';

interface AddComponentProps {
  btnLabel: string;
  onAdd: () => void;
}

const AddComponent: React.FC<AddComponentProps> = ({ btnLabel, onAdd }) => {
  const [mode, setMode] = useState<string>('btn');

  const handleAdd = () => {
    onAdd();
    setMode('btn');
  };

  return (
    mode === 'btn' ? (
      <Button onClick={() => setMode('form')}>{btnLabel}</Button>
    ) : (
      <Stack p={2} spacing={1}>
        <TextField id='outlined-basic' label='Title' variant='outlined' />
        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => setMode('btn')}>Cancel</Button>
          <Button variant='contained' onClick={handleAdd}>Add</Button>
        </Stack>
      </Stack>
    )
  );
};

export default AddComponent;