import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const SearchBar = ({ onSearch, searching = false }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
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
        <AutoAwesomeIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
          Ask a Question
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ask any question about your uploaded documents in natural language
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, alignItems: 'flex-start' }}
      >
        <TextField
          fullWidth
          label="Type your question here..."
          placeholder="e.g., What are the main themes discussed in these documents?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={searching}
          multiline
          maxRows={3}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              '&:hover': {
                '& > fieldset': {
                  borderColor: 'primary.main',
                }
              }
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={searching || !query.trim()}
          startIcon={searching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          sx={{
            minWidth: 120,
            height: 56,
            fontWeight: 600
          }}
        >
          {searching ? 'Searching...' : 'Search'}
        </Button>
      </Box>

      {searching && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: 'block', textAlign: 'center', fontStyle: 'italic' }}
        >
          Analyzing documents and generating insights...
        </Typography>
      )}
    </Paper>
  );
};

export default SearchBar;