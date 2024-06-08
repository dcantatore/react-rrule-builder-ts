import React from 'react';
import Button from '@mui/material/Button';

interface RRuleGeneratorProps {
  label: string;
}

const RRuleGenerator = ({ label }: RRuleGeneratorProps) => {
  return <Button variant="contained">{label}</Button>;
};

export default RRuleGenerator;
