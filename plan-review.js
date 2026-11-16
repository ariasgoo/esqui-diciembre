(() => {
  "use strict";

  const grandMassif = [
    "Grand Massif · aperturas y aparcamientos de invierno",
    "https://www.grand-massif.com/ouverture-domaine/",
  ];
  const tarifs = [
    "Grand Massif · alcance y precio de cada forfait",
    "https://www.grand-massif.com/offres-ski/tarifs-forfaits-ski/",
  ];
  const skiSpa = [
    "Hôtel Alpina · spa incluido con el chalet",
    "https://www.hotelalpina.fr/fr/fleur-des-alpes.html",
  ];
  const saunaTurns =
    "En la sauna caben cuatro. Para los siete hacen falta dos turnos de 30 minutos a 5 € cada uno.";
  const studentPass =
    "El precio estudiante exige carné vigente y dos pases de un día comprados en la taquilla de Orelle.";
  const chaletFeatures =
    "160 m² para los siete, con chimenea, dos baños y jacuzzi privado.";
  const openingVillages =
    "Morillon y Sixt prevén abrir el 19 de diciembre, una semana después del viaje.";

  const byId = {
    cenis: {
      pros: [
        "La noche en Modane sale a 13,57 € por persona, en un apartamento con tres dormitorios.",
        "El forfait de 49 € incluye los dos días de esquí, las actividades y el concierto del sábado.",
      ],
      cons: [
        "El evento abre parte del dominio. Desde Ecla son unas 2 h 30 hasta Vieux Moulin y el pase se recoge el sábado por la mañana.",
        "El alquiler presupuestado se recoge en Orelle. El apartamento pide llevar sábanas y toallas.",
      ],
    },
    loft: {
      pros: [
        "Es la casa más barata de las cotizadas para siete con el forfait de Avoriaz: 22,86 € por persona y tres dormitorios.",
        "Podéis añadir la sauna municipal de Morzine por 12–16 € por persona.",
      ],
      cons: [
        "Desde el centro de Cluses son unos 40 min en coche hasta el teleférico de Les Prodains.",
        "La sauna está en otro pueblo y el centro pide reserva para grupos.",
      ],
    },
    chalet: {
      pros: [
        chaletFeatures,
        "Con el mismo forfait y material que el loft de Cluses, el chalet cuesta 11,86 € más por persona.",
      ],
      cons: [
        "Las pistas a 1,5 km son de Les Carroz. Para usar este forfait hay unos 50 min en coche hasta Les Prodains desde el centro de Arâches.",
      ],
    },
    orelle: {
      pros: [
        "La noche para siete cuesta 95 € y el acceso de Orelle queda a unos 15 min en coche desde Modane.",
        "Con carné de estudiante, las dos jornadas salen 39,80 € más baratas por persona que el forfait adulto.",
      ],
      cons: [
        studentPass,
        "Se vuelve al valle en telecabina y el apartamento pide llevar sábanas y toallas.",
      ],
    },
    turche: {
      pros: [
        "Siete plazas y dos baños. El precio visto para la noche equivalía a 35,14 € por persona.",
        "Desde Les Gets se llega a Les Prodains en unos 20 min en coche.",
      ],
      cons: [
        "Los 246 € eran una tarifa anterior, sin reembolso y sujeta a aceptación del anfitrión.",
        "El remonte a seis minutos a pie es el de La Turche, en un dominio distinto al del forfait de Avoriaz.",
      ],
    },
    wahou: {
      pros: [
        "Una cama para cada amigo entre los dos apartamentos de la casa.",
        "Unos 30 min en coche desde la casa hasta Les Prodains.",
      ],
      cons: [
        "Dormir cuesta 47,43 € por persona, frente a 22,86 € en el loft de Cluses con el mismo forfait.",
      ],
    },
    grinza: {
      pros: [
        "Dos baños, sábanas y toallas incluidas para los siete.",
        "El acceso del festival queda a unos 10 min en coche desde Termignon, frente a media hora desde Modane.",
      ],
      cons: [
        "El anuncio prevé estrenar el dúplex el 11 de diciembre y mostraba fotos provisionales.",
        "El precio del equipo corresponde a recogida en Orelle. Alquilar en la propia estación requiere otra cotización.",
      ],
    },
    carroz: {
      pros: [
        "La noche sale a 16,43 € por persona y la cinta de acceso está a 80 m del hotel.",
        "El pase Villages permite salir del sector de iniciación y explorar las pistas abiertas de Les Carroz y Samoëns.",
      ],
      cons: [openingVillages, saunaTurns],
      links: [grandMassif, tarifs],
    },
    "carroz-inicio": {
      pros: [
        "Forfait de 28 € al día para aprender y cinta de acceso a 80 m del hotel.",
        "Tenéis sauna en el alojamiento y la habitación familiar sale a 16,43 € por persona.",
      ],
      cons: [
        "El pase se limita a los remontes de iniciación. Les Carroz prevé abrir el mismo sábado 12.",
        saunaTurns,
      ],
      links: [grandMassif, tarifs],
    },
    flaine: {
      pros: [
        "Flaine prevé abrir el 5 de diciembre, una semana antes de vuestra llegada.",
        "La habitación de Les Carroz cuesta 115 € entre los siete y el hotel tiene sauna.",
      ],
      cons: [
        "El forfait cubre Flaine. Entre el hotel de Les Carroz y Flaine Forum hay unos 20 min en coche.",
        "El aparcamiento P2 de Flaine es de pago y queda fuera del presupuesto.",
      ],
      links: [grandMassif],
    },
    cosy: {
      pros: [
        "Salida y regreso con esquís desde la residencia cuando la pista de acceso está abierta.",
        "Los 210 € por persona del paquete para seis incluyen la noche y ambos días de forfait.",
      ],
      cons: [
        "La oferta desaparecía al buscar para siete. El material y el posible suplemento de casco van aparte.",
        "La residencia anuncia spa de pago. Falta confirmar el acceso de este apartamento privado.",
      ],
    },
    cheval: {
      pros: [
        "Paquete desde 185 € por persona para seis, unos 25 € menos que Cosy para el mismo dominio.",
        "La residencia está a pie de pista y a unos cuatro minutos a pie del aparcamiento P2.",
      ],
      cons: [
        "La oferta es para seis y el alquiler de material se paga aparte.",
        "El acceso desde el guardaesquís depende de la unidad. En algunos apartamentos hay que rodear el edificio.",
      ],
    },
    fleur: {
      pros: [
        "Apartamento con balcón y dos baños. El chalet incluye acceso al spa del Hôtel Alpina, con sauna y jacuzzi.",
      ],
      cons: [
        "Los 241 € correspondían a seis. Para siete, el calendario del alojamiento solo admitía salidas el sábado 12.",
        "El spa queda a 900 m y el acceso de Avoriaz a unos 20 min en coche.",
      ],
      links: [skiSpa],
    },
    ancolie: {
      pros: [
        "Capacidad declarada para ocho, dos baños y camas preparadas al llegar.",
        "Incluye acceso al spa compartido del Hôtel Alpina, a 900 m del apartamento.",
      ],
      cons: [
        "El calendario consultado solo permitía salidas el sábado 12. Falta una tarifa para esa noche.",
        "La limpieza final figura como suplemento.",
      ],
      links: [skiSpa],
    },
    saintmichel: {
      pros: [
        "La oferta incluía desayuno y tres habitaciones. La telecabina de Orelle está a unos seis minutos en coche.",
      ],
      cons: [
        "Los 222 € correspondían a seis personas. Falta precio para alojar a siete.",
        studentPass,
      ],
    },
    "four-seasons": {
      pros: [
        "Tres dormitorios, terraza y cocina equipada para raclette o fondue por 36,71 € la noche por persona.",
      ],
      cons: [
        "Para esquiar en Avoriaz hay unos 30 min en coche hasta Les Prodains. El anuncio menciona otro acceso a cinco minutos sin identificar el remonte.",
      ],
    },
    lesgets50: {
      pros: [
        "Siete plazas con sábanas y toallas incluidas.",
        "Les Prodains queda a unos 20 min en coche desde la zona del apartamento.",
      ],
      cons: [
        "La noche cuesta 48,43 € por persona, uno de los alojamientos más caros de los planes de Avoriaz.",
        "El remonte cercano de Perrières pertenece a Les Gets. Para el forfait del festival hay que desplazarse a Les Prodains.",
      ],
    },
    "saintmichel-apto": {
      pros: [
        "Tres dormitorios para siete por 23,86 € por persona y unos 7–10 min en coche hasta Orelle.",
      ],
      cons: [
        studentPass,
        "Con el mismo forfait y alquiler, dormir aquí cuesta 10,29 € más por persona que en el apartamento de Modane.",
      ],
    },
    "chalet-inicio": {
      pros: [
        chaletFeatures,
        "La parada de esquibús está a 150 m según el anuncio. También hay aparcamiento gratuito en Kédeuze.",
      ],
      cons: [
        "El forfait de 28 € al día solo cubre la zona de iniciación.",
        "El chalet queda a 1,5 km de las pistas locales. El sábado 12 es la apertura prevista de Les Carroz.",
      ],
      links: [grandMassif, tarifs],
    },
    "chalet-villages": {
      pros: [
        chaletFeatures,
        "El pase Villages da acceso a más pistas que el de iniciación. Podéis aparcar gratis en Kédeuze.",
      ],
      cons: [
        "El forfait cuesta 61 € más por persona que el de iniciación para los mismos dos días.",
        openingVillages,
      ],
      links: [grandMassif, tarifs],
    },
  };

  window.SKI_PLAN_REVIEW = (plan) =>
    byId[plan.id] || {
      pros: plan.pro ? [plan.pro] : [],
      cons: plan.con ? [plan.con] : [],
    };
})();
