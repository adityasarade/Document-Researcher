import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Typography,
  Box,
  Chip
} from "@mui/material";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const ResultsTable = ({ rows }) => (
  <Box sx={{ mt: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <FindInPageIcon color="primary" />
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Search Results
      </Typography>
      <Chip label={`${rows.length} result${rows.length !== 1 ? 's' : ''}`} size="small" color="primary" />
    </Box>

    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'primary.main',
              '& .MuiTableCell-head': {
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem'
              }
            }}
          >
            <TableCell sx={{ width: '20%' }}>Document ID</TableCell>
            <TableCell sx={{ width: '60%' }}>Extracted Answer</TableCell>
            <TableCell sx={{ width: '20%' }}>Citation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow
              key={i}
              sx={{
                '&:nth-of-type(odd)': {
                  bgcolor: 'action.hover',
                },
                '&:hover': {
                  bgcolor: 'action.selected',
                },
                transition: 'background-color 0.2s'
              }}
            >
              <TableCell sx={{ fontWeight: 500, fontSize: '0.85rem', color: 'primary.main' }}>
                {r["Document ID"]}
              </TableCell>
              <TableCell sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                {r["Extracted Answer"]}
              </TableCell>
              <TableCell sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'text.secondary' }}>
                {r["Citation"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default ResultsTable;