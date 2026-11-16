(() => {
  const passAv = [
    "Forfait · Rock On Snow",
    "https://www.avoriaz.com/fiche/rock-on-snow/",
  ];
  const gearAv = [
    "Alquiler · Intersport Place Centrale",
    "https://www.intersport-rent.fr/fr/booking/2026-12-12/2026-12-13/1261",
  ];
  const passOr = [
    "Forfait · Orelle, págs. 5–6",
    "https://www.orelle.net/build/files/orelle-3-vallees-tarifs-forfaits-ski_min-fr.e408e5f0.pdf#page=5",
  ];
  const gearOr = [
    "Alquiler · Orelle Sports",
    "https://orelle-sports.com/materiels-tarifs/",
  ];
  const gets = [
    "Apertura · Les Gets",
    "https://pass.lesgets.com/ouvertures-horaires-hiver/",
  ];
  const grandBo = [
    "Tarifas · Le Grand-Bornand",
    "https://pass.legrandbornand.com/fr/tarifs",
  ];
  const laClu = [
    "Tarifas · La Clusaz",
    "https://forfait.laclusaz.com/fr/tarifs-forfait-la-clusaz",
  ];
  const pds = [
    "Apertura por sectores · Portes du Soleil",
    "https://www.portesdusoleil.com/en-hiver/pistes-et-remontees-mecaniques/",
  ];
  const spaM = [
    "Tarifas y horarios · Espace Aquatique",
    "https://www.mairie-morzine-avoriaz.com/espace-aquatique/",
  ];
  const stays = (id) => [
    "Alojamiento · 12–13 diciembre, siete adultos",
    "https://www.airbnb.fr/rooms/" +
      id +
      "?check_in=2026-12-12&check_out=2026-12-13&adults=7&currency=EUR",
  ];
  const split = (n, hotelId) => [
    "Esquiades · " + n + (n === 1 ? " persona" : " personas"),
    "https://www.esquiades.com/book/hoteles?idioma=1&inicio=2026-12-12&final=2026-12-13&inif=2026-12-12&fif=2026-12-13&nHa=1&nA=" +
      n +
      "&nA-1=" +
      n +
      "&nNe=0&nNe-1=0&pi=8&hD=" +
      hotelId,
  ];
  const route = (dest) => [
    "Ruta en coche desde Ecla Archamps",
    "https://www.google.com/maps/dir/?api=1&origin=Ecla%20Gen%C3%A8ve%20Archamps%2C%20France&travelmode=driving&destination=" +
      encodeURIComponent(dest),
  ];
  const routeModel = [
    "Cálculo de carretera · OSRM / OpenStreetMap",
    "https://map.project-osrm.org/",
  ];
  const accommodation = "Alojamiento",
    station = "Estación",
    variant = "Variante";
  // Las distancias al pueblo se indican como tales cuando la dirección exacta de la casa es privada.
  const choices = [
    {
      name: "Four Seasons · Taninges",
      area: "Avoriaz",
      kind: accommodation,
      price: "148 €/persona",
      description:
        "257 € la casa para siete. Sumando 53,50 € de forfait y tarjeta y 57,97 € de equipo con casco, sale a 148,18 € por persona. Terraza y tres dormitorios. Ecla–Taninges centro ≈53 km. El anuncio sitúa remontes a 5 min, sin precisar el acceso. Para Avoriaz se sube por Prodains.",
      links: [
        stays("1450139159352270205"),
        passAv,
        gearAv,
        route("Taninges, France"),
        routeModel,
      ],
    },
    {
      name: "Apartamento de 50 m² · Les Gets",
      area: "Avoriaz",
      kind: accommodation,
      price: "160 €/persona",
      description:
        "339 € para siete más 53,50 € de forfait y tarjeta y 57,97 € de material por persona. Dos dormitorios, sábanas y toallas incluidas. Perrières a 5 min en coche, parada de bus a 150 m. Para esquiar en Avoriaz hay que llegar a Prodains. Ecla–Les Gets centro ≈65 km.",
      links: [
        stays("709895215411690566"),
        passAv,
        gearAv,
        gets,
        route("Les Gets, France"),
        routeModel,
      ],
    },
    {
      name: "Apartamento en Saint-Michel",
      area: "Val Thorens–Orelle",
      kind: accommodation,
      price: "169–180 €/persona",
      description:
        "167 € para siete, 92,40 € de forfait estudiante y 53–64 € de equipo con casco. Posible soporte aparte. Ocho plazas y tres dormitorios. El anfitrión sitúa Orelle a 10 min en coche. Ecla–Saint-Michel centro ≈164 km.",
      links: [
        stays("768534789971067703"),
        passOr,
        gearOr,
        route("Saint-Michel-de-Maurienne, France"),
        routeModel,
      ],
    },
    {
      name: "Avoreaz G",
      area: "Morzine",
      kind: accommodation,
      price: "Una noche por cotizar",
      description:
        "Siete plazas, tres dormitorios y jacuzzi compartido en invierno. La pista de regreso Retour des Nants pasa por la casa y el telecabina del Pléney queda a 500 m. Morzine prevé una apertura parcial según la nieve. Para el forfait de Avoriaz se sube por Les Prodains y se vuelve a la casa por carretera. Desde Ecla ≈71 km.",
      links: [
        [
          "Alojamiento, fotos y distancias · Cimalpes",
          "https://cimalpes.com/fr/location-morzine/appartement-avoreaz-g/",
        ],
        pds,
        route("46.177431,6.706674"),
        routeModel,
      ],
    },
    {
      name: "Apartamento con sauna · 103 m²",
      area: "Les Gets",
      kind: accommodation,
      price: "Una noche por cotizar",
      description:
        "Siete plazas, tres dormitorios y tres baños. Sauna y hammam comunes en el edificio. Pistas locales a 250 m y parada a 20 m. Ecla–Les Gets centro ≈65 km. Para ir a Avoriaz hace falta trasladarse a Prodains.",
      links: [
        [
          "Reservar el apartamento · Sun Location (FR-1-598-153)",
          "https://www.sunlocation.com/location-vacances/967047",
        ],
        [
          "Alojamiento y fotos · Poplidays FR-1-598-153",
          "https://www.poplidays.com/fr/location-vacances-les-gets_5483/19919383834-appartement-les-gets-4-pieces-7-personnes/",
        ],
        gets,
        route("Les Gets, France"),
        routeModel,
      ],
    },
    {
      name: "Ceiba · Carmine Lodge",
      area: "Les Gets",
      kind: accommodation,
      price: "Una noche por cotizar",
      description:
        "Jacuzzi privado en el balcón y chimenea. Ocho plazas y cuatro dormitorios. Chavannes a 490 m, Mont Chéry a 930 m y parada a 90 m. Remontes de Les Gets. Ecla–Les Gets centro ≈65 km. Pendiente de precio y estancia mínima.",
      links: [
        [
          "Alojamiento, fotos y acceso · Les Gets Réservation",
          "https://reservation.lesgets.com/ceiba-les-gets-proche-centre.html",
        ],
        gets,
        route("Télécabine des Chavannes, Les Gets, France"),
        routeModel,
      ],
    },
    {
      name: "Chalet La Voraz · L’Ourson",
      area: "Châtel",
      kind: accommodation,
      price: "475 € la noche para 7",
      description:
        "67,86 € por persona solo por dormir. Sauna privada y jacuzzi compartido. Casa de madera con cuatro dormitorios para ocho. Añadir forfait local y material. Ecla–centro de Châtel ≈85 km. Comprobar los sectores que abren y el acceso desde la casa.",
      links: [
        stays("14559802"),
        ["Web del chalet", "https://chalet-la-voraz.fr/"],
        pds,
        route("Chalet La Voraz, Châtel, France"),
        routeModel,
      ],
    },
    {
      name: "Auberge HI Valmeinier",
      area: "Maurienne",
      kind: accommodation,
      price: "119 € para 6",
      description:
        "Precio observado para el dormitorio del 12 al 13. Falta cotizar cama para la séptima persona. Un apartamento distinto figuraba a 80 € para seis (5,8/10), sin oferta identificada para siete. El albergue anuncia un remonte local a 300 m. Para Val Thorens hay que bajar en coche a Orelle. Ecla–pueblo ≈175 km.",
      links: [
        [
          "Alojamiento y acceso · HI France",
          "https://www.hifrance.org/auberges-de-jeunesse/auberge-de-jeunesse-valmeinier/",
        ],
        passOr,
        gearOr,
        route("Auberge de Jeunesse HI Valmeinier, France"),
        routeModel,
      ],
    },
    {
      name: "Le Shantoné",
      area: "Maurienne",
      kind: accommodation,
      price: "161 € para 6",
      description:
        "Dormitorio en el pueblo de Beaune, por encima de Saint-Michel. La consulta fue para seis. Falta sumar la séptima plaza, forfait y equipo. Hay que bajar por carretera para esquiar en Orelle.",
      links: [
        ["Alojamiento y fotos · Le Shantoné", "https://www.leshantone.fr/"],
        passOr,
        gearOr,
        route("Le Shantoné, Saint-Michel-de-Maurienne, France"),
      ],
    },
    {
      name: "Manigod",
      area: "Aravis",
      kind: station,
      price: "50 € de forfait · 2 días",
      description:
        "Para estudiantes de 15–25 con justificante. Dominio local de 25 km, interesante para principiantes. Apertura prevista el 12 según la nieve. Nocturnas desde el 19. Ecla–pueblo ≈55 km, más la subida al frente de nieve. Casa y alquiler por cotizar.",
      links: [
        [
          "Forfait estudiante",
          "https://manigod.labellemontagne.com/fr/hiver/forfaits/etudiant/",
        ],
        [
          "Dominio y aperturas",
          "https://manigod.labellemontagne.com/fr/hiver/ski-snowboard/domaine-skiable/",
        ],
        route("Col de la Croix Fry, Manigod, France"),
        routeModel,
      ],
    },
    {
      name: "Les Contamines",
      area: "Mont-Blanc",
      kind: station,
      price: "85 € de forfait · 2 días",
      description:
        "Tarifa adulta Première Neige del 12 al 18 de diciembre, con apertura parcial. La elegiría si los remontes previstos encajan mejor con vuestro nivel. Ecla–centro ≈81 km. Casa, spa y material por cotizar.",
      links: [
        [
          "Tarifa de apertura · estación",
          "https://www.lescontamines.com/hiver/saison-2026-2027-les-dates-d-ouverture-du-domaine-skiable",
        ],
        route("Les Contamines-Montjoie, France"),
        routeModel,
      ],
    },
    {
      name: "Le Grand-Bornand",
      area: "Aravis",
      kind: station,
      price: "88,40 € de forfait · 2 días",
      description:
        "Tarifa pública de 12–25 años. El precio en línea varía por fecha y es no reembolsable. Ecla–centro ≈51 km. Interesa si baja el precio en la cesta y hay suficientes pistas abiertas. Casa y material por cotizar.",
      links: [
        grandBo,
        [
          "Condiciones de cancelación",
          "https://pass.legrandbornand.com/fr/garantie-annulation",
        ],
        route("Le Grand-Bornand, France"),
        routeModel,
      ],
    },
    {
      name: "La Clusaz",
      area: "Aravis",
      kind: station,
      price: "Hasta 99,80 € · 2 días Prem’s",
      description:
        "Dos billetes Prem’s de hasta 49,90 € cada uno, comprados hasta dos días antes y sin reembolso. Forfait continuo de referencia 107 €. Tarjeta nueva 2 €. Ecla–centro ≈53 km. Confirmar sectores, casa y equipo.",
      links: [
        laClu,
        ["Calendario · Aravis", "https://ski-aravis.com/aravis-presentation/"],
        route("La Clusaz, France"),
        routeModel,
      ],
    },
    {
      name: "Chamonix Le Pass",
      area: "Mont-Blanc",
      kind: station,
      price: "98–122,40 € · 2 jornadas",
      description:
        "Tarifa oficial del inicio de temporada entre 49 y 61,20 € por día. La suma de dos días depende de la cesta y de las aperturas. Los sectores están separados salvo Brévent–Flégère. Ecla–Chamonix centro ≈86 km. Casa y material por cotizar.",
      links: [
        [
          "Forfait y mapa de sectores",
          "https://domaineschamonix.montblancnaturalresort.com/fr/billetterie/chamonix-lepass",
        ],
        route("Chamonix-Mont-Blanc, France"),
        routeModel,
      ],
    },
    {
      name: "Morzine, Les Gets y Châtel",
      area: "Portes du Soleil",
      kind: station,
      price: "Consultar sector abierto",
      description:
        "Les Gets y varios sectores de Portes du Soleil anuncian preapertura parcial. El forfait Rock On Snow cubre Avoriaz. Para esquiar en Pléney, Chavannes o Pré-la-Joux hace falta el título correspondiente. Desde Ecla al centro de Les Gets ≈65 km, Morzine ≈71 km y Châtel ≈85 km.",
      links: [
        gets,
        pds,
        passAv,
        route("Les Gets, France"),
        route("Morzine, France"),
        route("Châtel, France"),
        routeModel,
      ],
    },
    {
      name: "Praz de Lys–Sommand",
      area: "Taninges",
      kind: station,
      price: "Fest’Hiv el 12–13 · forfait por publicar",
      description:
        "La estación anuncia dos días de preapertura por la Fest’Hiv. El programa y la tarifa especial de 2026 están pendientes. La temporada regular empieza el 19.",
      links: [
        [
          "Fest’Hiv · programa y preapertura",
          "https://www.prazdelys-sommand.com/activites/evenements/festhiv/",
        ],
        [
          "Calendario y pistas · estación",
          "https://www.prazdelys-sommand.com/explorer/la-station/le-domaine-skiable/infos-pistes/",
        ],
        route("Le Praz de Lys, Taninges, France"),
      ],
    },
    {
      name: "Tignes–Val d’Isère",
      area: "Tarentaise",
      kind: station,
      price: "156 € de forfait · 2 días",
      description:
        "A los 20 se aplica la tarifa adulta. El precio de invierno comienza el sábado 12. Buen candidato para esquí de altura si la nieve justifica más carretera. Casa y material pendientes. Consultar ruta invernal por Bourg-Saint-Maurice.",
      links: [
        [
          "Tarifa oficial",
          "https://www.valdisere.com/preparer-mon-sejour/acheter-mon-forfait/",
        ],
        [
          "Ruta desde Ecla por Bourg-Saint-Maurice",
          route("Val-d’Isère, France")[1] +
            "&waypoints=Bourg-Saint-Maurice%2C%20France",
        ],
      ],
    },
    {
      name: "La Plagne / Les Arcs",
      area: "Paradiski",
      kind: station,
      price: "140–154 € de forfait · 2 días",
      description:
        "140 € en La Plagne o 154 € para todo Paradiski. Apertura prevista el día 12. Consultar la conexión Vanoise Express antes de pagar por ambos dominios. Falta alojamiento para la noche y alquiler para siete.",
      links: [
        [
          "Tarifas · La Plagne y Paradiski",
          "https://www.skipass-laplagne.com/fr/tarifs-publics",
        ],
        [
          "Apertura · Les Arcs",
          "https://www.lesarcs-peiseyvallandry.com/fr/domaine-skiable",
        ],
        route("La Plagne Centre, France"),
      ],
    },
    {
      name: "Les Deux Alpes",
      area: "Oisans",
      kind: station,
      price: "Dos días por cotizar",
      description:
        "La estación anuncia temporada desde el 28 de noviembre. El forfait de apertura de 84 € solo correspondía al 28–29 de noviembre. Ecla–núcleo de Les Deux Alpes ≈203 km. Faltan casa y material para los siete.",
      links: [
        [
          "Tarifas y calendario · estación",
          "https://www.skipass-2alpes.com/fr/",
        ],
        route("Les Deux Alpes, France"),
        routeModel,
      ],
    },
    {
      name: "Portes du Soleil desde Suiza",
      area: "Valais",
      kind: station,
      price: "129 CHF de forfait · 2 días",
      description:
        "Precio en línea joven de 16–25 años. Da acceso al dominio internacional según aperturas. Comprobar los enlaces operativos a mediados de diciembre. Alojamiento y material pendientes. Importe en francos suizos.",
      links: [
        [
          "Tarifas · Portes du Soleil Suisse",
          "https://skipass-pds-ch.ch/fr/tarifs",
        ],
        pds,
        route("Champéry, Suisse"),
      ],
    },
    {
      name: "Verbier · 4 Vallées",
      area: "Valais",
      kind: station,
      price: "152 CHF de forfait · 2 días",
      description:
        "Tarifa joven publicada. La estación anuncia un 10 % de descuento anticipando la compra al menos diez días, sujeto a condiciones. El precio de referencia está en francos suizos. Casa y material por cotizar.",
      links: [
        [
          "Tarifas · Verbier 4 Vallées",
          "https://verbier4vallees.ch/fr/informations-utiles/prix-des-forfaits-hiver",
        ],
        route("Le Châble, Valais, Suisse"),
      ],
    },
    {
      name: "Villars, Les Diablerets y Glacier 3000",
      area: "Alpes de Vaud",
      kind: station,
      price: "Revisar si tenéis Magic Pass",
      description:
        "Si ya tenéis el abono anual, comprobad qué sectores cubre en las fechas elegidas. El acceso al glaciar sale del Col du Pillon. Falta una cotización para los siete con noche, material y cualquier suplemento.",
      links: [
        [
          "Destinos y condiciones · Magic Pass",
          "https://www.magicpass.ch/fr/stations",
        ],
        [
          "Esquí · Glacier 3000",
          "https://www.glacier3000.ch/fr/activites/ski-snowboard",
        ],
        route("Col du Pillon, Les Diablerets, Suisse"),
      ],
    },
    {
      name: "Monts Jura, Thollon y Les Houches",
      area: "Jura y Alta Saboya",
      kind: station,
      price: "Les Houches · preapertura según nieve",
      description:
        "Les Houches prevé una preapertura el 12–13 según la nieve. Lélex y Thollon anuncian apertura regular el 19. Desde Ecla al pueblo de Lélex ≈62 km, a Thollon ≈67 km y a Les Houches ≈79 km. Sin presupuesto completo para el 12–13.",
      links: [
        ["Monts Jura", "https://www.paysdegex-montsjura.com/"],
        ["Thollon-les-Mémises", "https://www.esfthollon.com/fr/les-forfaits/"],
        ["Les Houches · estación", "https://www.leshouches.com/"],
        route("Lélex, France"),
        route("Thollon-les-Mémises, France"),
        route("Les Houches, France"),
        routeModel,
      ],
    },
    {
      name: "Cómo cambiaba la noche de 6 a 7",
      area: "Les Gets",
      kind: variant,
      price: "35,14 € por persona en el apartamento de 7",
      description:
        "El apartamento de Les Gets pasaba de 231 € entre seis (38,50 € por persona) a 246 € entre siete (35,14 €). Fleur costaba 241 € entre seis (40,17 €). Dividirlo entre siete daría 34,43 € solo si aceptasen la séptima plaza y mantuviesen el precio. El calendario directo para siete marcaba el sábado como solo salida.",
      links: [
        [
          "Apartamento · seis adultos",
          "https://www.booking.com/hotel/fr/rent-apartment-les-gets-74260.es.html?checkin=2026-12-12&checkout=2026-12-13&group_adults=6",
        ],
        [
          "Apartamento · siete adultos",
          "https://www.booking.com/hotel/fr/rent-apartment-les-gets-74260.es.html?checkin=2026-12-12&checkout=2026-12-13&group_adults=7",
        ],
        [
          "Fleur · seis adultos",
          "https://www.booking.com/hotel/fr/chalet-fleur-des-alpes.es.html?checkin=2026-12-12&checkout=2026-12-13&group_adults=6",
        ],
        [
          "Calendario · Fleur des Alpes",
          "https://secure.reservit.com/fo/booking/2/253654/dates?langcode=FR",
        ],
      ],
    },
    {
      name: "Dos reservas de Esquiades",
      area: "Val Thorens",
      kind: variant,
      price: "≈224–259 €/persona antes del material",
      description:
        "Seis en Cheval Blanc a 185 € y una plaza individual en Hôtel des 3 Vallées a 457 € darían ≈224 € por persona. Cuatro en Cosy a 260 € y tres en Cheval Blanc a 258 € darían ≈259 €. Incluyen forfait; falta material. Son búsquedas separadas: revisad ambas disponibilidades antes de pagar.",
      links: [
        split(6, 1300789),
        split(1, 77890),
        split(4, 520929),
        split(3, 1300789),
        [
          "Material · Sport 2000 Val Thorens",
          "https://location-ski.sport2000.fr/magasins/204-sport-2000-eskiador-val-thorens",
        ],
      ],
    },
    {
      name: "UCPA · Pack Mini",
      area: "Val Thorens",
      kind: variant,
      price: "Desde 235 € de catálogo",
      description:
        "Para 18–40 años. Incluye cama, comidas, dos días de forfait y material. Casco aparte, sin clases. Interesa si aparecen siete plazas de sábado a domingo. El catálogo no acreditaba la venta para el 12–13.",
      links: [
        [
          "Ficha y disponibilidad · UCPA",
          "https://www.ucpa.com/sejour/sfavthn82-weekend-ski-ou-snowboard-pack-mini-vacances",
        ],
        route("UCPA Val Thorens, France"),
      ],
    },
    {
      name: "Packs de los eventos",
      area: "Avoriaz / Val Cenis",
      kind: variant,
      price: "Exigen más de una noche",
      description:
        "La oferta oficial con alojamiento Rock On Snow parte de tres noches en estudio para cuatro. En Tous en Piste, Bronze a 119 € correspondía a dos noches y figuraba agotado. Para vuestra noche sí se pueden comprar los forfaits por separado.",
      links: [
        [
          "Condiciones · Rock On Snow + alojamiento",
          "https://reservation.avoriaz.com/l-ouverture-de-la-saison-a-ne-pas-manquer.html",
        ],
        [
          "Condiciones · Tous en Piste Bronze",
          "https://tousenpiste.valcenis.com/packs/bronze",
        ],
        passAv,
        [
          "Billetes sueltos · Val Cenis",
          "https://tousenpiste.valcenis.com/billets",
        ],
      ],
    },
    {
      name: "Una estación cada día",
      area: "Avoriaz + Aravis",
      kind: variant,
      price: "71,70–77,40 € de forfait",
      description:
        "Avoriaz 27,50 € un día más Le Grand-Bornand 44,20 € joven, o La Clusaz hasta 49,90 € Prem’s. Útil por variedad. Requiere dos billetes y un cambio de estación. Alojamiento, material y soportes aparte.",
      links: [passAv, grandBo, laClu],
    },
    {
      name: "Dos excursiones desde Archamps",
      area: "Avoriaz",
      kind: variant,
      price: "111,47 €/persona",
      description:
        "Sin pagar alojamiento: 50,50 € de forfait, 3 € de tarjeta y 57,97 € por el equipo con casco. Volver a la residencia implica hacer la ruta hasta Prodains dos veces. Solo encaja si renunciáis a la noche fuera.",
      links: [
        passAv,
        gearAv,
        route("Téléphérique des Prodains, Morzine, France"),
      ],
    },
    {
      name: "Añadir sauna al loft",
      area: "Morzine / Avoriaz",
      kind: variant,
      price: "146–150 €/persona",
      description:
        "Sobre el plan de Cluses, la piscina con saunas y hammams cuesta 16 € o 12 € entrando la última hora. Sábado de 12 a 19 h según el calendario consultado. Acceso al bienestar desde 18 años y reserva para grupos.",
      links: [
        spaM,
        stays("1616645430087654991"),
        route("Espace Aquatique de Morzine, France"),
      ],
    },
    {
      name: "Otras tiendas de alquiler",
      area: "Avoriaz",
      kind: variant,
      price: "Desde 55,09 € con casco en Avoriaz",
      description:
        "Intersport Bronze: 54,80 € más 2 € de gestión entre siete. Skimium: iniciación 59,20 € o progresión 72 € con casco. Sport 2000 ofrece TRIBU desde siete packs elegibles. Los tests del festival duran unos 90 min por equipo.",
      links: [
        gearAv,
        ["Fidelidad · Intersport", "https://www.intersport-rent.fr/fr/faq"],
        [
          "Tienda · Skimium Avoriaz Sports",
          "https://www.avoriaz-sports.fr/hiver/",
        ],
        [
          "Descuento TRIBU · Sport 2000",
          "https://location-ski.sport2000.fr/nos-avantages/les-promotions/offre-groupe",
        ],
        passAv,
      ],
    },
  ];
  window.ARCHIVE = choices;
})();
