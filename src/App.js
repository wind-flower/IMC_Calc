import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import Alert from '@mui/material/Alert';

function IMCCalculator() {
  const [weight, setWeight] = useState('55');
  const [height, setHeight] = useState('168');
  const [imc, setIMC] = useState(null);
  const [imcCategory, setIMCCategory] = useState('');
  const [weightRange, setWeightRange] = useState({min: '', max:''})
  const [imcRanges] = useState({
    underweight: { min: 0, max: 18.4, category: 'underweight' , spanish: 'Desnutrición', alert:'warning' },
    normal: { min: 18.5, max: 24.9, category: 'normal', spanish: 'Peso Normal' , alert:'success' },
    overweight: { min: 25, max: 29.9, category: 'overweight', spanish: 'Sobrepeso', alert:'warning'},
    obesity: { min: 30, max: 39.9, category: 'obesity', spanish: 'Obesidad', alert:'warning' },
    severeObesity: { min: 40, max: Infinity, category: 'severeObesity' , spanish: 'Obesidad Severa', alert:'warning'},
  });

  const calculateIMC = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedIMC = (weight / (heightInMeters ** 2)).toFixed(2);
      setIMC(calculatedIMC);

      for (const range in imcRanges) {
        if (calculatedIMC >= imcRanges[range].min && calculatedIMC <= imcRanges[range].max) {
          setIMCCategory(imcRanges[range].category);
          break;
        }
      }
    }
    calculateNormalWeight();
  };
const calculateNormalWeight = () => {
  const heightInMeters = height / 100;
    const calculatedWeightMax = (24.9 * (heightInMeters ** 2)).toFixed(2);
    const calculatedWeightMin = ( 18.5 * (heightInMeters ** 2)).toFixed(2);
    setWeightRange({ min: parseFloat(calculatedWeightMin), max: parseFloat(calculatedWeightMax) });
};
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4">Calculadora de IMC</Typography>
      <TextField
        label="Peso (kg)"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Altura (cm)"
        value={height}
        onChange={e => setHeight(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button  
      color="primary"
      size="large"
      endIcon={<MonitorWeightIcon />}
      variant="outlined" onClick={calculateIMC} sx={{ mt: 3 }} >
        Calcular IMC
      </Button>

      {imc && (
     <Alert sx={{ mt: 2 }} severity={imcRanges[imcCategory].category === "normal" ? "success" : "warning"}>
         <Typography sx={{ mt: 3 }}>Tu IMC es: {imc}</Typography>
         <Typography sx={{ mt: 1 }}>Categoría: {imcRanges[imcCategory].spanish}</Typography>
      </Alert>
       
      )}
      {imcCategory && imcRanges[imcCategory] && (
        <Typography sx={{ mt: 1 }}>
          Rango IMC Normal: {imcRanges["normal"].min} - {imcRanges["normal"].max}
        </Typography>
      )}
      {imcCategory && imcRanges[imcCategory] && weightRange && (
        <Typography sx={{ mt: 1 }}>
          Rango de Peso Normal: {weightRange.min}Kg - {weightRange.max}Kg
        </Typography>
      )}
    </Box>
  );
}




export default IMCCalculator;
