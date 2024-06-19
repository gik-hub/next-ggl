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

        const data = this.data.filter(each => parseInt(each.id) === parseInt(input));
        return data?.[0] || {};
    }



    async getColumnByBoardId(input: any) {

        const data = this.data.filter(each => parseInt(each.id) === parseInt(input));
        console.log('getColumnByBoardId input .data', input, data)
        return data?.[0] || {};
    }

    // Function to create a new board
    async createBoard(input: any) {
        try {
            const newBoard = { ...input, id: (this.data.length + 1).toString(), columns: [] };
            this.data.push(newBoard);
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
            const newColumn = { name, id: `c${columnPosition}`, position: columnPosition, board_id, tasks: [] };
            const updatedBoard = { ...boardToUpdate, columns: [...boardToUpdate?.columns, newColumn] };
            const updatedData = this.data.map((board: any) => {
                if (board.id === updatedBoard.id) {
                    return updatedBoard;
                }
                return board;
            });
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

    async createTask(input: any) {
        try {
            const { title, board_id, column_id } = input;
            const boardToUpdate = await this.getBoardById(board_id)
            let updatedTask = null;

            const columnUpdate = boardToUpdate.columns.map((column: any) => {
                if (column.id === column_id) {
                    updatedTask = {
                        id: `${column?.tasks.length + 1}`,
                        title,
                        column_id
                    }
                    return {
                        ...column,
                        tasks: [
                            ...column?.tasks,
                            {
                                id: `${column?.tasks.length + 1}`,
                                title,
                                column_id
                            }
                        ]
                    }

                }
                return column;
            });

            const updatedBoard = { ...boardToUpdate, columns: columnUpdate };
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

}