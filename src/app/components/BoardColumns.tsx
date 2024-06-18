import { Stack } from '@mui/material';
import React from 'react';
import AddComponent from './add-component';
import KanbanColumn from './kanban-column';
import { useQuery, useMutation } from '@apollo/client';
import { getBoardByIdQuery, getColumnByBoardIdQuery } from '../lib/graphql/query';

function BoardColumns({ board }) {
//   const { loading, error, data } = useQuery(getColumnByBoardIdQuery(board.id));
  const { loading, error, data } = useQuery(getBoardByIdQuery(board.id));

  console.log('board>>>>>>>>>', board)

  console.log('getColumnByBoardIdQuery data', data?.board)
  const columns = data?.columns;

  const selectedBoard =  data?.board;

  console.log('selectedBoard', selectedBoard)

//   debugger

  return (
    <Stack direction={'row'} spacing={2} alignItems={'flex-start'} mt={2}>
      {selectedBoard?.columns?.map((column) => (
        <KanbanColumn key={column?.id} column={column} board={board} />
      ))}
      <Stack width={'20%'}>
        <AddComponent btnLabel={'Add column'} />
      </Stack>
    </Stack>
  );
}

export default BoardColumns;
