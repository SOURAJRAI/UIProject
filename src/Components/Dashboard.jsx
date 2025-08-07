import React, { useEffect, useState } from "react";
import "./styles/dashboard.css";
import "./styles/Cards.css";

import Cards from "../Components/Cards";


import {
  Settings,
  Target,
  Filter,
  SlidersVertical,
  Upload,
  Plus,
  Search,
  CircleCheck,
  Building2,
} from "lucide-react";
import Modal from "../Components/Modal";
import TopicCard from "../Components/TopicCard";
import axios from 'axios';
import BulkUpload from "./BulkUpload";

const api =axios.create({
  baseURL:"http://localhost:5001/api"
})

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isUpdated,setisUpdated]=useState(false);


  useEffect(()=>{
   getData()

  },[isUpdated]);

  const getData=async()=>{
    try{
      const response=await api.get('/getData');
      setTopics(response.data.data|| response.data)
      setisUpdated(false);
    }catch(err)
    {
      console.log("Error while fetching data",err)
      setTopics([]);
    }

  }

  const handleUpdate=async(updatedTopic)=>{
    try{
      
      const response=await api.put(`/updateData/${updatedTopic._id}`,updatedTopic)

       console.log("Topic updated successfully:", response.data.data);
       console.log("inside handle update fucntion",updatedTopic)
    setEditData(null);
    setShowModal(false);
    setisUpdated(true);

    }catch(err){
        console.log("Error updating topic:",err);
        console.log("inside handle update fucntion",updatedTopic)
    }

  }

  const handleSave = async (newTopics) => {
    if (editData) {


      console.log("Original data:", editData);
    console.log("New data from form:", newTopics);

        const updatedTopic = {
      ...newTopics,      
      _id: editData._id  
    };
     console.log("Final data to send:", updatedTopic);
      await handleUpdate(updatedTopic);
      
    } else {
      try{

        const response= await api.post('/addData',newTopics)
        
        const createTopic= response.data.data;
        // setTopics((prevTopics) => [...prevTopics, createTopic]);
        console.log("new data",createTopic);
        setisUpdated(true);
        setEditData(null);
      }catch(err){
        console.log(err);
      }
  
      }

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

  const handleDelete=async(id)=>{
      try{

        const response =await api.delete(`/deleteData/${id}`)
        console.log("topic deleted successfull",response)
        setisUpdated(true);
      }catch(err){
        console.error("failed to delete ",err)

      }
  }

  console.log("filterTopivs",filteredTopics)



 
  

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
          <button className="nav-button" onClick={()=>
            setShowBulkModal(true)
          }>
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
          <Building2 className="frame-icons" />
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
   
        {
          filteredTopics.map((topic) => (
            <TopicCard key={topic._id} topicData={topic} onEdit={handleEdit} onDelete={handleDelete} />
           
          ))
       }
      </div>
      
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        save={handleSave}
        editData={editData}
      />

      <BulkUpload
      isOpen={showBulkModal}
      onClose={()=>setShowBulkModal(false)}
       onUpdate={()=>setisUpdated(true)}
      />
    </>
  );
}

export default Dashboard;
