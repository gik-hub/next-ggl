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

    // Function to create a new board
    async createBoard(input: any) {

        console.log('≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈input>>>>>>>>>>>', input)

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

    private async saveData() {
        try {
            console.log('this?.data', this?.data)
            this.data = []
        } catch (error) {
            throw new Error("Failed to save data");
        }
    }

}