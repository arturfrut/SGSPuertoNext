import { useEffect } from "react";
import useGlobalStore from "./useGlobalStore2";


const TripulacionPage = () => {
  const barcoSeleccionado = useGlobalStore((state) => state.barcoSeleccionado);

  useEffect(() => {
    if (barcoSeleccionado) {
      // Realizar la petición o actualización en base al barco seleccionado
      const fetchTripulacion = async () => {
        const response = await fetch(`/api/getTripulacion/${barcoSeleccionado.id}`);
        const tripulacionData = await response.json();
        console.log(tripulacionData);
      };

      fetchTripulacion();
    }
  }, [barcoSeleccionado]);

  return <div>Tripulación del barco seleccionado</div>;
};

export default TripulacionPage;