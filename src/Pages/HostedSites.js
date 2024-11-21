import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import React, {useState} from 'react';
import { Icon } from "@iconify/react";
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

export default function HostedSites(){
    // Sample columns and data for the StylishTable

const [isCollapsed, setIsCollapsed] = useState(false);

const toggleSidebar = () => {
  setIsCollapsed(!isCollapsed);
};
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
     <SideBar isCollapsed={isCollapsed}/>
     <div className={`sitelist ${isCollapsed ? 'site-collapsed' : 'sitelist'}`}>
        <Header toggleSidebar={toggleSidebar}/>
    <div className="site-list-contents">
       <h2 className="site-header">Hosted Site List</h2>
       <div className="site-list">
        <StylishTable data={data} columns={columns} />
      </div>
    </div>
     </div>
     </>
}