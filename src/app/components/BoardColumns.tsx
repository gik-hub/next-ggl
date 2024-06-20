import { Box, Stack } from '@mui/material';
import React from 'react';
import AddComponent from './add-component';
import KanbanColumn from './kanban-column';
import { useQuery, useMutation } from '@apollo/client';
import { getBoardByIdQuery } from '../lib/graphql/query';
import { createColumnMutation } from '../lib/graphql/mutation';

function BoardColumns({ board }) {
  const { refetch } = useQuery(getBoardByIdQuery, { variables: { board_id: board.id } });
  const [createColumn, { data: createdColumn }] =
    useMutation(createColumnMutation);

  const handleCreateColumn = async (input: any) => {
    await createColumn({
      variables: { board_id: board?.id, ...input },
    });
    refetch();
  };

  return (
    <Stack direction={'row'} spacing={2} alignItems={'flex-start'} mt={2}>
      {board?.columns?.map((column) => (
        <KanbanColumn key={column?.id} column={column} board={board} />
      ))}
      {board?.columns?.length < 5 && (
        <Stack width={'20%'}>
          <AddComponent btnLabel={'Add column'} onAdd={handleCreateColumn} />
        </Stack>
      )}
    </Stack>
  );
}

export default BoardColumns;
