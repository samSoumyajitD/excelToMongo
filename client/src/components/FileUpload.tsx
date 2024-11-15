import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FileUpload.css';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select an Excel file');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/candidates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('File upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <h2 className="upload-title">Upload Candidate Data</h2>
      <form onSubmit={onSubmit} className="upload-form">
        <input type="file" accept=".xlsx, .xls" onChange={onFileChange} className="file-input" />
        <button type="submit" className="cssbuttons-io-button" disabled={loading}>
        <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg>
        <span>   {loading ? 'Uploading...' : 'Upload'}</span>
       
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
