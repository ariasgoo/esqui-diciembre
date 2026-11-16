(() => {
  const prodains = "https://www.avoriaz.com/sejourner/acces-et-transport/telepherique-des-prodains/";
  const orelle = "https://www.orelle.net/pratique/acces-transports-parking";
  const vieuxMoulin = "https://www.valcenis.com/fete-et-manifestation/tous-en-piste-a-val-cenis-val-cenis/";
  const hotelCarroz = "https://www.floconsverts.com/village-vacances-montagne";
  const beginnerCarroz = "https://www.grand-massif.com/offres-ski/tarifs-forfaits-ski/";
  const getsOpening = "https://pass.lesgets.com/ouvertures-horaires-hiver/";

  function access(mode, text, source) {
    return { mode, text, source };
  }

  function driveToProdains(firstLeg) {
    return access("drive", firstLeg + " Aparcáis en el P1 de Les Prodains y subís 4 min en el teleférico. Para volver, bajáis en él y recogéis el coche.", prodains);
  }

  const fleur = driveToProdains("Desde Fleur des Alpes hasta el acceso de Avoriaz son unos 13 km y 20 min en coche. Podéis caminar unos 20 min (1,4 km) a Perrières, que pertenece al forfait local de Les Gets.");
  const fermeLocal = {
    ...access("drive", "Para llegar a Kédeuze calculad unos 4 min en coche (1,8 km). Desde la zona del chalet sale también una ruta a pie de unos 1,7 km y 23 min sin equipo. Incluye un tramo de camino cuyo mantenimiento invernal se desconoce. El anfitrión sitúa las pistas locales a 1,5 km. El regreso hasta casa es por carretera o a pie.", "https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&route=46.03458%2C6.64014%3B46.024897%2C6.64366"),
    walkConditional: true,
  };
  const plans = {
    cenis: access("drive", "Desde Modane, unos 26 km y 30 min en coche hasta la telecabina Vieux Moulin, donde se recogen los pases del festival. Se vuelve al mismo punto y se regresa en coche al apartamento.", vieuxMoulin),
    loft: driveToProdains("Desde el loft de Cluses son unos 33 km y 40–45 min en coche por trayecto."),
    chalet: driveToProdains("Desde la zona del chalet en Arâches son unos 36 km y 50 min en coche. Las pistas a 1,5 km son de Les Carroz, en Grand Massif. No existe conexión de pistas ni remontes entre Les Carroz y Avoriaz."),
    orelle: access("drive", "Desde Modane, unos 11 km y 15 min en coche hasta Francoz. Aparcáis junto a la telecabina de Orelle y subís a las pistas. Para volver al valle usáis la telecabina antes de su último descenso.", orelle),
    turche: driveToProdains("Para el forfait de Avoriaz son unos 13 km y 20 min en coche. Desde el apartamento sí podéis caminar unos 6 min (400 m) al telesquí de La Turche si abre y elegís esquiar en Les Gets con su forfait local."),
    wahou: driveToProdains("Desde la casa de Taninges son unos 23 km y 30 min en coche por trayecto."),
    grinza: access("drive", "Desde el dúplex, el anfitrión indica 5 min a pie hasta las pistas de Termignon. Para el festival, el acceso anunciado y la recogida del sábado están en Vieux Moulin. Calculad 8,9 km y 10 min en coche por trayecto. La conexión esquiando desde Termignon depende de la apertura de ese sector.", vieuxMoulin),
    carroz: access("walk", "Desde el hotel camináis 80 m a la cinta Figaro, que enlaza con la telecabina de Kédeuze. También podéis llegar a la cabina por calles, unos 900 m y 12 min a pie. Podéis regresar por esas mismas calles. Para bajar esquiando al pueblo, revisad la pista de retorno del día.", hotelCarroz),
    "carroz-inicio": access("walk", "Hay 80 m a pie a la cinta Figaro o unos 900 m y 12 min por calles hasta Kédeuze. Si abre, la telecabina lleva al sector de iniciación de Crêtes y el forfait incluye dos idas y vueltas en ella. Para regresar, bajáis en cabina y volvéis andando al hotel.", beginnerCarroz),
    flaine: access("drive", "La cinta junto al hotel sirve Les Carroz. Con el forfait de Flaine se conduce unos 15 km y 20 min al P2 Flaine Forum. Desde el parking son 5–10 min a pie al frente de nieve. La vuelta al hotel se hace en coche.", "https://www.flaine.com/fiche/parking-p2-flaine-forum/"),
    cosy: access("ski", "Desde el guardaesquís del edificio Nazca salís directamente a la pista y podéis regresar esquiando si esa pista está abierta. El paseo de unos 600 m y 8 min desde el parking P2 hasta el alojamiento solo afecta a la llegada y la salida.", "https://www.maeva.com/fr-fr/residence-temples-du-soleil-nazca_104372.html"),
    cheval: access("ski", "La residencia tiene acceso directo a pistas para salir y volver esquiando cuando abra el tramo de regreso. En los apartamentos clásicos se rodea el edificio con los esquís en la mano desde el guardaesquís. El P2 queda a unos 270 m o 4 min andando del alojamiento.", "https://www.village-montana.com/val-thorens/residence-le-cheval-blanc"),
    fleur,
    ancolie: fleur,
    saintmichel: access("drive", "Desde el hotel Ô Saint Michel son unos 5,7 km y 6 min en coche hasta la telecabina de Francoz. También hay autobús desde la estación de tren de Saint-Michel. Al terminar, bajáis al valle en la cabina y volvéis al hotel en coche o autobús.", orelle),
    "four-seasons": driveToProdains("Desde la zona que muestra el anuncio de Taninges, calculad unos 23 km y 30 min en coche. El anuncio menciona remontes a 5 min sin identificar el sector."),
    lesgets50: driveToProdains("Desde la zona del apartamento son unos 14 km y 20 min en coche. La parada local a 150 m y Perrières a 5 min en coche sirven la zona de Les Gets."),
    "saintmichel-apto": access("drive", "Del casco antiguo de Saint-Michel al parking de Francoz son unos 6,3 km y 7–10 min en coche. También sale un autobús desde la estación de tren. Subís y bajáis a las pistas en la telecabina de Orelle.", orelle),
    "chalet-inicio": fermeLocal,
    "chalet-villages": fermeLocal,
  };

  const archives = {
    "Avoreaz G": access("drive", "Para el forfait de Avoriaz, conducid unos 5 km y 10 min al P1 de Les Prodains y subid 4 min en teleférico. Desde el centro de Morzine también llega la línea A. El Pléney a 500 m y la pista Retour des Nants junto a la casa pertenecen al dominio local de Morzine.", "https://www.avoriaz.com/sejourner/acces-et-transport/navettes-morzine-avoriaz/"),
    "Apartamento con sauna · 103 m²": access("walk", "En Les Gets, la agencia del apartamento sitúa la pista local más próxima a 250 m y la parada de lanzadera a 20 m. Podéis hacer el mismo tramo andando de vuelta si abre esa pista. La ficha no identifica el remonte ni anuncia vuelta con los esquís hasta la puerta.", "https://www.poplidays.com/fr/location-vacances-les-gets_5483/19919383834-appartement-les-gets-4-pieces-7-personnes/"),
    "Ceiba · Carmine Lodge": access("walk", "Desde el apartamento podéis caminar a la telecabina de Chavannes (490 m) o a la de Mont Chéry (930 m), según qué sector abra. A la vuelta se recorre el mismo tramo a pie. Hay una parada de lanzadera a 90 m.", "https://reservation.lesgets.com/appartement-ceiba-les-gets-proche-centre.html"),
    "Chalet La Voraz · L’Ourson": access("drive", "El chalet anuncia un telesilla a 300 m, pero el 12–13 solo está prevista la apertura de Linga / Pré la Joux. Desde la casa son unos 3,4 km y 7 min en coche al parking de Linga o 7 km y 12 min a Pré la Joux. La red regular de lanzaderas anuncia su inicio el 19.", "https://www.chatel.com/skier/dates-douverture-du-domaine-skiable/"),
    "Auberge HI Valmeinier": access("drive", "Hay un remonte de Valmeinier a 300 m andando del albergue. Para usar el forfait de Orelle–Val Thorens hay que bajar en coche a Francoz, unos 18 km y 20–25 min por trayecto. Se sube y baja a las pistas en telecabina.", "https://www.hifrance.org/auberges-de-jeunesse/auberge-de-jeunesse-valmeinier/"),
    "Le Shantoné": access("drive", "Desde el albergue de Beaune hay una bajada por carretera hasta el parking de Francoz, unos 16 km y 25 min en coche. La telecabina de Orelle os lleva a las pistas y os devuelve al aparcamiento.", orelle),
    "Manigod": access("unknown", "La opción aún no tiene casa. Los accesos en los puertos de Croix Fry y Merdassier tienen aparcamiento. Buscad cerca del frente de nieve elegido si queréis salir andando. Dormir en el pueblo de Manigod implica subir hasta uno de los puertos.", "https://www.manigod.com/acceder-a-manigod-en-voiture.html"),
    "Les Contamines": access("unknown", "Falta elegir alojamiento. Una referencia para ir andando es Le Lay, donde sale la telecabina de Montjoie. Desde otras zonas del pueblo puede hacer falta coche o lanzadera. Comprobad qué acceso abre el fin de semana.", "https://www.lescontamines.com/winter/randonnees"),
    "Le Grand-Bornand": access("unknown", "Todavía falta la casa. Para el sector del pueblo podéis buscar cerca de la telecabina de Rosay. Chinaillon tiene otro frente de nieve. La distancia andando depende del edificio y del sector abierto.", "https://www.legrandbornand.com/quoi-faire/cours-enfants-debutants-week-end-le-grand-bornand-fr-6771751/"),
    "La Clusaz": access("unknown", "Falta escoger casa. Para salir a pie desde el centro, tomad como referencia la base de Beauregard y comprobad que abra. El nombre del pueblo abarca varios barrios y otros accesos por carretera.", "https://forfait.laclusaz.com/"),
    "Chamonix Le Pass": access("unknown", "Falta alojamiento. Para caminar hasta Brévent, buscad junto a la telecabina de Planpraz en Chamonix. Flégère tiene su salida en Les Praz. Según dónde durmáis y qué sector abra, puede hacer falta autobús o coche.", "https://domaineschamonix.montblancnaturalresort.com/fr/acces-et-plans/brevent"),
    "Morzine, Les Gets y Châtel": access("unknown", "Falta elegir pueblo y casa. Las referencias son Pléney en Morzine, Chavannes en Les Gets y Linga / Pré la Joux en Châtel. Para Rock On Snow de Avoriaz se accede por Les Prodains. La apertura parcial puede cambiar el punto de salida.", getsOpening),
    "Praz de Lys–Sommand": access("unknown", "La Fest’Hiv anuncia esquí en la estación los dos días. Si dormís en Taninges, subiréis al sector abierto por carretera. Para llegar a pie, buscad casa en el frente de nieve cuando se publiquen los remontes de la preapertura.", "https://www.prazdelys-sommand.com/activites/evenements/festhiv/"),
    "Tignes–Val d’Isère": access("unknown", "Falta elegir alojamiento y pueblo. En Val d’Isère podéis buscar en el frente de nieve de Solaise para ir andando a la telecabina. El recorrido cambia si dormís en La Daille o en Tignes.", "https://www.valdisere.ski/fr/faq"),
    "La Plagne / Les Arcs": access("unknown", "Todavía no hay casa. Si queréis ir andando, buscad en el frente de nieve de Plagne Centre y comprobad la distancia desde el edificio. Para cruzar a Les Arcs importan también la apertura y la última conexión de Vanoise Express.", "https://www.la-plagne.com/plagne-centre"),
    "Les Deux Alpes": access("unknown", "Falta la casa. Para el sector de altura, buscad cerca de la place des 2 Alpes, junto a la salida del Jandri. Las direcciones de otros barrios pueden requerir lanzadera o coche.", "https://explore.les2alpes.com/fr/commerces-et-services/sport-emotion-centre-skimium"),
    "Portes du Soleil desde Suiza": access("unknown", "Falta alojamiento. En Champéry, el teleférico de Croix-de-Culet sale junto a la estación de tren. Solo podréis medir el paseo y saber si necesitáis coche cuando elijáis dirección y sector.", "https://www.regiondentsdumidi.ch/fr/553493-telepherique-champery-croix-de-culet-5753/"),
    "Verbier · 4 Vallées": access("unknown", "Sin casa elegida. Desde Le Châble se sube en telecabina a Verbier. Si dormís arriba, buscad cerca de Médran para acceder a pie. La distancia diaria depende de cuál de las dos bases elijáis.", "https://verbier4vallees.ch/fr/informations-utiles/horaires-ouvertures-live"),
    "Villars, Les Diablerets y Glacier 3000": access("unknown", "Falta elegir alojamiento y sector. Para Glacier 3000 la salida es el teleférico de Col du Pillon. Desde el pueblo de Les Diablerets se llega en bus o coche. Las pistas locales tienen otros remontes.", "https://www.glacier3000.ch/fr/acces-et-horaires/"),
    "Monts Jura, Thollon y Les Houches": access("unknown", "Sin casa elegida. Son tres estaciones distintas. Buscad cerca de La Catheline en Lélex, de la telecabina de Thollon o de Bellevue o Prarion en Les Houches. La fecha de apertura y el paseo dependen del sector.", "https://www.paysdegex-montsjura.com/equipements/telecabine-la-catheline/"),
    "Cómo cambiaba la noche de 6 a 7": driveToProdains("Desde La Turche o Fleur des Alpes se conduce unos 13 km y 20 min hasta el acceso de Avoriaz. Si elegís esquiar en Les Gets, La Turche queda a unos 6 min a pie del primer apartamento y Perrières a unos 20 min de Fleur."),
    "Dos reservas de Esquiades": access("walk", "Para el reparto 6 + 1, Cheval Blanc está a pie de pista y el Hôtel 3 Vallées a unos 50 m. Para el reparto 4 + 3, tanto Cosy como Cheval Blanc tienen acceso directo. Podéis dejar el coche aparcado y acordar un punto común en pistas.", "https://reservation.valthorens.com/residence-hotel-3-vallees.html"),
    "UCPA · Pack Mini": access("ski", "El centro UCPA de Val Thorens está en la misma pista. Si abre el tramo que lo sirve, podéis salir y volver con los esquís puestos. El centro deportivo queda unos 2 km por debajo del pueblo.", "https://www.ucpa.com/destination/village-sportif/val-thorens"),
    "Packs de los eventos": access("unknown", "Los paquetes no identifican una casa para vuestra noche. En Avoriaz el acceso desde el valle es el teleférico de Les Prodains. En Val Cenis el festival se reúne en Vieux Moulin. El paseo depende del edificio asignado.", vieuxMoulin),
    "Una estación cada día": access("drive", "El sábado, dejad el coche en Les Prodains y subid en teleférico a Avoriaz. El domingo os desplazáis en coche a Le Grand-Bornand o La Clusaz. La noche en el valle sigue por elegir, así que la distancia exacta cambia con la casa.", prodains),
    "Dos excursiones desde Archamps": access("drive", "Desde Ecla al P1 de Les Prodains hay unos 76 km y 1 h 15 min en coche por trayecto. Cada día subís en teleférico 4 min a Avoriaz y al terminar volvéis a Archamps por la misma ruta.", prodains),
    "Añadir sauna al loft": plans.loft,
    "Otras tiendas de alquiler": access("unknown", "Esta opción compara únicamente tiendas de material. Si alquiláis arriba en Avoriaz, el teleférico de Les Prodains os acerca a la estación. Recoger material en Annemasse no determina cómo se llega a pistas desde el alojamiento.", prodains),
  };

  // The public map reproduces each measured route from the entrance or the published area.
  const routeUrl = (from, to) =>
    "https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=" +
    encodeURIComponent(from + ";" + to);
  const hotelChalet = "https://www.airbnb.fr/rooms/554166959336381972";
  const fromFerme = "46.03458,6.64014";
  const kedeuze = "46.024897,6.64366";
  const francoz = "45.20722,6.54583";

  fermeLocal.sources = [
    ["Ubicación aproximada y distancias del anfitrión", hotelChalet],
    ["Zona del chalet → Kédeuze en coche", routeUrl(fromFerme, kedeuze)],
  ];
  plans.chalet.sources = [
    ["Grand Massif · estaciones conectadas y plano de pistas", "https://www.grand-massif.com/plan-des-pistes/"],
    ["Les Carroz · apertura prevista y acceso a Kédeuze", "https://www.lescarroz.com/ouverture/"],
    ["Skibus gratuito · línea de Arâches y calendario publicado", "https://www.arvi-mobilite.fr/bus-cars/skibus/les-carroz/"],
    ...fermeLocal.sources,
  ];
  plans["carroz-inicio"].sources = [
    ["Del hotel a la cinta Figaro", hotelCarroz],
  ];
  const avoreazG = archives["Avoreaz G"];
  avoreazG.sources = [
    ["Distancias a Pléney y a Retour des Nants", "https://cimalpes.com/fr/location-morzine/appartement-avoreaz-g/"],
    ["Alojamiento → P1 Les Prodains", routeUrl("46.1774312,6.7066737", "46.189363,6.756799")],
  ];
  archives["Ceiba · Carmine Lodge"].sources = [
    ["Apertura de Les Gets", getsOpening],
  ];
  archives["Chalet La Voraz · L’Ourson"].sources = [
    ["Chalet y distancia al telesilla local", "https://www.chatel.com/meubles-de-particuliers/5-pieces-la-voraz-lourson-chatel/"],
    ["Fechas de la red local de lanzaderas", "https://www.chatel.com/services/navettes-de-chatel-chatel/"],
    ["Chalet → parking de Linga", routeUrl("46.275104,6.838247", "46.254469,6.820938")],
    ["Chalet → parking de Pré la Joux", routeUrl("46.275104,6.838247", "46.233693,6.790296")],
  ];
  archives["Auberge HI Valmeinier"].sources = [
    ["Albergue → telecabina de Orelle", routeUrl("45.184381,6.472051", francoz)],
  ];
  archives["Le Shantoné"].sources = [
    ["Le Shantoné → telecabina de Orelle", routeUrl("45.250882,6.472691", francoz)],
  ];

  window.SKI_ACCESS = {
    plans,
    archive: window.ARCHIVE.map((item) => archives[item.name]),
  };
})();
