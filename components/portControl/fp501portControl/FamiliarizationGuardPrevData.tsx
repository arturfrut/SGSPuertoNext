import { GuardInfo } from "@/app/hooks/useGuard101ByShip";
import { checkDateForChip } from "@/utils/daysUntilExpiration";
import { Chip, Spinner } from "@nextui-org/react";
import { FC } from "react";

interface FamiliarizationGuardInterface {
  loadingGuard: boolean;
  guardData: GuardInfo | null; // Aseguramos que puede ser null si no hay data
}

export const FamiliarizationGuardPrevData: FC<FamiliarizationGuardInterface> = ({
  loadingGuard,
  guardData,
}) => {
  return loadingGuard ? (
    <div className="flex items-center gap-8">
      <h1>Obteniendo información</h1>
      <Spinner />
    </div>
  ) : (
    <>
      {guardData ? (
        <>
        <h1 className="text-xl mb-4"> Estado de último documento guardado para este barco</h1>
        <div className="flex flex-col gap-4">
          <h1>
            Nombre: <span>{guardData.guard_name}</span>
          </h1>
          <h1>
            Fecha de carga de FP101 políticas:{" "}
            <span>{guardData.charged_date}</span>
          </h1>
          <h1>
            Fecha de vencimiento: <span>{guardData.expiration_date}</span>
          </h1>
          <h1>
            Estado de vencimiento:{" "}
            <span>
              <Chip color={checkDateForChip(guardData.expiration_date).color}>
                {checkDateForChip(guardData.expiration_date).text}
              </Chip>
            </span>
          </h1>
        </div>
        </>

      ) : (
        <h1>No se encontró información previa de este barco</h1>
      )}
    </>
  );
};