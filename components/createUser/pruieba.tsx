'use client'
import { cardinalDirections, seaCurrentPower, seaPower, windPower } from "@/constants/strings";
import { crewListMock } from "@/mocks/crewListMock";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

export const CreateUseraaaaaa = () => {
  const crewList = crewListMock;

  return(<Card className="w-full md:w-2/3 md:px-10 md:py-5">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-xl">CREAR USUARIO</p>
        </div>
      </CardHeader>
      <form>
        <Divider className="mb-4" />
        <p className="text-xl ">Información general</p>
    {/* inputs medianos */}
        <div className="flex gap-4 ">
          <Input placeholder="ingrese latitud" />
          <Input placeholder="ingrese longitud" />
        </div>
    {/* inputs largos */}
        <p className="my-4"> Nro de servicio de alerta de P.N.A:</p>
        <Input placeholder="ingrese número" />
        <Divider className=" my-4" />
        <CardBody>
          <p className="text-xl mb-4">
            Condiciones hidrometeorológicas en la zona
          </p>


          <p className="my-2">Corriente </p>
          <div className="flex gap-4">
            <Select label="Fuerza">
              {seaCurrentPower.map((power) => (
                <SelectItem key={`seaCurrentPower-${power}`} value={power}>
                  {power}
                </SelectItem>
              ))}
            </Select>
            <Select label="Dirección">
              {cardinalDirections.map((direction) => (
                <SelectItem
                  key={`seaCurrentDirection-${direction}`}
                  value={direction}
                >
                  {direction}
                </SelectItem>
              ))}
            </Select>
          </div>
          <p className="my-4">Altura de la marea</p>
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">Mts</span>
              </div>
            }
            className="w-1/2"
            type="number"
            label="Ingrese altura"
          />
          <Divider className="my-4" />
          <p className="text-xl mb-4">Siga las siguientes acciones:</p>
          <Divider className="my-4" />
          <p className="mb-4"> Novedades / Información adicional</p>
          <Textarea
            labelPlacement="outside"
            placeholder="Escriba aqui su reseña"
          />
          <Divider className=" my-4" />
          <p className="mb-4">Encargado de dar la capacitación:</p>
          <Select label="Seleccione Tripulante" className="w-full my-4">
            {crewList.map(
              (
                member: { id: number; name: string; lastName: string },
                index: number
              ) => (
                <SelectItem key={member.id} value={index}>
                  {`${member.name} ${member.lastName}`}
                </SelectItem>
              )
            )}
          </Select>

        </CardBody>
        <Divider />
        <CardFooter className=" flex gap-3 justify-end">
          <Button>Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

