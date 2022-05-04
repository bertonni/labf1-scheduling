import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const options = ['Laboratório G1', 'Laboratório G2', 'Laboratório G3', 'Laboratório G4', 'Laboratório F1', 'Laboratório F2', 'Laboratório F3', 'Laboratório F4'];
const values = ['LAB-G1', 'LAB-G2', 'LAB-G3', 'LAB-G4', 'LAB-F1', 'LAB-F2', 'LAB-F3', 'LAB-F4'];

export default function LabSelect({ selectedLab, setSelectedLab, error, setError }) {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center", gap: 2, width: '100%', maxWidth: '500px', my: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" error={error}>Selecione o Laboratório *</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLab}
          label="Selecione o Laboratório"
          error={error}
          onBlur={() => {
            if (selectedLab === "") setError(true);
            else setError(false);
          }}
          onChange={(e) => {
            setSelectedLab(e.target.value);
            if (e.target.value !== "") setError(false);
            else setError(true);
          }}
        >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={values[index]}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={error}>{error ? 'Campo obrigatório' : ' '}</FormHelperText>
      </FormControl>
    </Box>
  )
}
