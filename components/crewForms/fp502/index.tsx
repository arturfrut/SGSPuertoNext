"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ModalToAddElement from "./ModalToAddElement";
import SignModal from "@/components/signModal";
import { SignatureChecker } from "@/components/signatureChecker";
import useSignModal from "@/components/signModal/useSignModal";

export const Fp502 = (data: { status: string; ncn: number }) => {
  const dataMock = {
    status: "Creación de la nota",
    ncn: 23,
  };
  data = dataMock;

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
    incidentClasification: "Grave" | "Moderado";
    PDDeliveryDate: {
      day: string;
      month: string;
      year: string;
    };
    PDOutDate: {
      day: string;
      month: string;
      year: string;
    };
    emisorSignReception: {
      hasSsigned: true;
      date: string;
    };
    responsibleName: string;
    afectedZone: string;
    correctiveAction: string;
    ActionOutDate: {
      day: string;
      month: string;
      year: string;
    };
    ActionCumpliment: {
      day: string;
      month: string;
      year: string;
    };
    observations: string;
    endNoteSign: {
      hasSsigned: true;
      date: string;
    };



    accidentDescription: {
      accidentTime: {
        year: number;
        month: string;
        day: number;
        hour: number;
        minute: number;
      };
      accidentPlace: string;
      LE?: string;
    };
    shipStatus: {
      shipStatus: string;
    };
    shipCondition: {
      [key: string]: boolean;
    };
    accidentType: {
      [key: string]: boolean;
    };
    weatherStatus: {
      windDirection: string;
      windPower: string;
      seaDirection: string;
      seaPower: string;
      seaCurrentDirection: string;
      seaCurrentPower: string;
      tideHeight: string;
    };
    witness: [];
    HC: {
      HC: string;
      HCType?: string;
      HCAmmount?: number;
      HCActions?: string;
    };
    accidentVerifications: string;
    accidentCaptainOpinion: string;
  };

  const { signatures, handleSaveSignature } = useSignModal();
  const { register, handleSubmit, setValue, watch } = useForm<FN801Values>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleShipStatus = (e: { target: { value: string } }) => {
    setValue("shipStatus.shipStatus", e.target.value);
  };

  const handleShipOrCompany = (e: {
    target: { value: "buque" | "empresa" };
  }) => {
    setValue("emisorType", e.target.value);
  };

  const shipStatusConditional =
    watch("shipStatus.shipStatus") === "Otras circunstancias";

  const HCValue = watch("HC.HC");

  const handleAccidentTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`accidentType.${e.target.name}`, e.target.checked);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProduct] = useState([
    {
      product: "Protector Facial",
      model: "Modelo1",
      brand: "Marca1",
      certified: true,
      amount: 50,
      date: "2024-04-17",
      crewSign: false,
      id: 1,
    },
    {
      product: "Protector auditivo",
      model: "Modelo2",
      brand: "Marca2",
      certified: false,
      amount: 30,
      date: "2024-04-17",
      crewSign: true,
      id: 2,
    },
    {
      product: "Zapato de seguridad",
      model: "Modelo3",
      brand: "Marca3",
      certified: true,
      amount: 100,
      date: "2024-04-17",
      crewSign: false,
      id: 3,
    },
    {
      product: "Casco",
      model: "Modelo4",
      brand: "Marca4",
      certified: true,
      amount: 80,
      date: "2024-04-17",
      crewSign: true,
      id: 4,
    },
    {
      product: "Chaleco salvavidas",
      model: "Modelo5",
      brand: "Marca5",
      certified: false,
      amount: 20,
      date: "2024-04-17",
      crewSign: false,
      id: 5,
    },
    {
      product: "Faja lumbar",
      model: "Modelo6",
      brand: "Marca6",
      certified: true,
      amount: 40,
      date: "2024-04-17",
      crewSign: true,
      id: 6,
    },
    {
      product: "Guantes",
      model: "Modelo7",
      brand: "Marca7",
      certified: true,
      amount: 60,
      date: "2024-04-17",
      crewSign: false,
      id: 7,
    },
  ]);

  const headers = [
    "Se entrega",
    "ID",
    "Producto",
    "Tipo/Modelo",
    "Marca",
    "Posee certificación",
    "Cantidad",
    "Fecha",
    "Firma del trabajador",
  ];

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
            FP - 502: CONSTANCIA DE ENTREGA DE ROPA DE TRABAJO Y ELEMENTOS DE
            PROTECCIÓN PERSONAL
          </p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />

        <CardBody>
          <p className="text-xl ">Datos de la empresa</p>
          <p className="my-4"> Razón social: de Bdd</p>
          <p className="my-4"> Cuit: de Bdd</p>
          <p className="my-4"> Dirección: de Bdd</p>
          <p className="my-4"> Localidad:de bdd</p>
          <Divider />
          <p className="text-xl my-4">Datos del tripulante</p>

          <p className="my-4"> Nombre: de petición</p>
          <p className="my-4"> DNI: de petición</p>
          <p className="my-4"> Breve reseña del puesto de trabajo</p>
          <Textarea
            {...register("accidentVerifications")}
            labelPlacement="outside"
            placeholder="Escriba aqui su reseña"
          />
          <Divider className="my-4" />
          <CardBody>
            <p className="text-xl my-4"> Lista de elementos recibidos</p>
            <p className=" my-4"> Toque el elemento para modificar</p>

            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                {headers.map((header, index) => (
                  <TableColumn key={index}>{header}</TableColumn>
                ))}
              </TableHeader>
              {/* Al "activar" un checkbox, automaticamente me debería dejar modificarlo abriendo el modal */}
              <TableBody emptyContent={'Sin productos agregados'}>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.product}</TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      {product.certified} <Checkbox />
                    </TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>{product.date}</TableCell>
                    <TableCell>
                      {product.crewSign} <Checkbox />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ModalToAddElement />
          </CardBody>
          <Divider />
          <p className="my-4"> Información adicional</p>
          <Textarea
            labelPlacement="outside"
            placeholder="Escriba aqui su reseña"
          />
          <div className="w-full my-4 md:w-1/2 flex items-center justify-center gap-5">
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, "witnessSignature")
              }
              title="FIRMA TRIPULANTE"
            />
            <SignatureChecker status={signatures?.witnessSignature} />
          </div>
        </CardBody>

        <Divider />
        <CardFooter className=" flex gap-3 justify-end">
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
          <Button>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
