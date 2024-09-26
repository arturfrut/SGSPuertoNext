"use client";
import ModalFR802 from "@/components/accidentreports/formReports/modalFR802";
// import { CheckIcon } from "@/components/icons/checkIcon";
// import { CrossIcon } from "@/components/icons/crossIcon";
import SignModal from "@/components/signModal";
import useSignModal from "@/components/signModal/useSignModal";
import { SignatureChecker } from "@/components/signatureChecker";
import { fc501Themes } from "@/constants/formsLists";
// import { dateGeratorWithFormat } from "@/utils/dateFormat";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

export const Fp501 = () => {
  const dataMock = {
    dataAnterior: "Viene de bdd de una nota creada anteriormente",
    status: "Creación de la nota",
    ncn: 23,
  };
  const data = dataMock;

  type FN801Values = {
    title: string;
    ncn?: number;
    status: string;
    emisorName: string;
    emisorType: "buque" | "empresa";
    shipCcompanyName: string;
    noteCreationDate: {
      day: string;
      month: string;
      year: string;
    };
    evidence: string;
    emisorSignCreation?: {
      hasSsigned: true;
      date: string;
    };
  };

  const { signatures, handleSaveSignature } = useSignModal();
  const { register, handleSubmit, watch } = useForm<FN801Values>();

  const onSubmit = (data: FN801Values) => {
    console.log(data);
  };

  return (
    <Card className="w-full md:w-2/3 md:px-10 md:py-5">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-xl">
            FP - 501: Instrucciones de familiarización para tripulantes
          </p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <p className="mb-4"> Nombre del tripulante: Nombre de BDD</p>
          <p className="mb-4"> Libreta de embarque: Nro deBDD</p>
          {/* <p className="mb-4"> Fecha: {dateGeratorWithFormat()}</p> */}
          <Divider />
          <p className="my-4">
            Las presentes instrucciones, son obligatorias para todos aquellos
            nuevos tripulantes de las embarcaciones de la compañía, y las mismas
            deben ser cumplimentadas obligatoriamente por cada uno de ellos.
          </p>
        </CardBody>
        <Divider />
        <CardBody>
          <div className="bg-gray-700 rounded-lg p-2 md:grid md:grid-cols-2">
            <p>Tema</p>
            <p className="flex justify-center">Cumplimiento</p>
            {/* Centrar bien  */}
          </div>
          {fc501Themes.map((theme, index) => (
            <div
              key={index}
              className={`rounded-lg p-2 grid md:grid-cols-2 ${
                index % 2 === 0 && "bg-gray-800"
              } `}
            >
              <p>{theme}</p>
              <div className="flex justify-center">
                <Checkbox />
              </div>
            </div>
          ))}
        </CardBody>
        <CardBody className="flex gap-4">
          <div className="w-full md:w-1/2 flex items-center gap-5">
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, "witnessSignature")
              }
              title="FIRMA TRIPULANTE"
            />
            <SignatureChecker status={signatures?.witnessSignature} />
          </div>
          <div className="w-full md:w-1/2 flex items-center gap-5">
            <SignModal
              onSave={(data: any) => handleSaveSignature(data, "sgsSignature")}
              title="FIRMA RESPONSABLE SGS"
            />
            <SignatureChecker status={signatures?.sgsSignature} />
          </div>
        </CardBody>
        <CardFooter className=" flex gap-3 justify-end">
          <ModalFR802 formData={watch()} />
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
        </CardFooter>
      </form>
    </Card>
  );
};
