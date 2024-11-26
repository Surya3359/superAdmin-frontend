import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react/dist/iconify.js";

const StylishTable = ({ data, columns }) => {

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
                {columns.map((column) => (
                  <td key={column.accessor}>{column.accessor === "Status"
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

export default function Hostedsites(){
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

  //backend process
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/hostedsites");
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
      } else if (sortOption === "date-newest") {
        sorted.sort((a, b) => new Date(b.RenewalDate) - new Date(a.RenewalDate));
      } else if (sortOption === "date-oldest") {
        sorted.sort((a, b) => new Date(a.RenewalDate) - new Date(b.RenewalDate));
      }
      setSortedData(sorted);
    };

    sortData();
  }, [sortOption, data]);

    // Sample columns and data for the StylishTable
  const columns = [
    { header: "Client-Id", accessor: "Client_Id" },
    { header: "Template Id", accessor: "Template_Id" },
    { header: "Hosting Status", accessor: "Status" },
    { header: "Email-Id", accessor: "Client_emailid" },
    { header: "Hosted Date", accessor: "HostedDate" },
    { header: "Admin-name", accessor: "Admin_name" },
    //{ header: "Admin-Id", accessor: "Admin_Id" },
    { header: "Admin email", accessor: "Admin_emailid" },
    { header: "Renewal Date", accessor: "RenewalDate" },
    { header: "Domain", accessor: "Domain" }
  ];
 
  
  return(<>
    <SideBar isCollapsed={isCollapsed}/>
    <div className={`sitelist ${isCollapsed ? 'site-collapsed' : 'sitelist'}`}>
       <Header toggleSidebar={toggleSidebar}/>
   <div className="site-list-contents">
      <h2 className="site-header">Hosted Sites List</h2>
      <div className="table-props">
                <input    className="search"
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
                            <option value="date-newest">Renewal Date (Newest First)</option>
                            <option value="date-oldest">Renewal Date (Oldest First)</option>
                          </select>
                      </div>
            </div>
      <StylishTable data={sortedData} columns={columns} />
     </div>
   </div>
  
    </>) 
}