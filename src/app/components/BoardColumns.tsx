import { Stack } from '@mui/material';
import React from 'react';
import AddComponent from './add-component';
import KanbanColumn from './kanban-column';
import { useQuery, useMutation } from '@apollo/client';
import {
  getBoardByIdQuery,
  getColumnByBoardIdQuery,
} from '../lib/graphql/query';
import { createColumnMutation } from '../lib/graphql/mutation';

function BoardColumns({ board }) {
  //   const { loading, error, data } = useQuery(getColumnByBoardIdQuery(board.id));
  const { loading, error, data, refetch } = useQuery(
    getBoardByIdQuery(board.id)
  );
  const [createColumn, { data: createdColumn }] =
    useMutation(createColumnMutation);

  const handleCreateColumn = async () => {
    await createColumn({
      variables: { board_id: '1', name: 'static add title' },
    });
    refetch();
  };

  const columns = data?.columns;

  const selectedBoard = data?.board;

  return (
    <Stack direction={'row'} spacing={2} alignItems={'flex-start'} mt={2}>
      {selectedBoard?.columns?.map((column) => (
        <KanbanColumn key={column?.id} column={column} board={board} />
      ))}
      {selectedBoard?.columns?.length < 5 && (
        <Stack width={'20%'}>
          <AddComponent btnLabel={'Add column'} onAdd={handleCreateColumn} />
        </Stack>
      )}
    </Stack>
  );
}

export default BoardColumns;
