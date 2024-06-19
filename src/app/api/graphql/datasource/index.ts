import { dummyBoards } from "./data";


export default class Kanban {
    private static instance: Kanban;
    private data: any;

    private constructor() {
        this.initData();
    }

    public static getInstance(): Kanban {
        if (!Kanban.instance) {
            Kanban.instance = new Kanban();
        }
        return Kanban.instance;
    }

    private async initData() {
        try {
            this.data = dummyBoards;
        } catch (error) {
            throw new Error("Failed to load initial data");
        }
    }

    // Function to fetch all boards
    async getAllBoards() {
        return this.data;
    }

    async getBoardById(input: any) {

        
        const data = this.data.find(board => board.id === input.toString());
        console.log('input>>>>>>>>>>>', input,this.data, data)
        return data || {};
    }



    async getColumnByBoardId(input: any) {
        const board = await this.getBoardById(input)
        //TODO: return all columns
        return board['columns'] || [];
    }

    // Function to create a new board
    async createBoard(input: any) {
        try {
            const newBoard = { ...input, id: (this.data.length + 1).toString(), columns: [] };
            this.data.push(newBoard);
            // TODO: add save data
            return { newBoard };
        } catch (error) {
            throw new Error("Failed to create board");
        }
    }

    async updateBoard(boardId: number, newDetails: any) {
        try {
            // Find the index of the board in the array
            const index = this.data.boards.findIndex((board: any) => board.id === boardId);
            if (index === -1) {
                throw new Error("Board not found");
            }

            // Update the board details at the found index
            this.data.boards[index] = { ...this.data.boards[index], ...newDetails };

            // Simulate saving the data
            // await this.saveData();

            // Return the updated board
            return this.data.boards[index];
        } catch (error) {
            throw new Error(`Failed to update board: ${error.message}`);
        }
    }

    async createColumn(input: any) {
        try {
            const { name, board_id } = input;
            const boardToUpdate = await this.getBoardById(board_id)

            const columnPosition = boardToUpdate?.columns.length + 1
            const newColumn = { name, id: `c${columnPosition}`, board_id, tasks: [] };

            // TODO: refactor to make use of this.saveData()

            const updatedBoard = { ...boardToUpdate, columns: [...boardToUpdate?.columns, newColumn] };
            const updatedData = this.data.map((board: any) => {
                if (board.id === updatedBoard.id) {
                    return updatedBoard;
                }
                return board;
            });

            //TODO:  below make use of saveData return
            this.data = updatedData;
            return newColumn;
        } catch (error) {
            throw new Error("Failed to create column");
        }
    }

    async deleteColumn(input: any) {
        try {
            const { board_id, column_id } = input;
            const boardToUpdate = await this.getBoardById(board_id)
            const columns = boardToUpdate.columns.filter((column: any) => column.id !== column_id);
            // Replace below with the saveData(updatedBoard)
            const updatedBoard = { ...boardToUpdate, columns };
            const updatedData = this.data.map((board: any) => {
                if (board.id === updatedBoard.id) {
                    return updatedBoard;
                }
                return board;
            });
            this.data = updatedData;
            return `Done! ${column_id} column of ${boardToUpdate?.name} deleted.`;
        } catch (error) {
            throw new Error("Failed to create column");
        }
    }

    // TODO: add update column function (update title and tasks clearing here)

    async createTask(input: any) {
        try {
            const { title, board_id, column_id } = input;
            const boardToUpdate = await this.getBoardById(board_id)
            let updatedTask = null;
            // TODO: columnUpdate = find first then update the columns
            const columnToUpdate = boardToUpdate.columns.find((column) => column.id === column_id)
            const updatedCol = columnToUpdate?.tasks.push({
                id: `${columnToUpdate?.tasks.length + 1}`,
                title,
                column_id
            })

            // TODO: Implement updatedData = saveData  and return its value

            const updatedBoard = { ...boardToUpdate, columns: updatedCol };
            const updatedData = this.data.map((board: any) => {
                if (board.id === updatedBoard.id) {
                    return updatedBoard;
                }
                return board;
            });
            this.data = updatedData;
            return updatedTask;
        } catch (error) {
            throw new Error("Failed to create task");
        }
    }

    // TODO: update task, title and column id on DnD

    async saveData () {
        // save to json file 
        // return the updated board 
    }

}