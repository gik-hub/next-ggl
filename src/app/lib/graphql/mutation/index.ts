import { gql } from '@apollo/client';

export const createBoardMutation = gql`
  mutation CreateBoard($name: String!) {
    createBoard(input: { name: $name }) {
      # data {
      #   id
      #   name
      # }
      # success 
      id
      name
    }
  }
`;

export const updateBoardMutation = gql`
  mutation UpdateBoard($id: ID!, $name: String!) {
    updateBoard(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const deleteBoardMutation = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id)
  }
`;

export const createColumnMutation = gql`
  mutation CreateColumn($name: String!, $board_id: String!) {
    createColumn(input: { name: $name, board_id: $board_id }) {
      id
      name
      board_id
    }
  }
`;

export const updateColumnMutation = gql`
  mutation UpdateColumn($id: ID!, $name: String!, $board_id: ID!) {
    updateColumn(input: { id: $id, name: $name, board_id: $board_id }) {
      id
      name
      board_id
    }
  }
`;

export const deleteColumnMutation = gql`
  mutation DeleteColumn($id: ID!) {
    deleteColumn(id: $id)
  }
`;

export const createTaskMutation = gql`
  mutation CreateTask($name: String!, $column_id: ID!) {
    createTask(input: { name: $name, column_id: $column_id }) {
      id
      name
      column_id
    }
  }
`;

export const updateTaskMutation = gql`
  mutation UpdateTask($id: ID!, $name: String!, $column_id: ID!) {
    updateTask(input: { id: $id, name: $name, column_id: $column_id }) {
      id
      name
      column_id
    }
  }
`;

export const deleteTaskMutation = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;