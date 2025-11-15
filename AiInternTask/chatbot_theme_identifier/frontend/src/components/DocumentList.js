import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Toolbar,
  Chip,
  Divider,
  InputAdornment
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import api from "../api";

const DocumentList = ({
  selected,
  setSelected,
  refreshTrigger,
  showFilter = true,      // always show filter in Drawer
}) => {
  const [docs, setDocs] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch docs whenever upload triggers a refresh
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/documents/");
        setDocs(data.documents);
        // by default select all
        setSelected(data.documents.map((d) => d.doc_id));
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    })();
  }, [refreshTrigger, setSelected]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  // apply filter to filename or doc_id
  const displayed = docs.filter(
    (d) =>
      d.filename.toLowerCase().includes(filter.toLowerCase()) ||
      d.doc_id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: 300,
        p: 2,
        overflowY: "auto",
        height: "calc(100vh - 64px)",
        bgcolor: '#fafafa'
      }}
    >
      <Toolbar />

      {showFilter && (
        <>
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <FolderIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography
              variant="h6"
              sx={{ mb: 0.5, fontWeight: 700, color: 'text.primary' }}
            >
              Knowledge Base
            </Typography>
            <Chip
              label={`${docs.length} document${docs.length !== 1 ? 's' : ''}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            size="small"
            placeholder="Search documents…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </>
      )}

      <List dense>
        {displayed.map((d) => (
          <ListItem key={d.doc_id} disablePadding>
            <ListItemButton onClick={() => toggle(d.doc_id)}>
              <Checkbox
                edge="start"
                checked={selected.includes(d.doc_id)}
                tabIndex={-1}
              />
              <ListItemText primary={d.filename} secondary={d.doc_id} />
            </ListItemButton>
          </ListItem>
        ))}
        {displayed.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No documents match your search
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
};

export default DocumentList;
