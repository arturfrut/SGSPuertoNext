import { Chip } from '@nextui-org/react';
import React from 'react';

interface RiskChipProps {
  risk: number;
}

interface RiskGrade {
  color: 'success' | 'warning' | 'danger' | 'default' | 'primary' | 'secondary';
  description: string;
  action: string;
}

const RiskChip: React.FC<RiskChipProps> = ({ risk }) => {

  const riskGradeGenerator = (risk: number): RiskGrade => {
    switch (true) {
      case risk < 5:
        return {
          color: 'success',
          description: `Riesgo Bajo (${risk})`,
          action: 'Aplicar medidas normales de trabajo',
        };
      case risk >= 5 && risk <= 9:
        return {
          color: 'warning',
          description: `Riesgo Moderado (${risk})`,
          action: 'Aplicar medidas para reducir el riesgo',
        };
      case risk >= 10 && risk <= 16:
        return {
          color: 'warning',
          description: `Riesgo Alto (${risk})`,
          action: 'Aplicar medidas preventivas para reducir el riesgo',
        };
      case risk > 16:
        return {
          color: 'danger',
          description: `Riesgo Muy Alto (${risk})`,
          action: 'Se prohibe el trabajo para reducir el riesgo',
        };
      default:
        return {
          color: 'default',
          description: 'Sin información ( ? )',
          action: '-',
        };
    }
  };

  const riskGrade = riskGradeGenerator(risk);

  return (
    <div className="flex items-center gap-4">
      <Chip color={riskGrade.color}>{riskGrade.description}</Chip>
      <p className="my-4">{riskGrade.action}</p>
    </div>
  );
};

export default RiskChip;