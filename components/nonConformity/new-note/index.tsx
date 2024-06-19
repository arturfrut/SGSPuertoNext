"use client";
import ModalFR802 from "@/components/accidentreports/formReports/modalFR802";
import { ClockIcon } from "@/components/icons/clock-icon";
import { CrossIcon } from "@/components/icons/crossIcon";
import SignModal from "@/components/signModal";
import useSignModal from "@/components/signModal/useSignModal";
import { SignatureChecker } from "@/components/signatureChecker";
import {
  monthsSelect,
  noteClasification,
  noteStatus,
  shipOrCompany,
  yesNoSelect,
} from "@/constants/strings";
import { FR802Values } from "@/types/FR802";
import { getCurrentDateTime } from "@/utils/dateSelector";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

// TODO Preguntar que es NCN y de donde viene, preguntar si firma puede ir de otra forma, el emisor puede venir por bdd?, preguntar que es PD
// Como se genera NCN?

export const NewNote = (data: { status: string; ncn: number }) => {
  const dataMock = {
    dataAnterior: "Viene de bdd de una nota creada anteriormente",
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

    // --------------------------------------
    // --------------------------------------
    // --------------------------------------
    // --------------------------------------
    // --------------------------------------
    // --------------------------------------
    // --------------------------------------

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

  const { register, handleSubmit, setValue, watch } = useForm<FN801Values>();

  const onSubmit = (data: FR802Values) => {
    console.log(data);
  };

  const handleShipStatus = (e: { target: { value: string } }) => {
    setValue("shipStatus.shipStatus", e.target.value);
  };

  const handleShipOrCompany = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === 'buque' || value === 'empresa') {
      setValue('emisorType', value)
    } else {
      console.error('Valor no válido:', value)
    }
  }
  

  const shipStatusConditional =
    watch("shipStatus.shipStatus") === "Otras circunstancias";

  const HCValue = watch("HC.HC");

  const handleAccidentTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`accidentType.${e.target.name}`, e.target.checked);
  };

  const { signatures, handleSaveSignature } = useSignModal();

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
          <p className="text-xl">FN-802 NOTA DE NO CONFORMIDAD</p>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Divider />
        <CardBody>
          <div className="flex flex-col flex-wrap gap-4 w-full">
            <Breadcrumbs radius={"sm"} variant="solid" size="lg">
              {noteStatus.map((item, index) => (
                <BreadcrumbItem key={index} isCurrent={data.status === item}>
                  {item}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <p className="text-xl ">Creación de la nota</p>
          <p className="my-4"> NCN: {data.ncn}</p>
          <p>Título de la nota:</p>
          <Input
            className=" my-4 w-full"
            type="string"
            label="Uso para taarjeta identificatoria"
            {...register("title")}
          />
          <p className="my-4">Nombre:</p>
          <div className="md:flex md:align-items md:gap-4 ">
            <div className="md:w-1/2">
              <Input
                className="w-full"
                type="string"
                label="Nombre de Empresa/Buque"
                {...register("shipCcompanyName")}
              />
              {/* TODO: Arreglar margin en mobile */}
            </div>
            <RadioGroup
              name="shipStatus"
              onChange={handleShipOrCompany}
              className="md:w-1/2"
            >
              {shipOrCompany.map((option) => (
                <Radio key={`shipOrCompany-${option}`} value={option}>
                  {option}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          <div className="w-full md:flex md:gap-4">
            <div className="md:w-1/2">
              <p className="my-2">Emisor:</p>
              <Input
                className="w-full"
                type="string"
                label="Identidad del Emisor"
                {...register("accidentDescription.accidentPlace")}
              />
            </div>
            <div className="md:w-1/2">
              <p className="my-2">Fecha</p>
              <div className="flex w-full  flex-nowrap  gap-4">
                <Input
                  type="number"
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label="Año"
                  {...register("accidentDescription.accidentTime.year")}
                />

                <Select
                  label="Mes"
                  value={"Marzo"}
                  {...register("accidentDescription.accidentTime.month")}
                >
                  {monthsSelect.map((month) => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type="number"
                  max={31}
                  label="Día"
                  defaultValue={getCurrentDateTime().day}
                  {...register("accidentDescription.accidentTime.day")}
                />
              </div>
            </div>
          </div>
          <p className="my-4">Evidencia:</p>
          <Textarea
            {...register("accidentVerifications")}
            labelPlacement="outside"
            placeholder="Describa el porque de su nota de no conformidad"
          />
          <div className="w-full md:w-1/2 flex items-center gap-5 my-4">
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, "issuerSignature")
              }
              title="FIRMA DEL EMISOR"
            />
            <SignatureChecker status={signatures?.issuerSignature} />{" "}
          </div>
          <Button className="md:w-1/2 mb-4">Enviar </Button>
          <Divider />
          <p className="text-xl mt-4">Recepción</p>

          <p className="my-4">Clasificación:</p>
          <RadioGroup
            name="shipStatus"
            onChange={handleShipStatus}
            className="md:w-1/2"
          >
            {noteClasification.map((option) => (
              <Radio key={`shipOrCompany-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          <div className="w-full md:flex md:gap-4 mb-4">
            <div className="md:w-1/2">
              <p className="my-4">Fecha de entrega PD</p>
              <div className="flex w-full  flex-nowrap  gap-4">
                <Input
                  type="number"
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label="Año"
                  {...register("accidentDescription.accidentTime.year")}
                />

                <Select
                  label="Mes"
                  value={"Marzo"}
                  {...register("accidentDescription.accidentTime.month")}
                >
                  {monthsSelect.map((month) => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type="number"
                  max={31}
                  label="Día"
                  defaultValue={getCurrentDateTime().day}
                  {...register("accidentDescription.accidentTime.day")}
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="my-4">Fecha de salida PD</p>
              <div className="flex w-full  flex-nowrap  gap-4">
                <Input
                  type="number"
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label="Año"
                  {...register("accidentDescription.accidentTime.year")}
                />

                <Select
                  label="Mes"
                  value={"Marzo"}
                  {...register("accidentDescription.accidentTime.month")}
                >
                  {monthsSelect.map((month) => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type="number"
                  max={31}
                  label="Día"
                  defaultValue={getCurrentDateTime().day}
                  {...register("accidentDescription.accidentTime.day")}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center gap-5 my-4">
            <SignModal
              onSave={(data: any) =>
                handleSaveSignature(data, "issuerSignature")
              }
              title="FIRMA DEL EMISOR"
            />
            <SignatureChecker status={signatures?.issuerSignature} />
          </div>
          <Button className="md:w-1/2 mb-4">Enviar </Button>

          <Divider />
          <p className="text-xl mt-4">Acción:</p>

          <p className="my-4">Responsable de la acción correctiva:</p>
          <Input
            className="w-full"
            type="string"
            label="Nombre y apellido del responsable"
            {...register("accidentDescription.accidentPlace")}
          />
          <p className="my-4">Sector afectado</p>
          <Input
            className="w-full"
            type="string"
            label="Nombre del sector"
            {...register("accidentDescription.accidentPlace")}
          />

          <p className="my-4">Acción correctiva:</p>
          <Textarea
            {...register("accidentVerifications")}
            labelPlacement="outside"
            placeholder="Describa la acción"
          />
          <div className="md:w-1/2">
            <p className="my-4">Fecha implementación prevista</p>
            <div className="flex w-full  flex-nowrap  gap-4">
              <Input
                type="number"
                max={getCurrentDateTime().year + 2}
                // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                defaultValue={getCurrentDateTime().year}
                label="Año"
                {...register("accidentDescription.accidentTime.year")}
              />

              <Select
                label="Mes"
                value={"Marzo"}
                {...register("accidentDescription.accidentTime.month")}
              >
                {monthsSelect.map((month) => (
                  <SelectItem key={`monthsSelectId-${month}`} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </Select>
              {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
              {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
              <Input
                type="number"
                max={31}
                label="Día"
                defaultValue={getCurrentDateTime().day}
                {...register("accidentDescription.accidentTime.day")}
              />
            </div>
          </div>
          <p className="my-4">Cumplimiento</p>
          <div className="md:flex md:items-center md:flex-row-reverse md:gap-4">
            <div className="md:w-1/2">
              <RadioGroup
                name="shipStatus"
                onChange={handleShipStatus}
                className="md:w-1/2"
                value="No"
              >
                {/* TODO: ARREGLAR MARGIN */}
                {yesNoSelect.map((option) => (
                  <Radio key={`shipOrCompany-${option}`} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            <div className="md:w-1/2">
              <div className="flex w-full  flex-nowrap  gap-4">
                <Input
                  type="number"
                  max={getCurrentDateTime().year + 2}
                  // TODO: No funciona el Max, probar poniendolo como variable de renderizado
                  defaultValue={getCurrentDateTime().year}
                  label="Año"
                  {...register("accidentDescription.accidentTime.year")}
                />

                <Select
                  label="Mes"
                  value={"Marzo"}
                  {...register("accidentDescription.accidentTime.month")}
                >
                  {monthsSelect.map((month) => (
                    <SelectItem key={`monthsSelectId-${month}`} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
                {/* TODO: HACER FUNCIÓN PARA QUE TOME VALOR DEL MES ACTUAL POR DEFECTO */}
                {/* TODO: HACER FUNCIÓN PAR CANTIDAD MÁXIMA DE DÍAS Y QUE SE HABILITE DESPUES DE TENERUN DATO EN EL MES */}
                <Input
                  type="number"
                  max={31}
                  label="Día"
                  defaultValue={getCurrentDateTime().day}
                  {...register("accidentDescription.accidentTime.day")}
                />
              </div>
            </div>
          </div>
          <p className="my-4">Acción correctiva eficaz?</p>
          <RadioGroup
            name="shipStatus"
            onChange={handleShipStatus}
            className="md:w-1/2"
          >
            {/* TODO: ARREGLAR MARGIN */}
            {yesNoSelect.map((option) => (
              <Radio key={`shipOrCompany-${option}`} value={option}>
                {option}
              </Radio>
            ))}
          </RadioGroup>
          <p className="my-4">Observaciones:</p>
          <Textarea
            {...register("accidentVerifications")}
            labelPlacement="outside"
            placeholder="Describa la acción"
          />
          <div className="md:flex md:gap-5">
            <div className="w-full md:w-1/2 flex items-center gap-5">
              <SignModal
                onSave={(data: any) => handleSaveSignature(data, "ACSignature")}
                title="FIRMA RESPONSABLE DE LA A.C"
              />
              <SignatureChecker status={signatures?.ACSignature} />
            </div>
            <div className="w-full md:w-1/2 flex items-center gap-5">
              <SignModal
                onSave={(data: any) =>
                  handleSaveSignature(data, "sgsSignature")
                }
                title="FIRMA RESPONSABLE SGS"
              />
              <SignatureChecker status={signatures?.sgsSignature} />
            </div>
          </div>
        </CardBody>

        <Divider />
        <CardFooter className=" flex gap-3 justify-end">
          <ModalFR802 formData={watch()} />
          {/* TODO: EN V2 AGREGAR BOTÓN DE RESET EN FORMULARIOS */}
        </CardFooter>
      </form>
    </Card>
  );
};
