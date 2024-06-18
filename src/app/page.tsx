'use client';

import { AddCircle, CheckCircle, Dangerous } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// import { getBoardsQuery, getTodosQuery } from "@/app/lib/graphql/query";
import styles from './page.module.scss';
import { getBoardsQuery } from './lib/graphql/query';
import KanbanColumn from './components/kanban-column';
import AddComponent from './components/add-component';
import {
  createBoardMutation,
  updateBoardMutation,
} from './lib/graphql/mutation';
import BoardColumns from './components/BoardColumns';

export default function Home() {
  const { loading, error, data, refetch } = useQuery(getBoardsQuery);
  const [title, setTitle] = useState('');
  const [activeBoard, setActiveBoard] = useState([]);

  const [createBoard, { data: createdBoard }] =
    useMutation(createBoardMutation);

  const [updateTodo, { data: dataUpdate }] = useMutation(updateBoardMutation);

  const handleCreateBoard = () => {
    createBoard({ variables: { name: title } });
    refetch();
  };

  console.log('data>>>', data);

  useEffect(() => {
    setActiveBoard(data?.boards?.[0] || []);
  }, [data?.boards]);

  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <Paper className={styles.left}>
        <Box width={'100%'}>
          <Stack spacing={4} width={'100%'}>
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
        <div>
          <Button
            variant='contained'
            startIcon={<AddCircle />}
            onClick={() => handleCreateBoard()}
          >
            Add
          </Button>
        </div>
      </Paper>
      <Paper className={styles.right}>
        <Typography variant='h5'>{activeBoard?.name || ''}</Typography>
        <BoardColumns board={activeBoard} />
      </Paper>
    </div>
  );
}
