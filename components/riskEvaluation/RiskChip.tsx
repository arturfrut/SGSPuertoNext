import { Chip } from '@nextui-org/react';
import React from 'react';

interface RiskChipProps {
  risk: RiskGrade;
}

interface RiskGrade {
  color: 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'secondary';
  description: string;
  action: string;
}

const RiskChip: React.FC<RiskChipProps> = ({ risk }) => {
  
  return (
    <div className="flex items-center gap-4">
      <Chip color={risk.color}>{risk.description}</Chip>
      <p className="my-4">{risk.action}</p>
    </div>
  );
};

export default RiskChip;