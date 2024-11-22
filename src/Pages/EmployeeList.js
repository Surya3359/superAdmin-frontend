import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";

const StylishTable = ({ data, columns, handleEdit, handleDelete }) => {
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
              {columns.map((column) =>
                column.accessor === "actions" ? (
                  <td key="actions">
                    <div className="action-buttons">
                      <button
                        style={{ backgroundColor: "rgb(9, 134, 9)" }}
                        onClick={() => handleEdit(row)}
                      >
                        <Icon icon="fa6-solid:file-pen" style={{ fontSize: "14px", margin: 0 }} />
                      </button>
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => handleDelete(row)}
                      >
                        <Icon icon="streamline:recycle-bin-2" style={{ fontSize: "14px" }} />
                      </button>
                    </div>
                  </td>
                ) : (
                  <td key={column.accessor}>
                    {column.accessor === "Employee_status"
                      ? row[column.accessor]
                        ? "Active"
                        : "Inactive"
                      : column.accessor === "HostedDate" || column.accessor === "RenewalDate"
                      ? formatDate(row[column.accessor])
                      : row[column.accessor]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function EmployeeList() {
  const [data, setData] = useState([]);  
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false); // To show loading during API calls
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); // Debounced query

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Debounce search input to limit API calls
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = debouncedQuery
        ? `http://localhost:8000/api/employees/search?query=${debouncedQuery}`
        : `http://localhost:8000/api/employees`;

      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Fetch data when `debouncedQuery` changes
  useEffect(() => {
    fetchData();
  }, [debouncedQuery]);

  const handleEdit = (row) => {
    console.log("Edit action triggered for:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete action triggered for:", row);
  };

  const columns = [
    { header: "Employee-Id", accessor: "Employee_id" },
    { header: "Employee Name", accessor: "Employee_name" },
    { header: "Password", accessor: "Password" },
    { header: "Email-Id", accessor: "Email_id" },
    { header: "Employee Status", accessor: "Employee_status" },
    { header: "Actions", accessor: "actions" },
  ];

  return (
    <>
      <SideBar isCollapsed={isCollapsed} />
      <div className={`Emplist ${isCollapsed ? "emp-collapsed" : "Emplist"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="emp-list-contents">
          <h2 className="Emp-header">Employee List</h2>
          <div className="page-list">
            <div className="table-props">
              <input
                className="search"
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="filter">
                <label>
                  <Icon
                    className="filter-icon"
                    icon="stash:filter-light"
                    style={{ fontSize: "28px" }}
                  />
                  <span>Filter :</span>
                </label>
                <select id="filterDropdown">
                  <option value="alphabetic">Alphabetical Order (A-Z)</option>
                  <option value="reverse-alphabetic">Alphabetical Order (Z-A)</option>
                  <option value="date-newest">Modified Date (Newest First)</option>
                  <option value="date-oldest">Modified Date (Oldest First)</option>
                </select>
              </div>
              <button className="button-add">
                <Icon icon="carbon:add-alt" style={{ fontSize: "23px" }} />
                <span>Add New</span>
              </button>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <StylishTable
                data={data}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
