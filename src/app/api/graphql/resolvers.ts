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
            console.log('<<<<<<<<<<<<column resolver>>>>>>>>>>>>', board_id)

            return kanban.getBoardById(board_id)
        },
        column: (_: any, { board_id }: { board_id: any }) => {
            // Return a list of dummy columns filtered by board_id
            console.log('<<<<<<<<<<<<column resolver>>>>>>>>>>>>', board_id)

            return kanban.getColumnByBoardId(board_id)
        },
        task: (_, { column_id }) => {
            // Return a list of dummy tasks filtered by column_id
            return [
                { id: "1", name: "Task One", column_id: "1" },
                { id: "2", name: "Task Two", column_id: "2" }
            ].filter(task => task.column_id === column_id);
        }
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
            return { id: "3", name: input.name, board_id: input.board_id, tasks: [] };
        },
        updateColumn: (_, { input }) => {
            // Return an updated column based on input
            return { id: input.id, name: input.name || "Default Column Name", board_id: input.board_id, tasks: input.tasks || [] };
        },
        deleteColumn: (_, { id }) => {
            // Return a success message for deletion
            return `Column with id ${id} deleted successfully.`;
        },
        createTask: (_, { input }) => {
            // Return a new task based on input
            return { id: "3", name: input.name, column_id: input.column_id };
        },
        updateTask: (_, { input }) => {
            // Return an updated task based on input
            return { id: input.id, name: input.name || "Default Task Name", column_id: input.column_id };
        },
        deleteTask: (_, { id }) => {
            // Return a success message for deletion
            return `Task with id ${id} deleted successfully.`;
        }
    }
};

export default resolvers;