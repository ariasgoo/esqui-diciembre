(() => {
  "use strict";

  const resorts = [
    {key: "avoriaz", label: "Avoriaz", areas: ["Avoriaz"], image: "avoriaz", access: "avoriaz",
      pro: "El forfait de apertura cuesta 50,50 € los dos días.", con: "Se duerme en el valle y se sube por Prodains."},
    {key: "val-thorens-orelle", label: "Val Thorens · Orelle", areas: ["Val Thorens–Orelle", "Val Thorens"], image: "orelle", access: "orelle",
      pro: "150 km de dominio y esquí de altura.", con: "Es el viaje más largo desde Ecla."},
    {key: "les-carroz", label: "Les Carroz", areas: ["Les Carroz"], image: "carroz", access: "les-carroz",
      pro: "El trayecto más corto. Podéis dormir a pie de remonte.", con: "Morillon y Sixt abren después del viaje."},
    {key: "val-cenis", label: "Val Cenis", areas: ["Val Cenis"], image: "cenis", access: "val-cenis",
      pro: "El pase de 49 € incluye dos días y concierto.", con: "Apertura parcial y alquiler de material por cotizar."},
    {key: "flaine", label: "Flaine", areas: ["Flaine"], image: "flaine", access: "flaine",
      pro: "Pistas de altura a poco más de una hora de Ecla.", con: "El hotel está en Les Carroz. Falta el precio del material."},
  ];
  const featuredIds = ["loft", "chalet", "orelle", "carroz"];
  const featuredResorts = resorts.slice(0, 3);

  const summaries = {
    loft: {title: "Loft de Cluses", pro: "Tres dormitorios. El plan más barato para siete.", con: "40–45 min en coche hasta el teleférico."},
    chalet: {title: "Chalet de Arâches", pro: "Granja alpina de 160 m² con chimenea y jacuzzi privado.", con: "50 min en coche hasta el teleférico."},
    orelle: {title: "Apartamento de Modane", pro: "Tres dormitorios a 15 min en coche de la cabina.", con: "Hay que llevar sábanas y toallas."},
    carroz: {title: "Hotel Les Flocons Verts", pro: "12 min a pie hasta la telecabina de Kédeuze.", con: "Una habitación de 30 m² para los siete."},
    cenis: {title: "Apartamento de Modane", pro: "La noche cuesta 95 € entre siete.", con: "30 min en coche al remonte. Falta cotizar el material."},
    turche: {title: "Apartamento de La Turche", pro: "Dos baños y 20 min en coche al acceso de Avoriaz.", con: "La última tarifa para siete sigue por reconfirmar."},
    wahou: {title: "Maison Wahou", pro: "Una cama para cada persona.", con: "30 min en coche hasta el teleférico."},
    grinza: {title: "Dúplex La Grinza", pro: "Dos baños y 10 min en coche al acceso del festival.", con: "Alojamiento de estreno. Falta cotizar el material."},
    flaine: {title: "Les Flocons Verts · Flaine", pro: "La habitación cuesta 115 € para siete.", con: "20 min en coche a Flaine. Falta cotizar el material."},
    cosy: {title: "Cosy Val Tho", pro: "Salida y vuelta con esquís si abre la pista de la residencia.", con: "El paquete publicado admite seis personas."},
    cheval: {title: "Résidence Cheval Blanc", pro: "Acceso directo si abre la pista de la residencia.", con: "El paquete publicado admite seis personas."},
    fleur: {title: "Chalet Fleur des Alpes", pro: "Balcón, dos baños y acceso al spa del Hôtel Alpina.", con: "Oferta para seis. La llegada el sábado para siete sigue por confirmar."},
    saintmichel: {title: "Hotel Ô Saint Michel", pro: "Desayuno incluido y 6 min en coche a la cabina.", con: "Distribución y tarifa para siete por confirmar."},
    "four-seasons": {title: "Four Seasons de Taninges", pro: "Tres dormitorios y terraza.", con: "30 min en coche al acceso de Avoriaz."},
    lesgets50: {title: "Apartamento de Les Gets", pro: "Siete plazas y 20 min en coche al acceso de Avoriaz.", con: "Las pistas junto al pueblo requieren otro forfait."},
    "saintmichel-apto": {title: "Apartamento de Saint-Michel", pro: "Tres dormitorios y 7–10 min en coche a la cabina.", con: "El forfait se compra en taquilla cada día."},
    "chalet-villages": {title: "Chalet de Arâches · Villages", pro: "Jacuzzi privado y cabina a 4 min en coche.", con: "El sendero a pie depende de su estado en invierno."},
  };
  const slug = name => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/g, "");
  const archivedStations = window.ARCHIVE.filter(a => a.kind === "Estación")
    .map(a => ({key: slug(a.name), label: a.name, reference: a.name, areas: []}));
  const secondaryStations = [...resorts.slice(3), ...archivedStations];
  const stations = [...featuredResorts, ...secondaryStations];
  const variants = {
    avoriaz: ["Cómo cambiaba la noche de 6 a 7", "Packs de los eventos", "Una estación cada día", "Dos excursiones desde Archamps", "Añadir sauna al loft", "Otras tiendas de alquiler"],
    "val-cenis": ["Packs de los eventos"],
    "val-thorens-orelle": ["Auberge HI Valmeinier", "Le Shantoné", "Dos reservas de Esquiades", "UCPA · Pack Mini"],
    "morzine-les-gets-y-chatel": ["Chalet La Voraz · L’Ourson"],
    "le-grand-bornand": ["Una estación cada día"],
    "la-clusaz": ["Una estación cada día"],
  };
  const forPlan = plan => resorts.find(station => station.areas.includes(plan.area));
  const plansFor = station => window.PLANS.filter(p => window.SKI_PLAN_ALLOWED(p) && forPlan(p) === station);
  const guideFor = station => window.SKI_STATION_GUIDE[station.key];
  const factsFor = station => window.SKI_RESORT_FACTS[station.key];
  const linksForStation = station => {
    const names = new Set([station.reference, ...(variants[station.key] || [])]);
    return window.ARCHIVE.flatMap((entry, index) =>
      names.has(entry.name) && window.SKI_ARCHIVE_ALLOWED(entry) ? [{entry, index}] : []);
  };

  function tradeoffs(pro, con) {
    const line = (mark, label, value) => value ? `<div><dt><span aria-hidden="true">${mark}</span><span class="choice-sr">${label}</span></dt><dd>${e(value)}</dd></div>` : "";
    return `<dl class="choice-trades">${line("+", "A favor", pro)}${line("−", "En contra", con)}</dl>`;
  }

  function optionRow(plan) {
    const summary = summaries[plan.id] || plan;
    const link = "#plan/" + plan.id;
    const priceUnit = state.unit === "group" ? "grupo de " + person(plan) : "persona";
    return `<article class="choice-option">
      <a class="choice-option-link" href="${link}">
        ${picture(plan.media, "", false)}
        <div class="choice-option-copy"><h3>${e(summary.title)} ${icon("arrow")}</h3>
          ${tradeoffs(summary.pro, summary.con)}</div>
      </a>
      <div class="choice-action"><div class="choice-price"><strong>${e(labelPrice(plan))}</strong><small>/ ${e(priceUnit)}</small></div>
        ${voteControl(plan.id)}</div>
    </article>`;
  }

  function stationFacts(station) {
    const trip = guideFor(station).trips[0], facts = factsFor(station);
    const [distance, duration] = trip.value.split(" · ");
    const journey = duration ? duration + " · " + distance : distance;
    return `<dl class="choice-stats"><div><dt>Desde Ecla Archamps</dt><dd>${e(journey)}</dd></div>
      ${facts ? `<div><dt>12–13 dic · estimación propia</dt><dd>${e(facts.opening)} <small>de ${e(facts.km.split(" · ")[0])}</small></dd></div>` : ""}</dl>`;
  }

  function mapLink(station) {
    const url = station.access ? "#mapa/" + station.access : guideFor(station).trips[0].url;
    const attrs = station.access ? "" : 'target="_blank" rel="noopener noreferrer"';
    return `<a class="choice-route" href="${e(url)}" ${attrs} aria-label="Ver ruta a ${e(station.label)}">${icon("map")} Mapa</a>`;
  }

  function choiceGroup(station, matching) {
    if (!matching.length) return "";
    return `<section class="choice-group" aria-label="${e(station.label)}">
      <div class="choice-resort"><div class="choice-resort-title"><h2><a href="#estacion/${station.key}">${e(station.label)} ${icon("arrow")}</a></h2>${mapLink(station)}</div>
        ${stationFacts(station)}${tradeoffs(station.pro, station.con)}</div>
      <div class="choice-options">${matching.map(optionRow).join("")}</div>
    </section>`;
  }

  function isAccessMatch(plan) {
    return matchesAccess(window.SKI_ACCESS.plans[plan.id], state.accessFilter);
  }
  function filterControl(view) {
    return `<label class="choice-filter"><span class="choice-sr">Acceso desde el alojamiento</span><select data-access-filter="${view}">
      ${[["all","Todos los accesos"],["a-pie","A pie a pistas"],["en-coche","En coche a pistas"],["con-esquis","Directo con esquís"]]
        .map(([key,label]) => `<option value="${key}"${state.accessFilter === key ? " selected" : ""}>${label}</option>`).join("")}
      </select></label>`;
  }
  function indexPage() {
    const selected = featuredIds.map(lookup).filter(p => p && isAccessMatch(p));
    return `<header class="choice-intro">${heading("Elige tus planes") + '<p data-selection-hint>' + e(window.SKI_VOTING?.selectionHint() || "Cargando votos…") + '</p>'}<a class="choice-result-link" href="#votaciones">Ver votos ${icon("forward")}</a></header>
      <div class="choice-toolbar"><p>Precio por persona · Una noche, dos días de forfait y material. Consigna aparte.</p>${filterControl("planes")}</div>
      <div class="choice-list">${selected.length ? featuredResorts.map(s => choiceGroup(s, selected.filter(p => forPlan(p) === s))).join("") :
        `<p class="choice-empty">Ningún favorito tiene este acceso. <a href="#planes">Ver los cuatro planes</a></p>`}</div>
      <div class="choice-foot"><a href="#otras${state.accessFilter !== "all" ? "/" + state.accessFilter : ""}">${icon("archive")} Otras opciones ${icon("arrow")}</a>
      <small>Precios orientativos. Kilómetros abiertos según estimación propia.</small></div>`;
  }

  function skiInfo(station) {
    const facts = factsFor(station), guide = guideFor(station);
    const trail = facts?.map ? `<a class="choice-route" href="${e(facts.map)}" target="_blank" rel="noopener noreferrer">${icon("mountain")} Plano oficial de pistas ${icon("external")}</a>` : "";
    const colors = facts?.colors ? `<div class="choice-colors">${facts.colors.map((count,i) =>
      `<span><i class="piste-${i}"></i>${count} ${["verdes","azules","rojas","negras"][i]}</span>`).join("")}</div>
      <p class="fine">Número de pistas del dominio completo. El operador no desglosa los kilómetros por color.</p>` : "";
    const villages = station.key === "les-carroz" ? "<p>Villages suma 145 km y 78 pistas. El sector local de Les Carroz tiene 34 km.</p>" : "";
    const additionalTrips = guide.trips.slice(1).map(t => `<p>${e(t.label)} desde Ecla · ${e(t.value)}</p>`).join("");
    return `${station.image ? picture(station.image, station.label) : ""}<div>${trail}${colors}${villages}<p>${e(guide.dates)}</p>
      ${facts ? '<p class="fine">El rango de apertura es una estimación propia. El operador aún no ha confirmado los kilómetros de ese fin de semana.</p>' : ""}
      ${additionalTrips}<button class="choice-route" data-sources>${icon("book")} Recursos</button></div>`;
  }
  function detailPage(station) {
    const main = featuredResorts.includes(station);
    const guide = guideFor(station);
    const all = plansFor(station);
    const primary = all.filter(p => (!main || featuredIds.includes(p.id)) && isAccessMatch(p));
    const others = main ? all.filter(p => !featuredIds.includes(p.id) && isAccessMatch(p)) : [];
    const links = linksForStation(station);
    const extraLinks = links.map(({entry,index}) => `<a class="secondary-choice-link" href="#otras/${index}">${e(entry.name)} ${icon("arrow")}</a>`).join("");
    return `<a class="back" href="${main ? "#planes" : "#otras"}">${icon("back")} ${main ? "Opciones" : "Otras opciones"}</a>
      <div class="choice-detail-title">${heading(station.label)}${mapLink(station)}</div>
      <div class="choice-detail-facts">${stationFacts(station)}${tradeoffs(station.pro || guide.pros[0], station.con || guide.cons[0])}</div>
      ${all.length ? `<section class="choice-stays"><div class="choice-stays-title"><h2>Alojamientos</h2>${filterControl("estacion")}</div>
        ${primary.length ? primary.map(optionRow).join("") : '<p class="choice-empty">Ningún alojamiento de la selección tiene este acceso.</p>'}</section>` : ""}
      <details class="choice-disclosure"><summary>Pistas y apertura ${icon("arrow")}</summary><div class="choice-terrain">${skiInfo(station)}</div></details>
      ${others.length || links.length ? `<details class="choice-disclosure"><summary>Otras opciones de la estación ${icon("arrow")}</summary>
        ${others.map(optionRow).join("")}${extraLinks}</details>` : ""}`;
  }
  function resources(station) {
    const guide = guideFor(station), facts = factsFor(station);
    return [
      ...(facts?.sources || []), ...(facts?.map ? [["Mapa oficial de pistas", facts.map]] : []),
      ...guide.sources, ...guide.trips.map(t => ["Desde Ecla · " + t.label, t.url]),
      ["Cálculo de rutas · OSRM y OpenStreetMap", "https://project-osrm.org/"],
      ...plansFor(station).flatMap(linksFor), ...linksForStation(station).flatMap(({entry}) => archiveLinks(entry)),
    ];
  }
  function page(key) {
    const station = stations.find(s => s.key === key);
    return station ? detailPage(station) : indexPage();
  }
  window.SKI_STATIONS = {stations, secondaryStations, featuredIds, forPlan, planSummary: id => summaries[id], optionRow, page, resources};
})();
