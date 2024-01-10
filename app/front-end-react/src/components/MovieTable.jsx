import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import "./MovieTable.css";

const MovieTable = ({ movies, deleteMovie }) => {
    // configurarea coloanelor
    const columns = [
        { 
            field: "id", 
            headerName: "ID", 
            flex: 0.1, align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        { 
            field: "title", 
            headerName: "Title", 
            flex: 1,
            align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        { 
            field: "director", 
            headerName: "Director", 
            flex: 1, 
            align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        {
            field: "year",
            headerName: "Year",
            type: "number",
            flex: 0.5,
            align: 'center',
            headerClassName: "table-header",
            headerAlign: "center"
        },
        { 
            field: "genre", 
            headerName: "Genre", 
            flex: 0.5, 
            align: 'center', 
            headerClassName: "table-header", 
            headerAlign: "center" 
        },
        {
            field: "duration",
            headerName: "Duration",
            type: "number",
            flex: 0.5,
            align: 'center',
            headerClassName: "table-header",
            headerAlign: "center"
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Remove",
            align: "center",
            headerClassName: "table-header",
            flex: 0.5,
            // configurarea butoanelor cu actiuni
            getActions: ({ id }) => {
                return ([
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => {
                            if (window.confirm("Do you want to delete this movie?")) {
                                deleteMovie({ id: id });
                            };
                        }}
                        color="inherit"
                    />
                ]);
            }
        }
    ];

    return (
        <div className="table-container">
            {/* utilizarea DataGrid */}
            <DataGrid rows={movies} columns={columns} />
        </div>
    );
}

export { MovieTable };