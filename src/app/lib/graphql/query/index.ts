// Queries for GraphQL client
import { AnyCnameRecord } from 'dns';
import gql from 'graphql-tag';


export const getBoardsQuery = gql`
  query GetBoards {
    boards {
      id
      name
      columns {
        id
        name
        tasks {
          id
          title
        }
      }
    }
  }
`;

export const getBoardByIdQuery = (board_id: any) => {

  return gql`
  query GetBoardByBoardId {
    board(board_id: ${board_id}) {
      id
      name
      columns {
        id
        name
        tasks {
        id
        title
      }
      }
    }
  }
`
};

export const getColumnByBoardIdQuery = (board_id: any) => {

  return gql`
  query GetColumnByBoardId {
    column(board_id: ${board_id}) {
      id
      name
      board_id
      tasks {
        id
        title
      }
    }
  }
`
};

export const getTasksByColumnIdQuery = (column_id: string) => gql`
  query GetTasksByColumnId {
    task(column_id: "${column_id}") {
      id
      name
      column_id
    }
  }
`;
