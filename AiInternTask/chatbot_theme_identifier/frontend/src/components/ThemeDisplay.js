import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const ThemeDisplay = ({ text }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LightbulbIcon sx={{ color: 'warning.main', fontSize: 28 }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          AI-Generated Insights
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(to bottom right, #fff9e6 0%, #ffffff 100%)'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '"""',
              position: 'absolute',
              top: -20,
              left: -10,
              fontSize: '4rem',
              color: 'warning.light',
              opacity: 0.3,
              fontFamily: 'Georgia, serif'
            }
          }}
        >
          <Typography
            component="div"
            sx={{
              whiteSpace: 'pre-wrap',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'text.primary',
              '& strong': {
                color: 'primary.main',
                fontWeight: 700
              }
            }}
          >
            {text}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', textAlign: 'right' }}>
          Generated using AI-powered semantic analysis
        </Typography>
      </Paper>
    </Box>
  );
};

export default ThemeDisplay;