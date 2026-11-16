(() => {
  "use strict";

  const action = (kind, label, url) => ({ kind, label, url });
  const stay = (label, url) => action("stay", label, url);
  const gear = (label, url) => action("gear", label, url);
  const pass = (label, url) => action("pass", label, url);
  const pack = (label, url) => action("package", label, url);
  const house = (a) => stay("Ver alojamiento", a.links[0][1]);
  const independent = (id, kinds) => {
    const p = window.PLANS.find((plan) => plan.id === id);
    return window
      .SKI_PLAN_BOOKING(p)
      .filter((link) => kinds.includes(link.kind));
  };
  const inAvoriaz = () => independent("chalet", ["gear", "pass"]);
  const inOrelle = () => independent("orelle", ["gear", "pass"]);
  const searchStay = (place, official) => {
    if (official) return stay("Buscar alojamiento · " + place, official);
    const url = new URL("https://www.booking.com/searchresults.es.html");
    url.search = new URLSearchParams({
      ss: place,
      checkin: "2026-12-12",
      checkout: "2026-12-13",
      group_adults: "7",
      group_children: "0",
    });
    return stay("Buscar alojamiento · " + place, url.href);
  };
  const localGets = () => [
    gear(
      "Alquiler · Les Gets",
      "https://location-ski.sport2000.fr/magasins/250-sport-2000-contat-sports",
    ),
    pass("Forfait · Les Gets–Morzine", "https://pass.lesgets.com/"),
  ];
  const localChatel = () => [
    gear(
      "Alquiler · Châtel",
      "https://www.location-ski-chatel.com/locations-ski-snowboard-chatel/",
    ),
    pass("Forfait · Châtel", "https://www.skipass-chatel.com/fr/"),
  ];
  const lodgingSearchNote =
    "El alojamiento y el alquiler para siete están por cotizar. Seleccionad una noche y dos días de material.";
  const review = (pros, cons, actions, bookingNote = "") => ({
    pros,
    cons,
    actions,
    bookingNote,
  });
  const entries = {
    "Avoreaz G": (a) =>
      review(
        [
          "Tres dormitorios para siete y jacuzzi compartido en invierno.",
          "La pista Retour des Nants pasa junto al edificio. El Pléney queda a 500 m.",
        ],
        [
          "La preapertura del Pléney depende de la nieve y faltan las pistas de retorno. Con el forfait de Avoriaz hay que volver a la casa por carretera desde Les Prodains.",
          "Precio y estancia mínima pendientes para una noche.",
        ],
        [house(a), ...inAvoriaz()],
        "El forfait y el equipo enlazados corresponden al plan de Avoriaz.",
      ),
    "Apartamento con sauna · 103 m²": (a) =>
      review(
        [
          "Tres dormitorios y tres baños para siete. Sauna y hammam en el edificio.",
          "Pistas locales a 250 m y parada a 20 m.",
        ],
        [
          "Sauna y hammam compartidos.",
          "Pendientes la tarifa de una noche y la apertura de las pistas locales.",
        ],
        [house(a), ...localGets()],
        "Estos botones son para esquiar en Les Gets–Morzine. El evento de Avoriaz utiliza otro acceso.",
      ),
    "Ceiba · Carmine Lodge": (a) =>
      review(
        [
          "Jacuzzi privado, chimenea y cuatro dormitorios para ocho.",
          "El remonte de Chavannes queda a 490 m.",
        ],
        ["Faltan el precio y la aceptación de una sola noche."],
        [house(a), ...localGets()],
        "Comprobad la apertura de Chavannes para el fin de semana.",
      ),
    "Chalet La Voraz · L’Ourson": (a) =>
      review(
        [
          "Cuatro dormitorios para ocho y sauna privada. También hay jacuzzi compartido.",
        ],
        [
          "El anuncio mostraba 475 € y las condiciones de la anfitriona pueden elevar la noche a 610 € para siete.",
          "Sumad el equipo y el forfait al precio del chalet.",
        ],
        [house(a), ...localChatel()],
        "Pedid el importe final para siete y comprobad si abre el sector de Châtel elegido.",
      ),
    "Auberge HI Valmeinier": (a) =>
      review(
        [
          "119 € por el dormitorio cotizado para seis. Hay un remonte de Valmeinier a 300 m.",
        ],
        [
          "Falta el precio de una séptima cama.",
          "El remonte cercano pertenece a Valmeinier. Para este plan de Val Thorens hay que llegar a Orelle en coche.",
        ],
        [house(a), ...inOrelle()],
      ),
    "Le Shantoné": (a) =>
      review(
        [
          "Los seis primeros podían compartir dormitorio por 161 €, unos 26,83 € por persona.",
        ],
        [
          "Falta una plaza para cerrar el presupuesto de siete.",
          "El alojamiento está en Beaune, por encima del valle. Hay que bajar por carretera a la telecabina de Orelle.",
        ],
        [house(a), ...inOrelle()],
      ),
    Manigod: () =>
      review(
        [
          "Con justificante de estudiante, las dos jornadas salen a 50 €. El dominio local de 25 km encaja para aprender.",
        ],
        [
          "La apertura del día 12 depende de la nieve. El esquí nocturno empieza el fin de semana siguiente.",
        ],
        [
          searchStay(
            "Manigod",
            "https://manigod.labellemontagne.com/fr/hiver/louer-un-hebergement/",
          ),
          gear("Alquiler · Croix Fry", "https://www.manigod-ski-ride.com/"),
          pass(
            "Forfait estudiante · Manigod",
            "https://manigod.labellemontagne.com/fr/hiver/forfaits/etudiant/",
          ),
        ],
        lodgingSearchNote,
      ),
    "Les Contamines": () =>
      review(
        ["La tarifa de apertura publicada cubre los dos días por 85 €."],
        [
          "La apertura es parcial. El valor del pase depende de los sectores que funcionen.",
        ],
        [
          searchStay(
            "Les Contamines",
            "https://reservation.lescontamines.com/",
          ),
          gear(
            "Alquiler · Les Contamines",
            "https://location-ski.sport2000.fr/magasins/1310-sport-2000-mountain-shop-by-cuby",
          ),
          pass(
            "Forfait · Les Contamines",
            "https://skipass.lescontamines.net/",
          ),
        ],
        lodgingSearchNote,
      ),
    "Le Grand-Bornand": (a) =>
      review(
        [
          "A los 20 entráis en la tarifa joven. El centro queda a unos 51 km de Ecla.",
        ],
        [
          "El precio en línea varía según la fecha y la tarifa ofertada carece de reembolso.",
        ],
        [
          searchStay(
            "Le Grand-Bornand",
            "https://reservation.legrandbornand.com/",
          ),
          gear(
            "Alquiler · Le Grand-Bornand",
            "https://location-ski.sport2000.fr/magasins/673-sport-2000-antonin-sports",
          ),
          pass("Forfait · Le Grand-Bornand", a.links[0][1]),
        ],
        lodgingSearchNote,
      ),
    "La Clusaz": (a) =>
      review(
        [
          "Dos billetes Prem’s pueden salir por 99,80 € frente a los 107 € de referencia del pase continuo.",
          "La estación está a unos 53 km de Ecla.",
        ],
        [
          "Prem’s exige anticipación y carece de reembolso. Una tarjeta nueva suma 2 €.",
        ],
        [
          searchStay(
            "La Clusaz",
            "https://www.laclusaz.com/hotel-la-clusaz/hebergements",
          ),
          gear(
            "Alquiler · La Clusaz",
            "https://location-ski.sport2000.fr/magasins/1089-sport-2000-passion-glisse",
          ),
          pass("Forfait · La Clusaz", a.links[0][1]),
        ],
        lodgingSearchNote,
      ),
    "Chamonix Le Pass": (a) =>
      review(
        [
          "El pase permite elegir entre varios sectores de Chamonix según la apertura.",
        ],
        [
          "El precio de dos jornadas puede llegar a 122,40 €. Fuera de Brévent–Flégère, los sectores requieren traslado entre zonas.",
        ],
        [
          searchStay("Chamonix", "https://booking.chamonix.com/fr/"),
          gear("Alquiler · Chamonix", "https://www.rentski.com/"),
          pass("Forfait · Chamonix Le Pass", a.links[0][1]),
        ],
        lodgingSearchNote,
      ),
    "Morzine, Les Gets y Châtel": () =>
      review(
        [
          "Podéis elegir el pueblo según el sector que anuncie más pistas abiertas. Les Gets centro queda a unos 65 km de Ecla.",
        ],
        [
          "Se prevé preapertura parcial. El pase de Rock On Snow corresponde a Avoriaz.",
        ],
        [
          searchStay("Les Gets", "https://reservation.lesgets.com/"),
          searchStay("Morzine, France"),
          searchStay("Châtel, France"),
          ...localGets(),
          gear("Alquiler · Morzine", "https://www.pleney-sports.com/"),
          ...localChatel(),
        ],
        "Les Gets y Morzine comparten forfait local. Elegid el alojamiento y la recogida de material en el pueblo que os convenga.",
      ),
    "Praz de Lys–Sommand": () =>
      review(
        ["La Fest’Hiv anuncia esquí el sábado y el domingo de vuestro viaje, antes de la apertura regular."],
        ["Faltan la tarifa de la Fest’Hiv 2026, los remontes participantes y un presupuesto completo para siete."],
        [
          searchStay(
            "Praz de Lys–Sommand",
            "https://www.prazdelys-sommand.com/bon_plan/reservez-votre-hebergement-en-ligne/",
          ),
          gear(
            "Alquiler · Praz de Lys",
            "https://prazdelys-vacances.com/location-ski.html",
          ),
          pass(
            "Consultar forfait · Espace des Lys",
            "https://espacedeslys.com/",
          ),
        ],
        "Consultad el forfait de preapertura y la disponibilidad de material para esas dos jornadas.",
      ),
    "Tignes–Val d’Isère": () =>
      review(
        [
          "Dominio de altura que merece la pena si el parte anuncia buenas condiciones.",
        ],
        [
          "A los 20 toca tarifa adulta de 156 € por dos días. El trayecto invernal pasa por Bourg-Saint-Maurice.",
        ],
        [
          searchStay(
            "Val d’Isère",
            "https://www.valdisere.com/preparer-mon-sejour/hebergements/reserver-mon-hebergement/",
          ),
          gear(
            "Alquiler · Val d’Isère",
            "https://reservation.valdisere.com/location-materiel-de-ski.html",
          ),
          pass(
            "Forfait · Tignes–Val d’Isère",
            "https://www.valdisere.ski/fr/tarifs-forfait",
          ),
        ],
        lodgingSearchNote,
      ),
    "La Plagne / Les Arcs": (a) =>
      review(
        [
          "El forfait local de La Plagne ahorra 14 € por persona frente a los 154 € de todo Paradiski.",
        ],
        [
          "La apertura está prevista justo el día 12. Para conectar con Les Arcs hace falta que funcione Vanoise Express.",
        ],
        [
          searchStay(
            "La Plagne",
            "https://www.la-plagne.com/denichez-votre-hebergement/hebergement",
          ),
          gear(
            "Alquiler · La Plagne Centre",
            "https://www.elpro.fr/location-skis-la-plagne",
          ),
          pass("Forfait · La Plagne o Paradiski", a.links[0][1]),
        ],
        lodgingSearchNote,
      ),
    "Les Deux Alpes": (a) =>
      review(
        ["La temporada está anunciada desde el 28 de noviembre."],
        [
          "Son unos 203 km hasta el pueblo. La oferta de 84 € publicada era para noviembre.",
        ],
        [
          searchStay("Les Deux Alpes", "https://reservation.les2alpes.com/"),
          gear(
            "Alquiler · Les Deux Alpes",
            "https://reservation.les2alpes.com/location-materiel.html",
          ),
          pass("Forfait · Les Deux Alpes", a.links[0][1]),
        ],
        "Falta cotizar el fin de semana completo para siete.",
      ),
    "Portes du Soleil desde Suiza": (a) =>
      review(
        [
          "Los siete entráis en la tarifa joven de 16–25 años del dominio internacional.",
        ],
        [
          "129 CHF solo por el forfait. Los pasos entre estaciones dependen de qué remontes abran.",
        ],
        [
          searchStay(
            "Champéry",
            "https://www.regiondentsdumidi.ch/fr/reservation/hebergements-77/",
          ),
          gear(
            "Alquiler · Champéry",
            "https://experiencechampery.ch/fr/location-materiel-champery/",
          ),
          pass("Forfait · Portes du Soleil Suisse", a.links[0][1]),
        ],
        lodgingSearchNote,
      ),
    "Verbier · 4 Vallées": () =>
      review(
        [
          "Existe tarifa joven y el operador anuncia descuento anticipando la compra al menos diez días.",
        ],
        [
          "El forfait joven de referencia ya cuesta 152 CHF antes de pagar cama y material.",
        ],
        [
          searchStay(
            "Verbier",
            "https://www.verbier.ch/pratique/stay-hebergements-et-workation/tous-les-hebergements/",
          ),
          gear("Alquiler · Le Châble", "https://montagneshow.ch/"),
          pass(
            "Forfait · Verbier 4 Vallées",
            "https://verbier4vallees.ch/fr/shop-en-ligne",
          ),
        ],
        lodgingSearchNote,
      ),
    "Villars, Les Diablerets y Glacier 3000": () =>
      review(
        [
          "Un Magic Pass que ya tengáis puede cubrir parte de la jornada, según sus condiciones.",
        ],
        [
          "Hay que comprobar cobertura, suplementos y acceso desde Col du Pillon para el glaciar.",
          "Falta el total de dos días para siete.",
        ],
        [
          searchStay("Les Diablerets, Suisse"),
          gear(
            "Alquiler · Les Diablerets",
            "https://www.jackysports.ch/locations/",
          ),
          pass(
            "Forfait · Villars–Gryon–Les Diablerets",
            "https://www.tvgd.ch/tickets/",
          ),
          pass(
            "Billetes · Glacier 3000",
            "https://www.glacier3000.ch/fr/billetterie/",
          ),
        ],
        "Comprobad primero vuestro abono anual y el sector que vayáis a esquiar.",
      ),
    "Monts Jura, Thollon y Les Houches": () =>
      review(
        [
          "Desde Ecla, Lélex queda a unos 62 km, Thollon a 67 km y Les Houches a 79 km.",
        ],
        ["Lélex y Thollon anuncian apertura regular el 19. En Les Houches, la preapertura del 12–13 depende de la nieve. Falta cotizar el viaje."],
        [
          searchStay("Lélex, France"),
          searchStay("Thollon-les-Mémises, France"),
          searchStay("Les Houches, France"),
          gear(
            "Alquiler · Lélex",
            "https://location-ski.sport2000.fr/magasins/207-sport-2000-lelex",
          ),
          pass(
            "Forfait · Monts Jura",
            "https://skipass.paysdegex-montsjura.com/",
          ),
          gear("Alquiler · Thollon", "https://yeti-sports.fr/"),
          pass(
            "Forfait · Thollon",
            "https://thollon.axess.shop/fr/Products/Tickets/",
          ),
          gear(
            "Alquiler · Les Houches",
            "https://cypriensports.com/location-de-ski/",
          ),
          pass(
            "Forfait · Les Houches",
            "https://leshouches.montblancnaturalresort.com/fr",
          ),
        ],
        "Son tres alternativas independientes. Elegid alojamiento, alquiler y forfait del mismo destino.",
      ),
    "Cómo cambiaba la noche de 6 a 7": (a) =>
      review(
        [
          "El apartamento de siete bajaba de 38,50 € a 35,14 € por persona al añadir al séptimo.",
        ],
        [
          "Fleur se cotizó para seis. La séptima plaza necesita aceptación y su calendario marcaba el sábado solo para salidas.",
        ],
        [
          stay("Apartamento para siete", a.links[1][1]),
          stay("Consultar Fleur des Alpes", a.links[3][1]),
          ...inAvoriaz(),
        ],
        "Los precios de esta comparación son solo de alojamiento. El forfait y el material enlazados corresponden a Avoriaz.",
      ),
    "Dos reservas de Esquiades": (a) =>
      review(
        [
          "Dividir el grupo permite buscar siete plazas con forfait incluido cuando un único alojamiento admite seis.",
        ],
        [
          "Hay que hacer dos reservas independientes. El reparto visto costaba unos 224–259 € por persona antes del alquiler.",
        ],
        [
          pack("Paquete para 6", a.links[0][1]),
          pack("Paquete para 1", a.links[1][1]),
          pack("Paquete para 4", a.links[2][1]),
          pack("Paquete para 3", a.links[3][1]),
          ...independent("cosy", ["gear"]),
        ],
        "Elegid la pareja 6 + 1 o la pareja 4 + 3 y comprobad las dos disponibilidades. Ambos paquetes llevan forfait.",
      ),
    "UCPA · Pack Mini": (a) =>
      review(
        [
          "Cama, comidas, material y forfait Val Thorens–Orelle se reservan juntos. Admiten viajeros de 18–40 años.",
        ],
        [
          "El casco va aparte y el programa es de esquí libre. Las siete plazas del 12–13 siguen por confirmar.",
        ],
        [pack("Consultar paquete UCPA", a.links[0][1])],
        "Los 235 € son un precio de catálogo. En el botón del paquete podéis consultar fechas y plazas.",
      ),
    "Packs de los eventos": (a) =>
      review(
        [
          "El paquete Rock On Snow combina estancia y un día de esquí en Avoriaz.",
        ],
        [
          "La oferta de Avoriaz parte de tres noches en estudio para cuatro. El Bronze de Val Cenis era de dos noches y figuraba agotado.",
        ],
        [
          pack("Paquete · Rock On Snow", a.links[0][1]),
          pack("Consultar Bronze · Val Cenis", a.links[1][1]),
          ...independent("chalet", ["gear"]).map((x) => ({
            ...x,
            label: "Alquiler · Avoriaz",
          })),
          ...independent("cenis", ["gear"]).map((x) => ({
            ...x,
            label: "Alquiler en Orelle · Val Cenis",
          })),
        ],
        "Estos formatos tienen estancias mínimas más largas. Para vuestra noche, los pases sueltos de ambos eventos están en Recursos.",
      ),
    "Una estación cada día": (a) =>
      review(
        [
          "Podéis combinar el ambiente de Avoriaz con un segundo dominio en Aravis.",
        ],
        [
          "Los dos billetes suman 71,70–77,40 € por persona y hay que cambiar de estación el domingo.",
        ],
        [
          searchStay("Cluses, France"),
          gear(
            "Alquiler en el valle · SkiTruck Annemasse",
            "https://skitruck-decathlon-annemasse.lokki.rent/",
          ),
          pass(
            "Día 1 · Avoriaz Rock On Snow",
            "https://www.skipass-avoriaz.com/fr/hiver/forfait/forfait-avoriaz-hiver",
          ),
          pass("Día 2 · Le Grand-Bornand", a.links[1][1]),
          pass("Día 2 · La Clusaz", a.links[2][1]),
        ],
        "Elegid uno de los dos forfaits de Aravis. Para el material del valle falta confirmar horas de recogida, devolución y siete tallas.",
      ),
    "Dos excursiones desde Archamps": () =>
      review(
        [
          "Dormir en la residencia evita pagar una noche de alojamiento. El cálculo queda en 111,47 € por persona antes de los desplazamientos.",
        ],
        [
          "Implica dos idas y vueltas a Les Prodains y renunciar a la noche de grupo en la montaña.",
        ],
        inAvoriaz(),
        "Volvéis a dormir a Ecla el sábado. Solo tenéis que reservar material y forfait.",
      ),
    "Añadir sauna al loft": () =>
      review(
        [
          "Podéis combinar el loft de Cluses con una sesión de sauna y hammam por unos 146–150 € por persona en total.",
        ],
        [
          "El spa está en Morzine, fuera del alojamiento. Para grupos requiere reserva y el precio reducido solo vale la última hora.",
        ],
        independent("loft", ["stay", "gear", "pass"]),
        "Los horarios y las condiciones de reserva de la piscina están en Recursos.",
      ),
    "Otras tiendas de alquiler": (a) =>
      review(
        [
          "El pack con casco sale a 55,09 € por persona con fidelidad y gestión compartida. Sport 2000 tiene promoción para grupos elegibles de siete.",
        ],
        [
          "Faltan las siete tallas y el presupuesto de SkiTruck. Las pruebas del festival duran unos 90 minutos por equipo.",
        ],
        [
          ...independent("chalet", ["gear"]).map((x) => ({
            ...x,
            label: "Alquiler · Intersport",
          })),
          gear("Alquiler · Skimium", a.links[2][1]),
          gear("Grupo · Sport 2000", a.links[3][1]),
          gear("Alquiler · SkiTruck", a.links[4][1]),
        ],
        "Esta ficha compara tiendas para el mismo viaje. Elegid el alojamiento y el forfait en el plan correspondiente.",
      ),
  };

  window.SKI_ARCHIVE_REVIEW = (a) =>
    entries[a.name]?.(a) ?? { pros: [], cons: [], actions: [] };
})();
