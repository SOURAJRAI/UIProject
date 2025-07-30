import React, { useState } from "react";
import {
  ChevronDown,
  Edit,
  Eye,
  Plus,
  Users,
  Target,
  CircleCheck,
} from "lucide-react";
import "./styles/TopicCard.css";

const TopicCard = ({topicData,onEdit}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  
  // Static data for now
  // const defaultData = {
  //   title: "Climate Change And Noise Management",
  //   code: "ESRS E1",
  //   frame: "S",
  //   status: "Configured",
  //   description:
  //     "Assess the organization's GHG emissions, climate risks, and resilience strategies, including mitigation, adaptation, and transition impacts on business operations and stakeholders.",
  //   frameworkReferences: [
  //     {
  //       framework: "CSRD/ESRS",
  //       code: "ESRS E1",
  //       description: "Climate Change",
  //     },
  //     {
  //       framework: "GRI",
  //       code: "GRI 305",
  //       description: "Emissions",
  //     },
  //     {
  //       framework: "TCFD",
  //       code: "Strategy",
  //       description: "Climate-related Risks and Opportunities",
  //     },
  //     {
  //       framework: "SDGs",
  //       code: "SDG 13",
  //       description: "Climate Action",
  //     },
  //   ],
  //   subtopics: [
  //     {
  //       id: 1,
  //       name: "Greenhouse Gas (GHG) Emissions",
  //       code: "ESRS E1.1",
  //       frameworks: [
  //         {
  //           name: "ESRS",
  //           code: "ESRS E1-6",
  //           description: "Gross Scopes 1, 2, 3 and Total GHG emissions",
  //         },
  //         {
  //           name: "GRI",
  //           code: "GRI 305-1",
  //           description: "Direct (Scope 1) GHG emissions",
  //         },
  //       ],
  //       industry: "Air Freight & Logistics",
  //       stakeholders: ["Environmental Team", "Operations"],
  //       iros: ["Risk", "Opportunity"],
  //     },
  //     {
  //       id: 2,
  //       name: "Noise Management",
  //       code: "ESRS E1.2",
  //       frameworks: [
  //         {
  //           name: "ESRS",
  //           code: "ESRS E1-4",
  //           description: "Pollution of air, water and soil",
  //         },
  //         { name: "GRI", code: "GRI 413", description: "Local Communities" },
  //       ],
  //       industry: "Air Freight & Logistics",
  //       stakeholders: [],
  //       iros: [],
  //     },
  //   ],
  // };
  const data=topicData ;
  console.log(data);
  
  const handleEdit=(data)=>{
    if(onEdit){
      onEdit(data);
      
    }else{
      console.log("no edit given");
    }
  }



  return (
    <>
    {
      data && (
    
    <div className="topic-card">
      <div className="topic-header">
        <div className="topic-header-left">
          <button
            className="expand-btn"
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
            
                    <span className={`badge ${data.frame ==='E'?'badge-Frame-environment':
                                            data.frame==='S'?'badge-Frame-social':
                                            data.frame==='G'?'badge-Frame-governance':
                                            'badge-Frame-default'
                    }`}>{data.frame}</span>
         
                <span className="badge badge-status">
                  <CircleCheck className="status-icon" />
                  {data.status}
                </span>
              </div>
            </div>
            <p className="topic-description">{data.description}</p>
          </div>
        </div>
        <div className="topic-actions">
          <button className="action-btn" onClick={()=>handleEdit(data)}>
            <Edit className="action-icon" />
          </button>
          <button className="action-btn">
            <Eye className="action-icon" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="topic-content">
          {/* Framework References */}
          {data?.frameworkReferences && data?.frameworkReferences?.length > 0 && (
          <div className="content-section">
            <h4 className="section-title">Framework References</h4>
            <div className="framework-references">
              {data.frameworkReferences.map((ref, index) => (
                <div key={index} className="framework-ref">
                  <span className="framework-badge">{ref.framework}</span>
                  <span className="framework-code">{ref.code}</span>
                  <span className="framework-desc"> - {ref.description}</span>
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

            { data?.subtopics.length>0 && (

            <div className="subtopics-list">
              {data.subtopics.map((subtopic) => (
                <div key={subtopic.id} className="subtopic-card">
                  <div className="subtopic-content">
                    <div className="subtopic-header">
                      <h5 className="subtopic-name">{subtopic.name}</h5>
                      <span className="subtopic-code">{subtopic.code}</span>
                    </div>

                  

                    <div className="subtopic-meta">
                      <div className="meta-row">
                        <span className="meta-label">Industries:</span>
                        <span className="industry-badge">
                          {subtopic.industry}
                        </span>
                      </div>

                      {subtopic.stakeholders.length > 0 && (
                        <div className="meta-row">
                          <Users className="meta-icon" />
                          <span className="meta-label">Stakeholders:</span>
                          <div className="stakeholder-list">
                            {subtopic.stakeholders?.map((stakeholder, index) => (
                              <span key={index} className="stakeholder-badge">
                                {stakeholder}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {subtopic.iros?.length > 0 && (
                        <div className="meta-row">
                          <Target className="meta-icon" />
                          <span className="meta-label">IROs:</span>
                          <div className="iro-list">
                            {subtopic.iros.map((iro, index) => (
                              <span
                                key={index}
                                className={`iro-badge ${iro.toLowerCase()}`}
                              >
                                {iro}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="subtopic-actions">
                    <button className="subtopic-action-btn">
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
      )
    }
    </>
  );
};

export default TopicCard;
