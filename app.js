"use strict";
const $ = (s) => document.querySelector(s);
const plans = window.PLANS;
const media = window.MEDIA || {};
const archive = window.ARCHIVE || [];
const routes = window.ROUTES || {};
const e = (s) =>
  String(s == null ? "" : s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const paths = {
  home: '<path d="m3 10 9-7.5 9 7.5v10H6v-10"/><path d="M10 20v-6h5v6"/>',
  plans:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16m-5-10h18"/>',
  chart: '<path d="M4 4v16h17M8 16v-5m5 5V6m5 10V9"/>',
  archive:
    '<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v11h14V9m-10 4h6"/>',
  book: '<path d="M3 4h6a4 4 0 0 1 3 2v14a5 5 0 0 0-4-2H3Zm18 0h-6a4 4 0 0 0-3 2v14a5 5 0 0 1 4-2h5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20 14.5A8.7 8.7 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5m10-5v5M3 11h18"/>',
  people:
    '<circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-7 13-7 13 0m0-15c4.5 0 4.5 6 0 6m2 3c3 .5 4 2.5 4 5"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  arrow: '<path d="m9 5 7 7-7 7"/>',
  forward: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  external: '<path d="M10 5H5v14h14v-5m-6-10h7v7m0-7-9 9"/>',
  water:
    '<path d="M3 17c2 2 4-2 6 0s4-2 6 0 4-2 6 0M7 3c-3 4 3 5 0 9m5-9c-3 4 3 5 0 9m5-9c-3 4 3 5 0 9"/>',
  mountain: '<path d="m2 20 6.5-11 4 6 3-11L22 20Z"/>',
  map: '<path d="m2.5 5.8 6-2.4 7 2.8 6-2.4v14.4l-6 2.4-7-2.8-6 2.4Z"/><path d="M8.5 3.4v14.4m7-11.6v14.4"/>',
  bed: '<path d="M3 19V7m18 12V9m-18 6h18M6 11V7h4a3 3 0 0 1 3 3v1m-10 0h15a3 3 0 0 1 3 3"/>',
  gear: '<path d="m4 18 11-13c1.6-1.8 3.2-1.5 3.6-.7M5 21 17 7M4 6l13 13m-2-1.3 3.3-3.1M3 4l2 2"/>',
  ticket:
    '<path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4Z"/><path d="M15 7.5V9m0 2v2m0 2v1.5"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v12H3Z"/><circle cx="12" cy="13" r="3"/>',
};
function icon(k) {
  return (
    '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">' +
    (paths[k] || "") +
    "</svg>"
  );
}
const tabs = [
  ["inicio", "home", "Resumen"],
  ["planes", "plans", "Todos los planes", "Planes"],
  ["estaciones", "mountain", "Por estación", "Estaciones"],
  ["mapa", "map", "Mapa"],
  ["comparar", "chart", "Comparador"],
  ["otras", "archive", "Otras opciones", "Otras"],
];
const fmt = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
const money = (v) => fmt.format(v);
const person = (p) => p.n || 7;
const lookup = (id) => plans.find((p) => p.id === id);
const state = {
  unit: "person",
  student: true,
  view: "todos",
  query: "",
  selection: ["cenis", "loft", "chalet"],
  archiveKind: "Todas",
};
const hasSpa = (p) => !!p.spa && !p.sauna?.startsWith("Externa");
function budget(p) {
  const n = person(p),
    scale = state.unit === "group" ? n : 1;
  const pass = p.adultPass && !state.student ? p.adultPass : p.pass;
  const parts = [
    p.night == null ? null : (p.night / n) * scale,
    pass * scale,
    p.gear[0] * scale,
    ((p.card || 0) + (p.fee || 0) / n) * scale,
  ];
  const upper = parts[2] + (p.gear[1] - p.gear[0]) * scale;
  const low = p.night == null ? null : parts.reduce((a, b) => a + b, 0);
  return {
    parts,
    upper,
    low,
    high: low == null ? null : low + upper - parts[2],
  };
}
function range(a, b) {
  if (a == null) return "Sin tarifa";
  return Math.abs(a - b) < 0.005
    ? money(a)
    : money(a).replace(/\s?€$/, "") + "–" + money(b);
}
function labelPrice(p) {
  const b = budget(p);
  return range(b.low, b.high);
}
function unit(p) {
  return state.unit === "group" ? "grupo de " + person(p) : "persona";
}
function getRoute(p) {
  return routes[p.route] || {};
}
function recordHash() {
  try {
    return decodeURIComponent(location.hash.slice(1)) || "inicio";
  } catch {
    return "inicio";
  }
}
function imgTag(item, priority = false) {
  if (!item) return "";
  return (
    '<img class="photo" src="' +
    e(item.url) +
    '" alt="' +
    e(item.alt) +
    '" loading="' +
    (priority ? "eager" : "lazy") +
    '" decoding="async" referrerpolicy="no-referrer">'
  );
}
function picture(key, label, priority = false) {
  const item = media[key]?.[0];
  return (
    '<div class="picture"><span class="fallback">' +
    icon("camera") +
    e(label) +
    "</span>" +
    imgTag(item, priority) +
    "</div>"
  );
}
function showTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  $("#theme").innerHTML =
    icon(dark ? "sun" : "moon") + (dark ? "Modo claro" : "Modo oscuro");
}
try {
  if (localStorage.getItem("ski-theme") === "dark")
    document.documentElement.dataset.theme = "dark";
} catch {}
showTheme();
$("#theme").onclick = () => {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("ski-theme", next);
  } catch {}
  showTheme();
};
$("#sourceTop").innerHTML = icon("book") + "<span>Recursos</span>";
function heading(title, sub) {
  return (
    '<div class="heading"><h1>' +
    e(title) +
    "</h1>" +
    (sub ? "<p>" + e(sub) + "</p>" : "") +
    "</div>"
  );
}
function controls() {
  return (
    '<div class="controls"><div class="switch" role="group" aria-label="Importes">' +
    [
      ["person", "Por persona"],
      ["group", "Grupo"],
    ]
      .map(
        ([k, n]) =>
          '<button data-unit="' +
          k +
          '" aria-pressed="' +
          (state.unit === k) +
          '">' +
          n +
          "</button>",
      )
      .join("") +
    '</div><label class="student"><input type="checkbox" data-student ' +
    (state.student ? "checked" : "") +
    "> Carné de estudiante</label></div>"
  );
}
function facts() {
  return (
    '<div class="facts"><span>' +
    icon("calendar") +
    "12–13 dic 2026</span><span>" +
    icon("people") +
    "7 amigos · 20 años</span><span>" +
    icon("pin") +
    "Ecla Archamps</span></div>"
  );
}
const categories = ["Alojamiento", "Forfait", "Material", "Soporte y gestión"];
function legend() {
  return (
    '<div class="legend">' +
    categories
      .map((x, i) => '<span><i class="s' + i + '"></i>' + x + "</span>")
      .join("") +
    "</div>"
  );
}
function chartRow(p, max) {
  const b = budget(p);
  if (b.low == null) return "";
  return (
    '<a class="chartrow" href="#plan/' +
    p.id +
    '"><span class="chartname">' +
    e(p.short) +
    '</span><span class="bartrack"><span class="barline" style="width:' +
    ((b.low / max) * 100).toFixed(2) +
    '%">' +
    b.parts
      .map((v, i) =>
        v > 0
          ? '<i class="s' +
            i +
            '" style="flex:' +
            v +
            '" title="' +
            categories[i] +
            " " +
            e(money(v)) +
            '"></i>'
          : "",
      )
      .join("") +
    "</span></span><strong>" +
    e(labelPrice(p)) +
    "</strong></a>"
  );
}
function budgetChart(list) {
  const max = Math.max(...list.map((p) => budget(p).high || 0), 1);
  return (
    '<div class="chart">' +
    legend() +
    list.map((p) => chartRow(p, max)).join("") +
    '<p class="fine">Las barras usan el extremo inferior. El intervalo recoge las opciones de material.</p></div>'
  );
}
const podium = [
  {
    id: "chalet",
    name: "Chalet con jacuzzi · Avoriaz",
    why: "Tenéis 160 m², chimenea y jacuzzi privado para los siete. Cuesta 11,86 € más por persona que el loft de Cluses.",
    tradeoff: "Del chalet a Les Prodains, unos 50 min en coche.",
  },
  {
    id: "cenis",
    name: "Val Cenis + noche en Modane",
    why: "Es el más barato. La casa sale a 13,57 € por persona y el forfait incluye el concierto.",
    tradeoff: "Desde Ecla al festival, unas 2 h 30. Material en Orelle.",
  },
  {
    id: "carroz-inicio",
    name: "Les Carroz + Flocons Verts",
    why: "Si estáis aprendiendo, dormís a 80 m de la cinta y tenéis sauna en el hotel.",
    tradeoff: "Forfait de iniciación, sujeto a apertura. Sauna aparte.",
  },
];
function podiumSection() {
  const [first, ...runners] = podium;
  const top = lookup(first.id);
  const others = runners
    .map((item, index) => {
      const p = lookup(item.id);
      return `<li><a class="podium-runner" href="#plan/${p.id}">
      <span class="podium-rank" aria-label="Puesto ${index + 2}">${index + 2}</span>
      <div class="runner-body"><h3>${e(item.name)}</h3><b>${e(labelPrice(p))} <small>/ ${e(unit(p))}</small></b>
      <p>${e(item.why)}</p><span class="runner-note">${e(item.tradeoff)}</span></div></a></li>`;
    })
    .join("");
  return `<section id="podio" class="podium" aria-labelledby="podium-title">
    <div class="sectionhead"><h2 id="podium-title">Mi podio para los siete</h2>
    <a class="textlink" href="#comparar/podio">Comparar los tres ${icon("forward")}</a></div>
    <ol class="podium-list">
      <li class="podium-first"><a class="hero" href="#plan/${top.id}">
      ${picture(top.media, top.home, true)}<div class="heroshade"></div>
      <div class="heroin"><span class="herotag">Primer puesto</span>
      <h3>${e(first.name)}</h3><p>${e(first.why)}</p>
      <div class="herolast"><b>${e(labelPrice(top))} <small>/ ${e(unit(top))}</small></b><span class="circle">${icon("forward")}</span></div>
      </div></a><div class="podium-tradeoff">${icon("pin")}${e(first.tradeoff)}</div></li>
      ${others}
    </ol></section>`;
}
function homePage() {
  return (
    heading(
      "Esquí en diciembre",
      "Una noche en los Alpes franceses y dos días en pistas.",
    ) +
    facts() +
    podiumSection() +
    '<section><div class="sectionhead"><h2>El precio de un vistazo</h2><a class="textlink" href="#comparar">Comparar planes ' +
    icon("forward") +
    "</a></div>" +
    controls() +
    budgetChart(
      ["cenis", "carroz-inicio", "loft", "chalet", "orelle"].map(lookup),
    ) +
    '<p class="fine">Cada total cubre una noche, dos días de forfait y material y los cargos conocidos. Para incluir la estimación inicial de comida, sumad 30 € por persona. Desplazamientos y extras opcionales van aparte.</p></section>' +
    '<section class="notes"><h2>Cuándo reservaría</h2><div><b>Ahora</b><p>Elegiría una casa con cancelación para siete y reservaría el material al confirmar las tallas.</p></div><div><b>7–10 de diciembre</b><p>Revisaría qué remontes abren antes de pagar los forfaits o una casa no reembolsable. Las tarifas de apertura pueden agotarse antes.</p></div></section>'
  );
}
function planCard(p) {
  const b = budget(p);
  return (
    '<a class="plancard" href="#plan/' +
    p.id +
    '">' +
    picture(p.media, p.home) +
    '<div class="cardbody"><div class="minor">' +
    e(p.area) +
    " · " +
    person(p) +
    " personas</div><h3>" +
    e(p.title) +
    '</h3><div class="cardline"><b>' +
    e(labelPrice(p)) +
    "</b>" +
    (b.low == null ? "" : "<small>/ " + unit(p) + "</small>") +
    '</div><div class="cardmeta">' +
    e(p.status || p.tag || p.capacity) +
    "</div></div></a>"
  );
}
function plansPage() {
  const filters = [
    ["todos", "Todos"],
    ["siete", "Para siete"],
    ["spa", "Con spa del alojamiento"],
    ["seis", "Solo seis"],
  ];
  const matching = plans
    .filter(
      (p) =>
        state.view === "todos" ||
        (state.view === "siete" && !p.cap6) ||
        (state.view === "seis" && p.cap6) ||
        (state.view === "spa" && hasSpa(p)),
    )
    .sort((a, b) => (budget(a).low ?? Infinity) - (budget(b).low ?? Infinity));
  return (
    heading(
      "Todos los planes",
      "Abre una ficha para ver fotos, rutas, servicios y precios.",
    ) +
    '<a class="entrylink" href="#estaciones">' +
    icon("mountain") +
    " Ver planes por estación " +
    icon("forward") +
    "</a>" +
    controls() +
    '<div class="filterbar">' +
    filters
      .map(
        ([k, v]) =>
          '<button data-filter="' +
          k +
          '" aria-pressed="' +
          (k === state.view) +
          '">' +
          e(v) +
          "</button>",
      )
      .join("") +
    '</div><div class="gridcards">' +
    matching.map(planCard).join("") +
    "</div>"
  );
}
function routeRows(p) {
  const r = getRoute(p);
  return [
    ["Acceso utilizado", r.lift],
    ["Ecla → alojamiento", r.originHome],
    ["Ecla → acceso al dominio", r.originLift],
    ["Alojamiento → acceso en coche", r.homeLift],
    ["Alojamiento → pistas a pie", r.walk],
    ["Ir y volver esquiando", r.ski],
  ];
}
function rows(list) {
  return (
    '<dl class="datarows">' +
    list
      .map(
        ([k, v]) =>
          "<div><dt>" +
          e(k) +
          "</dt><dd>" +
          e(v ?? "Pendiente de confirmar") +
          "</dd></div>",
      )
      .join("") +
    "</dl>"
  );
}
function priceDetails(p) {
  const b = budget(p);
  return (
    '<div class="sectionhead"><h2>Desglose</h2><span class="minor">' +
    e(unit(p)) +
    "</span></div>" +
    legend() +
    rows(
      categories.map((x, i) => [
        x,
        i === 2
          ? range(b.parts[i], b.upper)
          : b.parts[i] == null
            ? "Sin tarifa"
            : money(b.parts[i]),
      ]),
    ) +
    '<div class="total"><span>Total</span><strong>' +
    e(labelPrice(p)) +
    "</strong></div>"
  );
}
function figure(items, kind) {
  if (!items?.length)
    return (
      '<div class="no-photo">' +
      icon("camera") +
      " Sin foto verificada de " +
      e(kind.toLowerCase()) +
      "</div>"
    );
  return (
    '<figure class="gallery" data-index="0"><div class="gallerybox"><span class="fallback">' +
    icon("camera") +
    " Foto en Recursos</span>" +
    items
      .map(
        (m, i) =>
          '<button class="slide" aria-label="Ampliar foto: ' +
          e(m.alt) +
          '" data-zoom data-caption="' +
          e(m.alt) +
          '"' +
          (i ? " hidden" : "") +
          ">" +
          imgTag(m, true) +
          "</button>",
      )
      .join("") +
    "</div><figcaption><span>" +
    e(kind) +
    "</span>" +
    (items.length > 1
      ? '<span class="gallerynav"><button data-slide="-1" aria-label="Foto anterior de ' +
        e(kind) +
        '">‹</button><span class="count">1 / ' +
        items.length +
        '</span><button data-slide="1" aria-label="Foto siguiente de ' +
        e(kind) +
        '">›</button></span>'
      : "") +
    '</figcaption><p class="photocaption">' +
    e(items[0].alt) +
    "</p></figure>"
  );
}
function sameHome(p) {
  const variants = plans.filter((q) => q.media === p.media && q.id !== p.id);
  if (!variants.length) return "";
  return (
    '<section><h2>El mismo alojamiento, otro forfait</h2><div class="siblings">' +
    variants
      .map(
        (q) =>
          '<a href="#plan/' +
          q.id +
          '"><span>' +
          e(q.short) +
          "</span><b>" +
          e(labelPrice(q)) +
          " / " +
          e(unit(q)) +
          "</b>" +
          icon("arrow") +
          "</a>",
      )
      .join("") +
    "</div></section>"
  );
}
const accessBySlope = {
  avoriaz: "avoriaz",
  cenis: "val-cenis",
  carroz: "les-carroz",
  flaine: "flaine",
  orelle: "orelle",
  thorens: "val-thorens",
};
const bookingIcons = {
  stay: "bed",
  package: "bed",
  gear: "gear",
  pass: "ticket",
};

