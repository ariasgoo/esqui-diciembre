(() => {
  "use strict";

  // The forfait determines the group, even when accommodation is in another resort.
  const mainStations = [
    {
      key: "avoriaz",
      label: "Avoriaz",
      areas: ["Avoriaz"],
      image: "avoriaz",
      description: "Rock On Snow y acceso desde el valle por Les Prodains.",
      access: [{ key: "avoriaz", label: "Les Prodains" }],
    },
    {
      key: "les-carroz",
      label: "Les Carroz",
      areas: ["Les Carroz"],
      image: "carroz",
      description:
        "Dos tipos de forfait desde Les Carroz, iniciación o Villages.",
      access: [{ key: "les-carroz", label: "Kédeuze" }],
    },
    {
      key: "flaine",
      label: "Flaine",
      areas: ["Flaine"],
      image: "flaine",
      description: "Forfait local de Flaine con alojamiento en Les Carroz.",
      access: [{ key: "flaine", label: "Flaine Forum" }],
    },
    {
      key: "val-cenis",
      label: "Val Cenis",
      areas: ["Val Cenis"],
      image: "cenis",
      description:
        "El forfait Tous en Piste incluye las dos jornadas. La recogida es en Vieux Moulin.",
      access: [{ key: "val-cenis", label: "Vieux Moulin" }],
    },
    {
      key: "val-thorens-orelle",
      label: "Val Thorens–Orelle",
      areas: ["Val Thorens", "Val Thorens–Orelle"],
      image: "orelle",
      description:
        "Podéis subir en telecabina desde Orelle o dormir en la propia estación de Val Thorens.",
      access: [
        { key: "orelle", label: "Orelle" },
        { key: "val-thorens", label: "Val Thorens" },
      ],
    },
  ];
  const slug = (name) =>
    name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/g, "");
  const otherStations = window.ARCHIVE.filter(
    (entry) => entry.kind === "Estación",
  ).map((entry) => ({
    key: slug(entry.name),
    label: entry.name,
    description: entry.description,
    reference: entry.name,
    areas: [],
    access: [],
  }));
  const stations = [...mainStations, ...otherStations];

  const resortAlternatives = {
    avoriaz: [
      "Avoreaz G",
      "Apartamento con sauna · 103 m²",
      "Cómo cambiaba la noche de 6 a 7",
      "Packs de los eventos",
      "Una estación cada día",
      "Dos excursiones desde Archamps",
      "Añadir sauna al loft",
      "Otras tiendas de alquiler",
    ],
    "val-cenis": ["Packs de los eventos"],
    "val-thorens-orelle": [
      "Auberge HI Valmeinier",
      "Le Shantoné",
      "Dos reservas de Esquiades",
      "UCPA · Pack Mini",
    ],
    "morzine-les-gets-y-chatel": [
      "Avoreaz G",
      "Apartamento con sauna · 103 m²",
      "Ceiba · Carmine Lodge",
      "Chalet La Voraz · L’Ourson",
    ],
    "le-grand-bornand": ["Una estación cada día"],
    "la-clusaz": ["Una estación cada día"],
  };

  const forPlan = (plan) =>
    mainStations.find((station) => station.areas.includes(plan.area));
  const stationHref = (station) => "#estacion/" + station.key;
  const plansFor = (station) =>
    window.PLANS.filter((plan) => forPlan(plan) === station);
  const linksForStation = (station) => {
    const names = new Set([
      station.reference,
      ...(resortAlternatives[station.key] || []),
    ]);
    return window.ARCHIVE.flatMap((entry, index) =>
      names.has(entry.name) ? [{ entry, index }] : [],
    );
  };

  function optionGroup(list, heading, key) {
    return (
      '<optgroup label="' +
      e(heading) +
      '">' +
      list
        .map(
          (station) =>
            '<option value="' +
            station.key +
            '"' +
            (station.key === key ? " selected" : "") +
            ">" +
            e(station.label) +
            "</option>",
        )
        .join("") +
      "</optgroup>"
    );
  }

  function stationChooser(key) {
    return (
      '<label class="station-select"><span class="sr-station">Cambiar de estación</span>' +
      '<select data-station-select aria-label="Cambiar de estación">' +
      optionGroup(mainStations, "Estaciones con planes", key) +
      optionGroup(otherStations, "Otras estaciones", key) +
      "</select></label>"
    );
  }

  const plural = (count) => (count === 1 ? "1 plan" : count + " planes");

  function mainStationRow(station) {
    const plans = plansFor(station);
    const prices = plans
      .filter((p) => person(p) === 7)
      .map((p) => budget(p).low)
      .filter((price) => price !== null && Number.isFinite(price));
    const price = prices.length
      ? "Desde " + money(Math.min(...prices)) + (station.areas.includes("Avoriaz") ? " + consigna" : "")
      : "Pendiente";
    return (
      '<a class="station-row" href="' +
      stationHref(station) +
      '">' +
      picture(station.image, station.label) +
      '<div class="station-row-title"><h3>' +
      e(station.label) +
      "</h3><span>" +
      e(plural(plans.length)) +
      " · " +
      e(station.access.map((a) => a.label).join(" / ")) +
      "</span></div>" +
      '<span class="station-price"><b>' +
      e(price) +
      "</b><small>" +
      (state.unit === "group" ? "grupo de 7" : "por persona") +
      "</small></span>" +
      icon("arrow") +
      "</a>"
    );
  }

  function indexPage() {
    return (
      heading(
        "Planes por estación",
        "Base de alojamiento para siete, dos días de forfait y material. El suplemento de consigna se indica en cada plan.",
      ) +
      controls() +
      '<div class="station-list">' +
      mainStations.map(mainStationRow).join("") +
      "</div>" +
      '<details class="station-other"><summary>Otras estaciones estudiadas <span>' +
      otherStations.length +
      "</span>" +
      icon("arrow") +
      '</summary><div class="station-secondary">' +
      otherStations
        .map(
          (s) =>
            '<a href="' +
            stationHref(s) +
            '">' +
            e(s.label) +
            icon("arrow") +
            "</a>",
        )
        .join("") +
      "</div></details>"
    );
  }

  function planSection(label, matching) {
    if (!matching.length) return "";
    const sorted = [...matching].sort(
      (a, b) => (budget(a).low ?? Infinity) - (budget(b).low ?? Infinity),
    );
    return (
      '<section class="station-plans"><div class="sectionhead"><h2>' +
      e(label) +
      '</h2><span class="minor">' +
      e(plural(sorted.length)) +
      '</span></div><div class="gridcards">' +
      sorted.map(planCard).join("") +
      "</div></section>"
    );
  }

  function catalogueSection(station, links) {
    if (!links.length) return "";
    const singleStation = !!station.reference && links.length === 1;
    const title = station.reference
      ? "Opciones estudiadas"
      : "Otras opciones y variantes";
    return (
      '<section class="station-catalogue">' +
      (singleStation ? "" : "<h2>" + title + "</h2>") +
      '<div class="station-secondary">' +
      links
        .map(
          ({ entry, index }) =>
            '<a href="#otras/' +
            index +
            '"><span><strong>' +
            e(singleStation ? "Ver ficha de la estación" : entry.name) +
            "</strong><small>" +
            e(entry.price) +
            "</small></span>" +
            icon("arrow") +
            "</a>",
        )
        .join("") +
      "</div></section>"
    );
  }

  function detailPage(station) {
    const original = plansFor(station);
    const originalCatalogue = linksForStation(station);
    const active = state.accessFilter;
    const all = original.filter((plan) => matchesAccess(window.SKI_ACCESS.plans[plan.id], active));
    const alternatives = originalCatalogue.filter(({index}) => matchesAccess(window.SKI_ACCESS.archive[index], active));
    const mapLinks = station.access
      .map(
        (access) =>
          '<a class="quiet" href="#mapa/' +
          access.key +
          '">' +
          icon("pin") +
          "Ruta a " +
          e(access.label) +
          "</a>",
      )
      .join("");
    return (
      '<div class="station-tools"><a class="back" href="#estaciones">' +
      icon("back") +
      "Todas las estaciones</a>" +
      stationChooser(station.key) +
      "</div>" +
      heading(station.label, station.description) +
      (mapLinks
        ? '<nav aria-label="Rutas desde Ecla" class="station-routes">' +
          mapLinks +
          "</nav>"
        : "") +
      (original.length ? controls() : "") +
      accessControls("estacion") + accessNote(active) +
      (!all.length && !alternatives.length ? emptyOptions() : "") +
      planSection(
        "Para siete",
        all.filter((p) => person(p) === 7),
      ) +
      planSection(
        "Ofertas para seis",
        all.filter((p) => person(p) !== 7),
      ) +
      catalogueSection(station, alternatives)
    );
  }

  function page(key) {
    const station = stations.find((s) => s.key === key);
    return station ? detailPage(station) : indexPage();
  }

  document.addEventListener("change", (event) => {
    if (event.target.matches("select[data-station-select]")) {
      location.hash = "#estacion/" + event.target.value;
    }
  });

  function resources(station) {
    const main = plansFor(station).flatMap(linksFor);
    const alternatives = linksForStation(station).flatMap(({ entry }) =>
      archiveLinks(entry),
    );
    return [...main, ...alternatives];
  }

  window.SKI_STATIONS = { stations, forPlan, page, resources };
})();
