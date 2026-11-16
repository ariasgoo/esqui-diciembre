// Ubicaciones que publican los alojamientos. Las zonas aproximadas se identifican
// en el selector, la chincheta y el detalle del mapa.
(() => {
  "use strict";

  const plans = new Map(window.PLANS.map((p) => [p.id, p]));
  const plan = (...ids) => ids.map((id) => ({ ref: "plan/" + id, title: plans.get(id).title }));
  function alternative(name) {
    const index = window.ARCHIVE.findIndex((entry) => entry.name === name);
    return { ref: "otras/" + index, title: name };
  }
  const six = alternative("Cómo cambiaba la noche de 6 a 7");
  const split = alternative("Dos reservas de Esquiades");
  const air = (id) => "https://www.airbnb.fr/rooms/" + id;
  const list = [];
  function pin(id, name, town, lat, lon, location, source, options, accesses, approximate = false) {
    list.push({
      id, name, town, lat, lon, location, source, options, accesses, approximate,
      number: list.length + 1,
    });
  }

  pin("ferme", "Ferme rénovée authentique", "Arâches-la-Frasse", 46.03458, 6.64014,
    "Zona del chalet indicada en Airbnb.", air("554166959336381972"),
    plan("chalet", "chalet-inicio", "chalet-villages"), ["avoriaz", "les-carroz"], true);
  pin("loft", "Grand Loft de Cluses", "Cluses", 46.0617, 6.5771,
    "Punto que publica el anfitrión en el mapa de Airbnb.", air("1616645430087654991"),
    [...plan("loft"), alternative("Añadir sauna al loft")], ["avoriaz"]);
  pin("modane", "Apartamento de Modane", "Modane", 45.1986, 6.6717,
    "Punto que publica el anfitrión en el mapa de Airbnb.", air("1608687334953694597"),
    plan("cenis", "orelle"), ["val-cenis", "orelle"]);
  pin("grinza", "La Grinza", "Termignon", 45.2756, 6.8175,
    "Punto de La Grinza en el mapa del anuncio.", air("1813189492585854487"),
    plan("grinza"), ["val-cenis"]);
  pin("flocons", "Les Flocons Verts", "Les Carroz", 46.022315, 6.641481,
    "Village de vacances Les Flocons Verts, 123 route des Servages.",
    "https://www.floconsverts.com/village-vacances-montagne",
    plan("carroz", "carroz-inicio", "flaine"), ["les-carroz", "flaine"]);
  pin("turche", "Apartamento de La Turche", "Les Gets", 46.150373, 6.667259,
    "Ubicación del apartamento en la route de la Turche.", plans.get("turche").houseLink[1],
    [...plan("turche"), six], ["avoriaz"]);
  pin("fleur", "Chalet Fleur des Alpes 1", "Les Gets", 46.151618, 6.656267,
    "443 route des Granges, dirección publicada para el chalet de seis plazas.",
    "https://www.booking.com/hotel/fr/chalet-fleur-des-alpes.html", [...plan("fleur"), six], ["avoriaz"]);
  pin("ancolie", "Fleur des Alpes · Ancolie", "Les Gets", 46.1516, 6.6561,
    "Conjunto Fleur des Alpes, route des Granges. La ficha de Ancolie no precisa el portal.",
    "https://www.hotelalpina.fr/fr/fleur-des-alpes-ancolie.html", plan("ancolie"), ["avoriaz"], true);
  pin("wahou", "Maison Wahou", "Taninges", 46.106427, 6.5869,
    "201 chemin de Maneguet. El anuncio de Four Seasons señala este mismo entorno.",
    "https://www.booking.com/hotel/fr/house-for-11-people-2-intimate-and-friendly-apartments.html",
    plan("wahou"), ["avoriaz"]);
  pin("four-seasons", "Four Seasons", "Taninges", 46.1064, 6.5869,
    "Punto del anuncio en el entorno de Maison Wahou. Son alojamientos distintos.", air("1450139159352270205"),
    plan("four-seasons"), ["avoriaz"]);
  pin("lesgets50", "Apartamento de 50 m²", "Les Gets", 46.14284, 6.64947,
    "Zona que publica Airbnb para el apartamento.", air("709895215411690566"),
    plan("lesgets50"), ["avoriaz"], true);
  pin("cosy", "Cosy Val Tho · Nazca", "Val Thorens", 45.296913, 6.575725,
    "Edificio Nazca de Les Temples du Soleil, barrio Soleil.",
    "https://www.maeva.com/fr-fr/residence-temples-du-soleil-nazca_104372.html",
    [...plan("cosy"), split], ["val-thorens"]);
  pin("cheval", "Résidence Cheval Blanc", "Val Thorens", 45.297, 6.57819,
    "Edificio Le Cheval Blanc, rue du Soleil.",
    "https://www.valthorens.com/hebergement-groupe/residence-le-cheval-blanc/",
    [...plan("cheval"), split], ["val-thorens"]);
  pin("o-saint-michel", "Ô Saint Michel", "Saint-Michel-de-Maurienne", 45.213058, 6.47734,
    "Punto del establecimiento publicado por Maurienne Tourisme.",
    "https://www.maurienne-tourisme.com/hebergement/o-saint-michel-chambres-d-hotes-7656170/",
    plan("saintmichel"), ["orelle"]);
  pin("saintmichel-apto", "Apartamento en Saint-Michel", "Saint-Michel-de-Maurienne", 45.21787, 6.47412,
    "Zona indicada por Airbnb en el casco antiguo.", air("768534789971067703"),
    plan("saintmichel-apto"), ["orelle"], true);
  pin("avoreaz", "Avoreaz G · Avoreaz 2", "Morzine", 46.177431, 6.706674,
    "Coordenadas del edificio publicadas por Cimalpes, junto a Retour des Nants.",
    "https://cimalpes.com/fr/location-morzine/appartement-avoreaz-g/", [alternative("Avoreaz G")], ["avoriaz"]);
  pin("sauna103", "Apartamento con sauna · 103 m²", "Les Gets", 46.1568, 6.66602,
    "Zona indicada por Sun Location para el apartamento FR-1-598-153.",
    "https://www.sunlocation.com/location-vacances/967047", [alternative("Apartamento con sauna · 103 m²")], [], true);
  pin("ceiba", "Ceiba · Carmine Lodge", "Les Gets", 46.1539755, 6.6639067,
    "775 route du Front de Neige. Coordenadas de Les Gets Réservation.",
    "https://reservation.lesgets.com/appartement-ceiba-les-gets-proche-centre.html", [alternative("Ceiba · Carmine Lodge")], []);
  pin("ourson", "La Voraz · L’Ourson", "Châtel", 46.275104, 6.838247,
    "191 route du Taude, dirección publicada por el chalet.",
    "https://chalet-la-voraz.fr/l-ourson", [alternative("Chalet La Voraz · L’Ourson")], []);
  pin("hi-valmeinier", "Auberge HI Valmeinier", "Valmeinier", 45.184381, 6.472051,
    "716 rue du Crey du Quart, Valmeinier Villages a 1.500 m.",
    "https://www.hifrance.org/auberges-de-jeunesse/auberge-de-jeunesse-valmeinier/", [alternative("Auberge HI Valmeinier")], ["orelle"]);
  pin("shantone", "Le Shantoné", "Beaune", 45.250882, 6.472691,
    "30 chemin de la Combette, en Beaune Grand Village.",
    "https://www.leshantone.fr/", [alternative("Le Shantoné")], ["orelle"]);
  pin("trois-vallees", "Hôtel des 3 Vallées", "Val Thorens", 45.296652, 6.583953,
    "1144 Grande Rue. Aquí dormiría una persona en la combinación de seis más uno.",
    "https://www.hotel3vallees.com/fr/contact-hotel-val-thorens.html", [split], ["val-thorens"]);
  pin("ucpa", "UCPA Val Thorens", "Val Thorens", 45.29808, 6.56939,
    "Centro UCPA, 240 rue des Pistes. Punto de la central de reservas de Val Thorens.",
    "https://reservation.valthorens.com/ucpa-sports-vacances.html", [alternative("UCPA · Pack Mini")], ["val-thorens"]);

  const origin = {
    id: "ecla", name: "Residencia Ecla Archamps", town: "Archamps", lat: 46.138908, lon: 6.121231,
    location: "Salida desde la residencia. Aquí dormiríais en la variante de dos excursiones.",
    source: "https://www.montsdugenevois.com/hp-affaires/residence-ecla-archamps-archamps-fr-6486025/",
    options: [alternative("Dos excursiones desde Archamps")], accesses: [],
  };
  for (const pin of list) pin.options = pin.options.filter(option => !option.ref.startsWith("plan/") || window.SKI_PLAN_ALLOWED(plans.get(option.ref.slice(5))));
  const visible = list.filter(pin => pin.options.length);
  const places = [...visible, origin];
  window.SKI_LODGINGS = {
    list: visible, origin,
    byId: (id) => places.find((p) => p.id === id),
    forOption: (ref) => places.filter((p) => p.options.some((o) => o.ref === ref)),
  };
})();
