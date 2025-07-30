import React, { useState } from "react";
import "./styles/dashboard.css";
import "./styles/Cards.css";
import { FiSliders } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { LuBuilding2 } from "react-icons/lu";
import Cards from "../Components/Cards";
import { CiFilter } from "react-icons/ci";

import {
  Settings,
  Target,
  Filter,
  SlidersVertical,
  Upload,
  Plus,
  Search,
  CircleCheck,
} from "lucide-react";
import Modal from "../Components/modal";
import TopicCard from "../Components/TopicCard";

function Dashboard() {
  const [showModal,setShowModal]=useState(false);
  const [topics,setTopics]=useState([]);
  const [editData,setEditData]=useState(null);

  const handleSave=(newTopics)=>{
        if(editData){
      console.log("editing Data",editData);
    }else{
      console.log("new ");
    setTopics(prevTopics=>[...prevTopics,newTopics]);
    }
  };

  const handleEdit=(data)=>{
      setShowModal(true);
      setEditData(data)
      console.log("Update data",data);

  }


  return (
    <>
      <div className="navbar">
        <div className="nav-heading">
          <h1 className="main-heading">Topic Library</h1>
          <p className="side-heading">
            Double Materiality Assessment Configuration
          </p>
        </div>
        <div className="head-button-group">
          <button className="nav-button">
            <SlidersVertical className="icons" /> Assessment Level:Subtopic{" "}
          </button>
          <button className="nav-button">
            <Settings className="icons" />
            Configure Frameworks
          </button>
          <button className="nav-button">
            <Upload className="icons" />
            Bulk Upload{" "}
          </button>
          <button className="nav-button-create" onClick={()=>{setShowModal(true);
            setEditData(null);
          }}>
            <Plus className="icons-add" />
            Create Topic
          </button>
        </div>
      </div>
      <div className="Framework-section">
        <div className="Frame-heading-section">
          <LuBuilding2 className="frame-icons" />
          <div className="frame-heading">
            <h3>Global Logistics Corp</h3>
            <p>Air Freight & Logistics • International Freight</p>
          </div>
        </div>

        <div className="active-frameworks">
          <span className="active">Active Frameworks:</span>
          <div className="frame">ESRS</div>
          <div className="frame">GRI</div>
        </div>
      </div>
      <div className="card-grid">
        <Cards
          label="Total Topics"
          value="2"
          icon={<CircleCheck width={20} height={20} />}
          bgColor="#DCFCE7" // Tailwind green-100
          iconColor="#33a95eff" // Tailwind green-700
        />
        <Cards
          label="Configured"
          value="1"
          icon={<Settings width={20} height={20} />}
          bgColor="#DBEAFE" // Tailwind blue-100
          iconColor="#2a56d2ff" // Tailwind blue-700
        />
        <Cards
          label="Total Subtopics"
          value="3"
          icon={<Target width={20} height={20} />}
          bgColor="#EDE9FE" // Tailwind purple-100
          iconColor="#7C3AED" // Tailwind purple-700
        />
        <Cards
          label="Active Frameworks"
          value="2"
          icon={<Filter width={20} height={20} />}
          bgColor="#FFEDD5" // Tailwind orange-100
          iconColor="#ec703fff" // Tailwind orange-700
        />
      </div>
      {/* filterSection */}
      <div className="search-filter">
        <div className="search-filter-content">
          <div className="search-container">
            <Search  className="search-icon"/>
            <input type="text" className="search-input" placeholder="Search topics or codes..."/>
          </div>
          <button className="filter-button">
            <Filter 
 className="filter-icons"/>
            Filter
          </button>
        </div>
      </div>
      <div className="topics-section">
      <TopicCard/>
      {topics.map((topic)=>(
        <TopicCard key={topic.id} topicData={topic} onEdit={handleEdit}/>
      ))}
      </div>
      <Modal isOpen={showModal} onClose={()=>setShowModal(false)} save={handleSave} editData={editData}/>
    </>
  );
}

export default Dashboard;
