import { riskGradeGenerator } from "@/utils/riskGradeGenerator";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { tableConsecuent } from "./AddRiskModal";

export const useRiskEvaluation = () => {
  const [tablesData, setTablesData] = useState({
    firstEvaluation: {
      risks: [],
    },
    secondEvaluation: {
      preventions: [],
    },
  });

  const generateSecondTable = () => {
    const risksWithAction = tablesData.firstEvaluation.risks.filter(
      (risk) => risk.actionRequired
    );
    const risksWithActionRequired = risksWithAction.map((risk) => ({
      ...risk,
      preventionAction: null,
    }));

    setTablesData((prevState) => ({
      ...prevState,
      secondEvaluation: {
        ...prevState.secondEvaluation,
        preventions: [
          ...prevState.secondEvaluation.preventions,
          ...risksWithActionRequired,
        ],
      },
    }));

    !risksWithAction.length && alert("No es necesario tomar acciones!");
  };
  return {
    generateSecondTable,
    tablesData,
    setTablesData,
  };
};

export const useRiskTableModal = (tableData, riskProp, setRiskData) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleRowAction = (key: number, onClose: () => void) => {
    const selectedCategory = tableData.rows[key - 1].category;

    setRiskData((prevRiskData) => {
      const updatedRiskData = {
        ...prevRiskData,
        [riskProp]: selectedCategory,
      };

      const riskMultiplier =
        updatedRiskData.probability && updatedRiskData.consequence
          ? Number(updatedRiskData.probability) *
            Number(updatedRiskData.consequence)
          : 0;

      return {
        ...updatedRiskData,
        result: riskGradeGenerator(riskMultiplier),
        actionRequired: riskMultiplier > 5,
      };
    });

    onClose();
  };
  return {
    isOpen,
    onOpen,
    onOpenChange,
    handleRowAction,
  };
};

export const useAddRiskModal = (setTablesData, prevRiskData) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const initialValue = {
    riskNumber: prevRiskData?.firstEvaluation.risks.length || 1,
    riskDetail: "",
    probability: 0,
    consequence: 0,
    result: {
      color: "default",
      description: "Sin información ( ? )",
      action: "",
    },
    actionRequired: false,
  };

  const [riskData, setRiskData] = useState(initialValue);

  const createRow = (onClose: () => void) => {
    setTablesData({
      ...prevRiskData,
      firstEvaluation: {
        risks: [
          ...prevRiskData.firstEvaluation.risks,
          {
            ...riskData,
            consequence:
              tableConsecuent.rows[riskData.consequence - 1].frecuency,
            probability:
              tableConsecuent.rows[riskData.consequence - 1].frecuency,
          },
        ],
      },
    });
    setRiskData(initialValue);
    onClose();
  };
  return {
    isOpen,
    onOpen,
    onOpenChange,
    createRow,
    riskData,
    setRiskData,
  };
};
