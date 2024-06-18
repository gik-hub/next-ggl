// Queries for GraphQL client
import gql from 'graphql-tag';


export const getBoardsQuery = gql`
  query GetBoards {
    boards {
      id
      name
      columns {
        id
        name
        # tasks {
        #   id
        #   title
        # }
      }
    }
  }
`;

export const getColumnByBoardIdQuery = (board_id: string) => gql`
  query GetColumnByBoardId {
    column(board_id: "${board_id}") {
      id
      name
      board_id
      tasks {
        id
        name
      }
    }
  }
`;

export const getTasksByColumnIdQuery = (column_id: string) => gql`
  query GetTasksByColumnId {
    task(column_id: "${column_id}") {
      id
      name
      column_id
    }
  }
`;
