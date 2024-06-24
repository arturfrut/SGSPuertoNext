import { RiskChipProps } from '@/types/riskEvaluation';
import { Chip } from '@nextui-org/react';
import React from 'react';


const RiskChip: React.FC<RiskChipProps> = ({ risk }) => {
  return (
    <div className="flex items-center gap-4">
      <Chip color={risk.color}>{risk.description}</Chip>
      <p className="my-4">{risk.action}</p>
    </div>
  );
};

export default RiskChip;