import React, { useState, useEffect, useRef } from 'react';
import API from '../services/api';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Trash2, 
  AlertCircle, 
  Loader2, 
  FileCheck,
  RefreshCw,
  Info
} from 'lucide-react';

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingResume, setExistingResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch current user's uploaded resume metadata on component mount
  useEffect(() => {
    fetchResumeMetadata();
  }, []);

  const fetchResumeMetadata = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await API.get('/resume');
      if (res.data.success && res.data.hasResume) {
        setExistingResume(res.data.resumeDetails);
      } else {
        setExistingResume(null);
      }
    } catch (error) {
      console.error('[Fetch Resume Error]', error);
      setErrorMessage(error.response?.data?.message || 'Failed to load existing resume metadata.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format bytes to human-readable size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper to format ISO date string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const validateFile = (file) => {
    if (!file) return false;

    const allowedExtensions = ['.pdf', '.docx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(ext)) {
      setErrorMessage('Invalid file type! Please select a PDF (.pdf) or Word (.docx) document.');
      return false;
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10MB limit. Please select a smaller file.');
      return false;
    }

    return true;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setErrorMessage('');
    setSuccessMessage('');
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    setErrorMessage('');
    setSuccessMessage('');

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select or drop a PDF/DOCX file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const res = await API.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (res.data.success) {
        setSuccessMessage('Resume uploaded and stored successfully!');
        setExistingResume(res.data.resumeDetails);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('[Upload Error]', error);
      const msg = error.response?.data?.message || 'Failed to upload resume. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your stored resume?')) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await API.delete('/resume');
      if (res.data.success) {
        setSuccessMessage('Resume deleted successfully.');
        setExistingResume(null);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('[Delete Error]', error);
      setErrorMessage(error.response?.data?.message || 'Failed to delete resume.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Resume Storage & Management
          </h1>
          <p className="text-sm text-slate-400">
            Upload your PDF or DOCX resume to power career analytics & skill extraction.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="glass-card p-12 rounded-2xl text-center flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-sm text-slate-400">Loading stored resume metadata...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Box Component */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                {existingResume ? 'Replace Resume File' : 'Upload Resume File'}
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Supported formats: <strong className="text-slate-200">PDF (.pdf)</strong> or <strong className="text-slate-200">Word (.docx)</strong> up to 10MB.
              </p>

              {/* Drag & Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                    : selectedFile
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-slate-700/80 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-900/60'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-white break-all">{selectedFile.name}</p>
                    <p className="text-xs text-emerald-400 font-medium">
                      {formatFileSize(selectedFile.size)} • Ready to upload
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Drag and drop your resume file here
                      </p>
                      <p className="text-xs text-slate-400 mt-1">or click to browse from device</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div>
              {isUploading && (
                <div className="mb-4 space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-bg transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full py-3 px-4 rounded-xl font-bold text-white gradient-bg shadow-lg shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading File ({uploadProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5" />
                    <span>{existingResume ? 'Upload & Replace Resume' : 'Upload Resume'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Current Resume Metadata Display */}
          <div className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span>Stored Resume Details</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                  {existingResume ? 'Active Document' : 'No Document'}
                </span>
              </h2>

              {existingResume ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate">
                          {existingResume.originalName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {existingResume.fileType.includes('pdf') ? 'PDF Document' : 'Word Document (.docx)'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block">File Size:</span>
                        <span className="font-semibold text-slate-200">
                          {formatFileSize(existingResume.fileSize)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Uploaded On:</span>
                        <span className="font-semibold text-slate-200">
                          {formatDate(existingResume.uploadedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-indigo-300 flex items-start space-x-2.5">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Resume metadata is linked to your account. In Step 9 and Step 10, the NLP engine will extract technical skills and project details from this document.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-xl border border-dashed border-slate-800 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800/60 text-slate-500 flex items-center justify-center mx-auto">
                    <FileText className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-300">No Resume Uploaded Yet</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Upload your PDF or DOCX resume to unlock career pathway predictions and skill-gap recommendations.
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            {existingResume && (
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={fetchResumeMetadata}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-all flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Resume</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
