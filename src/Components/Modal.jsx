import React, { useState } from "react";
import "./styles/modal.css";
import { Plus, X } from "lucide-react";
import CustomSelect from "./CustomSelect";

function Modal({ isOpen, onClose }) {
//   const [selectedPillar, setSelectedPillar] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");

  const[references,setReference]=useState([
    { framework: "", code: "", description: "" }
  ])    

  const  handleChange=(index,field,value)=>{
            const updated=[...references]
            updated[index][field]=value;
            setReference(updated);
  }

  const addReference=()=>{
    setReference([...references,
            { framework: "", code: "", description: "" }

    ]);
  }
  const removeReference=(index)=>{
    const updated=references.filter((_,id)=> id !== index);
    setReference(updated)
  }





  return (
    isOpen && (
      <>
        <div className="overlay"></div>
        <div className="modal">
          <div className="modal-header">
            <div>
              <h2>Create Custom Topic</h2>
              <p className="subtext">
                Add a custom topic and subtopics to your assessment library
              </p>
            </div>
            <button className="close-btn" onClick={onClose}>
              <X className="close-Icon" />
            </button>
          </div>
          <div className="modal-body">
            <div className="card">
              <h3>Basic Information</h3>
              <div className="grid">
                <div className="form-group">
                  <label>Topic Name *</label>
                  <input type="text" placeholder="eg., Water Management" />
                </div>
                <div className="form-group">
                  <label>Topic Code *</label>
                  <input type="text" placeholder="eg., CUSTOM-W1" />
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  rows="3"
                  placeholder="Describe the topics and its scope..."
                />
              </div>
              <div className="form-group">
                <label>ESG Pillar *</label>
                {/* <select>
                    <option>Select ESG pillar</option>
                    <option>Environment</option>
                    <option>Social</option>
                    <option>Governance</option>
                  </select> */}
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
                  <Plus className="add-icon"/> Add References
                </button>
              </div>
              {references.map((reference,index)=>(
              <div className="reference-box">
                <h4>Reference {index+1}</h4>
                {references.length>1 &&(
                <button
                className="remove-btn"
                onClick={() => removeReference(index)}
              >
                <X className="removeRef"/>
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
                      onChange={(value)=>handleChange(index,"framework",value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Reference Code</label>
                    <input type="text" placeholder="e.g., ESRS E3" value={reference.code} onChange={(e)=>handleChange(index,"code",e.target.value)}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input
                      type="text"
                      placeholder="e.g., Water and Marine Resources"
                      value={reference.description} onChange={(e)=>handleChange(index,"description",e.target.value)}
                    />
                  </div>
                </div>
              </div>
           
              ))}
            </div>







          </div>
        </div>
      </>
    )
  );
}
export default Modal;
