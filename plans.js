(() => {
  const air = (id) =>
    `https://www.airbnb.fr/rooms/${id}?check_in=2026-12-12&check_out=2026-12-13&adults=7&guests=7&currency=EUR`;
  const bk = (slug, n = 7) =>
    `https://www.booking.com/hotel/fr/${slug}.es.html?checkin=2026-12-12&checkout=2026-12-13&group_adults=${n}&no_rooms=1&group_children=0`;
  const esq = (pi, n, h = "") =>
    `https://www.esquiades.com/book/hoteles?idioma=1&inicio=2026-12-12&final=2026-12-13&inif=2026-12-12&fif=2026-12-13&nHa=1&nA=${n}&nA-1=${n}&nNe=0&nNe-1=0&pi=${pi}${h ? "&hD=" + h : ""}`;
  const ticket = [
    "Forfait del evento · Tous en Piste",
    "https://tousenpiste.valcenis.com/billets",
  ];
  const equip = [
    "Material · tarifas Orelle Sports",
    "https://orelle-sports.com/materiels-tarifs/",
  ];
  const hotel = ["Hotel · Esquiades, precios para siete", esq(162, 7)];
  const aqua = [
    "Sauna municipal · horarios y tarifas",
    "https://www.mairie-morzine-avoriaz.com/espace-aquatique/",
  ];
  const fleur = [
    "Chalet · acceso al spa del Alpina",
    "https://www.hotelalpina.fr/fr/fleur-des-alpes.html",
  ];
  const reservit = [
    "Disponibilidad · calendario del propietario",
    "https://secure.reservit.com/fo/booking/2/253654/dates?langcode=FR&m=booking&specialMode=default",
  ];
  const forfaitO = [
    "Forfaits Orelle · tarifa 2026/27, págs. 5–6",
    "https://www.orelle.net/build/files/orelle-3-vallees-tarifs-forfaits-ski_min-fr.e408e5f0.pdf#page=5",
  ];
  const gm = [
    "Forfaits · Grand Massif",
    "https://www.grand-massif.com/offres-ski/tarifs-forfaits-ski/",
  ];
  const cv = [
    "Material · tarifas Les Carroz",
    "https://www.caranvasports.fr/products/location-ski-les-carroz",
  ];
  const av = {
    area: "Avoriaz",
    slope: "avoriaz",
    pass: 50.5,
    card: 3,
    gear: [57.68, 57.68],
    fee: 2,
    passInfo:
      "Forfait local Rock On Snow para sábado y domingo. Soporte nuevo, 3 €; reutilizable si ya tenéis uno compatible.",
    gearInfo:
      "Intersport Place Centrale. Pack rojo con esquís, botas, bastones y casco, 57,68 € por persona. Una sola reserva añade 2 € al grupo. Precio visto en la primera consulta; faltan las siete tallas.",
    sources: [
      [
        "Forfait · tienda oficial Avoriaz",
        "https://www.skipass-avoriaz.com/fr/hiver/forfait/forfait-avoriaz-hiver?shopDate=2026-12-12&shopDrawer=1&shopValCat=2DAY",
      ],
      [
        "Tarifario oficial · Avoriaz 2026/27",
        "https://backoffice.avoriaz.com/wp-content/uploads/2026/11/TARIFS-AVORIAZ-2026-2027-PUBLIC.pdf",
      ],
      [
        "Rock On Snow · fechas y dominio",
        "https://www.avoriaz.com/fiche/rock-on-snow/",
      ],
      [
        "Material · Intersport Place Centrale",
        "https://www.intersport-rent.fr/fr/booking/2026-12-12/2026-12-13/1261",
      ],
      [
        "Material · gastos por reserva",
        "https://www.intersport-rent.fr/fr/informations/conditions-generales-location",
      ],
    ],
  };
  const m = {
    home: "Modane",
    media: "modane",
    night: 95,
    capacity: "Hasta 8 · 3 dormitorios",
    house:
      "Apartamento de 74 m² con cocina en Modane. El anuncio ofrecía la noche para los siete por 95 €. Llevad sábanas y toallas.",
    sauna: "Sin confirmar",
    jacuzzi: "Sin confirmar",
    houseLink: [
      "Alojamiento · apartamento de Modane",
      air("1608687334953694597"),
    ],
  };
  const maur = {
    gear: [53, 64],
    gearInfo:
      "Orelle Sports, en Orelle. Dos días: esquís azules 25 € o rojos 36 €, botas 18 €, casco 6 € y bastones 4 €. Son tarifas de tienda; las siete tallas se confirman al reservar.",
  };
  const cen = {
    area: "Val Cenis",
    slope: "cenis",
    gearInfo:
      maur.gearInfo +
      " También podéis alquilar en Jeannot Sports, en Lanslevillard. Falta cotizar allí dos días con casco y las siete tallas.",
    pass: 49,
    passInfo:
      "Tous en Piste incluye los dos días de remontes en el dominio abierto, actividades y concierto. El selector mostraba 343 € para siete. Recogida el sábado de 8:00 a 12:00 en Vieux Moulin.",
    sources: [
      ticket,
      [
        "Programa y apertura parcial",
        "https://www.valcenis.com/agenda/agenda-des-evenements/tous-en-piste/",
      ],
      equip,
      [
        "Alquiler en la estación · Jeannot Sports de Lanslevillard",
        "https://www.intersport-rent.fr/fr/stations-ski/maurienne/val-cenis/val-cenis-lanslevillard/rue-de-la-mairie",
      ],
      [
        "Alquiler alternativo en Modane",
        "https://www.intersport-modane.com/location-de-materiel-de-sport/",
      ],
    ],
  };
  const ore = {
    area: "Val Thorens–Orelle",
    slope: "orelle",
    pass: 92.4,
    adultPass: 132.2,
    passInfo:
      "Dos forfaits de un día a 46,20 € con carné de estudiante vigente, en taquilla de Orelle. La tarifa adulta de dos días es 132,20 €. Tener 20 años por sí solo no da derecho al precio estudiante. Posible soporte pendiente.",
    sources: [
      forfaitO,
      equip,
      ["Apertura de Val Thorens", "https://www.valthorens.com/ski/ouverture/"],
    ],
  };
  const fl = {
    area: "Les Carroz",
    home: "Les Carroz",
    media: "flocons",
    slope: "carroz",
    route: "flocons",
    capacity: "7 plazas · habitación familiar",
    night: 115,
    card: 2,
    gear: [56, 64],
    gearInfo:
      "Pack de iniciación 44 € los dos días + casco 12 €. La tienda también enumera los bastones a 8 € aunque describe el pack como completo. Se muestra el margen hasta confirmarlo. Intermedio con casco: 72–80 €.",
    house:
      "Habitación familiar de 30 m², 115 € no reembolsables. También se ofrecía dúplex para siete por 139 € con cancelación gratuita, unos 3,43 € más por persona.",
    sauna: "En el hotel · de pago",
    jacuzzi: "Sin confirmar",
    spa: "Sauna de 30 minutos, 5 € por sesión y máximo cuatro personas. Para siete hacen falta dos turnos. La piscina exterior es de verano.",
    houseLink: hotel,
    sources: [
      hotel,
      [
        "Sauna · condiciones del establecimiento",
        "https://www.ternelia-lm.com/en/hotel/the-flocons-verts-grand-massif/frequently-asked-questions/",
      ],
      gm,
      cv,
      [
        "Apertura por sectores",
        "https://www.grand-massif.com/ouverture-domaine/",
      ],
    ],
  };
  const vt = {
    area: "Val Thorens",
    home: "Val Thorens",
    slope: "thorens",
    n: 6,
    cap6: true,
    gear: [40, 50],
    capacity: "Oferta para 6",
    passInfo:
      "Paquete de Esquiades con dos jornadas Val Thorens–Orelle. El desglose asigna al forfait la diferencia entre el pack y el precio de la misma casa sin forfait.",
    gearInfo:
      "40–50 € estimados para dos días en el plan original de Sport 2000. Casco y precio final pendientes de confirmar.",
    sauna: "Sin confirmar",
    jacuzzi: "Sin confirmar",
    sources: [
      ["Esquiades · buscar para seis", esq(8, 6, 520929)],
      ["Esquiades · la misma búsqueda para siete", esq(8, 7, 520929)],
      [
        "Alquiler propuesto · Sport 2000",
        "https://location-ski.sport2000.fr/rent?shop=204",
      ],
    ],
  };
  window.PLANS = [
    {
      ...m,
      ...maur,
      ...cen,
      id: "cenis",
      route: "mod-cenis",
      title: "Tous en Piste + Modane",
      short: "Val Cenis · Modane",
      tag: "Menor precio",
      pro: "El forfait del festival incluye actividades y concierto. La noche cuesta 13,57 € por persona.",
      con: "Se duerme en el valle y el dominio abre parcialmente. Material presupuestado en Orelle, no en la propia estación.",
      when: "Si el precio manda y os apetece un fin de semana de apertura con ambiente.",
    },
    {
      ...av,
      id: "loft",
      route: "cluses",
      title: "Grand Loft de Cluses",
      short: "Avoriaz · loft",
      home: "Cluses",
      media: "cluses",
      night: 160,
      capacity: "Hasta 8 · 3 dormitorios",
      tag: "Avoriaz económica",
      house:
        "Loft entero, tres dormitorios y cuatro camas. 160 € en la ficha para los siete.",
      sauna: "Externa · Morzine",
      jacuzzi: "Sin confirmar",
      spa: "La piscina municipal de Morzine ofrece sauna el sábado de 12:00 a 19:00. Entrada 16 €, o 12 € la última hora. El centro pide reserva de grupo. Extra opcional.",
      pro: "Un apartamento entero por 22,86 € por persona y el forfait de apertura de Avoriaz.",
      con: "Cluses está en el valle, fuera de la estación. Sin spa confirmado en el loft.",
      when: "Si queréis esquiar en Avoriaz al menor precio entre estos alojamientos.",
      houseLink: ["Alojamiento · Grand Loft", air("1616645430087654991")],
      extra: [aqua],
    },
    {
      ...av,
      id: "chalet",
      route: "ferme",
      title: "Ferme rénovée authentique",
      short: "Avoriaz · chalet con jacuzzi",
      home: "Arâches-la-Frasse",
      media: "ferme",
      night: 243,
      capacity: "7 plazas · 160 m²",
      tag: "Jacuzzi privado",
      house:
        "Antigua granja alpina de 160 m² con chimenea, jardín, cuatro camas y dos baños. El anuncio mostraba 243 € por la noche para siete.",
      sauna: "Sin confirmar",
      jacuzzi: "Privado · en el chalet",
      spa: "El anuncio incluye jacuzzi privado entre los servicios. Un huésped menciona toallas de pago. Revisad ese extra al reservar.",
      pro: "Cuesta 11,86 € más por persona que el loft y todo el grupo tiene su propio jacuzzi.",
      con: "Las pistas que el propietario sitúa a 1,5 km son de Les Carroz. Para usar el forfait de Avoriaz hay que ir a otro dominio.",
      when: "Si queréis un chalet para pasar la tarde juntos y el jacuzzi compensa el acceso más largo a Avoriaz.",
      houseLink: ["Alojamiento · fotos y jacuzzi", air("554166959336381972")],
    },
    {
      ...m,
      ...maur,
      ...ore,
      id: "orelle",
      route: "mod-orelle",
      title: "Modane + Orelle",
      short: "Val Thorens · Modane",
      tag: "Esquí de altura",
      pro: "Permite esquiar en Val Thorens pagando 95 € por toda la casa en el valle.",
      con: "El forfait estudiante se compra en taquilla en Orelle. Conviene revisar la conexión de remontes para la vuelta.",
      when: "Si queréis el dominio de Val Thorens y podéis acreditar que sois estudiantes.",
    },
    {
      ...av,
      id: "turche",
      route: "gets",
      title: "Apartamento de La Turche",
      short: "Avoriaz · La Turche",
      home: "Les Gets",
      media: "gets",
      night: 246,
      status: "Precio anterior",
      capacity: "7 plazas · 60 m²",
      house:
        "Apartamento para siete con dos dormitorios y dos baños, en la ruta de La Turche. Booking mostró 246 €; el precio no se pudo reconfirmar en la última búsqueda.",
      sauna: "Externa · Morzine",
      jacuzzi: "Sin confirmar",
      spa: "Sin spa confirmado en la casa. Acceso público al centro de Morzine por 12–16 €, aparte.",
      pro: "Siete plazas y una base en Les Gets por unos 35 € por persona.",
      con: "La tarifa vista era no reembolsable y requería aceptación del anfitrión. Ropa de cama posiblemente aparte.",
      when: "Si queréis dormir en Les Gets y la oferta de 246 € vuelve a aparecer.",
      houseLink: [
        "Alojamiento · Booking para siete",
        bk("rent-apartment-les-gets-74260"),
      ],
      extra: [aqua],
    },
    {
      ...av,
      id: "wahou",
      route: "wahou",
      title: "Maison Wahou",
      short: "Avoriaz · Maison Wahou",
      home: "Taninges",
      media: "wahou",
      night: 332,
      capacity: "Casa para 11 · consulta para 7",
      house:
        "Casa de dos apartamentos y siete camas. Airbnb mostró 332 € para el grupo. La cotización anterior de Booking era 327 €, con condiciones distintas.",
      sauna: "Sin confirmar",
      jacuzzi: "Sin confirmar",
      pro: "Mucho espacio para cocinar y compartir el fin de semana. Algo menos de 48 € por persona de alojamiento.",
      con: "Está en Taninges, en el valle. La política de cancelación depende del canal y la tarifa.",
      when: "Si valoráis la casa amplia y os encaja mejor el alojamiento que la proximidad al remonte.",
      houseLink: ["Alojamiento · oferta Airbnb", air("1460964778922971547")],
      extra: [
        [
          "Oferta anterior · Booking",
          bk("house-for-11-people-2-intimate-and-friendly-apartments"),
        ],
      ],
    },
    {
      ...maur,
      ...cen,
      id: "grinza",
      route: "grinza",
      home: "Termignon",
      title: "La Grinza, dúplex en Val Cenis",
      short: "Val Cenis · La Grinza",
      media: "la-grinza",
      night: 207,
      capacity: "Hasta 8 · 80 m²",
      house:
        "Dúplex con dos dormitorios, cinco camas y dos baños. La ficha incluye sábanas y toallas. 207 € para siete.",
      sauna: "Sin confirmar",
      jacuzzi: "Sin confirmar",
      pro: "Dormís en un pueblo del municipio de Val Cenis y conserváis el pase del festival a 49 €.",
      con: "Anuncio nuevo con fotos provisionales y estreno previsto el 11 de diciembre. El punto de recogida del festival es Vieux Moulin, no Termignon.",
      when: "Si queréis quedaros en Val Cenis y aceptáis que es un alojamiento recién estrenado.",
      houseLink: ["Alojamiento · La Grinza", air("1813189492585854487")],
    },
    {
      ...fl,
      id: "carroz",
      title: "Les Flocons Verts + Villages",
      short: "Les Carroz · Villages",
      pass: 117,
      tag: "Sauna en el hotel",
      passInfo:
        "Forfait Villages: 58,50 € al día por dos días. Soporte nuevo 2 €. Apertura parcial prevista; el dominio completo tiene otro precio.",
      pro: "Dormís en Les Carroz por 16,43 € cada uno y el hotel dispone de sauna.",
      con: "La pista y el acceso directo dependen de la nieve de apertura. Sauna y material intermedio se pagan aparte del precio base.",
      when: "Si priorizáis dormir junto al dominio donde vais a esquiar y tener sauna en el edificio.",
    },
    {
      ...fl,
      id: "carroz-inicio",
      title: "Les Flocons Verts + iniciación",
      short: "Les Carroz · iniciación",
      pass: 56,
      passInfo:
        "Dos jornadas a 28 € en el sector de principiantes de Les Carroz. Solo determinados remontes. Comprobad su apertura antes de comprar.",
      pro: "El mismo hotel con sauna y dos días en la zona de aprendizaje a precio reducido.",
      con: "El pase solo cubre el área de principiantes. No es adecuado para quien quiera recorrer todo el dominio.",
      when: "Si los siete queréis aprender en pistas sencillas y abren los remontes de iniciación.",
    },
    {
      ...fl,
      id: "flaine",
      route: "flocons-flaine",
      area: "Flaine",
      slope: "flaine",
      title: "Les Flocons Verts + Flaine",
      short: "Flaine · Flocons Verts",
      pass: 121.4,
      passInfo:
        "Dos pases de un día del sector Flaine, 60,70 € cada uno. Soporte nuevo 2 €. El pase local de Flaine no cubre el acceso desde las pistas de Les Carroz.",
      pro: "Mantiene la noche de 115 € para siete y permite elegir el sector de Flaine según la nieve.",
      con: "Se duerme y se alquila el material en Les Carroz, pero se esquía en Flaine.",
      when: "Si el parte de apertura favorece claramente a Flaine. Para Grand Massif completo, el forfait público sube a 126 €.",
    },
    {
      ...vt,
      id: "cosy",
      route: "cosy",
      title: "Cosy Val Tho Ski aux Pieds",
      short: "Val Thorens · Cosy",
      media: "cosy",
      night: 605,
      pass: 655 / 6,
      status: "Solo 6 en el paquete",
      house:
        "Apartamento de dos dormitorios. La misma ficha ofrecía 605 € solo alojamiento y 1.260 € con los seis forfaits.",
      pro: "Dormís en Val Thorens. El paquete de 210 € por persona incluye el sábado y el domingo de esquí.",
      con: "Al introducir siete adultos desaparecía la oferta. El material se paga aparte.",
      when: "Si volvéis a ser seis y preferís despertar en la estación. Los 196 € del reparto inicial tampoco incluían el pase del séptimo.",
      houseLink: [
        "Alojamiento · Cosy Val Tho",
        "https://www.esquiades.com/hoteles/520929_cosy-val-tho-ski-aux-pieds",
      ],
    },
    {
      ...vt,
      id: "cheval",
      route: "cheval",
      title: "Résidence Cheval Blanc V24",
      short: "Val Thorens · Cheval Blanc",
      media: "cheval",
      night: 456,
      pass: 109,
      status: "Solo 6 en el paquete",
      house:
        "Esquiades mostró el pack a partir de 185 € por persona para seis y la noche sola a partir de 76 €. Precios redondeados del listado.",
      pro: "Para seis, el mismo dominio y los mismos días por unos 25 € menos por persona que el Cosy.",
      con: "No se obtuvo un paquete para siete. Comprobad qué pistas comunican con la residencia el 12 y el 13 de diciembre.",
      when: "Si sois seis y buscáis el paquete más barato de los dos apartamentos dentro de Val Thorens.",
      houseLink: [
        "Alojamiento · Cheval Blanc",
        bk(
          "residence-cheval-blanc-ski-in-out-with-wifi-in-val-thorens-v24-by-versant-collec",
          6,
        ),
      ],
    },
    {
      ...av,
      id: "fleur",
      route: "fleur",
      title: "Chalet Fleur des Alpes 1",
      short: "Les Gets · Fleur des Alpes",
      home: "Les Gets",
      media: "fleur",
      night: 241,
      n: 6,
      cap6: true,
      status: "Referencia para 6",
      capacity: "Unidad ofertada para 6 · 50 m²",
      house:
        "Apartamento de madera con balcón, cocina y dos baños. La antigua oferta de 241 € era para seis. El propietario comercializa varias unidades dentro del chalet.",
      sauna: "Compartida · Hotel Alpina",
      jacuzzi: "Compartido · Hotel Alpina",
      spa: "Acceso publicado al spa Alpina a 900 m: sauna, jacuzzi, hammam y piscina. Sujeto a apertura y condiciones del alojamiento.",
      pro: "El ambiente de chalet que os gustó y acceso al spa del hotel.",
      con: "La tarifa anterior cubría seis. Para siete, el calendario directo marcaba el sábado 12 solo para salidas.",
      when: "Guardadlo para otra fecha o si el propietario confirma otra unidad para los siete.",
      houseLink: [
        "Oferta anterior · Booking para seis",
        bk("chalet-fleur-des-alpes", 6),
      ],
      extra: [fleur, reservit],
    },
    {
      ...av,
      id: "ancolie",
      route: "fleur",
      title: "Ancolie · Fleur des Alpes",
      short: "Les Gets · Ancolie",
      home: "Les Gets",
      media: "ancolie",
      night: null,
      status: "Sin tarifa para la noche",
      capacity: "Hasta 8 · 55 m²",
      house:
        "Apartamento del mismo chalet, dos habitaciones triples, sofá cama y dos baños. La ficha directa indica camas hechas y limpieza final con suplemento.",
      sauna: "Compartida · Hotel Alpina",
      jacuzzi: "Compartido · Hotel Alpina",
      spa: "Spa del Hotel Alpina a 900 m, compartido. No es un jacuzzi privado dentro del apartamento.",
      pro: "Aquí sí hay capacidad declarada para los siete, con acceso al spa del hotel.",
      con: "En el calendario directo, el 12 figuraba como día de salida. Sin precio para vuestra noche.",
      when: "Solo si reaparece una noche con entrada el sábado para siete.",
      houseLink: [
        "Apartamento Ancolie · propietario",
        "https://www.hotelalpina.fr/fr/fleur-des-alpes-ancolie.html",
      ],
      extra: [fleur, reservit],
    },
    {
      ...maur,
      ...ore,
      id: "saintmichel",
      route: "saintmichel",
      title: "Ô Saint Michel + Orelle",
      short: "Orelle · Ô Saint Michel",
      media: "saintmichel",
      home: "Saint-Michel-de-Maurienne",
      n: 6,
      cap6: true,
      status: "Referencia para 6",
      night: 222,
      capacity: "3 habitaciones cotizadas para 6",
      house:
        "222 € las tres habitaciones para seis, con desayuno en la oferta anterior. No se renovó precio para siete.",
      sauna: "Sin confirmar",
      jacuzzi: "Sin confirmar",
      pro: "Desayuno incluido y acceso al dominio de Val Thorens desde Orelle.",
      con: "Con siete viajeros hace falta una nueva distribución de habitaciones y un precio nuevo.",
      when: "Si preferís hotel con desayuno y el establecimiento ofrece plazas a todo el grupo.",
      houseLink: ["Alojamiento · oferta anterior", bk("o-saint-michel", 6)],
    },
  ];
  window.COMMON_SOURCES = [
    [
      "Evento Rock On Snow · Avoriaz",
      "https://www.avoriaz.com/fiche/rock-on-snow/",
    ],
    ticket,
    forfaitO,
    gm,
    aqua,
    [
      "Paquete Bronze de Val Cenis · dos noches, figuraba agotado",
      "https://tousenpiste.valcenis.com/packs/bronze",
    ],
  ];
})();
