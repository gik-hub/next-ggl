const typeDefs = `#graphql
  type Board {
    id: ID
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

  type Query {
    boards: [Board]
  }

  type Query {
    board(board_id: Int): Board
  }

  type Mutation {
    createBoard(input: NewBoardInput! ): Board
    updateBoard(input: UpdateBoardInput!): Board
    deleteBoard(id: ID!): String
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
    id: ID!
    board_id: String!
    name: String
    # tasks: [Task]
  }

  type Query {
    column(board_id: Int!): [Column]
  }

  type Mutation {
    createColumn(input: NewColumnInput!): Column
    updateColumn(input: UpdateColumnInput!): Column
    deleteColumn(id: ID!): String
  }


# TASK 
type Task {
    id: ID!
    title: String!
    column_id: String!
  }

  input NewTaskInput {
    title: String!
    column_id: String!
  }

  input UpdateTaskInput {
    id: ID!
    column_id: String
    title: String
  }

  type Query {
    task(column_id: Int!): [Task]
  }

  type Mutation {
    createTask(input: NewTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: ID!): String
  }
`;

export default typeDefs;