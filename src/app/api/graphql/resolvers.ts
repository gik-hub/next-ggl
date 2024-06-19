import Kanban from "./datasource";


const kanban = Kanban.getInstance();

const resolvers = {
    Query: {
        boards: async () => {
            // Return a list of dummy boards
            return await kanban.getAllBoards();
        },

        board: (_: any, { board_id }: { board_id: any }) => {
            // Return a list of dummy columns filtered by board_id
            return kanban.getBoardById(board_id)
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
        updateBoard: (_, { input }) => {
            // Return an updated board based on input
            return { id: input.id, name: input.name || "Default Name" };
        },
        deleteBoard: (_, { id }) => {
            // Return a success message for deletion
            return `Board with id ${id} deleted successfully.`;
        },

        createColumn: (_, { input }) => {
            // Return a new column based on input
            return kanban.createColumn(input)
        },

        updateColumn: (_, { input }) => {
            // Return an updated column based on input
            // TODO: Update column in jSON
            return { id: input.id, name: input.name || "Default Column Name", board_id: input.board_id, tasks: input.tasks || [] };
        },
        deleteColumn: (_, { input }) => {
            // Return a success message for deletion
            return kanban.deleteColumn(input);
        },
        createTask: (_, { input }) => {
            // Return a new task based on input
            return kanban.createTask(input);
        },
        updateTask: (_, { input }) => {
            // Return an updated task based on input

            // TODO: update task in jSON
            return { id: input.id, name: input.name || "Default Task Name", column_id: input.column_id };
        },
        deleteTask: (_, { id }) => {
            // Return a success message for deletion
            // TODO: update in JSON
            return `Task with id ${id} deleted successfully.`;
        }
    }
};

export default resolvers;