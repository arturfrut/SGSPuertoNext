"use client";
import { accidentTypes } from "@/constants/strings";
import { modalFr802 } from "@/mocks/modalFr802Mock";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalFR802({ formData: formData }: { formData: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formData1 = modalFr802;

  return (
    <>
      <Button color="warning" onPress={onOpen}>
        Enviar formulario
      </Button>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="">
                Usted esta por enviar el formulario FR-802
              </ModalHeader>
              <ModalBody>
                <div>
                  <p>
                    <strong>Tenga en cuenta que:</strong>
                  </p>
                  <ul className="pl-6">
                    <p>
                      Una vez que envíe el formulario FR-802 con su respectiva
                      información, no podrá realizar cambios en los datos
                      proporcionados. Asegúrese de revisar cuidadosamente su
                      información antes de proceder con el envío.
                    </p>
                  </ul>
                  <p className="mt-2 font-bold">Datos del formulario:</p>
                  <div>
                    <p>
                      <strong>Tipo de accidente:</strong>
                    </p>
                    <div>
                      {formData1.accidentType &&
                      Object.keys(formData1.accidentType).length > 0 ? (
                        Object.entries(formData1.accidentType)
                          .filter(([_, isSelected]) => isSelected)
                          .map(([accidentTypeName], index) => (
                            <p className="ml-6" key={index}>
                              {accidentTypeName}
                            </p>
                          ))
                      ) : (
                        <p className="ml-6">
                          No seleccionó ningún tipo de accidente.
                        </p>
                      )}
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <div>
                    <div className="ml-6">
                      <p>
                        <strong>Fecha: </strong>
                        {formData1.accidentDescription.accidentTime.day}/
                        {
                          formData1.accidentDescription.accidentTime.month.split(
                            "-"
                          )[1]
                        }
                        /{formData1.accidentDescription.accidentTime.year}
                      </p>
                      <p>
                        <strong>Hora: </strong>
                        {formData1.accidentDescription.accidentTime.hour}:
                        {formData1.accidentDescription.accidentTime.minute}
                      </p>
                      <p>
                        <strong>Lugar del accidente: </strong>
                        {formData1.accidentDescription.accidentPlace}
                      </p>
                      <p>
                        <strong>Tripulante L.E: </strong>
                        {formData1.accidentDescription.LE ? (
                          <span>{formData1.accidentDescription.LE}</span>
                        ) : (
                          <span>
                            No hay ningún tripulante involucrado en el
                            accidente.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <div>
                    <p>
                      <strong>Testigos: </strong>
                    </p>
                    {formData1.witness && formData1.witness.length ? (
                      formData1.witness.map((witness, index) => (
                        <p className="ml-6" key={index}>
                          {witness.name}
                        </p>
                      ))
                    ) : (
                      <p className="ml-6">No hay testigos</p>
                    )}
                  </div>
                  <Divider className="my-2" />
                  <div>
                    <strong>Condición del buque: </strong>
                    <div className="ml-6">
                      {Object.entries(formData1.shipCondition)
                        .filter(([_, value]) => value)
                        .map(([key], index) => (
                          <div key={index}>
                            {""}
                            {key}
                          </div>
                        ))}
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <div>
                    <p>
                      <strong>Condiciones hidrometeorológicas: </strong>
                    </p>
                    <div className="ml-6">
                      <p>
                        Fuerza del viento:{" "}
                        {formData1.weatherStatus.windPower.split("-")[1]}
                      </p>
                      <p>
                        Dirección del viento:{" "}
                        {formData1.weatherStatus.windDirection.split("-")[1]}
                      </p>
                      <p>
                        Fuerza del mar:{" "}
                        {formData1.weatherStatus.seaPower.split("-")[1]}
                      </p>
                      <p>
                        Dirección del mar:{" "}
                        {formData1.weatherStatus.seaDirection.split("-")[1]}
                      </p>
                      <p>
                        Fuerza de la corriente:{" "}
                        {formData1.weatherStatus.seaCurrentPower.split("-")[1]}
                      </p>
                      <p>
                        Dirección de la corriente:{" "}
                        {
                          formData1.weatherStatus.seaCurrentDirection.split(
                            "-"
                          )[1]
                        }
                      </p>
                      <p>
                        Altura de la marea: {formData1.weatherStatus.tideHeight}
                      </p>
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <div>
                    <p>
                      <strong>Derrame de hidrocarburos: </strong>
                    </p>
                    <div>
                      {formData1.HC.HC.includes("Si") ? (
                        <div>
                          <p>
                            <strong>Tipo de hidrocarburo: </strong>
                            {formData1.HC.HCType.split("-")[1]}
                          </p>
                          <p>
                            <strong>Cantidad derramada en litros: </strong>
                            {formData1.HC.HCAmmount}
                          </p>
                          <p>
                            <strong>Acciones tomadas: </strong>
                            {formData1.HC.HCActions}
                          </p>
                        </div>
                      ) : (
                        <p>No</p>
                      )}
                    </div>
                  </div>

                  <Divider className="my-2" />

                  <p>
                    <strong>
                      Verificaciones realizadas en el acontecimiento:{" "}
                    </strong>
                  </p>
                  <div className="ml-6">{formData1.accidentVerifications}.</div>
                  <Divider className="my-2" />
                  <p>
                    {" "}
                    <strong>
                      Opinión del capitán/compañía sobre las medidas correctivas
                      a aplicar:{" "}
                    </strong>
                    <div className="ml-6">
                      {formData1.accidentCaptainOpinion}.
                    </div>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Enviar formulario
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
