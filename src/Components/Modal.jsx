import React, { useEffect, useState } from "react";
import "./styles/modal.css";
import { Edit, Plus, Save, X } from "lucide-react";
import CustomSelect from "./CustomSelect";

function Modal({ isOpen, onClose,save,editData }) {
    const [topicName, setTopicName] = useState("");
  const [topicCode, setTopicCode] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");

  const [references, setReference] = useState([
    { framework: "", code: "", description: "" },
  ]);
  const [subtopics, setSubtopic] = useState([
    { topic: "", subtopiccode: "", subtopicdescription: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...references];
    updated[index][field] = value;
    setReference(updated);
  };
  const handleChangeSubtopic = (index, field, value) => {
    const updated = [...subtopics];
    updated[index][field] = value;
    setSubtopic(updated);
    // setSubtopic([{...subtopics, [field] : value }])
    console.log("subtopics",subtopics)
  };

  const addReference = () => {
    setReference([...references, { framework: "", code: "", description: "" }]);
  };

  const addSubtopic = () => {
    setSubtopic([...subtopics, { topic: "", subtopiccode: "", subtopicdescription: "" }]);
  };
  
  const removeReference = (index) => {
    const updated = references.filter((_, id) => id !== index);
    setReference(updated);
  };
  const removeTopic = (index) => {
    const updated = subtopics.filter((_, id) => id !== index);
    setSubtopic(updated);
  };



  const handleSave=()=>{
    const newTopics={
        id:Date.now(),
        title:topicName,
        code : topicCode,
        frame: selectedFramework.charAt(0),
        description:description,
        frameworkReferences:[...references].filter((ref)=>ref.framework && ref.code),
        subtopics:subtopics
         .filter(sub => sub.topic && sub.subtopiccode)
        .map((sub,index)=>({
          id: index + 1,
          name: sub.topic,
          code: sub.subtopiccode,
          description: sub.subtopicdescription,
          industry: "Air Freight & Logistics", 
          stakeholders: []
          
        }))
    }

    save(newTopics);
    handleClose();
    
  }
  const handleClose=()=>{
    onClose();
    setTopicName("");
    setTopicCode("");
    setDescription("");
    setSelectedFramework("");
    setReference([{ framework: "", code: "", description: "" }]);
    setSubtopic([{ topic: "", subtopiccode: "", subtopicdescription: "" }]);
    
   }

  useEffect(()=>{
    if(editData){
      setTopicName(editData?.title || "");
      setTopicCode(editData?.code || "");
      setDescription(editData?.description || "");
      
      const Refrence={
        'E':'Environment',
        'S':'Social',
        'G':'Governance'
      }
      setSelectedFramework(Refrence[editData?.frame] || "");
      setReference(editData?.frameworkReferences || [{ framework: "", code: "", description: "" }])
      const subtopicMap=(editData.subtopics ||[]).map((sub)=>({
        topic:sub.name,
        subtopiccode:sub.code,
        subtopicdescription:sub.description
      }));

      setSubtopic(subtopicMap.length>0? subtopicMap : [{ topic: "", subtopiccode: "", subtopicdescription: "" }])
    }else{

    setTopicName("");
    setTopicCode("");
    setDescription("");
    setSelectedFramework("");
    setReference([{ framework: "", code: "", description: "" }]);
    setSubtopic([{ topic: "", subtopiccode: "", subtopicdescription: "" }]);
    }
    console.log("inside modal edit useefect",editData);
    

  },[editData,isOpen]);

  const isFormValid = topicName && topicCode && description ;

  return (
    isOpen && (
      <>
        <div className="overlay" onClick={onClose}></div>
        <div className="modal">
          <div className="modal-header">
            <div>
              {
                editData?
                (
                <div className="edit-header">
                <Edit className="edit-icon"/>
                <h3>Edit Topic</h3>
                </div>
                ):
                (
                  
                  <h3>Create Custom Topic</h3>
                )
              }
              <p className="subtext">
                {
                  editData ? 
                  'Modify topic details and framework references' :  
                  'Add a custom topic and subtopics to your assessment library'
                }
                
              </p>
            </div>
          </div>
            <button className="close-btn" onClick={handleClose}>
              <X className="close-icon" />
            </button>
          <div className="modal-body">
            <div className="card">
              <h3>Basic Information</h3>
              <div className="grid">
                <div className="form-group">
                  <label>Topic Name *</label>
                  <input type="text" placeholder="eg., Water Management" value={topicName} onChange={(e)=>setTopicName(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Topic Code *</label>
                  <input type="text" placeholder="eg., CUSTOM-W1" value={topicCode} onChange={(e)=>setTopicCode(e.target.value)}/>
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  rows="3"
                  placeholder="Describe the topics and its scope..."
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>ESG Pillar *</label>
              
                <CustomSelect
                  options={["Environment", "Social", "Governance"]}
                  placeholder="Select ESG pillar"
                  value={selectedFramework}
                  onChange={setSelectedFramework}
                />
              </div>
            </div>

            {/* Framework section*/}
            <div className="card">
              <div className="section-header">
                <h3>Framework Reference</h3>
                <button className="add-btn" onClick={addReference}>
                  <Plus className="add-icon" /> Add References
                </button>
              </div>
              {references.map((reference, index) => (
                <div className="reference-box" key={index}>
                  <h4>Reference {index + 1}</h4>
                  {references.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeReference(index)}
                    >
                      <X className="removeref-icon" />
                    </button>
                  )}
                  <div className="grid-3">
                    <div className="form-group">
                      <label htmlFor=""> Framework</label>
                      <CustomSelect
                        options={["ESRS", "GRI", "SASB", "TCFD", "SDG", "CDP"]}
                        placeholder="Select framework"
                        value={reference.framework}
                        //   onChange={setSelectedPillar}
                        onChange={(value) =>
                          handleChange(index, "framework", value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Reference Code</label>
                      <input
                        type="text"
                        placeholder="e.g., ESRS E3"
                        value={reference.code}
                        onChange={(e) =>
                          handleChange(index, "code", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        placeholder="e.g., Water and Marine Resources"
                        value={reference.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="section-header">
                <h3>Subtopics</h3>
                <button className="add-btn" onClick={addSubtopic}>
                  <Plus className="add-icon" />
                  Add Subtopics
                </button>
              </div>
              {subtopics.map((subtopic, index) => (
                <div className="reference-box" key={index}>
                  <h4>Subtopic {index+1}</h4>
                   {subtopics.length > 1 && (
                    <button
                      className="remove-btn"
                      onClick={() => removeTopic(index)}
                    >
                      <X className="removeref-icon" />
                    </button>
                  )}
                  <div className="grid">
                    <div className="form-group">
                      <label htmlFor="">Subtopic Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Water Consumption"
                        value={subtopic.topic}
                        onChange={(e)=>handleChangeSubtopic(index, "topic", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subtopic Code</label>
                      <input type="text" placeholder="e.g., CUSTOM-W1.1" 
                      value={subtopic.subtopiccode}
                       onChange={(e)=>handleChangeSubtopic(index, "subtopiccode", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="2" placeholder="Describe the subtopic..." 
                    value={subtopic.subtopicdescription}
                       onChange={(e)=>handleChangeSubtopic(index, "subtopicdescription", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* footer section */}
            <div className="modal-footer">
              <p>Custom will be available for all assessments</p>
              <div className="btn-footer">
                <button className="btn cancel" onClick={handleClose}>Cancel</button>
                <button className="btn save"  onClick={handleSave} disabled={!isFormValid}>
                  <Save className="save-icon" />{editData?'Save Changes':'Create Topic'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </>
    )
  );
}
export default Modal;
