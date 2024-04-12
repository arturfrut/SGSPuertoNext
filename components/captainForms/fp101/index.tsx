import React from "react";
import { Textarea, Divider, Card, CardBody } from "@nextui-org/react";

// DIVIDER NO ENTIENDO
// CÓMO AJUSTAR CADA TEXTAREA PARA NO TENER QUE BAJAR CON LA RUEDITA
// POR QUÉ LAS 2 ÚLTIMAS ETIQUETAS "P" NO SE CENTRAN

export const Fp101 = () => {
  return (
    <Card className="w-full md:w-2/3 md:px-10 md:py-5">
      <CardBody>
        <Textarea
          label={
            <p className="text-3xl text-center">
              POLÍTICA DE SEGURIDAD, PROTECCIÓN AMBIENTAL, NO DISCRIMINACIÓN Y
              NO VIOLENCIA DE GÉNERO
            </p>
          }
          variant="bordered"
          placeholder={`AIRES MARINOS S.A. ha establecido un sistema de gestión de seguridad que cumple con las prescripciones: de la Ordenanza Nº 05/2018 DPSN TOMO 2 “Normas de Gestión de Seguridad Operacional de Buque y la Prevención de la Contaminación (NGS); que tiene por objeto garantizar la seguridad marítima, evitar lesiones personales o pérdidas de vidas humanas, daños al medio ambiente y a los bienes.
    Leyes N° 23.592 Penalización Actos discriminatorios y N°24.515 Creación del INADI.
    Para el logro y mantenimiento de los objetivos mencionados, la Compañía se compromete a:
          \n1. Operar con elevados estándares de seguridad.
          \n2. Tomar precauciones contra todos los riesgos posibles.
          \n3. Conformar la tripulación con personal idóneo y en buen estado físico.
          \n4. Brindar el adecuado adiestramiento a todo el personal, a fin de que puedan actuar eficientemente ante emergencias, accidentes y situaciones de peligro que afecten a la seguridad y al medio ambiente.
          \n5. Nos comprometemos a promover la integración social fomentando grupos de trabajos estables, seguros y justos, y que estén basados en la promoción y protección de todos los derechos humanos, así como en la no-discriminación, no violencia de género, la tolerancia, el respeto de la diversidad, la igualdad de oportunidad, la solidaridad, la seguridad y la participación de todas las personas. Con ese fin, en el plano Laboral de la Compañía. El cumplimiento de esta Política, así como también de las reglas, Normas y regulaciones aplicables; es responsabilidad de todos los integrantes de la Compañía.`}
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full max-w-full",
            input: "resize-none min-h-[620px] w-full text-xl",
          }}
        />
      </CardBody>
      <Divider />
      <CardBody>
        <Textarea
          label={
            <p className="text-3xl text-center">POLÍTICA DE ALCOHOL Y DROGAS</p>
          }
          variant="bordered"
          placeholder={`AIRES MARINOS S.A. considera que el consumo de alcohol y el consumo de drogas y otras sustancias similares, deteriora el desempeño en el trabajo y es una seria amenaza para la salud, la productividad y la seguridad de todo su personal y de la empresa".
Con el fin de evitar los riesgos mencionados, aplicamos la siguiente política, cuyo estricto cumplimiento es condición de empleo para todo su personal:
          \n\-Está terminantemente prohibido el consumo de alcohol, drogas, tenencia, distribución o venta de drogas ilegales o sustancias similares durante su actividad en el ámbito de trabajo.
          \n\-Tampoco está permitido distribuir o vender bebidas alcohólicas en las instalaciones de la Empresa.	
          \n\-Se podrán efectuar controles periódicos sin previo anuncio, para determinar la existencia y consumo de alcohol y/o drogas en los buques operados por la Compañía.
          \n\-Cuando existan causas  para sospechar consumo de alcohol y/o drogas, se podrá exigir al personal, que se someta a los análisis y a las pruebas de dosaje de esas sustancias.
          
El incumplimiento de esta política dará lugar a sanciones, incluyendo la finalización del vínculo laboral.
          `}
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full h-full max-w-full",
            input: "resize-none min-h-[540px] h-full text-xl",
          }}
        />
      </CardBody>
      <Divider />
      <CardBody>
        <Textarea
          label={<p className="text-3xl text-center">POLÍTICA DE FUMAR</p>}
          variant="bordered"
          placeholder={`AIRES MARINOS S.A.ha estudiado los antecedentes que demuestran los daños que la adicción de fumar produce a la salud de las personas fumadoras y no fumadoras, como consecuencia de la contaminación del aire del medio ambiente, especialmente en espacios cerrados produciendo en consecuencia enfermedades, disminución de la actitud física y de la vida de la misma. Además el acto de fumar es un posible foco de incendio, si las condiciones ambientales son favorables para que se produzcan, lo que constituye un riesgo identificado e inaceptable para la seguridad de las personas, la embarcación, los bienes y la prevención de la contaminación de medio ambiente. 
Con el fin de evitar los riesgos señalados como presidente de la compañía dispongo:
          \n\.Prohibido fumar a bordo de las embarcaciones a todas las personas que embarquen o cualquier otra persona que deba desarrollar, o no, alguna tarea a bordo, en los espacios comunes y cerrados. Así mismo no se objetara en los espacios al aire libre. 
          \n\.Prohibir fumar en la oficina de la Compañía, donde convivan fumadores y no fumadores  y en los lugares destinados a archivo o depósito de materiales en general. Así mismo no se objetara en los espacios al aire libre.`}
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full h-full max-w-full",
            input: "resize-none min-h-[400px] h-full text-xl",
          }}
        />
      </CardBody>
    </Card>
  );
};
