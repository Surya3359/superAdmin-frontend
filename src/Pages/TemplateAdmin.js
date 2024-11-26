import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



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
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No data found</td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) =>
                  column.accessor === "actions" ? (
                    <td key="actions">
                      <div className="action-buttons">
                        <button
                          style={{ backgroundColor: "rgb(9, 134, 9)" }}
                          onClick={() => handleEdit(row)}
                        >
                          <Icon
                            icon="fa6-solid:file-pen"
                            style={{ fontSize: "14px", margin: 0 }}
                          />
                        </button>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => handleDelete(row)}
                        >
                          <Icon
                            icon="streamline:recycle-bin-2"
                            style={{ fontSize: "14px" }}
                          />
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td key={column.accessor}>
                      {column.accessor === "Admin_status"
                        ? row[column.accessor]
                          ? "Active"
                          : "Inactive"
                        : column.accessor === "HostedDate" ||
                          column.accessor === "RenewalDate"
                        ? formatDate(row[column.accessor])
                        : row[column.accessor]}
                    </td>
                  )
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
  };


export default function TemplateAdmin(){
  const [data, setData] = useState([]);

    // Sample columns and data for the StylishTable
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);

    //Eidt function
  const [editingEmployee, setEditingEmployee] = useState(null); // Track the employee being edited
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const [sortedData, setSortedData] = useState([]); // Sorted data
  const [sortOption, setSortOption] = useState("alphabetic");

  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Handle search functionality
  useEffect(() => {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSortedData(filteredData);
  }, [searchTerm, data]);

    const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
    };

    const fetchData = useCallback(
      async (query = "") => {
        setLoading(true);
        try {
          const endpoint = query
            ? `http://localhost:8000/api/admins/search?query=${query}`
            : `http://localhost:8000/api/admins`;
  
          const response = await axios.get(endpoint);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      },
      [setData]
    );

    const handleEdit = (row) => {
      setEditingEmployee(row); // Set the selected employee
      setIsEditPopupOpen(true); // Open the edit popup
      console.log("Edit action triggered for:", row);
    };
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const { _id, Admin_name, Email_id, phone_number, Address } = editingEmployee;
        await axios.put(`http://localhost:8000/api/admins/${_id}`, {
          Admin_name,
          Email_id,
          phone_number,
          Address
        });
  
        alert("Template Admin details updated successfully!");
        setIsEditPopupOpen(false);
        fetchData(); // Refresh the table data
      } catch (error) {
        console.error("Error updating Template_Admin:", error);
        alert("Failed to update Template Admin detail.");
      }
    };

  // Handle Delete Action
  const handleDelete = async(row) => {
    if (window.confirm(`Are you sure you want to delete employee ${row.Employee_name}?`)) {
      try {
        // Assuming the backend route is: DELETE /api/employees/:id
        await axios.delete(`http://localhost:8000/api/admins/${row._id}`);
        alert(`Employee ${row.Employee_name} deleted successfully!`);
  
        // Update the state to reflect the deleted employee
        setData((prevData) => prevData.filter((employee) => employee.Employee_id !== row.Employee_id));
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete the employee. Please try again.");
      }
    }
    window.location.reload();
    console.log("Delete action triggered for:", row);
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

    // Handle sorting logic
  useEffect(() => {
    const sortData = () => {
      let sorted = [...data];
      if (sortOption === "alphabetic") {
        sorted.sort((a, b) => a.Admin_name.localeCompare(b.Admin_name));
      } else if (sortOption === "reverse-alphabetic") {
        sorted.sort((a, b) => b.Admin_name.localeCompare(a.Admin_name));
      } 
      setSortedData(sorted);
    };

    sortData();
  }, [sortOption, data]);

  
      // Sample columns and data for the StylishTable
    const columns = [
      { header: "Admin Name", accessor: "Admin_name" },
      { header: "Admin Id", accessor: "Admin_id" },
      { header: "Admin email", accessor: "Email_id" },
      { header: "Address", accessor: "Address" },
      { header: "Status", accessor: "Admin_status" },
      { header: "Hosted Sites", accessor: "Hosted_sites" },
      { header: "Phone No.", accessor: "phone_number" },
      { header: "Actions", accessor: "actions" },
    ];
    return (<>
     <SideBar isCollapsed={isCollapsed}/>
     <div className={`adminlist ${isCollapsed ? 'admin-collapsed' : 'adminlist'}`}>
        <Header toggleSidebar={toggleSidebar}/>
    <div className="admin-list-contents">
       <h2 className="admin-header">Template admin List</h2>
       <div className="table-props">
       <input
              className="search"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
                    <div className="filter">
                        <label><Icon className="filter-icon" icon="stash:filter-light" style={{ fontSize: '28px', }}/><span>Sort By :</span></label>
                        <select id="filterDropdown"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}>
                          <option value="alphabetic">Alphabetical Order (A-Z)</option>
                          <option value="reverse-alphabetic">Alphabetical Order (Z-A)</option>
                          
                        </select>
                    </div>
          </div>
       <div className="admin-list">
       {loading ? (
              <div>Loading...</div>
            ) : (
              <StylishTable
                data={sortedData} // Pass fetched data here
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
      </div>
    </div>
     </div>

     {/* Edit Popup */}
     {isEditPopupOpen && (
        <Popup open={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)} modal
        contentStyle={{
          top: '15%',
          width: '40%',
          height: '550px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          textAlign: 'left',
        }}>
          <div>
            <h3>Edit Template User Details</h3>
            <form onSubmit={handleSave}>
              <div style={{ marginBottom: "15px" }}>
                <label>User Name:</label>
                <input
                  type="text"
                  value={editingEmployee.Admin_name}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, Admin_name: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>User Email:</label>
                <input
                  type="email"
                  value={editingEmployee.Email_id}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, Email_id: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Phone Number:</label>
                <input
                  type="tel"
                  value={editingEmployee.phone_number}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, phone_number: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Address:</label>
                <textarea
                  type="address"
                  style={{ width: '99%', 
                          height: "80px", 
                          border: '1px solid #cccccc', 
                          borderRadius: '4px',
                          resize: 'none'}}
                  value={editingEmployee.Address}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, Address: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="submit" style={{
                              backgroundColor: '#28a745',
                              color: '#fff',
                              padding: '10px 20px',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              width: '80px',
                            }}>Save</button>
                <button type="button" onClick={() => setIsEditPopupOpen(false)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '80px',
                  }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Popup>
      )}

     </>);
}