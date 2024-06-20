const typeDefs = `#graphql

# Boards 
  type Board {
    id: String
    name: String
    columns: [Column]
  }

  input NewBoardInput {
    name: String!
  }

  input UpdateBoardInput {
    id: ID!
    name: String
  }

  # COLUMNS 
  type Column {
    id: ID!
    name: String!
    board_id: String
    tasks: [Task]
  }

  input NewColumnInput {
    name: String!
    board_id: String!
  }

  input UpdateColumnInput {
    id: String!
    board_id: String!
    name: String
    # tasks: [NewTaskInput]
  }

  input DeleteColumnInput {
    column_id: String!
    board_id: String!
  }

  # TASK 
type Task {
    id: String!
    title: String!
    column_id: String
    board_id: String
  }

  input NewTaskInput {
    title: String!
    column_id: String!
    board_id: String!
  }

  input UpdateTaskInput {
    id: ID!
    column_id: String
    title: String
  }

  type Query {
    # Boards
    boards: [Board]
    board(board_id: String!): Board

    # Columns
    column(board_id: String!): [Column]
  }


  type Mutation {
    # Boards 
    createBoard(input: NewBoardInput! ): Board
    updateBoard(input: UpdateBoardInput!): Board
    deleteBoard(id: ID!): String

    # Column
    createColumn(input: NewColumnInput!): Column
    updateColumn(input: UpdateColumnInput): Column
    deleteColumn(input: DeleteColumnInput): String
  
    # Tasks
    createTask(input: NewTaskInput): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: ID!): String
  }
`;

export default typeDefs;