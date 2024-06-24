export interface RiskChipProps {
  risk: RiskGrade;
}

export interface RiskGrade {
  color: "success" | "warning" | "danger" | "default" | "primary" | "secondary";
  description: string;
  action: string;
}

export interface TableRow {
  category: string;
  frecuency: string;
  description: string;
}

export interface TableData {
  tableHeaders: string[];
  rows: TableRow[];
}
export interface RiskData {
  riskNumber: number;
  riskDetail: string;
  probability: string | null;
  consequence: string | null;
  result: RiskGrade;
  actionRequired: boolean;
}

export type SetRiskData = React.Dispatch<React.SetStateAction<Partial<RiskData>>>
export interface RiskTableModalProps {
  title: string
  tableData: TableData
  riskData: RiskData
  setRiskData: SetRiskData
  riskProp: string
}