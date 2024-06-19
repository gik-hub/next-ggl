'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import AddComponent from './add-component';
import TaskCard from './task-card';
import { useQuery, useMutation } from '@apollo/client';
import { getBoardByIdQuery } from '../lib/graphql/query';
import {
  createTaskMutation,
  deleteColumnMutation,
} from '../lib/graphql/mutation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function KanbanColumn({ board, column }) {
  const { refetch } = useQuery(getBoardByIdQuery(board.id));
  const [deleteColumn, { data }] = useMutation(deleteColumnMutation);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteColumn = async () => {
    await deleteColumn({
      variables: { board_id: board?.id, column_id: column?.id },
    });
    handleClose();
    refetch();
  };

  const [createTask, { data: createdColumn }] = useMutation(createTaskMutation);

  const handleCreateTask = async (input: any) => {
    await createTask({
      variables: {
        board_id: board?.id,
        column_id: column?.id,
        title: input?.name,
      },
    });
    refetch();
  };

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <Stack spacing={1} width={'20%'} borderRadius={1} boxShadow={1}>
      <Stack
        p={1}
        direction={'row'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography>{column?.name}</Typography>
        <IconButton onClick={handleClick}>
          <MoreHoriz />
        </IconButton>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Rename</MenuItem>
          <MenuItem onClick={handleClose}>Clear</MenuItem>
          <MenuItem onClick={handleDeleteColumn}>Delete</MenuItem>
        </Menu>
      </Stack>
      <Divider />
      <Stack
        maxHeight={'70vh'}
        minHeight={'30vh'}
        overflow={'scroll'}
        spacing={2}
        p={2}
        // ref={setNodeRef}
        // style={style}
      >
        {column?.tasks?.map((task) => (
          <>
            <TaskCard task={task}>
              <Typography key={task}>{task?.title}</Typography>
            </TaskCard>
          </>
        ))}
      </Stack>
      <Divider />
      <AddComponent btnLabel={'Add Card'} onAdd={handleCreateTask} />
      {/* <Button>Add card</Button> */}
    </Stack>
  );
}
