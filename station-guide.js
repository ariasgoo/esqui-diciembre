(() => {
  "use strict";

  const travel = {
  "manigod": {
    "label": "Manigod · pueblo, subida a pistas aparte",
    "value": "≈55 km · 55 min",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.8609621%2C6.3697041&travelmode=driving"
  },
  "contamines": {
    "label": "Les Contamines · pueblo",
    "value": "≈82 km · 1 h 10",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.818776%2C6.724756&travelmode=driving"
  },
  "bornand": {
    "label": "Le Grand-Bornand · pueblo",
    "value": "≈51 km · 50 min",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.9418675%2C6.4271457&travelmode=driving"
  },
  "clusaz": {
    "label": "La Clusaz · referencia del núcleo",
    "value": "≈58 km · 1 h 05",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.896718%2C6.441242&travelmode=driving"
  },
  "chamonix": {
    "label": "Chamonix · núcleo, acceso según sector",
    "value": "≈89 km · 1 h 10",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.948385%2C6.893163&travelmode=driving"
  },
  "gets": {
    "label": "Les Gets · núcleo",
    "value": "≈65 km · 1 h",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.157635%2C6.662303&travelmode=driving"
  },
  "morzine": {
    "label": "Morzine · núcleo",
    "value": "≈73 km · 1 h 10",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.181994%2C6.726342&travelmode=driving"
  },
  "chatel": {
    "label": "Châtel · referencia del núcleo",
    "value": "≈87 km · 1 h 35",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.256145%2C6.819082&travelmode=driving"
  },
  "praz": {
    "label": "Praz de Lys · vía Taninges",
    "value": "≈67 km · 1 h 05",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.1485828%2C6.5941666&waypoints=46.108%2C6.591&travelmode=driving"
  },
  "tignes": {
    "label": "Tignes Le Lac · zona ESF",
    "value": "≈166 km · 2 h 45",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.4673246%2C6.9088306&travelmode=driving&waypoints=45.6179%2C6.7695"
  },
  "valdisere": {
    "label": "Val d’Isère · núcleo",
    "value": "≈168 km · 2 h 55",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.448292%2C6.988649&travelmode=driving&waypoints=45.6179%2C6.7695"
  },
  "plagne": {
    "label": "Plagne Centre · carretera de acceso",
    "value": "≈141 km · 2 h 20",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.509552%2C6.677474&travelmode=driving&waypoints=45.5561%2C6.6502"
  },
  "arcs": {
    "label": "Arc 1800 · carretera de acceso",
    "value": "≈152 km · 2 h 30",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.575309%2C6.777861&travelmode=driving&waypoints=45.6179%2C6.7695"
  },
  "deuxalpes": {
    "label": "Les Deux Alpes · referencia del núcleo",
    "value": "≈205 km · 2 h 55",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.010476%2C6.121826&travelmode=driving&waypoints=45.1885%2C5.721"
  },
  "lelex": {
    "label": "Lélex · pueblo",
    "value": "≈61 km · 1 h",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.298217%2C5.937095&travelmode=driving"
  },
  "thollon": {
    "label": "Thollon · pueblo, cabina aparte",
    "value": "≈69 km · 1 h 20",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.391165%2C6.714131&travelmode=driving"
  },
  "houches": {
    "label": "Les Houches · pueblo",
    "value": "≈79 km · 55 min",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=45.891508%2C6.799138&travelmode=driving"
  },
  "champery": {
    "label": "Champéry · centro",
    "value": "≈140 km · 1 h 45",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.1751%2C6.8701&travelmode=driving"
  },
  "morgins": {
    "label": "Morgins · centro",
    "value": "≈90 km · 1 h 35",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.2362%2C6.8524&travelmode=driving"
  },
  "verbier": {
    "label": "Verbier · centro",
    "value": "≈175 km · 2 h 10",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.0962%2C7.2285&travelmode=driving"
  },
  "villars": {
    "label": "Villars-sur-Ollon · centro",
    "value": "≈135 km · 1 h 45",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.2988%2C7.0568&travelmode=driving"
  },
  "diablerets": {
    "label": "Les Diablerets · centro",
    "value": "≈142 km · 1 h 50",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.3496%2C7.1586&travelmode=driving"
  },
  "pillon": {
    "label": "Col du Pillon · acceso Glacier 3000",
    "value": "≈146 km · 1 h 50",
    "url": "https://www.google.com/maps/dir/?api=1&origin=46.138908%2C6.121231&destination=46.3541%2C7.2049&travelmode=driving"
  }
};
  const trip = (key) => travel[key];
  const knownTrip = (label, routeKey) => ({
    label,
    value: window.ROUTES[routeKey].originLift,
    url: window.ROUTES[routeKey].links[1][1],
  });
  const profiles = {
    "avoriaz": {
      pitch: "Ambiente de apertura y estación peatonal a pie de pista.",
      description: "Una buena elección para combinar esquí y ambiente de fin de semana. El evento Rock On Snow coincide con el viaje.",
      terrain: "Sectores de aprendizaje como Plateau y Proclou, pistas para progresar y zonas freestyle.",
      level: "Encaja con un grupo de niveles distintos si elegís recorridos y remontes acordes al nivel de todos.",
      lodging: "Avoriaz 1800 está diseñada para moverse con los esquís puestos. Las casas económicas de esta selección están en Arâches, Cluses o Les Gets y requieren coche hasta Prodains.",
      trips: [knownTrip("Les Prodains · acceso por teleférico", "cluses")],
      pros: ["Buen equilibrio entre pistas, aprendizaje y ambiente del Rock On Snow.", "Si dormís arriba, podéis prescindir del coche durante el día."],
      cons: ["Desde Ecla son unas 2 h 30 de carretera entre ida y vuelta. El chalet de Arâches añade unos 50 min al acceso diario desde la casa."],
      dates: "Apertura prevista desde el 11 de diciembre. El pase de apertura cubre Avoriaz y los remontes que funcionen.",
      sources: [
        ["Avoriaz · estación peatonal y alojamientos con acceso a pistas", "https://www.avoriaz.com/decouvrir/la-station/station-pietonne/"],
        ["Avoriaz · zonas de aprendizaje", "https://www.avoriaz.com/activites-hiver/ski-et-snow/apprendre-a-skier-a-avoriaz/"],
        ["Rock On Snow · fechas", "https://www.avoriaz.com/fiche/rock-on-snow/"],
      ],
    },
    "les-carroz": {
      pitch: "Pistas entre árboles y el acceso más corto de los cinco planes principales.",
      description: "Una estación con ambiente de pueblo para aprender o recorrer pistas entre bosque, cerca de Ecla.",
      terrain: "Zona de iniciación de Crêtes y Plein Soleil. Con Villages se amplía a los sectores abiertos de Grand Massif incluidos en ese pase.",
      level: "Especialmente práctica para principiantes. Para quienes ya esquían, comparad el pase de iniciación con Villages.",
      lodging: "Flocons Verts tiene la cinta Figaro a 80 m y Kédeuze a unos 12 min por calles. El chalet de Arâches exige unos 4 min en coche o un paseo de acceso invernal pendiente.",
      trips: [knownTrip("Telecabina de Kédeuze", "flocons")],
      pros: ["Unos 50 min desde Ecla, el trayecto más corto de los cinco destinos con planes completos.", "La opción del hotel permite alquilar y acceder a pie, con sauna de pago al volver."],
      cons: ["El pase barato limita los remontes. Las casas dispersas por Arâches y Les Carroz requieren comprobar su acceso concreto."],
      dates: "Apertura prevista el sábado 12. Morillon y Sixt empiezan el 19. El funcionamiento de la cinta y los enlaces depende de la nieve.",
      sources: [
        ["Les Carroz · pistas y tipos de forfait", "https://www.lescarroz.com/domaine-skiable/"],
        ["Grand Massif · calendario por sectores", "https://www.grand-massif.com/ouverture-domaine/"],
        ["Flocons Verts · situación del hotel", "https://www.floconsverts.com/village-vacances-montagne"],
      ],
    },
    "flaine": {
      pitch: "Pistas de altura y residencias concentradas junto al dominio.",
      description: "La elegiría si el parte de nieve favorece los sectores altos de Grand Massif.",
      terrain: "Cuenca de montaña entre 1.600 y 2.500 m, con pistas variadas y zonas abiertas por encima del bosque.",
      level: "Buena para progresar y recorrer pistas. Los principiantes deben localizar su zona de aprendizaje antes de elegir el forfait.",
      lodging: "Flaine tiene un núcleo compacto con alojamientos próximos a las pistas. Nuestro plan duerme en Les Carroz y requiere 20 min en coche a Flaine Forum cada día.",
      trips: [knownTrip("P2 Flaine Forum", "flocons-flaine")],
      pros: ["Unos 65 min desde Ecla y una cota de esquí más alta que el pueblo de Les Carroz.", "Dormir en Forum permite buscar un apartamento con acceso a pie a los remontes."],
      cons: ["El plan cotizado añade coche desde el hotel y alquiler en Flaine por cotizar. Hay que sumar el aparcamiento."],
      dates: "Temporada prevista desde el 5 de diciembre. La extensión abierta y las conexiones se concretan según nieve y forfait.",
      sources: [
        ["Flaine · dominio y fechas de apertura", "https://www.flaine.com/domaine-skiable/"],
        ["Flaine · guía de la estación y alojamientos próximos a pistas", "https://www.flaine.com/wp-content/uploads/2025/07/FLAINE_Guide2026-FR-MD.pdf"],
      ],
    },
    "val-cenis": {
      pitch: "Forfait del festival económico y pueblos de montaña.",
      description: "La más interesante por el precio del evento si el nuevo alquiler local encaja en el presupuesto.",
      terrain: "Pistas de todos los niveles entre 1.300 y 2.800 m. El dominio habitual combina bosque, desnivel y la larga pista verde Escargot.",
      level: "Ofrece terreno para aprender y para esquiadores con experiencia. El valor del viaje depende de qué sectores abra el festival.",
      lodging: "Los pueblos se extienden a lo largo del valle. Modane requiere unos 30 min en coche a Vieux Moulin. Desde La Grinza, en Termignon, calculad 10 min al acceso del festival.",
      trips: [knownTrip("Vieux Moulin · Lanslevillard", "mod-cenis")],
      pros: ["El forfait del evento cuesta 49 € e incluye los dos días y el concierto.", "Las casas estudiadas para siete tienen capacidad y la noche de Modane cuesta 95 €."],
      cons: ["Unas cinco horas de carretera entre ida y vuelta desde Ecla para una sola noche. El alquiler en Lanslevillard está por cotizar."],
      dates: "Tous en Piste se celebra el 12–13 con apertura parcial. La pista Escargot y el enlace desde Termignon necesitan su propia confirmación de apertura.",
      sources: [
        ["Val Cenis · pistas, altitud y pueblos", "https://www.valcenis.com/ski-et-glisse/le-domaine-alpin-de-val-cenis/"],
        ["Tous en Piste · programa del viaje", "https://www.valcenis.com/agenda/agenda-des-evenements/tous-en-piste/"],
      ],
    },
    "val-thorens-orelle": {
      pitch: "Esquí de altura, con dos formas muy distintas de llegar y dormir.",
      description: "Orelle permite acceder desde el valle. Val Thorens permite dormir en la estación y salir a pistas desde la residencia.",
      terrain: "Val Thorens–Orelle ofrece pistas de todos los niveles y la gran mayoría del dominio por encima de 2.000 m.",
      level: "Interesante para quienes buscan recorrer pistas de altura. Val Thorens también dispone de zonas de aprendizaje.",
      lodging: "En Val Thorens son habituales las residencias con acceso directo. Cosy y Cheval Blanc lo ofrecen, aunque sus paquetes son para seis. Modane y Saint-Michel requieren coche hasta Orelle.",
      trips: [knownTrip("Orelle · Francoz", "mod-orelle"), knownTrip("Val Thorens · P2, barrio Soleil", "cosy")],
      pros: ["La altitud es un motivo para tenerlo en cuenta a principios de temporada.", "Elegís entre dormir en el valle a menor precio o alojaros a pie de pista en Val Thorens."],
      cons: ["Unas 4–5 h de carretera entre ida y vuelta desde Ecla. Si entráis por Orelle, debéis respetar la última conexión de regreso desde Val Thorens."],
      dates: "Apertura prevista desde el 21 de noviembre. La conexión de vuelta por Grand Fond a Orelle tiene su última hora a las 16:00.",
      sources: [
        ["Orelle · dominio y subida desde el valle", "https://www.orelle.net/station-ski/domaine-skiable"],
        ["Val Thorens · alojamiento con salida a pistas", "https://www.valthorens.com/sejour/guide-sejour/"],
        ["Val Thorens · pistas y altitud", "https://ski.valthorens.com/domaine-skiable/"],
      ],
    },
    "manigod": {
      pitch: "Dominio local pequeño para aprender y hacer un viaje corto.",
      description: "Una opción sencilla si el grupo prioriza pistas asequibles para aprender.",
      terrain: "Unos 25 km de pistas en Croix Fry y Merdassier, con espacios de aprendizaje.",
      level: "Principiantes y quienes buscan progresar sin dedicar el fin de semana a recorrer un gran dominio.",
      lodging: "Buscad en Croix Fry o Merdassier para caminar al frente de nieve. El pueblo de Manigod queda más abajo y obliga a subir.",
      trips: [trip("manigod")],
      pros: ["Forfait estudiante publicado a 50 € por dos días.", "La escala del dominio facilita centrarse en aprender."],
      cons: ["Quien ya esquíe mucho puede preferir más variedad. La selección aún carece de casa y alquiler cotizados."],
      dates: "Apertura prevista el 12 según nieve. Las nocturnas empiezan el 19.",
      sources: [["Manigod · sectores y forfaits", "https://www.manigod.com/tarifs-forfaits-ski-manigod-prix-des-forfaits.html"]],
    },
    "les-contamines": {
      pitch: "Pistas variadas en un entorno de montaña y bosque.",
      description: "Alternativa para un grupo que quiere combinar pistas de distintos niveles con vistas al macizo del Mont Blanc.",
      terrain: "Dominio entre unos 1.200 y 2.500 m, con pistas para distintos niveles y zonas de aprendizaje.",
      level: "Intermedios que quieran recorrer pistas y principiantes que elijan un sector adecuado.",
      lodging: "Le Lay, junto a Montjoie, permite buscar alojamiento próximo a la cabina. Dormir en otro barrio del pueblo puede exigir coche o bus.",
      trips: [trip("contamines")],
      pros: ["Pistas de distintos niveles y acceso desde un pueblo de montaña.", "Tiene una tarifa de apertura estudiada para vuestras dos jornadas."],
      cons: ["El 12–13 la apertura es parcial. El total con casa y material para siete sigue pendiente."],
      dates: "Comparad los remontes abiertos antes de decidir si compensa el forfait de apertura.",
      sources: [["Les Contamines · dominio y zonas de aprendizaje", "https://www.lescontamines.com/hiver/skier/domaine-alpin/presentation-et-plan-des-pistes"]],
    },
    "le-grand-bornand": {
      pitch: "Acceso cercano y buen equilibrio para niveles distintos.",
      description: "Una candidata práctica desde Ecla si buscáis un dominio de tamaño intermedio y ambiente de pueblo.",
      terrain: "90 km de pistas en temporada completa y zonas de aprendizaje en Rosay y Chinaillon.",
      level: "Principiantes e intermedios que quieran progresar en el mismo destino.",
      lodging: "Cerca de Rosay se sube desde el pueblo en cabina. Chinaillon tiene su propio frente de nieve. La dirección de la casa determina si podéis salir andando.",
      trips: [trip("bornand")],
      pros: ["Una de las candidatas cercanas de los Aravis.", "Tiene áreas específicas de aprendizaje y pistas para avanzar después."],
      cons: ["La tarifa online varía según fecha. Falta cerrar casa y material para siete."],
      dates: "Apertura continua prevista desde el 12. Los remontes concretos dependen de las condiciones.",
      sources: [["Le Grand-Bornand · pistas y calendario", "https://www.legrandbornand.com/quoi-faire/sports-loisirs-bien-etre/sports-dhiver/ski-alpin/"], ["Grand-Bornand · accesos y aparcamientos", "https://www.legrandbornand.com/quoi-faire/sports-loisirs-bien-etre/sports-dhiver/ski-alpin/plan-parkings-et-acces-pistes/"]],
    },
    "la-clusaz": {
      pitch: "Variedad de sectores y desnivel sin alejarse a la Tarentaise.",
      description: "La elegiría si ya esquiáis y el parte confirma varios sectores abiertos.",
      terrain: "Cinco macizos dentro del pase La Clusaz–Manigod, con ambientes diferentes y zonas que llegan a 2.600 m.",
      level: "Intermedios y esquiadores con experiencia por su variedad. Quienes empiecen deben escoger su zona de aprendizaje.",
      lodging: "Desde el centro se puede buscar casa cerca de Beauregard. Balme, Étale y otros accesos necesitan revisar barrio y conexiones.",
      trips: [trip("clusaz")],
      pros: ["Una de las alternativas cercanas desde Ecla.", "Más variedad de macizos que un dominio de iniciación."],
      cons: ["El precio Prem’s exige compra anticipada y carece de reembolso. Casa y alquiler siguen por cerrar."],
      dates: "Se debe revisar qué sectores y conexiones funcionarán el 12–13.",
      sources: [["La Clusaz · terrenos de los cinco macizos", "https://www.laclusaz.com/ski/ski-alpin/"], ["La Clusaz · alcance del forfait", "https://forfait.laclusaz.com/fr/foire-aux-questions"]],
    },
    "chamonix-le-pass": {
      pitch: "Paisajes del Mont Blanc y varios dominios separados.",
      description: "La candidata para quien valora vistas y terrenos diferentes y acepta organizar el acceso por sectores.",
      terrain: "Brévent–Flégère, Balme y Grands Montets ofrecen terrenos distintos. El valle también tiene zonas pequeñas para aprender.",
      level: "Interesante para intermedios y esquiadores con experiencia. Para una primera vez conviene seleccionar una zona de aprendizaje concreta.",
      lodging: "Alojarse en el centro no asegura salida esquiando. Planpraz y Flégère tienen bases distintas y los otros sectores requieren desplazamiento.",
      trips: [trip("chamonix")],
      pros: ["Panoramas del Mont Blanc y elección entre varios sectores.", "Podéis escoger cada jornada según los remontes y el terreno que abra."],
      cons: ["Los sectores requieren organizar traslados. Necesitaríais recoger y guardar el equipo en el acceso que utilicéis."],
      dates: "El 12–13 se revisa cada dominio por separado. Varios sectores requieren traslados aunque compartan pase.",
      sources: [["Chamonix · terrenos y dominios", "https://www.chamonix.com/activites/hiver/ski"], ["Brévent–Flégère · accesos y Chamonix Le Pass", "https://www.chamonix.com/a-voir-a-faire/sports-et-outdoor/le-ski-dans-la-vallee-de-chamonix-mont-blanc/domaines-skiables/domaine-skiable-brevent-flegere"]],
    },
    "morzine-les-gets-y-chatel": {
      pitch: "Pueblos con encanto, bosque y casas con spa estudiadas.",
      description: "Son tres bases distintas dentro de Portes du Soleil. Conviene elegir primero el sector que abre.",
      terrain: "Les Gets–Morzine combina pistas entre árboles y espacios para aprender. Châtel añade Linga y Pré-la-Joux.",
      level: "Les Gets encaja para aprender y progresar. Para el esquí del fin de semana manda el sector que funcione.",
      lodging: "Ceiba y el apartamento de 103 m² permiten caminar a pistas locales de Les Gets. Para usar el pase de Avoriaz desde esas casas hay que llegar a Prodains.",
      trips: [trip("gets"), trip("morzine"), trip("chatel")],
      pros: ["Hay alojamientos estudiados con sauna o jacuzzi y acceso a pie a pistas locales.", "Es una alternativa para combinar pueblo y esquí entre bosque."],
      cons: ["Pistas cercanas a la casa y forfait deben pertenecer al mismo sector. En Châtel, La Voraz requiere coche al sector abierto."],
      dates: "Preapertura parcial en Les Gets, Morzine y Châtel según nieve. La apertura general comienza el 19.",
      sources: [["Les Gets · pistas y apertura", "https://www.lesgets.com/ski/"], ["Châtel · sectores de esquí", "https://www.chatel.com/skier/domaines-skiables/"], ["Châtel · apertura del 12–13", "https://www.chatel.com/skier/dates-douverture-du-domaine-skiable/"]],
    },
    "praz-de-lys-sommand": {
      pitch: "Esquí local y ambiente de Fest’Hiv el mismo fin de semana.",
      description: "Merece compararse si aparece un buen precio de preapertura y queréis quedaros en el entorno de Taninges.",
      terrain: "Dos mesetas con sectores de aprendizaje y pistas para distintos niveles, con vistas al Mont Blanc.",
      level: "Principiantes e intermedios que prioricen un dominio local y ambiente de apertura.",
      lodging: "En las mesetas se puede buscar casa próxima a pistas. Una casa en Taninges queda abajo y exige subir por carretera.",
      trips: [trip("praz")],
      pros: ["Fest’Hiv anuncia preapertura justo el 12–13.", "Podéis buscar alojamiento en el propio frente de nieve."],
      cons: ["Programa, precio especial y remontes participantes aún pendientes. La selección no tiene un presupuesto completo."],
      dates: "La temporada regular empieza el 19. La preapertura del 12–13 es la excepción anunciada para Fest’Hiv.",
      sources: [["Praz de Lys–Sommand · Fest’Hiv 2026", "https://www.prazdelys-sommand.com/activites/evenements/festhiv/"], ["Dominio y pistas · dossier oficial", "https://www.prazdelys-sommand.com/content/uploads/2025/09/Dosier-de-presse-hiver-25.26.pdf"]],
    },
    "tignes-val-d-isere": {
      pitch: "Gran variedad y mucha altura para dedicar el viaje al esquí.",
      description: "La consideraría si ya esquiáis y la nieve de los sectores altos compensa el viaje más largo.",
      terrain: "El dominio completo alcanza 300 km de pistas, entre 1.550 y más de 3.400 m, con terreno para aprender y descensos exigentes.",
      level: "Especialmente atractiva para intermedios y esquiadores con experiencia que quieran recorrer mucho.",
      lodging: "Tignes Le Lac y Val Claret permiten buscar apartamentos junto a remontes. En Val d’Isère hay que elegir entre el centro, La Daille y otros barrios.",
      trips: [trip("tignes"), trip("valdisere")],
      pros: ["Gran variedad de terreno y cotas de esquí altas.", "Hay áreas de aprendizaje y remontes gratuitos específicos."],
      cons: ["Más carretera para una sola noche y forfait adulto a los 20. Falta cerrar la casa y el material para siete."],
      dates: "La apertura se amplía según nieve. Val d’Isère celebra el Critérium el 12–13, por lo que conviene comprobar las pistas reservadas a competición.",
      sources: [["Tignes · terreno, altitud y niveles", "https://www.tignes.net/ski/domaine-skiable"], ["Val d’Isère · dominio y Critérium del 12–13", "https://www.valdisere.com/val-disere-en-hiver/ski-et-glisse/domaine-skiable-alpes-savoie/"]],
    },
    "la-plagne-les-arcs": {
      pitch: "Dominios amplios y varias bases de alojamiento en altura.",
      description: "Buena opción para recorrer pistas si el grupo quiere dedicar las dos jornadas a esquiar.",
      terrain: "La Plagne y Les Arcs tienen zonas de aprendizaje, pistas fáciles y sectores de mayor dificultad. Vanoise Express enlaza ambos dominios cuando funciona.",
      level: "Intermedios por la variedad. Los principiantes pueden elegir un solo dominio y sus zonas de aprendizaje.",
      lodging: "Plagne Centre y los pueblos de Les Arcs permiten buscar casas cerca de pistas. Dormir en Aime o Bourg-Saint-Maurice añade un acceso desde el valle.",
      trips: [trip("plagne"), trip("arcs")],
      pros: ["Variedad para dos días y bases altas donde buscar acceso a pie.", "Podéis elegir solo La Plagne o Les Arcs y ajustar el pase."],
      cons: ["Viaje más largo y presupuesto para siete pendiente. El pase de todo Paradiski depende del enlace para sacarle partido."],
      dates: "Apertura prevista el sábado 12. Confirmad Vanoise Express antes de pagar un pase para ambos dominios.",
      sources: [["La Plagne · terreno y conexión", "https://www.la-plagne.com/decouvrir-la-plagne/domaine-skiable/plan-des-pistes"], ["Les Arcs · niveles y bases de la estación", "https://www.lesarcs.com/fr/decouvrir-les-arcs/la-destination-les-arcs"]],
    },
    "les-deux-alpes": {
      pitch: "Esquí de gran altura, con un viaje largo para una noche.",
      description: "La escogería por las pistas de altura si sus condiciones fueran claramente las que más os interesan.",
      terrain: "El Jandri permite acceder a los sectores altos. Hay pistas azules en altura y zonas de aprendizaje en distintas cotas.",
      level: "Permite aprender y progresar. Los nuevos esquiadores deben elegir bien el recorrido de vuelta o bajar en remonte.",
      lodging: "Buscad junto al Jandri o a otro remonte que vaya a abrir. El núcleo tiene varios barrios y la distancia cambia entre edificios.",
      trips: [trip("deuxalpes")],
      pros: ["Sectores de altura y zonas fáciles arriba, además del frente de nieve.", "Posibilidad de elegir alojamiento cerca de la base del Jandri."],
      cons: ["Una de las alternativas con más carretera. Falta presupuesto completo y la antigua oferta de apertura de noviembre no aplica."],
      dates: "La temporada está anunciada desde el 28 de noviembre. Se debe comprobar qué sectores abren el 12–13.",
      sources: [["Les Deux Alpes · terreno y zonas de aprendizaje", "https://www.les2alpes.com/hiver/skier-aux-2-alpes/domaine-skiable/"], ["Les Deux Alpes · recorridos para empezar", "https://www.les2alpes.com/hiver/skier-aux-2-alpes/domaine-skiable/je-decouvre-le-ski/"]],
    },
    "portes-du-soleil-desde-suiza": {
      pitch: "Otra puerta a Portes du Soleil con tarifa joven en francos.",
      description: "Sirve si os interesa la vertiente suiza y sus sectores abiertos encajan con vuestro nivel.",
      terrain: "Champéry, Les Crosets y Morgins dan acceso a sectores de Portes du Soleil y tienen áreas específicas de aprendizaje.",
      level: "El sector elegido importa más que el nombre del dominio. Hay zonas para empezar y conexiones para quienes ya esquían.",
      lodging: "Desde Champéry se sube en teleférico. En Les Crosets se puede buscar alojamiento junto a pistas. En Morgins importa la cercanía a la cabina.",
      trips: [trip("champery"), trip("morgins")],
      pros: ["Tarifa joven para 16–25, sin depender de un carné de estudiante.", "Diferentes bases para ajustar alojamiento y acceso al sector."],
      cons: ["Precio en CHF y casa y alquiler pendientes. El pase internacional necesita enlaces abiertos para aprovecharlo."],
      dates: "Preapertura por sectores. Revisad los enlaces a Francia y el horario de regreso antes de cruzar de vertiente.",
      sources: [["Región Dents du Midi · plano de los sectores", "https://www.regiondentsdumidi.ch/files/PDS_PLAN_HIVER_2025-26_RDDM_WEB.pdf"], ["Portes du Soleil Suiza · calendario de apertura", "https://skipass-pds-ch.ch/fr/horaires"]],
    },
    "verbier-4-vallees": {
      pitch: "Terreno variado y deportivo con precio joven en CHF.",
      description: "La consideraría para un grupo que ya esquía y quiere conocer terreno distinto.",
      terrain: "Sectores de altura, pistas azules y rojas y recorridos más técnicos. Hay áreas separadas para aprender en el pueblo.",
      level: "Atractiva para intermedios y esquiadores con experiencia. Quienes empiecen pueden limitarse al sector de aprendizaje.",
      lodging: "Dormir cerca de Médran permite caminar a la cabina. En Le Châble se empieza la jornada subiendo desde el valle.",
      trips: [trip("verbier")],
      pros: ["Variedad de terreno y cota alta.", "Cuenta con una tarifa joven y sectores específicos de iniciación."],
      cons: ["Forfait en CHF y presupuesto de alojamiento y material todavía abierto. El edificio elegido determina el acceso a pie."],
      dates: "Se prevé ampliar al conjunto de 4 Vallées el 12 según condiciones. Comprobad los enlaces operativos.",
      sources: [["Verbier · terreno y niveles", "https://verbier4vallees.ch/fr/experiences-a-verbier/ski-et-snowboard/faqs-ski-snow"], ["Verbier · sectores para aprender", "https://verbier4vallees.ch/fr/domaine-skiable/secteur-debutant"]],
    },
    "villars-les-diablerets-y-glacier-3000": {
      pitch: "Villars para pistas variadas y Glacier 3000 como sector de altura.",
      description: "Tiene sentido si ya disponéis de Magic Pass o queréis comparar los sectores suizos con el presupuesto francés.",
      terrain: "Villars–Gryon–Diablerets combina pistas amplias y áreas de aprendizaje. Glacier 3000 tiene otro acceso y su propio terreno de altura.",
      level: "Villars y Diablerets ofrecen zonas para aprender y progresar. Para el glaciar, escoged el recorrido según el nivel.",
      lodging: "El chalet elegido debe quedar cerca del acceso del pase. Glacier 3000 se alcanza desde Col du Pillon, fuera del pueblo de Les Diablerets.",
      trips: [trip("villars"), trip("diablerets"), trip("pillon")],
      pros: ["Variedad de sectores y una alternativa de altura.", "Magic Pass puede cambiar el coste si ya lo tenéis y cubre el sector elegido."],
      cons: ["Hay que comprobar qué incluye el abono y los suplementos. Sin casa ni alquiler cotizados para siete."],
      dates: "Apertura progresiva según nieve. Los accesos de Villars, Diablerets y Glacier 3000 se revisan por separado.",
      sources: [["Alpes Vaudoises · terreno y sectores de Diablerets", "https://www.alpesvaudoises.ch/fr/Z149/les-diablerets/ski-diablerets"], ["Glacier 3000 · acceso Col du Pillon", "https://www.glacier3000.ch/fr/acces-et-horaires"]],
    },
    "monts-jura-thollon-y-les-houches": {
      pitch: "Opciones locales cuyo calendario limita el 12–13.",
      description: "Las tendría como alternativas de última hora si se anuncia suficiente esquí abierto.",
      terrain: "Son tres dominios distintos. Les Houches cuenta con pistas entre bosque y una zona de aprendizaje en Prarion.",
      level: "Para una salida local o para aprender, siempre que abra el sector adecuado.",
      lodging: "Buscad junto a La Catheline en Lélex, la cabina de Thollon o Prarion en Les Houches. La dirección concreta del edificio determina el acceso a pie.",
      trips: [trip("lelex"), trip("thollon"), trip("houches")],
      pros: ["Permiten comparar accesos locales sin ir a los grandes dominios de Tarentaise.", "Se puede concentrar la jornada en un único frente de nieve."],
      cons: ["Lélex y Thollon anuncian apertura regular el 19. La preapertura de Les Houches depende de la nieve."],
      dates: "Sin presupuesto completo para siete. Para el 12–13 solo contaría con un sector cuya preapertura confirme el operador.",
      sources: [["Monts Jura · calendario", "https://skipass.paysdegex-montsjura.com/fr/detail-des-ouvertures-hiver"], ["Thollon · estación", "https://hautesavoiemontblanc-tourisme.com/notre-destination/hautement-blanche/les-stations/thollon-les-memises/"], ["Chamonix · iniciación en Les Houches", "https://www.chamonix.com/activites/hiver/le-ski-dans-la-vallee-de-chamonix-mont-blanc/debuter-le-ski-dans-la-vallee-de-chamonix"]],
    },
  };
  window.SKI_STATION_GUIDE = profiles;
})();
