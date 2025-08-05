import React, { useState } from "react";
import {
  ChevronDown,
  Edit,
  Eye,
  Plus,
  Users,
  Target,
  CircleCheck,
  X,
  Search,
  UserPlus,
  Save,
 
  Trash2,
  
} from "lucide-react";
import "./styles/TopicCard.css";
import CustomSelect from "./CustomSelect";
import { FaTrash } from "react-icons/fa";


const TopicCard = ({ topicData, onEdit,onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsopen] = useState(false);
 
  const data = topicData ;
  console.log("inside the topic card", data);

  // const [stakeHolderType, setstakeHolderType] = useState("");
  // const [category, setCategory] = useState("");

  const handleEdit = (data) => {
    if (onEdit) {
      onEdit(data);
    } else {
      console.log("no edit given");
    }
  };
  const handleDelete=(data)=>{
    if(onDelete){
      onDelete(data._id);
    }else{
      console.log("No delete funtion")
    }
  }




  return (
    <>
      {data && (
        <div className="topic-card">
          <div className="topic-header">
            <div className="topic-header-left">
              <button
                className="expand-btn"
                id="down-icon"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <ChevronDown
                  className={`expand-icon ${isExpanded ? "expanded" : ""}`}
                />
              </button>
              <div className="topic-info">
                <div className="topic-title-row">
                  <h3 className="topic-title">{data.title}</h3>
                  <div className="topic-badges">
                    <span className="badge badge-code">{data.code}</span>

                    <span
                      className={`badge ${
                        data.frame === "E"
                          ? "badge-Frame-environment"
                          : data.frame === "S"
                          ? "badge-Frame-social"
                          : data.frame === "G"
                          ? "badge-Frame-governance"
                          : "badge-Frame-default"
                      }`}
                    >
                      {data.frame}
                    </span>

                    <span className="badge badge-status">
                      <CircleCheck className="status-icon" />
                    </span>
                  </div>
                </div>
                <p className="topic-description">{data.description}</p>
              </div>
            </div>
            <div className="topic-actions">
              <button className="action-btn" onClick={() => handleEdit(data)}>
                <Edit className="action-icon" />
              </button>
              <button className="action-btn">
                <Eye className="action-icon" />
              </button>
              <button className="action-btn" onClick={()=>handleDelete(data)}>
                   {/* <Trash2 className="action-icon-trash" /> */}
                   <FaTrash className="action-icon-trash"/>
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="topic-content">
              {/* Framework References */}
              {data?.frameworkReferences &&
                data?.frameworkReferences?.length > 0 && (
                  <div className="content-section">
                    <h4 className="section-title">Framework References</h4>
                    <div className="framework-references">
                      {data.frameworkReferences?.map((ref, index) => (
                        <div key={index} className="framework-ref">
                          <span className="framework-badge">
                            {ref?.framework}
                          </span>
                          <span className="framework-code">{ref?.code}</span>
                          <span className="framework-desc">
                          {""}  - {ref?.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Subtopics */}
              <div className="content-section">
                <div className="subtopics-header">
                  <h4 className="section-title">
                    Subtopics ({data?.subtopics?.length || 0})
                  </h4>
                  <button className="add-subtopic-btn">
                    <Plus className="add-icon" />
                    Add Subtopic
                  </button>
                </div>

                {data?.subtopics.length > 0 && (
                  <div className="subtopics-list">
                    {data.subtopics?.map((subtopic,index) => (
                      <div key={index} className="subtopic-card">
                        <div className="subtopic-content">
                          <div className="subtopic-header">
                            <h5 className="subtopic-name">{subtopic?.name}</h5>
                            <span className="subtopic-code">
                              {subtopic?.code}
                            </span>
                          </div>

                          <div className="subtopic-meta">
                            <div className="meta-row">
                              <span className="meta-label">Industries:</span>
                              <span className="industry-badge">
                                {subtopic?.industry}
                              </span>
                            </div>
                          </div>
                        </div>
                      
                        <div className="subtopic-actions">
                          <button
                            className="subtopic-action-btn"
                            onClick={() => setIsopen(true)}
                          >
                            <Users className="action-icon" />
                            Assign
                          </button>
                          <button className="subtopic-action-btn">
                            <Target className="action-icon" />
                            IROs
                          </button>
                          <button className="subtopic-action-btn">
                            <Edit className="action-icon" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* StakeHolderModel */}
      {/* {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsopen(false)}></div>
          <div className="modal">
            <div className="modal-header">
              <div className="topic-header-left">
                <div className="topic-info">
                  <div className="topic-title-row">
                    <h3 className="stake-topic-title">
                      Assign Stakeholders to Greenhouse Gas (GHG) Emissions
                    </h3>
                    <div className="topic-badges">
                      <span className="badge badge-code">{data.code}</span>
                    </div>
                  </div>
                  <p className="stake-topic-description">
                    Select stakeholders relevant to Climate Change And Noise
                    Management - Greenhouse Gas (GHG) Emissions
                  </p>
                </div>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsopen(false)}>
              <X className="close-icon" />
            </button>
            <div className="stake-modal-body">
              <div className="body-left">
                <div className="stake-filter">
                  <div className="search-container">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search topics or codes..."
                    />
                  </div>

                  <div className="Main-drop">
                    <div className="stake-dropdown">
                      <label>Stakeholder Type</label>
                      <CustomSelect
                        options={["All", "Internal", "External"]}
                        placeholder="All"
                        value={stakeHolderType}
                        onChange={setstakeHolderType}
                        showIcons={true}
                      />
                    </div>
                    <div className="stake-dropdown">
                      <label>Category</label>
                      <CustomSelect
                        options={[
                          "All",
                          "Operations",
                          "Finance",
                          "Governance",
                          "Supply Chain",
                          "Market",
                          "Compliance",
                          "Social",
                          "Environmental",
                        ]}
                        placeholder="All"
                        value={category}
                        onChange={setCategory}
                        showIcons={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="stake-available">
                  <div className="stake-available-header">
                    <p>Available Stakeholders</p>
                    <button className="">
                      <UserPlus className="userAdd-icon" />
                      Add New
                    </button>
                  </div>
                  <div className="StakeHolders-list"></div>
                </div>
              </div>
              <div className="body-right">
                <div className="selected-stakeholders">
                  <h3>Selected Stakeholders (0)</h3>
                 <div className="para-align">
      
                   <p>No stakeholders selected</p>
                  <p className="small-text">
                    Select stakeholders from the 
                    list 
                  </p>
                  </div>
                </div>

                <div className="stakeholders-why">
        
                  <button className="user-Button">
                    <Users className="usericon-why"/>
                    </button>
         
                  <div className="why-data">
                  <h3>
                    Why assign stakeholders?
                  </h3>
                    <p>
                      Stakeholder mapping helps identify who should be consulted
                      during the assessment process.
                    </p>
                  </div>
                </div>
                
                <div className="body-right-footer">
                  <button className="Save-stakeholders">
                    <Save/>
                    Save Stakeholder Assignment
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )} */
      }
    </>
  );
};

export default TopicCard;
