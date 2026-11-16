(() => {
  "use strict";

  // Local times for 12–13 December 2026. A last ascent, a last descent and
  // a piste closure can be different times, even for the same access lift.
  const grandMassifDates = ["Grand Massif · calendario 2026/27", "https://www.skipass-grand-massif.com/fr/ouverture"];
  const grandMassifLive = ["Grand Massif · parte de cada remonte", "https://www.grand-massif.com/infos-ouverture-pistes/"];
  const portesDates = ["Portes du Soleil · aperturas por sector", "https://www.portesdusoleil.com/en-hiver/pistes-et-remontees-mecaniques/"];
  const thorensLifts = ["Val Thorens · horarios de los remontes", "https://www.valthorens.com/activites/sentiers-pietons/les-remontees-mecaniques-accessibles-aux-pietons/"];
  const aravisHours = ["La Clusaz–Manigod · horario del dominio", "https://www.thonescoeurdesvallees.com/station/la-clusaz-manigod/"];

  const schedules = {
    avoriaz: {
      label: "Avoriaz · Les Prodains",
      text: "Los dos días, Prodains Express abre a esquiadores a las 08:45. La pista del sector cierra a las 17:15. Dentro del dominio, Lindarets tiene su última subida a las 16:00 y Séraussaix a las 16:45 si están abiertos.",
      sources: [
        ["Avoriaz · horarios por remonte y sector", "https://www.skipass-avoriaz.com/fr/hiver/page/horaires"],
        ["Rock On Snow · apertura de temporada", "https://www.avoriaz.com/fiche/rock-on-snow/"],
      ],
    },
    cenis: {
      label: "Val Cenis · Vieux Moulin",
      text: "Sábado 12, esquí parcial por Tous en Piste. Las pulseras se recogen de 08:00 a 12:00. El programa del sábado no fija la primera ni la última subida. Domingo 13, telecabina Vieux Moulin de 09:00 a 16:40.",
      sources: [
        ["Val Cenis · horario oficial 2026/27 desde el domingo 13 (PDF)", "https://hmvt.download/VC_SEM/SEM-VC-Horaires-des-remontees-mecaniques.pdf"],
        ["Tous en Piste · programa del fin de semana", "https://www.valcenis.com/agenda/agenda-des-evenements/tous-en-piste/"],
        ["Tous en Piste · recogida de pulseras", "https://tousenpiste.valcenis.com/billets"],
      ],
    },
    carroz: {
      label: "Les Carroz · fin de semana de apertura",
      text: "La estación abre el sábado 12. Para Kédeuze, el operador remite al parte diario para conocer la primera y la última subida. En Les Molliets anuncia las 09:00 para los dos telesillas, si abren. Morillon y Sixt empiezan el 19.",
      sources: [
        ["Les Carroz · accesos y primera subida", "https://www.lescarroz.com/ouverture/"],
        grandMassifDates,
        grandMassifLive,
      ],
    },
    flaine: {
      label: "Flaine · Grandes Platières",
      text: "Temporada prevista desde el 5 de diciembre. El operador publica la primera y la última subida de cada remonte en el parte diario. Falta la franja específica de Grandes Platières para el sábado 12 y el domingo 13.",
      sources: [grandMassifDates, grandMassifLive],
    },
    orelle: {
      label: "Orelle · acceso y regreso",
      text: "La telecabina de Orelle abre a las 09:00. Para regresar desde Val Thorens, la última conexión por el funitel Grand Fond es a las 16:00 ambos días. Llegad antes a ese remonte si habéis dejado el coche en Orelle.",
      sources: [
        thorensLifts,
        ["Val Thorens–Orelle · última conexión, plano 2026/27 (PDF)", "https://ski.valthorens.com/wp-content/uploads/2026/10/Plan-Val-Thorens-legende-Orelle-macro.pdf"],
      ],
    },
    thorens: {
      label: "Val Thorens · desde la estación",
      text: "Sábado y domingo, Cascades y 2 Lacs de 09:00 a 16:30. El funitel Péclet funciona de 09:15 a 16:00. Otros remontes y enlaces tienen su propia hora de cierre.",
      sources: [thorensLifts, ["Val Thorens · calendario de temporada", "https://www.valthorens.com/ski/ouverture/"]],
    },
    pleney: {
      label: "Morzine · Pléney",
      text: "El operador prevé apertura parcial del 12 al 18 si hay nieve natural. Falta saber qué pistas abrirán y a qué hora, incluida Retour des Nants. La apertura general empieza el 19.",
      sources: [["Morzine · preapertura anunciada por el operador", "https://www.ski-morzine.com/en/"], portesDates],
    },
    gets: {
      label: "Les Gets · preapertura",
      text: "Se prevé apertura parcial el 12 y el 13 si hay nieve. La estación aún no concreta qué remontes funcionarán ni a qué hora cerrarán Chavannes o Mont Chéry. La apertura general está prevista para el 19.",
      sources: [portesDates, ["Les Gets · fechas y horarios de invierno", "https://pass.lesgets.com/ouvertures-horaires-hiver/"]],
    },
    chatel: {
      label: "Châtel · Linga y Pré-la-Joux",
      text: "Del 11 al 18 se prevé apertura parcial y conexión con Avoriaz según la nieve. Pierre Longue está programado los dos días. Falta el horario de primera y última subida de ese fin de semana.",
      sources: [portesDates, ["Châtel · telesilla Pierre Longue", "https://www.chatel.com/remontees-mecaniques/telesiege-de-pierre-longue-chatel/"]],
    },
    valmeinier: {
      label: "Valmeinier · si elegís forfait local",
      text: "Hay preapertura local del 12 al 18. Valmeinier y Valloire funcionan por separado esa semana. En la vertiente de Valloire se anuncia de 09:00 a 16:15, hasta las 16:30 en algunos sectores.",
      sources: [
        ["Valmeinier · preapertura sin conexión a Valloire", "https://www.skipass-valmeinier.com/fr/Ouverture-domaine"],
        ["Valloire · horarios del 12 al 18", "https://www.valloire.net/profiter-de-valloire/le-ski/se-preparer-a-skier/le-domaine-skiable-valloire-galibier-thabor/"],
      ],
    },
    manigod: {
      label: "Manigod · horario diurno",
      text: "El dominio La Clusaz–Manigod anuncia de 09:00 a 17:00 ambos días, según la nieve. Cada remonte puede cerrar antes. El esquí nocturno comienza el 19.",
      sources: [aravisHours, ["Manigod · calendario de nocturnas", "https://manigod.labellemontagne.com/fr/hiver/ski-snowboard/ski-nocturne/"]],
    },
    contamines: {
      label: "Les Contamines · Montjoie y La Gorge",
      text: "Apertura parcial según la nieve. Para las dos telecabinas del valle, primera subida prevista a las 08:50, última subida a las 16:00 y última bajada a las 17:00. El telecabina Signal cierra antes.",
      sources: [
        ["Les Contamines · últimas subidas y bajadas 2026/27", "https://skipass.lescontamines.net/fr/horaires-hiver"],
        ["Les Contamines · parte y primera subida", "https://www.lescontamines.net/ouverture.html"],
      ],
    },
    grandBornand: {
      label: "Le Grand-Bornand",
      text: "Desde el sábado 12, horario general del dominio de 09:00 a 17:00. Consultad el parte del día para la última subida de vuestro sector.",
      sources: [
        ["Le Grand-Bornand · horario del dominio 2026/27", "https://www.thonescoeurdesvallees.com/station/le-grand-bornand/"],
        ["Le Grand-Bornand · parte oficial", "https://www.legrandbornand.com/ouvertures-des-pistes-et-remontees-mecaniques/"],
      ],
    },
    laClusaz: {
      label: "La Clusaz",
      text: "El dominio anuncia de 09:00 a 17:00 el sábado y el domingo. Para volver por Beauregard, su telecabina tiene horario propio de 08:55 a 16:30.",
      sources: [aravisHours, ["La Clusaz · telecabina de Beauregard", "https://www.saintjeandesixt.com/equipement/telecabine-de-beauregard/"]],
    },
    chamonix: {
      label: "Chamonix · acceso Brévent",
      text: "Para los dos días, Planpraz desde las 08:50, última subida de ida a las 16:15 y última bajada a las 16:45. En el teleférico superior del Brévent, la última bajada es a las 16:30. Los demás sectores tienen horarios propios.",
      sources: [
        ["Compagnie du Mont-Blanc · Planpraz y Brévent", "https://domaineschamonix.montblancnaturalresort.com/fr/horaires-tarifs/brevent"],
        ["Compagnie du Mont-Blanc · Flégère", "https://domaineschamonix.montblancnaturalresort.com/fr/horaires-tarifs/flegere"],
      ],
    },
    praz: {
      label: "Praz de Lys–Sommand",
      text: "Fest’Hiv anuncia preapertura los dos días. Faltan los horarios de los remontes y la lista de pistas del evento. La temporada regular comienza el sábado 19.",
      sources: [["Fest’Hiv · preapertura del 12 y 13", "https://www.prazdelys-sommand.com/activites/evenements/festhiv/"], ["Espace des Lys · anuncio del operador", "https://espacedeslys.com/fr/"], ["Praz de Lys–Sommand · calendario y parte", "https://www.prazdelys-sommand.com/explorer/la-station/le-domaine-skiable/infos-pistes/"]],
    },
    tignes: {
      label: "Tignes–Val d’Isère",
      text: "Temporada prevista desde noviembre. Como referencia, el parte de Grande Motte muestra el teleférico de 09:30 a 15:30. Revisad el horario del 12 y del 13 antes de cruzar de un valle al otro.",
      sources: [["Tignes · fechas de la temporada", "https://www.tignes.net/ouvertures-station"], ["Tignes–Val d’Isère · horarios por sector", "https://www.valdisere.com/live/plan-des-pistes/"]],
    },
    paradiski: {
      label: "La Plagne y Les Arcs · enlace Paradiski",
      text: "El enlace está previsto desde el sábado 12. El parte de referencia muestra Vanoise Express, lado Peisey, de 09:00 a 16:30. Comprobad su apertura y la última conexión el día de esquí.",
      sources: [["Paradiski · fechas de apertura del enlace", "https://www.skipass-laplagne.com/fr/tarifs-publics"], ["La Plagne · horarios por remonte", "https://ouvertures.la-plagne.com/"]],
    },
    deuxAlpes: {
      label: "Les Deux Alpes · Jandri",
      text: "Los dos días, primer tramo hasta 2.600 m de 09:00 a 16:15. El segundo tramo, hasta 3.200 m, funciona de 09:10 a 16:00.",
      sources: [["Oficina de turismo · Jandri hasta 2.600 m", "https://www.alpes-isere.com/sit/jandri-troncon-1-acces-2600m-5671467/"], ["Oisans · Jandri hasta 3.200 m", "https://map.oisans.com/fr/activites/jandri-troncon-2-acces-3200m"]],
    },
    portesSuiza: {
      label: "Champéry, Les Crosets y Morgins",
      text: "Preapertura según la nieve. Champéry y varios telesillas de Les Crosets están previstos desde el 11. El 12–13 se añaden Morgins, la cinta Foilleuse y el telesquí Truche. Falta el horario de cada remonte para esos días.",
      sources: [["Portes du Soleil Suisse · calendario oficial", "https://skipass-pds-ch.ch/fr/horaires"]],
    },
    verbier: {
      label: "Verbier · Médran y Les Attelas",
      text: "Ambos días, Médran 2 y 4 de 08:45 a 16:15. Les Attelas de 09:00 a 16:15. El operador prevé abrir todo 4 Vallées el sábado 12, según condiciones.",
      sources: [["Verbier · horario de invierno 2026/27 (PDF)", "https://verbier4vallees.ch/V4V-Website/Documents/Horaires-installations/HORAIRES_HIVER_FR.pdf"], ["Verbier · apertura por sectores", "https://verbier4vallees.ch/fr/informations-utiles/news/les-dates-a-retenir_news_2074437"]],
    },
    villars: {
      label: "Villars–Gryon–Les Diablerets",
      text: "La apertura progresiva está prevista desde el 4 de diciembre si hay nieve. Faltan las horas específicas de los remontes abiertos el 12 y el 13.",
      sources: [["Télé-Villars-Gryon-Diablerets · calendario 2026/27", "https://www.tvgd.ch/news/ouverture-billeterie-ski-hiver-2026-2027/"]],
    },
    glacier: {
      label: "Glacier 3000 · desde Col du Pillon",
      text: "El dominio de esquí anuncia de 09:15 a 16:00 los dos días. El teleférico sale desde las 09:00 cada 20 minutos. Última subida desde Col du Pillon a las 16:00.",
      sources: [["Glacier 3000 · horario del dominio y del teleférico", "https://www.glacier3000.ch/fr/acces-et-horaires"]],
    },
    jura: {
      label: "Monts Jura, Thollon y Les Houches",
      text: "Lélex–Crozet y Thollon empiezan su temporada el sábado 19. En Les Houches, si la nieve permite la preapertura del 12 al 18, se prevé primera subida a las 08:45, última subida a las 15:45 y último regreso a las 16:00.",
      sources: [
        ["Monts Jura · calendario de remontes", "https://skipass.paysdegex-montsjura.com/fr/detail-des-ouvertures-hiver"],
        ["Thollon · apertura de temporada", "https://hautesavoiemontblanc-tourisme.com/notre-destination/hautement-blanche/les-stations/thollon-les-memises/"],
        ["Les Houches · apertura de Bellevue y Prarion", "https://leshouches.montblancnaturalresort.com/fr/horaires-tarifs"],
      ],
    },
  };

  const planAreas = {
    "Avoriaz": "avoriaz",
    "Les Carroz": "carroz",
    "Flaine": "flaine",
    "Val Cenis": "cenis",
    "Val Thorens–Orelle": "orelle",
    "Val Thorens": "thorens",
  };

  const archiveAreas = {
    "Avoreaz G": ["avoriaz", "pleney"],
    "Apartamento con sauna · 103 m²": ["gets"],
    "Ceiba · Carmine Lodge": ["gets"],
    "Chalet La Voraz · L’Ourson": ["chatel"],
    "Auberge HI Valmeinier": ["orelle", "valmeinier"],
    "Le Shantoné": ["orelle"],
    "Manigod": ["manigod"],
    "Les Contamines": ["contamines"],
    "Le Grand-Bornand": ["grandBornand"],
    "La Clusaz": ["laClusaz"],
    "Chamonix Le Pass": ["chamonix"],
    "Morzine, Les Gets y Châtel": ["pleney", "gets", "chatel"],
    "Praz de Lys–Sommand": ["praz"],
    "Tignes–Val d’Isère": ["tignes"],
    "La Plagne / Les Arcs": ["paradiski"],
    "Les Deux Alpes": ["deuxAlpes"],
    "Portes du Soleil desde Suiza": ["portesSuiza"],
    "Verbier · 4 Vallées": ["verbier"],
    "Villars, Les Diablerets y Glacier 3000": ["villars", "glacier"],
    "Monts Jura, Thollon y Les Houches": ["jura"],
    "Cómo cambiaba la noche de 6 a 7": ["avoriaz", "gets"],
    "Dos reservas de Esquiades": ["thorens"],
    "UCPA · Pack Mini": ["thorens"],
    "Packs de los eventos": ["avoriaz", "cenis"],
    "Una estación cada día": ["avoriaz", "grandBornand", "laClusaz"],
    "Dos excursiones desde Archamps": ["avoriaz"],
    "Añadir sauna al loft": ["avoriaz"],
    "Otras tiendas de alquiler": ["avoriaz"],
  };

  window.skiLiftHours = (planId, archiveIndex) => {
    if (planId) {
      const plan = window.PLANS.find((item) => item.id === planId);
      const schedule = plan && schedules[planAreas[plan.area]];
      return schedule ? [schedule] : [];
    }
    const name = window.ARCHIVE[archiveIndex]?.name;
    return (archiveAreas[name] || []).map((key) => schedules[key]);
  };
})();
