export interface OptionTranslation {
  label: string;
  why: string;
  prepare?: string;
}

interface NodeTranslation {
  keepInMind: string[];
  options: OptionTranslation[];
}

type PersonaTranslations = Record<string, NodeTranslation>;

export const nextStepTranslations: Record<'sofia' | 'daniel', PersonaTranslations> = {
  sofia: {
    // TODO: Spanish review — Sofia, node a.
    a: {
      keepInMind: [
        'La solicitud de ayuda financiera va primero: los programas estatales, incluida la exención de cuotas, dependen de la FAFSA o CADAA. Los community colleges recomiendan solicitar ayuda antes de inscribirse.',
        'California ahora espera que cada estudiante de último año de preparatoria complete la FAFSA o CADAA, a menos que la familia opte por no hacerlo. Es posible que la escuela de Sofia ya tenga un proceso.',
        'La lista de Ohlone: la FAFSA abre el 1 de octubre, la fecha prioritaria de Cal Grant es el 2 de marzo, el código escolar es 004481 y hay que volver a solicitar cada año.'
      ],
      options: [
        { label: 'Presentar la FAFSA o la Solicitud del California Dream Act', why: 'Es el primer paso para Pell Grant, Cal Grant, la exención de cuotas y la mayoría de la ayuda del campus. Podría calificar aunque su familia nunca haya solicitado ayuda.', prepare: 'FSA ID del estudiante y de uno de sus padres (FAFSA) o cuenta de CSAC (CADAA); información de impuestos de 2024 o datos de ingresos' },
        { label: 'Preguntar en su preparatoria sobre el requisito de completar la FAFSA/CADAA', why: 'Con el requisito All In, las preparatorias deben confirmar que cada estudiante de último año completó una solicitud de ayuda o decidió no presentarla. Su consejero o centro de carreras puede ayudarle.' },
        { label: 'Solicitar ingreso a Ohlone College (el community college más cercano a Fremont)', why: 'Cualquier graduado de preparatoria de California puede solicitar ingreso. Ohlone tiene un proceso de ayuda de siete pasos y otorga automáticamente la exención de cuotas según la FAFSA/CADAA.' }
      ]
    },
    // TODO: Spanish review — Sofia, node b.
    b: {
      keepInMind: [
        'Es común no tener una decisión todavía: el 36 por ciento de las personas adultas que fueron a la universidad elegiría otro campo si pudiera empezar de nuevo.',
        'No use California CareerZone. Se está retirando y será reemplazado por California Career Studio en otoño de 2026. Use O*NET hasta que el nuevo sitio esté disponible.',
        'Los programas de salud suelen tener costos extra, como uniformes, exámenes y materiales. Pregunte por clases con materiales de costo cero.'
      ],
      options: [
        { label: 'Hacer gratis el Perfil de Intereses O*NET', why: 'Tiene 30 o 60 preguntas, es gratis y está en inglés o español. Relaciona sus intereses con más de 900 ocupaciones para convertir una idea como “biología, quizá salud” en una lista breve de trabajos.' },
        { label: 'Estar pendiente del lanzamiento de California Career Studio', why: 'Será la herramienta oficial de California para explorar carreras cuando reemplace a CareerZone.' },
        { label: 'Preguntar a un consejero sobre una ruta de salud o STEM en el colegio', why: 'Los community colleges agrupan las especialidades en rutas. Puede empezar con cursos generales de ciencias que cuentan para varias carreras de salud mientras decide.' }
      ]
    },
    // TODO: Spanish review — Sofia, node c.
    c: {
      keepInMind: [
        '“Gratis” significa que se exime la cuota de inscripción de $46 por unidad si califica. Los libros, la comida, la renta y el transporte son gastos aparte y requieren una solicitud FAFSA/CADAA.',
        'Los estudiantes de colegios públicos de California gastan unos $938 al año en materiales. Las rutas de materiales de costo cero ahorraron $32.9 millones a estudiantes de community colleges en 2024-25.',
        'Cada community college de California tiene un Centro de Necesidades Básicas; 136,868 estudiantes lo usaron en otoño de 2024.',
        'La cercanía (46%) y el costo (39%) son las dos razones principales por las que las personas adultas eligen dónde estudiar. “Cerca y no muy caro” es un buen primer filtro.'
      ],
      options: [
        { label: 'Revisar si califica para California College Promise Grant (exención de cuotas)', why: 'Exime la cuota de inscripción de $46 por unidad a residentes elegibles de California y estudiantes AB 540. Completar la FAFSA/CADAA permite que lo consideren. Mantenga un promedio de 2.0 y complete más de la mitad de sus unidades para conservarla.' },
        { label: 'Solicitar Ohlone Promise Scholarship (estudiantes de último año de preparatorias públicas de Tri-City)', why: 'La financia una donación y puede cubrir matrícula, libros y cuotas de hasta 60 unidades durante dos años. Podría calificar con promedio de 2.0, FAFSA o CADAA presentada, una carta de recomendación y dos ensayos breves. Para conservarla, debe tomar 15 unidades por semestre y reunirse con un consejero.', prepare: 'Carta de recomendación de un director, maestro o consejero; dos ensayos; confirmación de FAFSA/CADAA' },
        { label: 'Comparar los programas Promise del condado de Santa Clara si prefiere estudiar en San José', why: 'San José Promise 60 (SJCC) cubre matrícula, cuotas, libros y un pase VTA. First 2 Free (EVC) cubre solo la matrícula. Ambos requieren que sea estudiante nuevo de tiempo completo y mantenga un promedio de 2.0.' },
        { label: 'Preguntar al Centro de Necesidades Básicas por comida, transporte y ayuda de emergencia', why: 'El centro de Ohlone ayuda con CalFresh, distribuye alimentos, ofrece orientación individual y acepta solicitudes de ayuda de emergencia de hasta $500. Ha ayudado a casi 4,000 hogares.' }
      ]
    },
    // TODO: Spanish review — Sofia, node f.
    f: {
      keepInMind: [
        'Un Associate Degree for Transfer puede dar prioridad de admisión al sistema CSU, no específicamente a SJSU. SJSU tiene admisión competitiva en todas las especialidades y clasifica a quienes se transfieren por promedio.',
        'SJSU suma 0.25 al promedio de transferencias “locales” que completan la mayoría de sus unidades en un colegio del condado de Santa Clara o Santa Cruz. Ohlone está en Alameda County, así que no cuenta como local para SJSU.',
        'UC TAG incluye seis campus, pero no Berkeley, UCLA ni San Diego. Presente la solicitud del 1 al 30 de septiembre del año anterior a la transferencia.',
        'Cal Grant Transfer Entitlement requiere un promedio de 2.4 en el community college y tener menos de 28 años.'
      ],
      options: [
        { label: 'Elegir pronto una especialidad Associate Degree for Transfer (AA-T/AS-T)', why: 'Con 60 unidades y promedio de 2.0, un ADT puede dar consideración prioritaria en el sistema CSU, entrada como estudiante de tercer año y una ruta para terminar una licenciatura en 60 unidades más. SJSU da consideración prioritaria a quienes tienen ADT en una especialidad similar.' },
        { label: 'Firmar un acuerdo CSU Transfer Success Pathway para elegir un campus y especialidad', why: 'A diferencia del ADT, TSP puede garantizar un lugar en un campus y especialidad específicos de CSU si cumple el acuerdo en tres años. Está disponible para estudiantes nuevos de community college.' },
        { label: 'Si su meta es SJSU, planear las unidades en un colegio del condado de Santa Clara', why: 'Las reglas de admisión competitiva de SJSU suman 0.25 al promedio si completa la mayoría de las unidades transferibles en Santa Clara o Santa Cruz County (De Anza, Mission, SJCC, EVC, Foothill, West Valley, Gavilan o Cabrillo).' },
        { label: 'Presentar UC Transfer Admission Guarantee si su meta es una UC', why: 'Seis campus UC garantizan admisión a estudiantes de community college que cumplen los requisitos de promedio y cursos. Necesita 30 unidades transferibles a UC al presentar la solicitud y 60 para la primavera antes de transferirse.' }
      ]
    },
    // TODO: Spanish review — Sofia, node d.
    d: {
      keepInMind: [
        'Presente una solicitud, no las dos. FAFSA: ciudadanos, residentes permanentes, personas con visa T y otros no ciudadanos elegibles. CADAA: personas indocumentadas, DACA vigente o vencido, visa U, TPS, AB 540 y familias de estatus mixto que prefieren no presentar FAFSA.',
        'WhatSack debe mostrar ambas listas y dejar que usted elija; nunca debe deducir su situación migratoria.',
        'Cal Grant A requiere promedio de preparatoria de 3.0; Cal Grant B requiere 2.0. La fecha límite de community college es el 2 de septiembre y las escuelas suelen enviar el promedio electrónicamente.',
        '“Promise Grant” puede referirse a dos cosas: la exención estatal de cuotas (mantenga promedio de 2.0) y los programas Promise locales (estudiante nuevo de tiempo completo).'
      ],
      options: [
        { label: 'Decidir entre FAFSA y CADAA con la lista de elegibilidad de CSAC', why: 'Los dos formularios permiten solicitar la misma ayuda estatal. Elegir el correcto ayuda a evitar que rechacen la solicitud y protege la información familiar.' },
        { label: 'Asistir a un taller gratis de Cash for College para recibir ayuda en persona', why: 'El personal capacitado ayuda a las familias a completar la FAFSA o CADAA paso a paso. Esta ayuda práctica puede aumentar la cantidad de solicitudes completadas y las inscripciones.', prepare: 'Identificaciones/FSA ID del estudiante y de sus padres, número de Seguro Social o información de cuenta CSAC, declaraciones de impuestos de 2024 o datos de ingresos' },
        { label: 'Confirmar que enviaron su promedio para Cal Grant', why: 'Las preparatorias y colegios suelen enviar los promedios electrónicamente, pero si falta puede perder Cal Grant. Verifique su cuenta WebGrants 4 Students.' },
        { label: 'Solicitar EOPS después de inscribirse', why: 'EOPS ofrece consejería, vales para libros, subvenciones e inscripción prioritaria a estudiantes de bajos ingresos, de primera generación o con barreras educativas. Ohlone acepta a estudiantes indocumentados.' }
      ]
    },
    // TODO: Spanish review — Sofia, node e.
    e: {
      keepInMind: [
        'La pérdida de empleo cuenta como una “circunstancia financiera especial”. El ajuste se solicita en la oficina de ayuda financiera del colegio, no en el formulario FAFSA.',
        'La decisión de criterio profesional de la escuela es final y no se puede apelar ante el Departamento de Educación.',
        'La pérdida de empleo también puede hacer que el hogar califique para CalFresh o CalWORKs. CalWORKs, SSI/SSP o General Assistance pueden dar acceso automático a la exención de cuotas por el Método A.'
      ],
      options: [
        { label: 'Presentar la FAFSA/CADAA con la información disponible y luego pedir una revisión por circunstancias especiales', why: 'El formulario pide ingresos del año anterior, así que un despido en 2026 no aparecerá. Con documentación, la oficina de ayuda financiera puede volver a calcular la ayuda usando los ingresos actuales.', prepare: 'Aviso de despido o carta de beneficios de EDD, talones de pago recientes y una explicación breve por escrito' },
        { label: 'Revisar si el hogar ahora califica para CalFresh', why: 'Un ingreso familiar menor podría permitir recibir beneficios mensuales para alimentos. Los estudiantes tienen reglas propias y los Centros de Necesidades Básicas del campus ayudan con la solicitud.' },
        { label: 'Volver a revisar si califica para la exención de cuotas por el Método A', why: 'Si después del despido su familia recibe CalWORKs, SSI/SSP o General Assistance, podría recibir California College Promise Grant sin una prueba de ingresos.' }
      ]
    },
    // TODO: Spanish review — Sofia, node g.
    g: {
      keepInMind: [
        'En California hay 464 estudiantes por cada consejero escolar. No basta con decir “pregunte a su consejero”; mencione a las personas cuyo trabajo es ayudar con esto.',
        'El 31 por ciento de estudiantes de EOPS obtiene un título de asociado y el 22 por ciento obtiene un título y se transfiere, frente al 12 por ciento de estudiantes comparables.',
        'El asistente de mensajes de Georgia State todavía dirigió alrededor del 13.5 por ciento de los mensajes al personal. WhatSack siempre debe ofrecer ayuda de una persona.'
      ],
      options: [
        { label: 'Reservar un taller gratuito y bilingüe de Cash for College', why: 'Voluntarios capacitados ayudan individualmente con FAFSA/CADAA, de octubre a junio, en persona y en línea.' },
        { label: 'Unirse a un programa de primer año que reúne varios apoyos', why: 'First Year Experience de Evergreen Valley ofrece la exención de cuotas, una subvención de $500, inscripción prioritaria y préstamo de libros si presenta FAFSA/CADAA. EOPS de Ohlone ofrece consejería, vales para libros y ayuda con la transferencia.' },
        { label: 'Llamar a la línea de ayuda de CSAC para preguntas sobre ayuda financiera', why: 'El personal estatal responde preguntas directamente sobre FAFSA, CADAA y Cal Grant.' },
        { label: 'Preguntar en Dreamer o EOPS del campus si le preocupa la situación migratoria', why: 'San José City College publica un contacto de EOPS/Dreamer. Ohlone tiene Servicios de Apoyo Dreamers y una guía de solicitud AB 540.' }
      ]
    },
    // TODO: Spanish review — Sofia, node h.
    h: {
      keepInMind: [
        'Entre el 10 y el 40 por ciento de quienes planean ir al colegio no se inscribe en otoño; la cifra es alrededor del 40 por ciento para quienes planean ir a un community college.',
        'Los recordatorios para tareas concretas redujeron la pérdida de inscripción en 21 por ciento en Georgia State. Una lista con fechas ayuda.',
        'La exención de cuotas y la beca Promise dependen de completar FAFSA/CADAA; Promise también requiere inscribirse de tiempo completo.'
      ],
      options: [
        { label: 'Confirmar la oferta de ayuda financiera y resolver cualquier retención de verificación', why: 'Los colegios suelen pedir documentos adicionales por correo electrónico, como declaraciones de impuestos, certificados de agencias o expedientes. Si no responde, la ayuda se demora y podrían cancelar su inscripción por falta de pago.', prepare: 'Transcripción de impuestos del IRS o declaración firmada, certificado de la agencia si recibe beneficios públicos y expedientes académicos anteriores' },
        { label: 'Completar la orientación, ubicación y su primer plan educativo', why: 'La mayoría de los colegios lo requiere antes de dar inscripción prioritaria. La reunión con el consejero también cumple las reglas de la beca Promise.' },
        { label: 'Enviar su expediente final de preparatoria', why: 'Se necesita para verificar el promedio de Cal Grant, la elegibilidad de Promise y la ubicación en cursos.' },
        { label: 'Planear el costo de libros y buscar cursos de materiales de costo cero', why: 'Los materiales cuestan alrededor de $938 al año. Los cursos ZTC y el vale para libros de EOPS pueden cubrir gran parte del costo.' }
      ]
    },
    // TODO: Spanish review — Sofia, node x.
    x: {
      keepInMind: [
        'Cada community college de California financia un Centro de Necesidades Básicas para ayudar con comida, vivienda, transporte, tecnología y cuidado infantil.',
        'Este es un puente entre la ruta universitaria y la categoría de comida de WhatSack, incluida la situación de CalFresh de Maria.'
      ],
      options: [
        { label: 'Reservar una cita para orientación sobre necesidades básicas', why: 'El equipo ofrece ayuda individual no clínica para encontrar comida, vivienda, transporte, higiene, salud y fondos de emergencia. En Ohlone hay una persona coordinadora y un pasante con maestría en trabajo social.' },
        { label: 'Solicitar CalFresh en unos 10 minutos', why: 'Un hogar estudiantil de una persona podría recibir hasta $281 al mes para alimentos si sus ingresos son menores al 200 por ciento del nivel de pobreza y cumple una exención para estudiantes.' }
      ]
    }
  },
  daniel: {
    // TODO: Spanish review — Daniel, node a.
    a: {
      keepInMind: [
        'Pregunte primero por la ciudad: NOVAworks (Sunnyvale) y work2future (San José) son los dos Centros de Empleo de Estados Unidos en Santa Clara County y atienden zonas distintas.',
        'Informe pronto que le interesan California Training Benefits; el plazo de 16 semanas empieza con su primer pago de beneficios.',
        'EDD no paga matrícula, cuotas, libros ni transporte. El financiamiento puede venir de centros de empleo, ayuda financiera o programas del empleador.'
      ],
      options: [
        { label: 'Asistir a una orientación de work2future (San José / Gilroy)', why: 'Es el primer paso requerido para capacitación financiada por WIOA. Una carta de despido o documentos de desempleo pueden servir como comprobante. Hay más de 150 programas de certificados con proveedores de capacitación.', prepare: 'Carta de despido o documentos de EDD, identificación, autorización de trabajo y currículum' },
        { label: 'Registrarse en NOVAworks (Sunnyvale) si vive en el norte del condado', why: 'Ofrece evaluación, orientación laboral, un plan de capacitación y un número limitado de becas estatales para proveedores aprobados. También ayuda a solicitar CTB.' }
      ]
    },
    // TODO: Spanish review — Daniel, node b.
    b: {
      keepInMind: [
        'Con la aprobación de CTB puede seguir recibiendo beneficios durante una capacitación aprobada y no tiene que buscar ni aceptar trabajo.',
        'Debe avisar a EDD que le interesa CTB antes de su semana 16 de pagos para que consideren una extensión de capacitación.',
        'La capacitación organizada por usted debe ser de tiempo completo (unas 20 horas por semana o 12 unidades), con un proveedor acreditado o aprobado, en un campo con demanda y terminarse en 24 meses. Puede ser en línea.'
      ],
      options: [
        { label: 'Avisar ahora a EDD que le interesa CTB', why: 'Así empieza el proceso para considerar una extensión de capacitación. Puede hacerlo en UI Online bajo School or Training → California Training Benefits, por teléfono o en un AJCC.', prepare: 'Ocupación de capacitación o meta profesional; proveedor previsto y fechas' },
        { label: 'Informar la fecha de inicio de capacitación durante la semana que comienza', why: 'EDD enviará por correo la solicitud CTB (DE 3100T), que debe devolverse dentro de 10 días de la fecha de envío, o programará una entrevista telefónica. La aprobación llega como Notice of Determination (DE 1080).', prepare: 'Fechas y horario de asistencia, descansos, ocupación de capacitación e información de la escuela' },
        { label: 'Leer la hoja de consejos CTB (DE 2332) antes de elegir un programa', why: 'Resume en cuatro pasos cómo calificar, qué capacitación puede aprobarse y qué debe tener listo para la entrevista.' }
      ]
    },
    // TODO: Spanish review — Daniel, node c.
    c: {
      keepInMind: [
        'Si asiste a capacitación WIOA por medio de un centro de empleo, el centro informa su asistencia a EDD y el programa suele estar aprobado de antemano para CTB.',
        'Los certificados de community college todavía pueden calificar para la exención de cuotas y Cal Grant C. Las clases sin crédito de Ohlone no cuestan matrícula y se pueden repetir.',
        'Las personas adultas que dejaron sus estudios suelen dar prioridad a horarios flexibles y a terminar rápido (47 por ciento para cada opción).'
      ],
      options: [
        { label: 'Preguntar en el centro de empleo por una beca WIOA para capacitación', why: 'Cubre la matrícula de programas en la lista estatal de proveedores aprobados. Después de la orientación, puede comprobar su situación con una carta de despido o documentos de desempleo.' },
        { label: 'Usar cursos gratuitos de certificados en línea de NOVAworks', why: 'NOVAworks ofrece acceso a IBM SkillsBuild y LinkedIn Learning para personas que buscan empleo. Puede estudiar tecnología mientras organiza un programa financiado.' },
        { label: 'Presentar FAFSA/CADAA para un certificado de community college', why: 'Las personas adultas pueden calificar para la exención de cuotas y Cal Grant C (capacitación técnica). Las clases sin crédito de Ohlone no cuestan matrícula y se pueden repetir.' }
      ]
    },
    // TODO: Spanish review — Daniel, node d.
    d: {
      keepInMind: [
        'Hay clases nocturnas y en línea, pero estudiar medio tiempo por cuenta propia quizá no califique para CTB, que requiere unas 20 horas semanales o 12 unidades. Los programas aprobados por centros de empleo tienen sus propias reglas de horario.',
        'La capacitación en línea puede aprobarse para CTB si cumple los requisitos de su tipo de programa.',
        'En una encuesta de California de 2026, el 53 por ciento de las personas interesadas dijo que los horarios de clase eran una barrera muy importante y el 43 por ciento mencionó sus responsabilidades laborales.'
      ],
      options: [
        { label: 'Preguntar al asesor de AJCC qué programas nocturnos o en línea están aprobados para CTB', why: 'Los asesores saben qué proveedores de ETPL tienen clases nocturnas y cumplen la definición de tiempo completo de EDD.' },
        { label: 'Si no tiene aprobación CTB, seguir certificando que está disponible para trabajar', why: 'Puede estudiar mientras recibe beneficios, pero debe seguir disponible para trabajar, buscar empleo activamente y aceptar trabajo cada semana.' }
      ]
    },
    // TODO: Spanish review — Daniel, node e.
    e: {
      keepInMind: [
        'Cada respuesta para Daniel debe terminar con una persona identificada: un asesor laboral de un America’s Job Center.',
        'El caso de EDD de 2026 muestra el orden: evaluación, orientación laboral, plan de capacitación y luego solicitud de CTB.'
      ],
      options: [
        { label: 'Reservar una cita con un asesor laboral después de la orientación', why: 'Los asesores revisan si puede calificar, buscan programas financiados y coordinan CTB con EDD. Lleve preguntas sobre duración, horario, costo y empleo.', prepare: 'Currículum, carta de despido y lista de ocupaciones meta del Perfil de Intereses O*NET' },
        { label: 'Hacer el Perfil de Intereses O*NET antes de la reunión', why: 'Le da al asesor una lista inicial de ocupaciones. Es gratis, tiene 30 o 60 preguntas y está en inglés o español.' }
      ]
    },
    // TODO: Spanish review — Daniel, node x.
    x: {
      keepInMind: [
        'Una reducción del ingreso familiar podría permitir que la familia califique para CalFresh. Si Daniel se inscribe en un community college, el Centro de Necesidades Básicas puede ayudar con la solicitud y la ayuda de emergencia.',
        'Recibir CalWORKs o General Assistance puede dar acceso automático a la exención de cuotas por el Método A.'
      ],
      options: [
        { label: 'Solicitar CalFresh para el hogar', why: 'Los hogares de bajos ingresos pueden recibir beneficios mensuales para alimentos. La solicitud en línea toma unos 10 minutos y los centros del campus ayudan a estudiantes con las reglas de exención.' },
        { label: 'Preguntar en el colegio por EOPS/CARE/CalWORKs', why: 'Si la familia recibe CalWORKs, los programas CalWORKs del campus pueden ofrecer subvenciones, ayuda para cuidado infantil y consejería a estudiantes en capacitación laboral.' }
      ]
    }
  }
};
