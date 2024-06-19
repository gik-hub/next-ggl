import { create } from 'zustand';

const initialBoards = [
    { id: "1", name: "Column One", board_id: "1", tasks: [] },
    { id: "2", name: "Column Two", board_id: "2", tasks: [] }
]

export const dataVariant = {
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
};

type setDataType = { key: string; data: object | string };

const useKanbanStore = create<{
  boards: [];
  columns: [];
  tasks: [];
  setData: ({ key, data }: setDataType) => void;
}>(set => ({
  boards: initialBoards,
  columns: null,
  tasks: null,
  setData: ({ key, data }) => {
    return set(state => ({
      ...state,
      [dataVariant[key as keyof typeof dataVariant]]: data,
    }));
  },
}));

export default useKanbanStore;
