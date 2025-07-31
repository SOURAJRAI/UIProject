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
import Modal from "../Components/Modal";
import TopicCard from "../Components/TopicCard";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [editData, setEditData] = useState(null);

  const handleSave = (newTopics) => {
    if (editData) {

      setTopics(prevTopics=>prevTopics.map(topic=>
        topic.id===editData.id ? newTopics : topic
      ))
      console.log("editing Data", editData);
      
    } else {
      console.log("new data");
    
      setTopics((prevTopics) => [...prevTopics, newTopics]);
    }

    setEditData(null);

  };

  const handleEdit = (data) => {
    setShowModal(true);
    setEditData(data);
    console.log("Update data", data);
    
  };
  const [searchTerm, setSearchTerm] = useState(""); 

  const filteredTopics = topics.filter(
    (topic) =>
      topic.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const counttopic=topics.length || 0;

  const countSubtopic=topics.reduce((initial,topic)=> initial+(topic.subtopics?.length || 0),0);
  const countFramework=topics.reduce((initial,topic)=> initial+(topic.frameworkReferences?.length || 0),0);

  console.log("Count topic    ",counttopic)
  console.log("Count Subtopitopic    ",countSubtopic)
  console.log("Count framework    ",countFramework)

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
            <SlidersVertical className="icons" /> Assessment Level:Subtopic
          </button>
          <button className="nav-button">
            <Settings className="icons" />
            Configure Frameworks
          </button>
          <button className="nav-button">
            <Upload className="icons" />
            Bulk Upload{" "}
          </button>
          <button
            className="nav-button-create"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
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
          value={counttopic}
          icon={<CircleCheck width={20} height={20} />}
          bgColor="#DCFCE7" 
          iconColor="#33a95eff" 
        />
        <Cards
          label="Configured"
          value="1"
          icon={<Settings width={20} height={20} />}
          bgColor="#DBEAFE" 
          iconColor="#2a56d2ff" 
        />
        <Cards
          label="Total Subtopics"
          value={countSubtopic}
          icon={<Target width={20} height={20} />}
          bgColor="#EDE9FE" 
          iconColor="#7C3AED" 
        />
        <Cards
          label="Active Frameworks"
          value={countFramework}
          icon={<Filter width={20} height={20} />}
          bgColor="#FFEDD5" 
          iconColor="#ec703fff" 
        />
      </div>
      {/* filterSection */}
      <div className="search-filter">
        <div className="search-filter-content">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search topics or codes..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <Filter className="filter-icons" />
            Filter
          </button>
        </div>
      </div>
      <div className="topics-section">
        {/* <TopicCard /> */}
        {
          filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topicData={topic} onEdit={handleEdit} />
          ))
       }
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        save={handleSave}
        editData={editData}
      />
    </>
  );
}

export default Dashboard;
