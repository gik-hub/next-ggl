import fs from 'fs-extra'
import path from 'path'

const jsonDirectory = path.join(process.cwd(), 'src/app/api/graphql/datasource');
const filePath = path.join(jsonDirectory, 'data.json');


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

    // private async initData() {
    //     try {
    //         this.data = dummyBoards;
    //     } catch (error) {
    //         throw new Error("Failed to load initial data");
    //     }
    // }

    private async initData() {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const parsedData = JSON.parse(data)
            console.log('parsedData', parsedData)
            this.data = parsedData['boards'];
        } catch (error) {
            console.error(error

            )
            throw new Error("Failed to load initial data");
        }
    }

    // Function to fetch all boards
    async getAllBoards() {
        return this.data;
    }

    async getBoardById(input: any) {

        const selectedBoarData = this.data.find(board => board.id === input.toString());
        return selectedBoarData || {};
    }



    async getColumnByBoardId(input: any) {
        const board = await this.getBoardById(input)
        //TODO: DONE return all columns
        return board['columns'] || [];
    }

    // Function to create a new board
    async createBoard(input: any) {
        try {
            const newBoard = { ...input, id: (this.data.length + 1).toString(), columns: [] };
            this.data.push(newBoard);
            // TODO: add save data
            return await this.saveBoardData(newBoard)
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
            await this.saveData()

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


            const newColumn = { name, id: `c${boardToUpdate?.columns.length + 1}`, board_id, tasks: [] };
            boardToUpdate?.columns.push(newColumn)

            console.log('boardToUpdate', boardToUpdate)

            // TODO: refactor to make use of this.saveData()

            const updatedData = this.data.map((board: any) => {
                if (board.id === boardToUpdate.id) {
                    return boardToUpdate;
                }
                return board;
            });

            //TODO:  below make use of saveData return
            this.data = updatedData;
            // this.saveData()
            return newColumn;
        } catch (error) {
            throw new Error("Failed to create column");
        }
    }

    async getBoardColumns(board_id) {
        const board = await this.getBoardById(board_id)
        return board['columns'];
    }

    async getColumnByIdInABoard(board_id, column_id) {
        const board = await this.getBoardById(board_id)
        const column = board['columns'].find(column => column.id === column_id);
        return column;
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
    async updateColumn(input: any) {
        try {
            const { board_id, column_id, columnUpdate, id } = input;
            const boardToUpdate = await this.getBoardById(board_id)
            const columns = await this.getBoardColumns(board_id);
            let updatedColData
            // update the specific column 
            const updatedCols = columns?.map((column) => {
                if (column.id === id) {
                    updatedColData = { ...column, ...input }
                    return updatedColData;
                }
                return column;
            })

            // console.log('updateCols>>>>', updatedCols)
            // Replace below with the saveData(updatedBoard)
            const updatedBoard = { ...boardToUpdate, columns: updatedCols };
            const updatedData = this.data.map((board: any) => {
                if (board.id === board_id) {
                    return updatedBoard;
                }
                return board;
            });

            console.log('updatedData>>>>>>>', updatedData)
            this.data = updatedData;
            return updatedColData;
        } catch (error) {
            throw new Error("Failed to create column");
        }
    }


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

    async saveBoardData(data) {
        try {

            // Update the data based on the provided input (this logic will depend on your requirements)
            // For example, updating a specific board's name

            // Write the updated data back to the file
            const savedJson = await fs.writeJson(filePath, { boards: this?.data }, { spaces: 2 });


            // Return the updated data
            // return boards;
        } catch (error) {
            throw new Error("Failed to update JSON file");
        }
    }
}