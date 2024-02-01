import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

function UploadForm() {
  const [selectedLenders, setSelectedLenders] = useState([]);
  const [selectedLenders1, setSelectedLenders1] = useState([]);

  const [formData, setFormData] = useState({
    dateOfLogin: '',
    employeeIdOfCaseOwner: '',
    employeeName: '',
    dateOfBirth: '',
    managerName: '',
    employementType: '',
    branchName: '',
    customerName: '',
    customerContact: '',
    mailId: '',
    customerPan: '',
    customerDateOfBirth: '',
    customerPermanentAddress: '',
    officeAddressWithPin: '',
    state: '',
    city: '',
    customerOccupation: '',
    requiredLoanType: '',
    requiredLoanAmount: '',
    customLoanAmunt: '',
    uploadFiles: '',
    latestCIBILScore: '',
    bankingPassAndOtherDocPass: '',
    toBeLoggedInFromWhichLender: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [files, setFiles] = useState({
    aadhar: null,
    pan: null,
    other: null,
  });

  // Handle file change for different documents
  const handleFileChange = (e) => {
    // Assuming you're handling file state at the top level
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };
  
  const removeFile = (fileType) => {
    setFiles({ ...files, [fileType]: null });
    // Reset the value of the file input to clear it
    document.querySelector(`input[name="${fileType}"]`).value = '';
  };
  
  // Handle file removal
  // const removeFile = (docType) => {
  //   setFiles({ ...files, [docType]: null });
  // };

  const handleLenderChange = (event) => {
    const selectedLender = event.target.value;
    if (event.target.checked) {
      setSelectedLenders((prevSelected) => [...prevSelected, selectedLender]);
    } else {
      setSelectedLenders((prevSelected) =>
        prevSelected.filter((lender) => lender !== selectedLender)
      );
    }
  };
  const handleLenderChange1 = (event) => {
    const selectedLender = event.target.value;
    if (event.target.checked) {
      setSelectedLenders1(prevSelected => [...prevSelected, selectedLender]);
    } else {
      setSelectedLenders1(prevSelected => prevSelected.filter(lender => lender !== selectedLender));
    }
  };
  
  // const handleAmountChange = (e) => {
  //   if (e.target.value === 'custom') {
  //     // If 'Enter amount' option is selected, clear the requiredLoanAmount
  //     setFormData({ ...formData, requiredLoanAmount: '', customLoanAmount: '' });
  //   } else {
  //     // For predefined options, set the requiredLoanAmount
  //     setFormData({ ...formData, requiredLoanAmount: e.target.value, customLoanAmount: '' });
  //   }
  // };


  const lenderOptions = [
    'Bajaj Finance',
    'Tata Capital',
    'HDFC',
    'Axis Bank',
    'ICICI Bank',
    'Kotak Mahindra Bank',
    'Lending kart',
    'Paysense',
    'Upwards',
    'Aditya Birla',
    'Growth Source',
    'Hero FinCorp',
    'Clix Capital',
    'Ashv',
    
  ];
  const lenderOptions1 = [
  
    'Federal Bank',
    'FULLERTON',
    'Stancy bank',
    'Yes Bank',
    'Indusind',
    'ICICI Education Loan',
    'Avanse',
    'HDFC Credila',
    'Incred',
    
  ];
  

  const handleUpload = async () => {
    const data = new FormData();
    data.append('dateOfLogin', formData.dateOfLogin);
    data.append('employeeIdOfCaseOwner', formData.employeeIdOfCaseOwner);
    data.append('employeeName', formData.employeeName);
    data.append('dateOfBirth', formData.dateOfBirth);
    data.append('managerName', formData.managerName);
    data.append('employementType', formData.employementType);
    data.append('branchName', formData.branchName);
    data.append('customerName', formData.customerName);
    data.append('customerContact', formData.customerContact);
    data.append('mailId', formData.mailId);
    data.append('customerPan', formData.customerPan);
    data.append('customerDateOfBirth', formData.customerDateOfBirth);
    data.append('customerPermanentAddress', formData.customerPermanentAddress);
    data.append('officeAddressWithPin', formData.officeAddressWithPin);
    data.append('state', formData.state);
    data.append('city', formData.city);
    data.append('customerOccupation', formData.customerOccupation);
    data.append('requiredLoanType', formData.requiredLoanType);
    data.append('requiredLoanAmount', formData.requiredLoanAmount);
    data.append('latestCIBILScore', formData.latestCIBILScore);
    data.append('bankingPassAndOtherDocPass', formData.bankingPassAndOtherDocPass);
    data.append('toBeLoggedInFromWhichLender', formData.toBeLoggedInFromWhichLender);
    data.append('remarks', formData.remarks);

    if (formData.adharCard && formData.adharCard.length) {
      for (let i = 0; i < formData.adharCard.length; i++) {
        data.append('adharCard', formData.adharCard[i]);
      }
    }

    if (formData.files && formData.files.length) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append('files', formData.files[i]);
      }
    }

    try {
      await axios.post('http://localhost:5000/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Data and files uploaded successfully');
    } catch (error) {
      console.error('Error uploading data and files:', error);
    }
  };

  return (
    <>
      <div className="form-container">
      <h1 className="form-title">Case Login Form</h1>
      <form className="loanApplicationForm">
     
        <div className="column">
          <div className="form-group">
            <label>
              Date Of Login:
              <input
                type="date"
                name="dateOfLogin"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
          <label>Employee Id Of Case Owner:</label>
        <select name="employeeIdPrefix" onChange={handleInputChange}>
         <option value="F2-369-001">F2-369-001</option>
         <option value="F2-369-002">F2-369-002</option>
         <option value="F2-369-003">F2-369-003</option>
         <option value="F2-369-004">F2-369-004</option>
    {/* Other options */}
      </select>
       {/* <input
       type="text"
      name="employeeIdOfCaseOwner"
      required
       onChange={handleInputChange}
        placeholder="Enter Employee ID" */}
  {/* /> */}
</div>

          <div className="form-group">
            <label>
              Employee Name:
            
              <input
                type="text"
                name="employeeName"
                required
                onChange={handleInputChange}
              />
          
            </label>
           
          </div>
          <div className="form-group">
            <label>
              Manager Name:
              <select>
              <input
                type="text"
                name="managerName"
                required
                onChange={handleInputChange}
              />
              <option value="name">Choose</option>
              <option value="name">Tarun Dhiman</option>
              
              <option value="name">Shashank Sharma</option>
              
              <option value="name">Abhinav Awal</option>
              
              <option value="name">Harpreet Singh</option>
              
              <option value="name">Siddhi Khanna</option>
              
              <option value="name">Prashant</option>
              
              <option value="name">Neha Lakra</option>
               
              <option value="name">Anurandhan</option>
               
              <option value="name">Rahul Sharma</option>
               
              <option value="name">Rajkumari</option>
               
              <option value="name">Shubham</option>
              <option value="name">Shivani</option>
              <option value="name">jiya</option>
              
              <option value="name">Nitish</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Employment Type:
              <select
                name="employementType"
                required
                onChange={handleInputChange}
              >
                <option value="Salaried">Choose</option>
                <option value="Salaried">Salaried</option>
                <option value="partTime">Self Employed</option>
                <option value="businessman">Businessman</option>
                <option value="professional">Professional</option>
                <option value="other">Others</option>
              </select>
            </label>
          </div>
          <h2>Upload All Document Here</h2>
        
          <div className="column">
        {/* Aadhar upload */}
        <div className="form-group">
          <label>Aadhar Card:</label>
          <input
            type="file"
            name="aadhar"
            onChange={(e) => handleFileChange(e, 'aadhar')}
            required
          />
          {files.aadhar && (
            <div className="file-info">
              {/* <span>{files.aadhar.name}</span> */}
              <span type="button" onClick={() => removeFile('aadhar')} className="remove-file-btn">X</span>
            </div>
          )}
        </div>
        {/* PAN upload */}
        <div className="form-group">
          <label>PAN Card:</label>
          <input
            type="file"
            // name="pan"
            onChange={(e) => handleFileChange(e, 'pan')}
            required
          />
          {files.pan && (
            <div className="file-info">
              <span>{files.pan.name}</span>
              <button type="button" onClick={() => removeFile('pan')} className="remove-file-btn">X</button>
            </div>
          )}
        </div>
        {/* Other Documents upload */}
        <div className="form-group">
          <label>Other Documents:</label>
          <input
            type="file"
            // name="other"
            onChange={(e) => handleFileChange(e, 'other')}
           
          />
          {files.other && (
            <div className="file-info">
              <span>{files.other.name}</span>
              <button type="button" onClick={() => removeFile('other')} className="remove-file-btn">X</button>
            </div>
          )}
        </div>
        </div>
          <div className="form-group">
            <label>
              Branch Name:
              <select
                name="branchName"
                required
                onChange={handleInputChange}
              >
                <option>Noida</option>
                <option>Jhandewalan</option>
                <option>Bareily</option>
                <option>Centralised Ops</option>
              </select>
            </label>
          </div>
          <h1>Customer Section</h1>
          
        <div className="column">
          <div className="form-group">
            <label>
              Customer Name (As per PAN Card):
              <br />
             
              <input
                type="text"
                name="customerName"
                required
                onChange={handleInputChange}
                placeholder="ENTER NAME IN CAPITAL LETTERS"
                style={{ textTransform: 'uppercase' }}
              />
            
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer Date Of Birth:
              <br />
              
              <input
                type="date"
                name="dateOfBirth"
                required
               
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer Occupation:
              <input
                type="text"
                name="customerOccupation"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer Contact:
              <input
                type="text"
                name="customerContact"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer Mail:
              <input
                type="text"
                name="mailId"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer PAN Card Number:
              <br />
              
              <input
                type="text"
                name="customerPan"
                placeholder='TYPE PAN NUMBER IN CAPITAL LETTER'
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer Current Address:
              <input
                type="text"
                name="officeAddressWithPin"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Customer Permanent Address:
              <input
                type="text"
                name="customerPermanentAddress"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Office Address With Pin:
              <input
                type="text"
                name="officeAddressWithPin"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          {/* <div className="form-group">
            <label>
              Customer Current Address:
              <input
                type="text"
                name="officeAddressWithPin"
                onChange={handleInputChange}
              />
            </label>
          </div> */}
        </div>
          
        </div>
        <div className="column">
          <div className="form-group">
            <label>
              State:
              <input
                type="text"
                name="state"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              City:
              <input
                type="text"
                name="city"
                required
                onChange={handleInputChange}
              />
            </label>
          </div>
          
          {/* <div className="form-group">
            <label>
              Customer Date Of Birth:
              <br />
              <h6>AS PER PAN CARD</h6>
              <input
                type="date"
                name="dateOfBirth"
                required
                onChange={handleInputChange}
              />
            </label>
          </div> */}
          <div className="form-group">
          <label>
            Required Loan Type:
            <select
              name="requiredLoanType"
              required
              onChange={handleInputChange}
            >
              <optgroup label="Unsecured Loans">
              <option value="personal">Choose Any Of One</option>
                <option value="personal">Professional Loan (Doctor/CA/CS,CWA)</option>
                <option value="personal">Personal Loan</option>
                <option value="business">Home Loan</option>
                <option value="education">Educational Loan</option>
                <option value="education">Equipment Loan/Machinery Loan</option>
                <option value="auto">Auto Loan</option>
              </optgroup>
              <optgroup label="Secured Loans">
                <option value="home">Housing Loan Salaried</option>
                <option value="property">Housing Loan Business Loan</option>
                <option value="equipment">LAP Salaried</option>
                <option value="equipment">LAP Businessman</option>
                <option value="equipment">LAP Professional</option>
                <option value="equipment">Education Loan India</option>
                <option value="equipment">Education Loan Foreign</option>
              </optgroup>
            </select>
          </label>
        </div>
        </div>
        <div className="column">
          <div className="form-group">
            <label>
              Required Loan Amount:
              {/* <select> */}
              <input
                type="text"
                name="requiredLoanAmount"
                required
                onChange={handleInputChange}
              />
              {/* <option value='choose'>Choose</option> */}
              {/* <option value="amount">
                1-10 Lakhs             </option>
              <option value="amount">
                10-30 lakh
              </option>
              <option value="amount">
                30-50 lakh
              </option>
              <option value="amount">
                50-99 lakh
              </option>
              <option value="amount">
               1-20 Cr
              </option>
              <option value="custom">Enter Amount:</option>
              </select> */}
              
            </label>
          </div>
          <div className="form-group">
            <label>
              Latest CIBIL Score:
              <br />
              
              <input
                type="text"
                name="latestCIBILScore"
                placeholder='(If you know your past CIBIL or have recently checked the CIBIL then mention the last checked score.)'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Banking Password & Other Document's Password:
              <br />
              
              <input
                type="text"
                name="bankingPassAndOtherDocPass"
                placeholder='(If any of the customer documents has a password then please mention here)'
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <div className="form-group checkbox-group">
              <label className="label"><b>Which lender you want to choose:</b></label>
              <div className='checkbox-options'>
              {lenderOptions.map((lender, index) => (
    // Wrap each group of 6 lenders in its own div
            <div key={index} className={`checkbox-option ${index % 6 === 0 ? "new-row" : ""}`}>
          <input
           type="checkbox"
            id={`lender-${index}`}
        value={lender.toLowerCase()}
        checked={selectedLenders.includes(lender.toLowerCase())}
        onChange={handleLenderChange}
      />
      <label htmlFor={`lender-${index}`}>{lender}</label>
                </div>
              ))}
            </div>
            </div>
         
          <div className="form-group checkbox-group">
         <div className='checkbox-options'>
         {lenderOptions1.map((lender1, index) => (
  
        <div key={index} className={`checkbox-option ${index % 6 === 0 ? "new-row" : ""}`}>
       <input
        type="checkbox"
        id={`lender1-${index}`}
        value={lender1.toLowerCase()}
        checked={selectedLenders1.includes(lender1.toLowerCase())}
        onChange={handleLenderChange1}
      />
      <label htmlFor={`lender1-${index}`}>{lender1}
      </label>
                </div>
              ))}
            </div>
            </div>
            </div>
          <div className="form-group">
            <label>
              Remarks:
              <input
                type="text"
                name="remarks"
                onChange={handleInputChange}
              />
            </label>
          </div>
         
        </div>
        <button className="submit-btn" onClick={handleUpload}>Submit</button>
      </form>
      </div>
    </>
  );
}

export default UploadForm;
