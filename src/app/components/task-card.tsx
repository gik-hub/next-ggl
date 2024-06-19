import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TaskCardTemplate = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  cursor: 'grab'
}));

const TaskCard = ({ task, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <TaskCardTemplate elevation={1}>{children}</TaskCardTemplate>
    </Box>
  );
};

export default TaskCard;
