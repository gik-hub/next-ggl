'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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
  updateColumnMutation,
} from '../lib/graphql/mutation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function KanbanColumn({ board, column }) {
  const { refetch } = useQuery(getBoardByIdQuery, {
    variables: { board_id: board.id },
  });

  const [deleteColumn, { data }] = useMutation(deleteColumnMutation);

  const [updateColumn] = useMutation(updateColumnMutation);

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

  const [createTask, { data: createdTask }] = useMutation(createTaskMutation);

  const handleUpdateColumn = async (input: any) => {
    console.log('column to update', column);
    await updateColumn({
      variables: {
        input: {
          id: column?.id,
          board_id: board?.id,
          name: 'new name',
          // tasks: []
        },
      },
    });
    handleClose();
    refetch();
  };

  const handleCreateTask = async (input: any) => {
    await createTask({
      variables: {
        input: {
          column_id: column?.id,
          board_id: board?.id,
          title: input?.name,
        },
      },
    });
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
          <MenuItem onClick={handleUpdateColumn}>Rename</MenuItem>
          <MenuItem onClick={handleClose}>Clear</MenuItem>
          <MenuItem onClick={handleDeleteColumn}>Delete</MenuItem>
        </Menu>
      </Stack>
      <Divider />
      <Droppable droppableId='tasks'>
        {(provided) => (
          <Stack
            maxHeight={'70vh'}
            minHeight={'30vh'}
            overflow={'scroll'}
            spacing={2}
            p={2}
            // ref={setNodeRef}
            // style={style}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column?.tasks?.map((task, index) => (
              <Draggable key={task} draggableId={task?.id} index={index}>
                {(provided) => (
                  <TaskCard
                    task={task}
                    ref={provided.innerRef}
                    {...provided.dragHandlerProps}
                    {...provided.draggableProps}
                  >
                    <Typography>{task?.title}</Typography>
                  </TaskCard>
                )}
                {provided.placeholder}
              </Draggable>
            ))}
          </Stack>
        )}
      </Droppable>
      <Divider />
      <AddComponent btnLabel={'Add Card'} onAdd={handleCreateTask} />
    </Stack>
  );
}
