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
                  <td key={column.accessor}>{column.accessor === "Client_status"
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

export default function ClientsList(){
  const [data, setData] = useState([]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  //backend process
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/clientdetails");
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
    { header: "Client_id", accessor: "Client_id" },
    { header: "Client Name", accessor: "Client_name" },
    { header: "Client Status", accessor: "Client_status" },
    { header: "Email-Id", accessor: "Client_emailid" },
    { header: "Hosted Date", accessor: "HostedDate" },
    { header: "Phone No", accessor: "Client_phone" },
    { header: "Renewal Date", accessor: "RenewalDate" },
    { header: "Domain", accessor: "Domain" }
  ];
 
  
  return <>
     <SideBar isCollapsed={isCollapsed}/>
     <div className={`clientlist ${isCollapsed ? 'client-collapsed' : 'clientlist'}`}>
        <Header toggleSidebar={toggleSidebar}/>
    <div className="client-list-contents">
       <h2 className="client-header">Client List</h2>
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
       <StylishTable data={data} columns={columns} />
      </div>
    </div>

     </>
}