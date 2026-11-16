(() => {
  const oldArchive = window.ARCHIVE;
  const original = window.PLANS;
  const archiveEntry = (name) =>
    oldArchive.find((choice) => choice.name === name);
  const publicPoint = {
    ecla: "46.138908,6.121231",
    prodains: "46.189363,6.756799",
    orelle: "45.20722,6.54583",
    taninges4: "46.1064,6.5869",
    lesgets50: "46.14284,6.64947",
    saintApt: "45.21787,6.47412",
  };
  const route = (from, to) =>
    "https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=" +
    encodeURIComponent(publicPoint[from]) +
    "&destination=" +
    encodeURIComponent(publicPoint[to]);
  const model = [
    "Cartografía y tiempos · OpenStreetMap / OSRM",
    "https://map.project-osrm.org/",
  ];
  const entries = [
    {
      archive: "Four Seasons · Taninges",
      id: "four-seasons",
      reference: "loft",
      point: "taninges4",
      access: "prodains",
      home: "Taninges",
      media: "taninges4",
      title: "Four Seasons · Taninges",
      short: "Avoriaz · Four Seasons",
      night: 257,
      capacity: "7 plazas · 3 dormitorios",
      house:
        "Apartamento en una casa de estilo saboyano, con cinco camas, terraza y cocina con raclette y fondue. La búsqueda para los siete mostró 257 €.",
      pro: "Tres dormitorios y terraza. La noche sale a 36,71 € por persona.",
      con: "El anuncio sitúa remontes a cinco minutos sin identificar con precisión el sector ni el recorrido. Para el forfait del festival se sube por Les Prodains.",
      when: "Si preferís un apartamento de madera con terraza y os encaja media hora de coche hasta el acceso a Avoriaz.",
      originHome: "47 km · 45 min",
      homeLift: "23 km · 30 min",
      walk: "Recorrido a pie hasta un remonte local sin documentar. Para Avoriaz se conduce a Les Prodains.",
      ski: "Sin acceso directo al dominio del forfait",
      note: "Ruta desde la zona que publica Airbnb para Four Seasons. El punto del mapa coincide con la zona de Maison Wahou. Los anuncios y sus precios corresponden a unidades distintas.",
    },
    {
      archive: "Apartamento de 50 m² · Les Gets",
      id: "lesgets50",
      reference: "loft",
      point: "lesgets50",
      access: "prodains",
      home: "Les Gets",
      media: "lesgets50",
      title: "Apartamento de 50 m² · Les Gets",
      short: "Avoriaz · Les Gets 50 m²",
      night: 339,
      capacity: "7 plazas · 2 dormitorios",
      house:
        "Apartamento en planta baja con cuatro camas, ropa de cama y toallas incluidas. La consulta para siete mostró 339 €.",
      pro: "Siete plazas declaradas y parada a 150 m. Es una de las bases de Avoriaz con menos trayecto hasta Les Prodains.",
      con: "Perrières pertenece a Les Gets y el forfait del fin de semana cubre Avoriaz. Dormís a pocos kilómetros del acceso, con un traslado cada día.",
      when: "Si queréis ropa de cama incluida y preferís dormir más cerca de Prodains que en Taninges.",
      originHome: "62 km · 55 min",
      homeLift: "14 km · 20 min",
      walk: "150 m a pie hasta la parada. Según el anuncio, Perrières queda a 5 min en coche. Para Avoriaz se usa Les Prodains.",
      ski: "No · se conduce hasta el acceso de Avoriaz",
      note: "Cálculo desde la zona que publica Airbnb para este apartamento, distinta de La Turche y Fleur des Alpes.",
    },
    {
      archive: "Apartamento en Saint-Michel",
      id: "saintmichel-apto",
      reference: "orelle",
      point: "saintApt",
      access: "orelle",
      home: "Saint-Michel-de-Maurienne",
      media: "saintmichel-airbnb",
      title: "Apartamento en Saint-Michel",
      short: "Orelle · apartamento",
      night: 167,
      capacity: "Hasta 8 · 3 dormitorios",
      house:
        "Apartamento en el casco antiguo con tres dormitorios y cinco camas. El anuncio ofrecía 167 € para siete.",
      pro: "Tres dormitorios por 23,86 € por persona. El anfitrión estima 10 minutos en coche hasta Orelle.",
      con: "Se accede a las pistas por telecabina. El forfait de 92,40 € exige carné de estudiante y compra en la taquilla de Orelle.",
      when: "Si queréis el dominio de Val Thorens y preferís una casa en Saint-Michel con un trayecto corto al primer remonte.",
      originHome: "164 km · 1 h 50",
      homeLift: "6,3 km · 7–10 min",
      walk: "Sin acceso práctico a pie. El anfitrión sitúa el acceso de Orelle a diez minutos en coche.",
      ski: "No · se conduce hasta la telecabina",
      note: "El origen es el punto aproximado del apartamento de Airbnb en el casco antiguo. Ô Saint Michel es otro alojamiento.",
    },
  ];
  const promoted = new Set(entries.map((entry) => entry.archive));
  for (const entry of entries) {
    const archived = archiveEntry(entry.archive);
    const ref = original.find((plan) => plan.id === entry.reference);
    const refRoute = window.ROUTES[ref.route];
    const {
      area,
      slope,
      pass,
      adultPass,
      card,
      gear,
      fee,
      passInfo,
      gearInfo,
      sources,
    } = ref;
    const {
      id,
      home,
      title,
      short,
      media,
      night,
      capacity,
      house,
      pro,
      con,
      when,
    } = entry;
    const houseLink = archived.links[0];
    window.PLANS.push({
      id,
      area,
      slope,
      pass,
      adultPass,
      card,
      gear,
      fee,
      passInfo,
      gearInfo,
      sources,
      home,
      title,
      short,
      media,
      night,
      capacity,
      house,
      pro,
      con,
      when,
      route: id,
      sauna: "Sin confirmar",
      jacuzzi: "Sin confirmar",
      houseLink,
    });
    window.ROUTES[id] = {
      lift: refRoute.lift,
      originLift: refRoute.originLift,
      originHome: entry.originHome,
      homeLift: entry.homeLift,
      walk: entry.walk,
      ski: entry.ski,
      note: entry.note,
      links: [
        ["Ecla → zona del apartamento", route("ecla", entry.point)],
        ["Ecla → " + refRoute.lift, route("ecla", entry.access)],
        [
          "Zona del apartamento → " + refRoute.lift,
          route(entry.point, entry.access),
        ],
        houseLink,
        model,
      ],
    };
  }

  window.ARCHIVE = oldArchive.filter((choice) => !promoted.has(choice.name));
  const photos = {
    "Avoreaz G": "avor-g",
    "Apartamento con sauna · 103 m²": "gets-sauna",
    "Ceiba · Carmine Lodge": "ceiba",
    "Chalet La Voraz · L’Ourson": "voraz",
    "Auberge HI Valmeinier": "hi-valmeinier",
    "Le Shantoné": "shantone",
  };
  const skiPhotos = {
    "Morzine, Les Gets y Châtel": "lesgets-station",
    "Praz de Lys–Sommand": "praz",
    "Dos reservas de Esquiades": "thorens",
    "UCPA · Pack Mini": "thorens",
    "Dos excursiones desde Archamps": "avoriaz",
    "Cómo cambiaba la noche de 6 a 7": "lesgets-station",
  };
  for (const item of window.ARCHIVE) {
    if (photos[item.name]) item.media = photos[item.name];
    if (skiPhotos[item.name]) item.slope = skiPhotos[item.name];
  }
  const laVoraz = archiveEntry("Chalet La Voraz · L’Ourson");
  laVoraz.price = "475 € vistos · confirmar hasta 610 €";
  laVoraz.description =
    "Airbnb mostraba 475 € para siete. La anfitriona pide confirmar el importe y publica fuera de temporada 400 € para cuatro más 70 € por persona adicional. Para siete serían 610 € si aplica, 87,14 € cada uno. Sauna privada y jacuzzi compartido, cuatro dormitorios para ocho. Falta forfait y equipo. Desde Ecla al centro de Châtel hay unos 85 km.";

  const cosy = original.find((plan) => plan.id === "cosy");
  cosy.sauna = "Compartida · acceso por confirmar";
  cosy.jacuzzi = "Compartido · acceso por confirmar";
  cosy.spa =
    "La residencia Les Temples du Soleil anuncia sauna, hammam y dos jacuzzis de pago. Falta confirmar si los huéspedes del apartamento privado Cosy pueden entrar, el horario del 12 de diciembre y el suplemento.";
  cosy.extra = [
    ...(cosy.extra || []),
    [
      "Spa y condiciones · Les Temples du Soleil",
      "https://www.pierreetvacances.com/fr-fr/fp_VTL_location-residence-les-temples-du-soleil",
    ],
    [
      "Ubicación de Cosy en la residencia · ficha del apartamento",
      "https://www.booking.com/hotel/fr/nice-42m2-apartment-at-the-foot-of-the-slopes.fr.html",
    ],
  ];
  const chalet = original.find((plan) => plan.id === "chalet");
  for (const [reference, id, sector] of [
    ["carroz-inicio", "chalet-inicio", "iniciación"],
    ["carroz", "chalet-villages", "Villages"],
  ]) {
    const local = original.find((plan) => plan.id === reference);
    const { area, slope, pass, card, gear, passInfo, gearInfo } = local;
    original.push({
      ...chalet,
      id,
      area,
      slope,
      pass,
      card,
      gear,
      fee: 0,
      passInfo,
      gearInfo,
      title: "Ferme rénovée + Les Carroz " + sector,
      short: "Chalet · " + sector,
      route: "ferme-carroz",
      status: "Combinación calculada",
      sources: local.sources.filter(
        ([label]) => !label.startsWith("Hotel") && !label.startsWith("Sauna"),
      ),
      pro: "Conserváis el jacuzzi privado y esquiáis en el dominio de las pistas cercanas al chalet.",
      con: "El presupuesto parte del material de iniciación. El pack intermedio de Les Carroz cuesta 72–80 € con casco. Revisad el parte de apertura.",
      when:
        reference === "carroz-inicio"
          ? "Si todos sois principiantes y queréis pasar la tarde en el chalet. El forfait da acceso a una selección de remontes de Les Carroz."
          : "Si queréis más pistas que con el pase de iniciación y preferís un acceso corto desde el chalet.",
    });
  }
})();