function bookingActions(actions, bookingNote = "") {
  if (!actions.length && !bookingNote) return "";
  const compactLabels = {
    "Ver alojamiento": "Alojamiento",
    "Alquilar material": "Material",
    "Comprar forfait": "Forfait",
  };
  const buttons = actions
    .map((action) => {
      const short = compactLabels[action.label];
      const title = short
        ? '<span class="booking-full">' +
          e(action.label) +
          '</span><span class="booking-short">' +
          e(short) +
          "</span>"
        : "<span>" + e(action.label) + "</span>";
      return `<a class="book-action" aria-label="${e(action.label)}" data-booking-kind="${e(action.kind)}" href="${e(action.url)}" target="_blank" rel="noopener noreferrer">
      ${icon(bookingIcons[action.kind])}${title}${icon("external")}</a>`;
    })
    .join("");
  const withNotes = actions.filter((action) => action.note);
  const notes = withNotes.length
    ? `<details class="booking-notes"><summary>Detalles de reserva</summary><ul>${withNotes.map((action) => `<li><strong>${e(action.label)}</strong> · ${e(action.note)}</li>`).join("")}</ul></details>`
    : "";
  return `<div class="booking-block">${buttons ? '<nav aria-label="Enlaces de reserva" class="book-actions">' + buttons + "</nav>" : ""}${bookingNote ? '<p class="booking-hint">' + e(bookingNote) + "</p>" : ""}${notes}</div>`;
}

