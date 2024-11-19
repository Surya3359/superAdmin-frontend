import Header from "../Component/Header";
import SideBar from "../Component/SideBar";

const StylishTable = ({ data, columns }) => {
    return (
      <div className="table-container">
        <table className="stylish-table">
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
                  <td key={column.accessor}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default function EmployeeList(){
    // Sample columns and data for the StylishTable
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Position", accessor: "position" },
    { header: "Email", accessor: "email" },
  ];
 
  const data = [
    { name: "Alice Johnson", position: "Manager", email: "alice@example.com" },
    { name: "Bob Smith", position: "Developer", email: "bob@example.com" },
    { name: "Charlie Brown", position: "Designer", email: "charlie@example.com" },
  ];
    return <>
     <SideBar/>
     <div className="Emplist">
        <Header/>
    <div className="emp-list-contents">
       <h2 className="Emp-header">Employee List</h2>
       <div className="page-list">
        <StylishTable data={data} columns={columns} />
      </div>
    </div>
     </div>
     </>
}