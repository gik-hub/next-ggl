
export const dummyBoards = [
    {
        "id": "1",
        "name": "Project Alpha",
        "description": "Initial project setup and planning",
        "columns": [
            {
                "id": "c1",
                "board_id": "1",
                "name": "To Do",
                "position": 1,
                "tasks": [
                    {
                        "id": "t1",
                        "column_id": "c1",
                        "title": "Set up project repository",
                    }
                ]
            },
            {
                "id": "c2",
                "board_id": "1",
                "name": "In Progress",
                "position": 2,
                "tasks": []
            }
        ]
    },
    {
        "id": "2",
        "name": "Marketing Campaign",
        "columns": [
            {
                "id": "c3",
                "board_id": "2",
                "name": "Ideas",
                "position": 1,
                "tasks": [
                    {
                        "id": "t2",
                        "column_id": "c3",
                        "title": "Brainstorm campaign slogans",
                    }
                ]
            },
            {
                "id": "c4",
                "board_id": "2",
                "name": "Execution",
                "position": 2,
                "tasks": []
            },
            {
                "id": "c4",
                "board_id": "2",
                "name": "Execution",
                "position": 2,
                "tasks": []
            }
        ]
    }
]