function reviewTable(review, when = "") {
  const sides = [
    ["Pros", "+", review.pros],
    ["Contras", "−", review.cons],
  ].filter(([, , points]) => points?.length);
  if (!sides.length) return "";
  const rows = sides
    .map(
      ([label, sign, points]) =>
        `<tr><th scope="row"><span class="review-sign" aria-hidden="true">${sign}</span>${label}</th>
      <td><ul>${points.map((point) => "<li>" + e(point) + "</li>").join("")}</ul></td></tr>`,
    )
    .join("");
  return `<section class="option-review" aria-label="Pros y contras">
    <h2>Pros y contras</h2><div class="review-frame"><table class="review-table" aria-label="Pros y contras de esta opción"><tbody>${rows}</tbody></table></div>
    ${when ? '<p class="review-when"><strong>Cuándo lo elegiría</strong> ' + e(when) + "</p>" : ""}
    </section>`;
}

function detail(p) {
  const r = getRoute(p);
  const review = window.SKI_PLAN_REVIEW(p);
  const actions = window.SKI_PLAN_BOOKING(p, { student: state.student });
  const station = window.SKI_STATIONS.forPlan(p);
  const roadLink =
    '<a class="entrylink" href="#mapa/' +
    accessBySlope[p.slope] +
    '">' +
    icon("map") +
    " Ruta desde Ecla " +
    icon("forward") +
    "</a>";
  const stationLink = station
    ? '<a class="entrylink" href="#estacion/' +
      e(station.key) +
      '">' +
      icon("mountain") +
      " Planes en " +
      e(station.label) +
      " " +
      icon("forward") +
      "</a>"
    : "";
  return (
    '<a class="back" href="#planes">' +
    icon("back") +
    " Todos los planes</a>" +
    heading(p.title, p.area + " · Noche en " + p.home) +
    '<div class="headprice"><div><b>' +
    e(labelPrice(p)) +
    "</b><span> / " +
    unit(p) +
    '</span></div><span class="pill">' +
    e(p.status || p.tag || p.capacity) +
    "</span></div>" +
    controls() +
    bookingActions(actions) +
    '<div class="duogallery">' +
    figure(media[p.media], "Alojamiento") +
    figure(media[p.slope], "Dominio esquiable") +
    "</div>" +
    reviewTable(review, p.when) +
    '<section class="detailsgrid"><div><h2>La estancia</h2><p>' +
    e(p.house) +
    "</p>" +
    rows([
      ["Capacidad", p.capacity],
      ["Noche completa", p.night == null ? "Sin tarifa" : money(p.night)],
      ["Sauna", p.sauna],
      ["Jacuzzi", p.jacuzzi],
    ]) +
    (p.spa ? '<p class="fine">' + e(p.spa) + "</p>" : "") +
    "</div><div>" +
    priceDetails(p) +
    '<p class="fine">Importes para ' +
    person(p) +
    " personas, sujetos a disponibilidad. Comidas y desplazamientos aparte.</p></div></section>" +
    "<section><h2>Cómo llegáis a las pistas</h2>" +
    rows(routeRows(p)) +
    '<p class="fine">' +
    e(
      [r.note, "Tiempos de ruta aproximados, sin tráfico ni nieve."]
        .filter(Boolean)
        .join(" "),
    ) +
    '</p><div class="planrelated">' +
    roadLink +
    stationLink +
    "</div></section>" +
    sameHome(p) +
    "<section><h2>Forfait y alquiler</h2><p>" +
    e(p.passInfo) +
    "</p><p>" +
    e(p.gearInfo) +
    "</p></section>" +
    '<button class="resbtn" data-sources>' +
    icon("book") +
    " Recursos de este plan " +
    icon("arrow") +
    "</button>"
  );
}
function compare() {
  const list = state.selection.map(lookup);
  const sel = list
    .map(
      (p, i) =>
        "<label>Plan " +
        (i + 1) +
        '<select data-select="' +
        i +
        '">' +
        plans
          .map(
            (q) =>
              '<option value="' +
              q.id +
              '" ' +
              (q.id === p.id ? "selected" : "") +
              " " +
              (q.id !== p.id && state.selection.includes(q.id)
                ? "disabled"
                : "") +
              ">" +
              e(q.title) +
              "</option>",
          )
          .join("") +
        "</select></label>",
    )
    .join("");
  const data = [
    ["Total", (p) => labelPrice(p)],
    ["Personas cotizadas", (p) => String(person(p))],
    ["Principal ventaja", (p) => window.SKI_PLAN_REVIEW(p).pros[0] || "—"],
    [
      "Principal inconveniente",
      (p) => window.SKI_PLAN_REVIEW(p).cons[0] || "—",
    ],
    ...categories.map((x, i) => [
      x,
      (p) => {
        const b = budget(p);
        return i === 2
          ? range(b.parts[i], b.upper)
          : b.parts[i] == null
            ? "Sin tarifa"
            : money(b.parts[i]);
      },
    ]),
    ["Sauna", (p) => p.sauna],
    ["Jacuzzi", (p) => p.jacuzzi],
    ...routeRows(list[0]).map(([x], i) => [
      x,
      (p) => routeRows(p)[i][1] || "Pendiente",
    ]),
  ];
  return (
    heading(
      "Comparador",
      "Elige tres planes para comparar precio, spa y acceso a las pistas.",
    ) +
    controls() +
    '<div class="selectors">' +
    sel +
    "</div>" +
    budgetChart(list) +
    '<div class="tablewrap" role="region" aria-label="Tabla comparativa" tabindex="0"><table><thead><tr><th>Comparación</th>' +
    list
      .map(
        (p) =>
          '<th><a href="#plan/' +
          p.id +
          '">' +
          e(p.short) +
          " " +
          icon("arrow") +
          "</a></th>",
      )
      .join("") +
    "</tr></thead><tbody>" +
    data
      .map(
        ([label, fn]) =>
          '<tr><th scope="row">' +
          e(label) +
          "</th>" +
          list.map((p) => "<td>" + e(fn(p)) + "</td>").join("") +
          "</tr>",
      )
      .join("") +
    '</tbody></table></div><p class="fine">En móvil puedes desplazar la tabla horizontalmente. Los paquetes para seis mantienen su ocupación original.</p>'
  );
}
function archiveLinks(a) {
  const images = [...(media[a.media] || []), ...(media[a.slope] || [])];
  const review = window.SKI_ARCHIVE_REVIEW(a);
  return [
    ...(a.links || []),
    ...(review.links || []),
    ...review.actions.map((action) => [action.label, action.url]),
    ...images.flatMap((m) => [
      [m.credit || m.alt, m.source],
      ...(m.license ? [["Licencia de fotografía", m.license]] : []),
    ]),
  ];
}
function archiveBody(item, index, compact = false) {
  const review = window.SKI_ARCHIVE_REVIEW(item);
  const photos =
    (item.media ? figure(media[item.media], "Alojamiento") : "") +
    (item.slope ? figure(media[item.slope], "Dominio esquiable") : "");
  return (
    bookingActions(review.actions, review.bookingNote) +
    '<p class="archivedesc">' +
    e(item.description) +
    "</p>" +
    (photos ? '<div class="duogallery">' + photos + "</div>" : "") +
    reviewTable(review) +
    `<button class="${compact ? "quiet" : "resbtn"}" data-archive="${index}">${icon("book")} Recursos de esta opción</button>`
  );
}
function archiveDetail(item, index) {
  return (
    '<a class="back" href="#otras">' +
    icon("back") +
    " Otras opciones</a>" +
    heading(item.name, [item.area, item.kind].filter(Boolean).join(" · ")) +
    '<div class="headprice"><b>' +
    e(item.price || "Sin tarifa cerrada") +
    "</b></div>" +
    archiveBody(item, index)
  );
}
function more() {
  const kinds = [
    ["Todas", "Todas"],
    ["Alojamiento", "Alojamientos"],
    ["Estación", "Estaciones"],
    ["Variante", "Variantes"],
  ];
  const filters =
    '<div class="filterbar">' +
    kinds
      .map(
        ([k, v]) =>
          '<button data-kind="' +
          k +
          '" aria-pressed="' +
          (k === state.archiveKind) +
          '">' +
          e(v) +
          "</button>",
      )
      .join("") +
    "</div>";
  const items = archive
    .map((a, i) => {
      if (state.archiveKind !== "Todas" && a.kind !== state.archiveKind)
        return "";
      return (
        '<details><summary><div><span class="minor">' +
        e([a.area, a.kind].filter(Boolean).join(" · ")) +
        "</span><h3>" +
        e(a.name) +
        '</h3></div><span class="archiveprice">' +
        e(a.price || "Sin tarifa cerrada") +
        "</span>" +
        icon("arrow") +
        '</summary><div class="archivebody">' +
        archiveBody(a, i, true) +
        "</div></details>"
      );
    })
    .join("");
  return (
    heading(
      "Otras opciones",
      "Estaciones, alojamientos y variantes con las condiciones que se encontraron para ese fin de semana.",
    ) +
    filters +
    '<div class="archives">' +
    items +
    "</div>"
  );
}
function linksFor(p) {
  const r = getRoute(p);
  return [
    p.houseLink,
    ...window
      .SKI_PLAN_BOOKING(p, { student: state.student })
      .map((action) => [action.label, action.url]),
    ...(window.SKI_PLAN_REVIEW(p).links || []),
    ...(p.sources || []),
    ...(p.extra || []),
    ...(r.links || []),
    ...[...(media[p.media] || []), ...(media[p.slope] || [])].flatMap((m) => [
      [m.credit || m.alt, m.source],
      ...(m.license ? [["Licencia de fotografía", m.license]] : []),
    ]),
  ];
}
function linkList(list) {
  const seen = new Set();
  return (
    '<ul class="reslist">' +
    list
      .filter(
        (x) =>
          x && /^https?:\/\//.test(x[1]) && !seen.has(x[1]) && seen.add(x[1]),
      )
      .map(
        ([t, u]) =>
          '<li><a href="' +
          e(u) +
          '" target="_blank" rel="noopener noreferrer">' +
          e(t) +
          icon("external") +
          "</a></li>",
      )
      .join("") +
    "</ul>"
  );
}
function openSources(index) {
  const here = recordHash(),
    id = here.startsWith("plan/") ? lookup(here.split("/")[1]) : null;
  const [view, key] = here.split("/");
  const station =
    view === "estacion"
      ? window.SKI_STATIONS.stations.find((s) => s.key === key)
      : null;
  const archiveIndex =
    index ?? (view === "otras" && /^\d+$/.test(key) ? Number(key) : null);
  const a = archiveIndex != null ? archive[archiveIndex] : null;
  let content;
  if (a) content = "<h3>" + e(a.name) + "</h3>" + linkList(archiveLinks(a));
  else if (station)
    content =
      "<h3>" +
      e(station.label) +
      "</h3>" +
      linkList(window.SKI_STATIONS.resources(station));
  else if (view === "mapa")
    content =
      "<h3>Rutas desde Ecla Archamps</h3>" +
      linkList(window.SKI_MAP.resources(key));
  else if (id)
    content = "<h3>" + e(id.title) + "</h3>" + linkList(linksFor(id));
  else
    content =
      '<p class="fine">Reservas, tarifas oficiales, mapas y créditos de las fotografías.</p><details open><summary>Estaciones y forfaits</summary>' +
      linkList(window.COMMON_SOURCES || []) +
      "</details>" +
      plans
        .map(
          (p) =>
            "<details><summary>" +
            e(p.title) +
            "</summary>" +
            linkList(linksFor(p)) +
            "</details>",
        )
        .join("") +
      archive
        .map(
          (a) =>
            "<details><summary>" +
            e(a.name) +
            "</summary>" +
            linkList(archiveLinks(a)) +
            "</details>",
        )
        .join("");
  $("#sourcebody").innerHTML = content;
  $("#sources").showModal();
}
$(".skip").onclick = (event) => {
  event.preventDefault();
  $("#main").focus();
};
$("#sourceTop").onclick = () => openSources();
$("#close").onclick = () => $("#sources").close();
$("#sources").addEventListener("click", (event) => {
  if (event.target === $("#sources")) {
    const b = $("#sources").getBoundingClientRect();
    if (
      event.clientX < b.left ||
      event.clientX > b.right ||
      event.clientY < b.top ||
      event.clientY > b.bottom
    )
      $("#sources").close();
  }
});
function render() {
  const [view, key] = recordHash().split("/");
  const p = view === "plan" ? lookup(key) : null;
  const item =
    view === "otras" && /^\d+$/.test(key) ? archive[Number(key)] : null;
  let tab = view;
  if (p) tab = "planes";
  if (view === "estacion") tab = "estaciones";
  const current = tabs.find(([id]) => id === tab) || tabs[0];
  const section = current[0];
  $("#nav").innerHTML = tabs
    .map(([id, ic, name, compact]) => {
      const label = compact
        ? `<span class="desktop-label">${e(name)}</span><span class="mobile-label">${e(compact)}</span>`
        : `<span>${e(name)}</span>`;
      return `<a class="navitem ${id === section ? "active" : ""}" ${id === section ? 'aria-current="page"' : ""} href="#${id}">${icon(ic)}${label}</a>`;
    })
    .join("");
  const pages = {
    inicio: homePage,
    planes: plansPage,
    comparar: compare,
    otras: more,
    estaciones: () =>
      window.SKI_STATIONS.page(view === "estacion" ? key : undefined),
    mapa: () => window.SKI_MAP.render(key),
  };
  $("#main").innerHTML = p
    ? detail(p)
    : item
      ? archiveDetail(item, Number(key))
      : pages[section]();
  const selectedStation =
    view === "estacion"
      ? window.SKI_STATIONS.stations.find((s) => s.key === key)
      : null;
  const title = p?.title || item?.name || selectedStation?.label || current[2];
  $("#crumb").textContent = title;
  document.title = title + " · Esquí en diciembre";
}
let lightSlides = [],
  lightIndex = 0;
