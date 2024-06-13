
export const dummyBoards = [
    {
        "id": "1",
        "name": "Project Alpha",
        "description": "Initial project setup and planning",
        "createdAt": "2024-06-01T12:00:00Z",
        "updatedAt": "2024-06-10T12:00:00Z",
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
                        "description": "Create a new repository for the project on GitHub",
                        "status": "Open",
                        "assignedTo": {
                            "id": "u1",
                            "username": "john_doe",
                            "email": "john@example.com",
                            "createdAt": "2024-05-01T10:00:00Z",
                            "updatedAt": "2024-05-01T10:00:00Z"
                        },
                        "dueDate": "2024-06-05T00:00:00Z",
                        "createdAt": "2024-06-01T12:00:00Z",
                        "updatedAt": "2024-06-01T12:00:00Z"
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
        "description": "Q3 marketing strategy and execution",
        "createdAt": "2024-06-02T12:00:00Z",
        "updatedAt": "2024-06-10T12:00:00Z",
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
                        "description": "Come up with catchy and relevant slogans for the campaign",
                        "status": "Open",
                        "assignedTo": {
                            "id": "u2",
                            "username": "jane_smith",
                            "email": "jane@example.com",
                            "createdAt": "2024-05-05T11:00:00Z",
                            "updatedAt": "2024-05-05T11:00:00Z"
                        },
                        "dueDate": "2024-06-10T00:00:00Z",
                        "createdAt": "2024-06-02T12:00:00Z",
                        "updatedAt": "2024-06-02T12:00:00Z"
                    }
                ]
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
