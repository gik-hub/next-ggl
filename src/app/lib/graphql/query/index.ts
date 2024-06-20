import { gql } from "@apollo/client";


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

export const getBoardByIdQuery =  gql`
  query GetBoardById($board_id: String!)  {
    board(board_id: $board_id) {
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

export const getTasksByColumnIdQuery = (column_id: string) => gql`
  query GetTasksByColumnId {
    task(column_id: "${column_id}") {
      id
      name
      column_id
    }
  }
`;
