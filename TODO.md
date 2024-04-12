Cambiar nombre a manual en descargas

Testigo: tiene que tomar data de la bdd de la tripulación, y puede no haber

En accidentes: Puede haber accidentes abiertos o antiguos, se deben poder ver con el detalle de adminitrador, y cambiar el nombre de la pestaña a accidentes

Capitan y jefe de maquina puede tener carga de firma, el resto no

Capacitaciones tiene que aparecer TAMBIEN en tripulantes, y accidente en caso de haber estado de testigo

Datos de capitán 
  Firma (cargada)
  Nombre completo
  Habilitación (Tiene fecha de vencimiento) (La tiene que cargar con la carga de libretas)
  DNI
  Numero de libreta
  Datos de la libreta (Tiene carga manual, en v2 ia)

Equipo puede ser Material o reparación, y se van a ingresar de a una. A cada una hay que hacerle seguimiento

Solapa equipo cambia nombre a mantenimiento

  Tiene que haber otro tipo de usuario que UNICAMENTE tiene acceso a Mantenimiento, 
  Tiene que tener acceso a barcos: cada uno con reportes de cada barco 
  Tiene que haber pedidos DESDE el barco, que le lleguen a la empresa, tienen 3 estados: Solicitud Enviada    /   En proceso :Solicitudad aceptada o rechazada / Finalizado (solicitud rechazada, reparado o provisto segun sea material o arreglo) 

Tiene otro tipo de usuario que es el jefe de máquinas:

  Tiene acceso solo a equipos 






FT-105-1: Lo llena administrador (Angel)
  Retiro en servicio es el nombre de la pestaña para llenar el ft105
  Nombre tripulante: No tiene relación con bdd
  Este va en sección de usuario "empresa o administrador" y puede ser un tripulante marinero o no. Bdd va a tomar empleados de empresa y guarda el buque relacionado a la empresa

FC-01 - Control de equipos criticos: 
  Tiene vencimiento mensual, esta relacionado al barco, si hay observación va en otro color, otro estado es efectuar u ok, el ideal es que esto tenga un link a mantenimiento de "crear petición", debe aparecer un cartel que diga que no se puede navegar sin equipo critico en caso de ignorarlo (IMPORTANTE)

FC-101 - CONTROL DE VENCIMIENTO:
  Toma datos de bdd de cada tripulante (puede ser capitan)
  Tiene dos partes, agregar uno por uno los tripulantes ( en pestaña tripulantes)
  revisión se va
  V.a: Verificaciòn anual va fecha
  Verificación intermedia: va fecha
  Vencimiento final: va fecha
  Cada elemento debería tener una imagen asociada
  Puedo agregar elemento al final de la tabla

  PISTOLA LANZA CABO Tacho
  PISTOLA LANZA CABO Cohete 
  PISTOLA LANZA CABO Iniciadores - No obligatorio

  Los que dicen Nº se tiene q poder agregar el nro

  C.N.S.N Nº hasta este 2° II  RADIO es un solo documento (imagen)

FORMULARIO FN-801 NOTA DE NO CONFORMIDAD:
  Corresponde pestaña aparte y debería haber una sección de notas de no conformidad abiertas

  Lo puede llenar capitan o jefe de maquina
  Ver despues El proceso va en Administrador

FORMULARIO FP-101 POLITICAS
  Solo firma del tripulante (data viene del tripulante)


FORMULARIO FP-501 FAMILIARIZACION
  Es para todos los tripulantes:
    Lleva dos firmas, la del capacitado y el capacitador 

  FORMULARIO FP-503 CAPACITACION:
  Tema tratado:
  Conclusión: 

  y firmas

FORMULARIO FR-101 REMITO DOCUMENTO   NO EXISTE MAS


FORMULARIO FR-701 EVALUACION Y PREVENCION DE RIESGO:
  Riesgos se agregan de a uno
  Probabilidad son un input de selección con los detalles de las tablas
    Revisar valores de tablas, si aparecen valores continua o no, lleva cartel IMPORTANTE
    Si al llenar segundo formulario sale verde: cartel de okey. Si sale rojo cartel de no debe hacer este trabajo, debería hacerlo en puerto (Conectar a pedir mantenimiento). y aparte dejar advertencia

FORMULARIO PC-201 ENTREGA Y RECEPCION DE COMANDO CAPITAN
  EN v2 tomar data de bdd para toma de barco con mas detalle

FORMULARIO PC-201-1 ENTREGA Y RECEPCION DE COMANDO MAQUINAS
    EN v2 tomar data de bdd para toma de barco con mas detalle

FORMULARIOS FR-802 REPORTE DE ACCIDENTE

  TIPO DE ACONTECIMIENTO pueden ser varios
  TESTIGO/S : es tripulante

  CONDICIÓN DEL BUQUE: solo una opción, o agregar

  CONDICIONES HIDROMETEOROLOGICAS

  Sector viento son puntos cardinales 
  Fuerza del uno al 5

  Mar igual que anterior

  Corriente igual

  Marea
  Mtrs

  Derrame de Hidrocarburos  Tipo: aceite, aceite hidraulico, combustible, grasa, lodos 
  Cumplimiento del PLANACON: si / no
  

FORMULARIOS MAQUINAS FB-102 REGISTRO MANTENIMIENTO MOTORES
  Necesita que vengan datos obligatoriamente de administrador

FR-101 REMITO DE DOCUMNTACION (1) NO SE USA MAS

FR-83 FORMULARIO ALERTA METEOROLOGICO 
  En v2 llega alerta
  1-Control totalidad cierres estancos lleva checkbox

  punto 4 en v2 se iria si avisa solo

   en punto 6SI: (realizar FR-802) lleva ahi
  Firma  Responsable SGS Eso debería llegar desde admin

  En administrador deberían estar las alertas sin revisar

FP-502 RECIBO ELEMENTOS P.P.
  Nada es obligatorio, a menos que se complete un dato de una fila
  En v2 llenar según posición 

  FR-101 REMITO DE DOCUMNTACION (1) NO VA

FT 105-1 CONTROL BUQUE RETIRADO DE SERVICIO
  esto va desde usuario "gerente técnico" verloen proxima reunión

FT-102,103,104 REG MAT. A27 KYOKKO RUA estan todos abajo
    TODO PARA PESTAÑA Jefe de maquina y gerente tecnico

MGC CAP. 11.1 Formulario Auditorìa FA-112
  Solo administrador para proxima reunión

RZ-06 REG. ZAFARARNCHOS Y EJERCICIOS SE VA







  Observaciones no obligatorio



  

