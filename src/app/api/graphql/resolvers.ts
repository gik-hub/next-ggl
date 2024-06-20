import Kanban from "./datasource";


const kanban = Kanban.getInstance();

const resolvers = {
    Query: {
        boards: async () => {
            // Return a list of dummy boards
            return await kanban.getAllBoards();
        },

        /**
         * Retrieves a board by its ID.
         * @param _ Placeholder for unused parent resolver.
         * @param board_id The ID of the board to retrieve.
         * @returns The board object identified by the provided board_id.
         */
        board: (_: any, { board_id }: { board_id: string }) => {
            return kanban.getBoardById(board_id);
        },
        column: (_: any, { board_id }: { board_id: any }) => {
            // Return a list of dummy columns filtered by board_id

            // Return all columns for a board 

            // return all tasks nested in a column
            return kanban.getColumnByBoardId(board_id)
        },
    },
    Mutation: {
        createBoard: (_: any, { input }: any) => {
            // Return a new board based on input
            return kanban.createBoard(input)
        },
        createColumn: (_, { input }) => {
            // Return a new column based on input
            return kanban.createColumn(input)
        },

        updateColumn: (_, { input }) => {
            // Return an updated column based on input
            // TODO: DONE Update column in jSON
            return kanban.updateColumn(input)
            // return { id: input.id, name: input.name || "Default Column Name", board_id: input.board_id, tasks: input.tasks || [] };
        },
        deleteColumn: (_, { input }) => {
            // Return a success message for deletion
            return kanban.deleteColumn(input);
        },
        createTask: (_, { input }) => {
            // Return a new task based on input
            // TODO : DONE
            return kanban.createTask(input);
        }
    }
};

export default resolvers;