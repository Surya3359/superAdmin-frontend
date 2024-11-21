import Header from "../Component/Header";
import SideBar from "../Component/SideBar";
import React, {useState} from 'react';
export default function Approvals(){
    
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
    return <>
     <SideBar isCollapsed={isCollapsed}/>
     <div className={`approvallist ${isCollapsed ? 'approval-collapsed' : 'approvallist'}`}>
        <Header toggleSidebar={toggleSidebar}/>
    <div className="approval-list-contents">
       <h2 className="approval-header">Approval List</h2>
      </div>
    </div>

     </>
        
}