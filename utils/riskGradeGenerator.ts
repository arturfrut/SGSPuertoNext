import { RiskGrade } from "@/types/riskEvaluation";

export const riskGradeGenerator = (risk: number | null): RiskGrade => {
  risk = risk || 0;
  switch (true) {
    case risk === 0:
      return {
        color: "default",
        description: "Sin información ( ? )",
        action: "-",
      };
    case risk < 5:
      return {
        color: "success",
        description: `Riesgo Bajo (${risk})`,
        action: "Aplicar medidas normales de trabajo",
      };
    case risk >= 5 && risk <= 9:
      return {
        color: "warning",
        description: `Riesgo Moderado (${risk})`,
        action: "Aplicar medidas para reducir el riesgo",
      };
    case risk >= 10 && risk <= 16:
      return {
        color: "warning",
        description: `Riesgo Alto (${risk})`,
        action: "Aplicar medidas preventivas para reducir el riesgo",
      };
    case risk > 16:
      return {
        color: "danger",
        description: `Riesgo Muy Alto (${risk})`,
        action: "Se prohibe el trabajo para reducir el riesgo",
      };
    default:
      return {
        color: "default",
        description: "Sin información ( ? )",
        action: "-",
      };
  }
};
