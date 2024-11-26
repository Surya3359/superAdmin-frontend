import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import { useState, useEffect } from "react";
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
                  <td key={column.accessor}>{column.accessor === "Status"
                    ? row[column.accessor]
                      ? "Active"
                      : "Inactive"
                      : column.accessor === "CompletedDate" || column.accessor === "ApprovedDate"
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

export default function Templatelist(){
  const [data, setData] = useState([]);

  const [isCollapsed, setIsCollapsed] = useState(false);

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
        const response = await axios.get("http://localhost:8000/api/templist");
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
        sorted.sort((a, b) => a.Temp_name.localeCompare(b.Temp_name));
      } else if (sortOption === "reverse-alphabetic") {
        sorted.sort((a, b) => b.Temp_name.localeCompare(a.Temp_name));
      } else if (sortOption === "date-newest") {
        sorted.sort((a, b) => new Date(b.CompletedDate) - new Date(a.CompletedDate));
      } else if (sortOption === "date-oldest") {
        sorted.sort((a, b) => new Date(a.CompletedDate) - new Date(b.CompletedDate));
      }
      setSortedData(sorted);
    };

    sortData();
  }, [sortOption, data]);



    // Sample columns and data for the StylishTable
  const columns = [
    { header: "Template Name", accessor: "Temp_name" },
    { header: "Template Id", accessor: "Temp_id" },
    { header: "Template category", accessor: "Temp_category" },
    { header: "Approval Status", accessor: "Approval_status" },
    { header: "Completed Date", accessor: "CompletedDate" },
    { header: "Approved Date", accessor: "ApprovedDate" },
    { header: "Actions", accessor: "actions" },
  ];
 
  
  return <>
     <SideBar isCollapsed={isCollapsed}/>
     <div className={`approvallist ${isCollapsed ? 'approval-collapsed' : 'approvallist'}`}>
        <Header toggleSidebar={toggleSidebar}/>
    <div className="approval-list-contents">
       <h2 className="approval-header">Approval List</h2>
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
                          <option value="date-newest">Completed Date (Newest First)</option>
                          <option value="date-oldest">Completed Date (Oldest First)</option>
                        </select>
                    </div>
          </div>
          <StylishTable
              data={sortedData}
              columns={columns}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
      </div>
    </div>

     </>
}