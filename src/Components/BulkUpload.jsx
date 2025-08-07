import { AlertCircle, Binary, CheckCircle, Download, File, FileText, Upload, X } from "lucide-react";
import React, { useState } from "react";
import axios from 'axios'
import * as xlsx from 'xlsx'
import "./styles/BulkUpload.css";



function BulkUpload({ isOpen, onClose ,onUpdate}) {

  const [uploadFile,setUploadFile]=useState(null);
  const[excelData,setExcelData]=useState([]);
  const[report,setReport]=useState([])

  const handleFileChange=(e)=>{
    const file =  e.target.files[0];
   const reader= new FileReader();
   reader.readAsArrayBuffer(file)
   reader.onload=(e)=>{
     const data=e.target.result;
     console.log("after array buffer",data);
    const workbook=xlsx.read(data,{type:'binary'});
    const sheetname=workbook.SheetNames[0];
    const worksheet=workbook.Sheets[sheetname];
    const jsondata=xlsx.utils.sheet_to_json(worksheet)
    setExcelData(jsondata);
    validateData(jsondata);
   }
   setUploadFile(file)
    
  }
  
  console.log("Excel Data",excelData);

  const validateData=(datas)=>{
    let validCount =0;
    let issues =[];
    const uniqueTopics=new Set();
    const uniqueSubTopics=new Set();

    datas.forEach((data,index) => {
      const rowNum=index+2;
      let hasIssue=false;

      if(!data["Topic Name"]){
        issues.push(`Row ${rowNum}:Missing Topic name`);
        hasIssue=true;
      }
      if(!data["Topic Code"]){
        issues.push(`Row ${rowNum}:Missing Topic code`);
        hasIssue=true;
      }

      const validPillars=["E","S","G"]
       if(!validPillars.includes(data["ESG Pillar"])){
        issues.push(`Row ${rowNum}:Invalid ESG Pillar`);
        hasIssue=true;
      }

         if(!data["Description"]){
        issues.push(`Row ${rowNum}:Missing Description`);
        hasIssue=true;
      }
         if(!data["Framework"]){
        issues.push(`Row ${rowNum}:Missing Framework`);
        hasIssue=true;
      }
         if(!data["Framework Reference"]){
        issues.push(`Row ${rowNum}:Missing Framework Reference`);
        hasIssue=true;
      }
         if(!data["Subtopic Name"]){
        issues.push(`Row ${rowNum}:Missing Framework Reference`);
        hasIssue=true;
      }
         if(!data["Subtopic Code"]){
        issues.push(`Row ${rowNum}:Missing Framework Reference`);
        hasIssue=true;
      }
         if(!data["Subtopic Description"]){
        issues.push(`Row ${rowNum}:Missing Framework Reference`);
        hasIssue=true;
      }

         if(data["Topic Name"]){
         uniqueTopics.add(data["Topic Name"].trim());
      }
         if(data["Subtopic Name"]){
         uniqueSubTopics.add(data["Subtopic Name"].trim());
      }

      if(!hasIssue) validCount++;

      
    });
    setReport({
      total: datas.length,
      valid: validCount,
      newTopics: uniqueTopics.size,
      newSubtopics: uniqueSubTopics.size,
      issues,
    });

  }

  const handleDragOver=(e)=>{
    e.preventDefault();
  }

  const handleDrop=(e)=>{
    e.preventDefault();
        const file= e.dataTransfer.files[0];
        if(file)
        {
          setUploadFile(file);
        }
  }

  const handleClose=()=>{
    setUploadFile(null);
    setExcelData([]);
    setReport([]);
    onClose();
  }
  console.log("report",report)

  const handleSubmit=()=>{

    const form=new FormData();
    form.append("file",uploadFile);
    console.log("Form Data",form);
 
   axios
   .post("http://localhost:5001/api/UploadFile",form,{
      headers: { "Content-Type": "multipart/form-data" },
   })
   .then((res)=>{
    console.log("Uploaded Successfully",res)
    onUpdate();
    onClose();
    setUploadFile(null);
    setExcelData([]);
   })
   .catch((err)=>{
      if(err.status===400)
      {
        alert(err.response.data.message)
      }
     console.log("error while uploading",err)

     console.log("error while uploading",form,uploadFile)
   }
   
  )
  }

  return (
    isOpen && (
      <>
        <div className="overlay" onClick={handleClose}></div>
        <div className="bulk-modal">
          <div className="modal-header">
            <div className="edit-header">
              <h3>Bulk Upload Topics</h3>
            </div>

            <p className="subtext">
              Upload multiple topics and subtopics using a CSV file
            </p>
          </div>
          <button className="close-btn" onClick={handleClose}>
            <X className="close-icon" />
          </button>
          <div className="modal-body">
            <div className="download-card">
              <div>
                <h3 className="download-head">Download Template</h3>
                <p className="download-subtext">
                  Use our CSV template to ensure proper formatting
                </p>
              </div>
              <div>
                <button className="download-btn">
                  <Download className="download-icon" />
                  Download Template
                </button>
              </div>
            </div>

            <div className="card-upload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
              <div className="upload-section">
            {uploadFile?
             (
              <>
              <div className="upload">
                  <FileText className="upload-icon-after" />
                </div>
                <div className="upload-text">
                  <h3>{uploadFile.name}</h3>
                  <p>{(uploadFile.size/1024).toFixed(2)}KB</p>
                </div>
                <button onClick={()=>{
                  setUploadFile(null)
                  setExcelData([])
                  }} className=" select-btn btn-remove">
                  <X  className="remove-icon"/>
                  Remove file</button>

                </>
             ) :(

              <>
                <div className="upload">
                  <Upload className="upload-icon" />
                </div>
                <div className="upload-text">
                  <h3>Drop your CSV file here, or click to browse</h3>
                  <p>Supports CSV files up to 10MB</p>
                </div>
               
                <input 
                accept=".xlsx" 
                type="file" 
                className="input-file" 
                id="input-file" 
                onChange={handleFileChange}
                hidden/>
                <label htmlFor="input-file" className="select-btn">
                    {/* <button className="select-btn"> select file</button> */}
                    Select file
                    </label>  
                </>

            )}
              </div>
             

            </div>
             {excelData.length>0 &&(
                  <div className="validation-report">
        <div className="report-header">
          <CheckCircle className="check-icon" />
          <h3>Validation Complete</h3>
        </div>
              <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">{report.total}</div>
            <div className="stat-label">Total Rows</div>
          </div>
          <div className="stat-box">
            <div className="stat-value valid">{report.valid}</div>
            <div className="stat-label">Valid Rows</div>
          </div>
          <div className="stat-box">
            <div className="stat-value topics">{report.newTopics}</div>
            <div className="stat-label">New Topics</div>
          </div>
          <div className="stat-box">
            <div className="stat-value subtopics">{report.newSubtopics}</div>
            <div className="stat-label">New Subtopics</div>
          </div>
        </div>

           
        {report.issues.length > 0 && (
          <div className="issues-section">
            <div className="issues-header">
              <AlertCircle className="alert-icon" />
              <span>{report.issues.length} Issues Found</span>
            </div>
            <div className="issues-list">
              {report.issues.map((issue, index) => (
                <div key={index} className="issue-item">{issue}</div>
              ))}
            </div>
          </div>
        )}
        </div>

              )

              }

            <div className="bulk-footer">
              <div className="bulk-footer-text">Upload a CSV file to get started</div>
              <div className="bulk-footer-actions">
                <button className="button btn-cancel" onClick={()=>{
                  setUploadFile(null)
                  setExcelData([])
                }}>Cancel</button>
                <button className="button btn-import" disabled={!uploadFile} onClick={handleSubmit}>
                  Import Topics
                </button>
              </div>
            </div>

          </div>
        </div>
      </>
    )
  );
}

export default BulkUpload;
