import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import api from "../api";

const UploadPage = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setUploadMessage("");
  };

  const handleChooseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadMessage("⚠️ Please choose at least one file.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      setUploading(true);
      const response = await api.post("/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMessage("✅ Files uploaded and processed successfully!");
      if (onUploadSuccess) onUploadSuccess();
      console.log(response.data);
      setSelectedFiles([]); // reset after success
    } catch (error) {
      setUploadMessage("❌ Upload failed. Check console for details.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    return ext === 'pdf' ? <DescriptionIcon color="error" /> : <ImageIcon color="primary" />;
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 700,
        width: "100%",
        mx: "auto",
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
          Upload Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Upload PDFs or scanned images (.pdf, .png, .jpg, .jpeg)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip label="PDF" size="small" variant="outlined" />
          <Chip label="PNG" size="small" variant="outlined" />
          <Chip label="JPG" size="small" variant="outlined" />
          <Chip label="JPEG" size="small" variant="outlined" />
        </Box>
      </Box>

      {/* Hidden native file input */}
      <input
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Styled controls */}
      <Box
        sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={handleChooseClick}
          disabled={uploading}
          sx={{ minWidth: 140 }}
        >
          Choose Files
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
          sx={{ minWidth: 140 }}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </Box>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
            Selected Files ({selectedFiles.length})
          </Typography>
          <List
            dense
            sx={{
              maxHeight: 150,
              overflowY: "auto",
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {selectedFiles.map((file, idx) => (
              <ListItem key={idx} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getFileIcon(file.name)}
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024).toFixed(1)} KB`}
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {uploading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress sx={{ borderRadius: 1, height: 6 }} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            Processing documents...
          </Typography>
        </Box>
      )}

      {uploadMessage && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: uploadMessage.includes("✅") ? "success.light" : "error.light",
            border: '1px solid',
            borderColor: uploadMessage.includes("✅") ? "success.main" : "error.main"
          }}
        >
          <Typography
            align="center"
            sx={{
              color: uploadMessage.includes("✅") ? "success.dark" : "error.dark",
              fontWeight: 500
            }}
          >
            {uploadMessage}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default UploadPage;