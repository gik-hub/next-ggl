'use client';

import { AddCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBoardsQuery } from './lib/graphql/query';
import { createBoardMutation } from './lib/graphql/mutation';
import BoardColumns from './components/BoardColumns';

export default function Home() {
  const { loading, error, data, refetch } = useQuery(getBoardsQuery);
  const [title, setTitle] = useState('');
  const [activeBoard, setActiveBoard] = useState([]);

  const [createBoard, { data: createdBoard }] =
    useMutation(createBoardMutation);

  const handleCreateBoard = () => {
    createBoard({ variables: { name: title } });
    refetch();
  };

  useEffect(() => {
    setActiveBoard(data?.boards?.[0] || []);
  }, [data?.boards]);

  if (error) return <p>Error</p>;

  return (
    <Stack
      direction={'row'}
      width={'100vw'}
      height={'100vh'}
      bgcolor={'rgb(243, 245, 255)'}
      display={'flex'}
      spacing={2}
      p={2}
    >
      <Paper
        sx={{
          display: 'flex',
          gap: '16px',
          flexDirection: 'column',
          alignItems: 'center',
          width: '20%',
        }}
      >
        <Box width={'100%'}>
          <Stack spacing={2} width={'100%'} p={1}>
            {data?.boards?.map((board) => (
              <Typography
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    activeBoard?.id === board?.id ? 'aliceblue' : undefined,
                }}
                boxShadow={1}
                p={2}
                key={board?.id}
                onClick={() =>
                  setActiveBoard(
                    data?.boards?.filter((item) => item?.id === board?.id)[0]
                  )
                }
              >
                {board?.name}
              </Typography>
            ))}
          </Stack>
        </Box>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label={'Title'}
          fullWidth
        />
        <Box p={1}>
          <Button
            variant='contained'
            startIcon={<AddCircle />}
            onClick={() => handleCreateBoard()}
          >
            Add
          </Button>
        </Box>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          padding: 2,
        }}
      >
        <Typography variant='h5'>{activeBoard?.name || ''}</Typography>
        <BoardColumns board={activeBoard} />
      </Paper>
    </Stack>
  );
}
