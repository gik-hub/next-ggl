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
import { getColumnByBoardIdQuery } from '../lib/graphql/query';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function KanbanColumn({ board, column }) {
  // const { loading, error, data } = useQuery(getColumnByBoardIdQuery(board.id));

  console.log('my >>>>>>>> column', column)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <MenuItem onClick={handleClose}>Delete</MenuItem>
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
      <AddComponent btnLabel={'Add Card'} />
      {/* <Button>Add card</Button> */}
    </Stack>
  );
}
