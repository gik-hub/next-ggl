'use client';

import { Button, Stack, TextField } from '@mui/material';
import React from 'react';

function AddComponent({ btnLabel }) {
  const [mode, setMode] = React.useState('btn');

  if (mode === 'btn') {
    return <Button onClick={() => setMode('form')}>{btnLabel}</Button>;
  }

  if (mode === 'form') {
    return (
      <Stack p={2} spacing={1}>
        <TextField id='outlined-basic' label='Title' variant='outlined' />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button onClick={() => setMode('btn')}>Cancel</Button>
          <Button variant='contained'>Add</Button>
        </Stack>
      </Stack>
    );
  }
}

export default AddComponent;
