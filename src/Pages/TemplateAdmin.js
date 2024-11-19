import { Button } from "@mui/material";
import Header from "../Component/Header";
import SideBar from "../Component/SideBar";



const StylishTable = ({ data, columns }) => {
    return (
      <div className="table-container-admin">
        <table className="stylish-table-admin">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.accessor}>{row[column.accessor]}
                  
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default function TemplateAdmin(){
    // Sample columns and data for the StylishTable

    

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Position", accessor: "position" },
    { header: "Email", accessor: "email" },
    { header: "Actions", accessor: "edit" },
  ];
 
  const data = [
    { name: "Alice Johnson", position: "Manager", email: "alice@example.com"},
    { name: "Bob Smith", position: "Developer", email: "bob@example.com",edit: (
        <div className="action-button">
          <Button variant="contained" color="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </div>
      ),},
    { name: "Charlie Brown", position: "Designer", email: "charlie@example.com",edit: (
        <>
          <Button variant="contained" color="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </>
      ), },
  ];
    return <>
     <SideBar/>
     <div className="adminlist">
        <Header/>
    <div className="admin-list-contents">
       <h2 className="admin-header">Template admin List</h2>
       <div className="admin-list">
        <StylishTable data={data} columns={columns} />
      </div>
    </div>
     </div>
     </>
}