function updateLight() {
  const img = lightSlides[lightIndex].querySelector("img");
  $("#lightimg").src = img.src;
  $("#lightimg").alt = img.alt;
  $("#lightlabel").textContent = img.alt;
  $("#lightcount").textContent = lightIndex + 1 + " / " + lightSlides.length;
  $("#lightprev").hidden = $("#lightnext").hidden = lightSlides.length < 2;
}
function lightMove(n) {
  lightIndex = (lightIndex + n + lightSlides.length) % lightSlides.length;
  updateLight();
}
$("#lightclose").onclick = () => $("#lightbox").close();
$("#lightprev").onclick = () => lightMove(-1);
$("#lightnext").onclick = () => lightMove(1);
$("#lightbox").addEventListener("keydown", (ev) => {
  if (ev.key === "ArrowLeft") lightMove(-1);
  if (ev.key === "ArrowRight") lightMove(1);
});
document.addEventListener("click", (ev) => {
  const el = ev.target.closest("button");
  if (!el) return;
  if (el.hasAttribute("data-zoom")) {
    lightSlides = [...el.closest(".gallery").querySelectorAll(".slide")];
    lightIndex = lightSlides.indexOf(el);
    updateLight();
    $("#lightbox").showModal();
  }
  if (el.dataset.unit) {
    state.unit = el.dataset.unit;
    render();
    $('#main [data-unit="' + state.unit + '"]')?.focus({ preventScroll: true });
  }
  if (el.dataset.kind) {
    state.archiveKind = el.dataset.kind;
    render();
    $('#main [data-kind="' + state.archiveKind + '"]')?.focus({
      preventScroll: true,
    });
  }
  if (el.dataset.filter) {
    state.view = el.dataset.filter;
    render();
    $('#main [data-filter="' + state.view + '"]')?.focus({
      preventScroll: true,
    });
  }
  if (el.hasAttribute("data-sources")) openSources();
  if (el.hasAttribute("data-archive")) openSources(Number(el.dataset.archive));
  if (el.dataset.slide) {
    const g = el.closest(".gallery");
    const slides = [...g.querySelectorAll(".slide")];
    const i =
      (Number(g.dataset.index) + Number(el.dataset.slide) + slides.length) %
      slides.length;
    slides.forEach((s, j) => (s.hidden = i !== j));
    g.dataset.index = i;
    g.querySelector(".count").textContent = i + 1 + " / " + slides.length;
    g.querySelector(".photocaption").textContent = slides[i].dataset.caption;
  }
});
document.addEventListener("change", (ev) => {
  if (ev.target.hasAttribute("data-student")) {
    state.student = ev.target.checked;
    render();
    $("#main [data-student]")?.focus({ preventScroll: true });
  }
  if (ev.target.hasAttribute("data-select")) {
    const i = Number(ev.target.dataset.select);
    state.selection[i] = ev.target.value;
    render();
    $('#main [data-select="' + i + '"]')?.focus({ preventScroll: true });
  }
});
document.addEventListener(
  "error",
  (ev) => {
    if (
      ev.target instanceof HTMLImageElement &&
      ev.target.classList.contains("photo")
    )
      ev.target.hidden = true;
  },
  true,
);
function enterView() {
  if (recordHash() === "comparar/podio")
    state.selection = podium.map((item) => item.id);
  render();
  if (recordHash() === "podio")
    requestAnimationFrame(() =>
      $("#podio")?.scrollIntoView({ block: "start" }),
    );
}
window.addEventListener("hashchange", () => {
  if ($("#sources").open) $("#sources").close();
  if ($("#lightbox").open) $("#lightbox").close();
  enterView();
  window.scrollTo(0, 0);
  $("#main").focus({ preventScroll: true });
});
enterView();
