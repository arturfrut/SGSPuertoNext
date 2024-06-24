// CONSTANTS FOR formReports

export const cardinalDirections = ["Norte", "Sur", "Este", "Oeste"];
export const windPower = ["1", "2", "3", "4", "5"];
export const seaPower = ["1", "2", "3", "4", "5"];
export const seaCurrentPower = ["1", "2", "3", "4", "5"];
export const hydrocarbonsTypes = [
  "Aceite",
  "Aceite hidraúlico",
  "Combustible",
  "Grasa",
  "Lodos",
];
export const yesNoSelect = ["Si", "No"];

export const accidentTypes = [
  "Daños al buque",
  "Daños a terceros",
  "Daños al medio ambiente",
  "Hecho potencialmente peligroso",
  "Accidente personal grave/leve",
];

export const monthsSelect = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const shipCondition = ["Calado proa", "Calado popa", "Fondeado"];

export const shipStatusRadios = [
  "En navegación",
  "Maniobra puerto",
  "Alijo",
  "Carga/descarga",
  "Otras circunstancias",
];

export const shipOrCompany = ["Buque", "Empresa"];

export const noteClasification = ["Grave", "Moderado"];

export const noteStatus = [
  "Creación de la nota",
  "Recepción",
  "Acción",
  "Aceptación",
  "Finalizada",
];

export const riskEvaluationStatus = [
  "Primera evaluación de riesgos",
  "Segunda evaluación de riesgos",
];

export const riskTableHeaders = [
  "Riesgo",
  "Detalle",
  "Probabilidad",
  "Consecuencia",
  "Resultado",
  "Requiere medidas",
];

export const preventionTableHeaders = [
  "Riesgo",
  "Detalle",
  "Medida a realizar",
  "Probabilidad",
  "Consecuencia",
  "Resultado",
  "Requiere medidas",
];

export const tableConsecuent = {
  tableHeaders: ["CATEGORÍA", "NIVEL DE DAÑO", "DESCRIPCIÓN"],
  rows: [
    {
      category: "1",
      frecuency: "Nulo",
      description:
        "No hay posibilidad de daños o enfermedades a las personas que ejecutan el trabajo",
    },
    {
      category: "2",
      frecuency: "Bajo",
      description:
        "Cuando las posibilidad de daños o enfermedades son remotas, se aplicaran medidas de control de riesgo como prevención de daños",
    },
    {
      category: "3",
      frecuency: "Moderado",
      description:
        "Cuando existe la posibilidad de un daño personal o enfermedad para los ejecutores del trabajo pero las medidas de control de riesgo son suficientes para evitar un accidente",
    },
    {
      category: "4",
      frecuency: "Alto",
      description:
        "Cuando exista la posibilidad de daños personales y enfermedades pero reduciendo el nivel de riesgo reducimos el nivel de daños",
    },
    {
      category: "5",
      frecuency: "Muy alto",
      description:
        "Cuando existe la posibilidad de daños personales, enfermedades o perdidas de vida, se prohibirá la realización del trabajo",
    },
  ],
};

export const tableProbability = {
  tableHeaders: ["CATEGORÍA", "FRECUENCIA", "DESCRIPCIÓN"],
  rows: [
    {
      category: "1",
      frecuency: "Improbable",
      description: "Es virtualmente improbable o irreal",
    },
    {
      category: "2",
      frecuency: "Remota",
      description: "No se espera que ocurra",
    },
    {
      category: "3",
      frecuency: "Poco frecuente",
      description: "Ocurre rara vez",
    },
    {
      category: "4",
      frecuency: "Probable",
      description: "Ocurre al menos una vez cada diez años",
    },
    {
      category: "5",
      frecuency: "Frecuente",
      description: "Ocurre varias veces al año",
    },
  ],
};
