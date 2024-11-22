import { Button } from "@mui/material";
import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";




const StylishTable = ({ data, columns, handleEdit, handleDelete  }) => {

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Formats as YYYY-MM-DD
  };

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
                {columns.map((column) =>  column.accessor === "actions" ? 
                (
                  <td key="actions">
                    <div className="action-buttons">
                    <button
                        variant="contained"
                        color="primary"
                         
                         style={{backgroundColor:"rgb(9, 134, 9)"}}
                         onClick={() => handleEdit(row)}
                      >
                       <Icon icon="fa6-solid:file-pen" style={{ fontSize: '14px',margin:0 }}/>
                      </button>
                      <button
                        variant="contained"
                        color="secondary"
                        className="del=btn"
                        style={{backgroundColor:"red"}}
                        onClick={() => handleDelete(row)}
                      >
                       <Icon  icon="streamline:recycle-bin-2" style={{ fontSize: '14px',   }}/>
                      </button>
                    </div>
                  </td>
                ) : 
                (
                  <td key={column.accessor}>{column.accessor === "Admin_status"
                    ? row[column.accessor]
                      ? "Active"
                      : "Inactive"
                      : column.accessor === "HostedDate" || column.accessor === "RenewalDate"
                    ? formatDate(row[column.accessor]) // Format date
                    : row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


export default function TemplateAdmin(){
  const [data, setData] = useState([]);

    // Sample columns and data for the StylishTable
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };

      // Handle Edit Action
  const handleEdit = (row) => {
    console.log("Edit action triggered for:", row);
    // Add your edit functionality here
  };

  // Handle Delete Action
  const handleDelete = (row) => {
    console.log("Delete action triggered for:", row);
    // Add your delete functionality here
  };
    

    //backend process
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/admins");
          const fetchedData = response.data.map((item) => ({
            ...item,
            edit: true, // Placeholder for edit actions
          }));
          setData(fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
  
      // Sample columns and data for the StylishTable
    const columns = [
      { header: "Admin Name", accessor: "Admin_name" },
      { header: "Admin Id", accessor: "Admin_id" },
      { header: "Admin email", accessor: "Email_id" },
      { header: "Password", accessor: "Password"},
      { header: "Address", accessor: "Address" },
      { header: "Status", accessor: "Admin_status" },
      { header: "Hosted Sites", accessor: "Hosted_sites" },
      { header: "Phone No.", accessor: "phone_number" },
      { header: "Actions", accessor: "actions" },
    ];
    return <>
     <SideBar isCollapsed={isCollapsed}/>
     <div className={`adminlist ${isCollapsed ? 'admin-collapsed' : 'adminlist'}`}>
        <Header toggleSidebar={toggleSidebar}/>
    <div className="admin-list-contents">
       <h2 className="admin-header">Template admin List</h2>
       <div className="table-props">
                    <input className="search" type="search" placeholder="Search..."/>
                    <div className="filter">
                        <label><Icon className="filter-icon" icon="stash:filter-light" style={{ fontSize: '28px', }}/><span>Filter :</span></label>
                        <select id="filterDropdown">
                          <option value="alphabetic">Alphabetical Order (A-Z)</option>
                          <option value="reverse-alphabetic">Alphabetical Order (Z-A)</option>
                          <option value="date-newest">Modified Date (Newest First)</option>
                          <option value="date-oldest">Modified Date (Oldest First)</option>
                        </select>
                    </div>
          </div>
       <div className="admin-list">
       <StylishTable
              data={data}
              columns={columns}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
      </div>
    </div>
     </div>
     </>
}