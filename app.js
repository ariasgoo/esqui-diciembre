"use strict";
const $ = (s) => document.querySelector(s);
const plans = window.PLANS.filter(window.SKI_PLAN_ALLOWED);
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
  ["planes", "mountain", "Opciones"],
  ["votaciones", "chart", "Votos"],
  ["mapa", "map", "Mapa"],
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
  accessFilter: "all",
  archiveAccess: "all",
};
const spaAmenities = (p) => [
  ["sauna", p.sauna], ["jacuzzi", p.jacuzzi],
].filter(([, value]) => value && value !== "No").map(([name]) => name);
function budget(p) {
  const n = person(p),
    scale = state.unit === "group" ? n : 1;
  const parts = [
    p.night == null ? null : (p.night / n) * scale,
    p.pass * scale,
    p.gear[0] == null ? null : p.gear[0] * scale,
    ((p.card || 0) + (p.fee || 0) / n) * scale,
  ];
  const upper = parts[2] == null ? null : parts[2] + (p.gear[1] - p.gear[0]) * scale;
  const low = p.night == null || parts[2] == null ? null : parts.reduce((a, b) => a + (b || 0), 0);
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
  if (p.gear[0] == null) return money(b.parts.reduce((sum,part) => sum + (part || 0),0)) + " + material";
  return (p.estimated ? "≈" : "") + range(b.low, b.high);
}
function unit(p) {
  return state.unit === "group" ? "grupo de " + person(p) : "persona";
}
function getRoute(p) {
  return routes[p.route] || {};
}
function recordHash() {
  try {
    return decodeURIComponent(location.hash.slice(1)) || "planes";
  } catch {
    return "planes";
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
function skiLoading(label, small = false) {
  return `<div class="ski-loading${small ? ' ski-loading-small' : ''}" role="status">
    <img src="skier-loading.svg" width="184" height="112" alt=""><p>${e(label)}</p>
  </div>`;
}
function showTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  const label = dark ? "Usar modo claro" : "Usar modo oscuro";
  $("#theme").setAttribute("aria-label", label);
  $("#theme").title = label;
  $("#theme").innerHTML = icon(dark ? "sun" : "moon");
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
function schematic(text) {
  const points = String(text || "").split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ0-9¿])/).filter(Boolean);
  return '<ul class="schematic">' + points.map(point => '<li>' + e(point) + '</li>').join("") + '</ul>';
}
function fold(title, content, extra = "") {
  return '<details class="detail-fold ' + e(extra) + '"><summary>' + e(title) + icon("arrow") + '</summary><div class="fold-body">' + content + '</div></details>';
}
function spaExtra(p) {
  const amenities = spaAmenities(p);
  if (!amenities.length) return "";
  const details = rows([["Sauna", p.sauna], ["Jacuzzi", p.jacuzzi]].filter(([, value]) => value && value !== "No")) + (p.spa ? '<p class="fine">' + e(p.spa) + '</p>' : "");
  return '<div class="stay-extra"><p>Extra · Tiene ' + e(amenities.join(" y ")) + '</p>' + fold("Detalles del extra", details) + '</div>';
}
function quickFacts(p) {
  const r = getRoute(p), access = window.SKI_ACCESS.plans[p.id];
  const approach = access.mode === "ski" ? "Directo con esquís" : access.mode === "walk" ? "≈12 min andando" : r.homeLift;
  return '<dl class="quick-facts">' + [
    ["Ecla → acceso", r.originLift], ["Casa → acceso", approach],
  ].map(([label,value]) => '<div><dt>' + e(label) + '</dt><dd>' + e(value) + '</dd></div>').join("") + '</dl>';
}
function storageSummary(p) {
  if (p.slope === "avoriaz") return "Consigna en Avoriaz · suplemento por cotizar, aparte.";
  if (p.slope === "orelle") return "Consigna en Orelle · 32 € para los siete por una noche, aparte.";
  if (p.slope === "carroz") return p.media === "ferme" ? "Consigna en Kédeuze · 44 € para los siete por una noche, aparte." : "Guardar material en el hotel · espacio por acordar. Casilleros opcionales, 44 € por grupo.";
  if (p.slope === "cenis" || p.slope === "flaine") return "Consigna gratuita anunciada en la tienda · reservar espacio para siete.";
  return "Guardaesquís en la residencia · reservar espacio para siete.";
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
    '</div></div>'
  );
}
const categories = ["Alojamiento", "Forfait", "Material", "Soporte y gestión"];
function voteControl(id) {
  return `<span class="vote-control" data-vote-control="${e(id)}">${window.SKI_VOTING?.button(id) || ""}</span>`;
}
function voteCountControl(id) {
  const label = window.SKI_VOTING?.countLabel(id);
  return `<a class="choice-vote-count" data-vote-count="${e(id)}" href="#votaciones/${e(id)}"
    aria-describedby="choice-title-${e(id)}"${label ? "" : " hidden"}>${e(label || "")}</a>`;
}
const modeLabels = {
  walk: "A pie hasta las pistas",
  ski: "A pie de pista · con esquís",
  drive: "En coche hasta el remonte",
  shuttle: "En bus hasta el remonte",
  unknown: "Acceso por concretar",
};
const accessFilters = {
  all: "Todos los accesos",
  "a-pie": "A pie hasta las pistas",
  "con-esquis": "Con esquís desde casa",
  "en-coche": "En coche al remonte",
};
function matchesAccess(access, filter) {
  if (filter === "a-pie") return access.mode === "walk" || access.mode === "ski";
  if (filter === "con-esquis") return access.mode === "ski";
  if (filter === "en-coche") return access.mode === "drive";
  return true;
}
function accessFilterFor(view) {
  return view === "otras" ? state.archiveAccess : state.accessFilter;
}
function accessControls(view) {
  const current = accessFilterFor(view);
  const options = Object.entries(accessFilters).map(([key, label]) =>
    `<option value="${key}" ${key === current ? "selected" : ""}>${e(label)}</option>`,
  ).join("");
  return `<label class="access-filter">Desde el alojamiento<select data-access-filter="${e(view)}">${options}</select></label>`;
}
function accessNote(filter) {
  if (filter !== "a-pie" && filter !== "con-esquis") return "";
  return '<p class="fine access-note">El filtro usa el sector del forfait de cada plan. La apertura de cada remonte depende de la nieve.</p>';
}
function accessSourceLinks(access, hours) {
  return [
    ...(access.source ? [["Acceso desde el alojamiento", access.source]] : []),
    ...(access.sources || []),
    ...hours.flatMap((row) => row.sources || []),
  ];
}
function accessPanel(key, access, hours) {
  const pins = window.SKI_LODGINGS.forOption(key);
  const mapLinks = pins.map((pin) =>
    `<a class="entrylink" href="#mapa/casa-${e(pin.id)}">${icon("pin")}${pins.length === 1 ? "Alojamiento en el mapa" : e(pin.name)} ${icon("forward")}</a>`,
  ).join("");
  return `<section class="slope-access" aria-label="Acceso y horarios"><div class="access-summary">
    <h2>Del alojamiento a las pistas</h2><strong>${e(modeLabels[access.mode])}</strong>
    ${schematic(access.text)}${mapLinks ? '<div class="planrelated">' + mapLinks + '</div>' : ""}</div>
    <div class="lift-hours"><h2>Horario de pistas y remontes</h2><span class="minor">Sábado 12 y domingo 13 de diciembre</span>
    ${hours.map((row) => `<div class="hours-item"><b>${e(row.label)}</b>${schematic(row.text)}</div>`).join("")}</div></section>`;
}
function emptyOptions() {
  return '<p class="empty-options">Ninguna opción coincide con estos filtros.</p>';
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
  const parts = categories.map((label, i) => {
    const value = b.parts[i];
    const price = value == null ? "Por cotizar" : i === 2 ? range(value, b.upper) : money(value);
    return `<div><dt><i class="s${i}" aria-hidden="true"></i>${e(label)}</dt><dd>${e(price)}</dd></div>`;
  });
  const segments = b.parts.map((value, i) => value > 0
    ? `<span class="s${i}" style="flex-grow:${value}"></span>` : "").join("");
  const scope = person(p) === 7 ? "Para siete personas" : "Oferta para seis personas";
  const date = p.status === "Precio anterior" ? "Tarifa anterior sin reconfirmar." : "Precio orientativo.";
  return `<section id="presupuesto" class="plan-budget" aria-labelledby="budget-heading">
    <div class="budget-heading"><h2 id="budget-heading">Desglose del precio</h2>${controls()}</div>
    <div class="budget-total"><strong>${e(labelPrice(p))}</strong><span>/ ${e(unit(p))}</span></div>
    <div class="budget-band" aria-hidden="true">${segments}</div><dl class="budget-items">${parts.join("")}</dl>
    <p class="fine">${scope} · Una noche y dos días de esquí. ${date}</p></section>`;
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

function gearPanel(logistics) {
  return `<section class="gear-logistics" aria-label="Material sin llevar esquís en el coche"><h2>Alquiler y noche del sábado</h2>
  <strong>${e(logistics.title)}</strong><dl>
  <div><dt>Recogida</dt><dd>${schematic(logistics.pickup)}</dd></div>
  <div><dt>Sábado al acabar</dt><dd>${schematic(logistics.night)}</dd></div>
  <div><dt>Domingo</dt><dd>${schematic(logistics.return)}</dd></div></dl>
  <p class="fine">${e(logistics.booking)}</p></section>`;
}
function detail(p) {
  const summary = window.SKI_STATIONS.planSummary(p.id);
  const review = window.SKI_PLAN_REVIEW(p);
  const station = window.SKI_STATIONS.forPlan(p);
  const pin = window.SKI_LODGINGS.forOption("plan/" + p.id)[0];
  const mapKey = pin ? "casa-" + pin.id : accessBySlope[p.slope];
  const r = getRoute(p);
  const mainReview = {
    pros: summary ? [summary.pro] : review.pros.slice(0, 1),
    cons: summary ? [summary.con] : review.cons.slice(0, 1),
  };
  const stay = schematic(p.house) + rows([["Capacidad", p.capacity], ["Noche completa", money(p.night)]]) +
    spaExtra(p) + sameHome(p);
  const access = accessPanel("plan/" + p.id, window.SKI_ACCESS.plans[p.id], window.skiLiftHours(p.id, null)) +
    rows(routeRows(p)) + `<p class="fine">${e(r.note)} Tiempos aproximados, sin tráfico ni nieve.</p>`;
  const logistics = gearPanel(window.SKI_GEAR_LOGISTICS.forPlan(p)) +
    "<h3>Forfait</h3>" + schematic(p.passInfo) + "<h3>Material</h3>" + schematic(p.gearInfo);
  const itinerary = window.SKI_ITINERARIES.forPlan(p);
  const back = station ? `#estacion/${e(station.key)}` : "#planes";
  return `<article class="plan-sheet">
    <a class="back" href="${back}">${icon("back")} ${e(station?.label || "Opciones")}</a>
    ${heading(summary?.title || p.title, p.area + " · Noche en " + p.home)}
    ${priceDetails(p)}
    <div class="plan-choice">${voteControl(p.id)}<a href="#votaciones">Ver votos ${icon("forward")}</a></div>
    <div id="opinion">${reviewTable(mainReview)}</div>
    <div class="plan-access">${quickFacts(p)}<a href="#mapa/${e(mapKey)}">${icon("map")} Ver en el mapa</a></div>
    <p class="storage-summary">${e(storageSummary(p))}</p>
    <div class="duogallery">${figure(media[p.media], "Alojamiento")}${figure(media[p.slope], "Pistas")}</div>
    ${bookingActions(window.SKI_PLAN_BOOKING(p))}
    <div class="plan-folds">
      ${fold("Itinerario · salida el sábado a las " + window.SKI_ITINERARIES.time(itinerary[0].departure), window.SKI_ITINERARIES.panel("plan/" + p.id, itinerary))}
      ${fold("Alojamiento" + (spaAmenities(p).length ? " · " + spaAmenities(p).join(" y ") : ""), stay)}
      ${fold("Acceso a pistas y horarios", access)}
      ${fold("Forfait, material y guardaesquís", logistics)}
      ${fold("Cuándo elegir este plan", reviewTable(review, p.when))}
    </div>
  </article>`;
}
function archiveLinks(a) {
  const images = [...(media[a.media] || []), ...(media[a.slope] || [])];
  const review = window.SKI_ARCHIVE_REVIEW(a);
  return [
    ...window.SKI_ITINERARIES.forArchive(a, archive.indexOf(a)).flatMap(m => m.sources),
    ...window.SKI_GEAR_LOGISTICS.forArchive(a).sources,
    ...accessSourceLinks(window.SKI_ACCESS.archive[archive.indexOf(a)], window.skiLiftHours(null, archive.indexOf(a))),
    ...(a.links || []),
    ...(review.links || []),
    ...review.actions.map((action) => [action.label, action.url]),
    ...images.flatMap((m) => [
      [m.credit || m.alt, m.source],
      ...(m.license ? [["Licencia de fotografía", m.license]] : []),
    ]),
  ];
}
function archiveDetail(item, index) {
  const review = window.SKI_ARCHIVE_REVIEW(item);
  const photos = (item.media ? figure(media[item.media], "Alojamiento") : "") +
    (item.slope ? figure(media[item.slope], "Pistas") : "");
  return `<article class="plan-sheet">
    <a class="back" href="#otras">${icon("back")} Otras opciones</a>
    ${heading(item.name, [item.area, item.kind].filter(Boolean).join(" · "))}
    <p class="archive-quote">${e(item.price || "")}</p>
    ${reviewTable({pros: review.pros.slice(0,1), cons: review.cons.slice(0,1)})}
    ${photos ? '<div class="duogallery">' + photos + '</div>' : ""}
    ${bookingActions(review.actions, review.bookingNote)}
    ${fold("Condiciones de la opción", schematic(item.description) + spaExtra(item) + reviewTable(review))}
    ${fold("Itinerario", window.SKI_ITINERARIES.panel("otras/" + index, window.SKI_ITINERARIES.forArchive(item, index)))}
    ${fold("Acceso, horarios y material", gearPanel(window.SKI_GEAR_LOGISTICS.forArchive(item)) + accessPanel("otras/" + index, window.SKI_ACCESS.archive[index], window.skiLiftHours(null, index)))}
  </article>`;
}
function more() {
  const catalogue = window.SKI_STATIONS;
  const selected = state.archiveAccess;
  const retained = plans.filter(p => !catalogue.featuredIds.includes(p.id) &&
    matchesAccess(window.SKI_ACCESS.plans[p.id], selected));
  const line = (href, title, caption) => `<a class="archive-line" href="${e(href)}"><span>${e(title)}<small>${e(caption)}</small></span>${icon("arrow")}</a>`;
  const planRows = retained.map(p => line("#plan/" + p.id, p.title,
    [p.area, labelPrice(p) + " / " + unit(p), person(p) + " personas"].join(" · "))).join("");
  const saved = archive.map((a, i) => ({a, i})).filter(({a, i}) => window.SKI_ARCHIVE_ALLOWED(a) &&
    a.kind !== "Estación" && matchesAccess(window.SKI_ACCESS.archive[i], selected));
  const research = saved.map(({a, i}) => line("#otras/" + i, a.name, a.price || a.area)).join("");
  const stations = catalogue.secondaryStations.map(s => line("#estacion/" + s.key, s.label, "")).join("");
  return `<div class="other-options"><a class="back" href="#planes">${icon("back")} Opciones principales</a>
    ${heading("Otras opciones")}${accessControls("otras")}
    <div class="archive-list">${planRows || emptyOptions()}</div>
    ${stations && selected === "all" ? fold("Otras estaciones estudiadas", stations) : ""}
    ${research ? fold("Alojamientos y variantes estudiadas", research) : ""}</div>`;
}
function linksFor(p) {
  const r = getRoute(p);
  return [
    ...window.SKI_GEAR_LOGISTICS.forPlan(p).sources,
    ...accessSourceLinks(window.SKI_ACCESS.plans[p.id], window.skiLiftHours(p.id, null)),
    p.houseLink,
    ...window
      .SKI_PLAN_BOOKING(p)
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
    view === "otras" && /^\d+$/.test(key) && window.SKI_ARCHIVE_ALLOWED(archive[Number(key)]) ? archive[Number(key)] : null;
  const section = view === "mapa" ? "mapa" : ["comparar", "votaciones"].includes(view) ? "votaciones" : "planes";
  $("#nav").innerHTML = tabs.map(([id, ic, label]) =>
    `<a class="navitem ${id === section ? "active" : ""}" ${id === section ? 'aria-current="page"' : ""} href="#${id}">${icon(ic)}<span>${e(label)}</span></a>`
  ).join("");
  const main = $("#main");
  if (!p) state.unit = "person";
  const station = view === "estacion" ? window.SKI_STATIONS.stations.find(s => s.key === key) : null;
  if (p) main.innerHTML = detail(p);
  else if (view === "otras") main.innerHTML = item ? archiveDetail(item, Number(key)) : more();
  else if (section === "mapa") main.innerHTML = window.SKI_MAP.render(key);
  else if (section === "votaciones") main.innerHTML = window.SKI_VOTING?.page(view === "votaciones" ? key : undefined) || heading("Votos") + skiLoading("Cargando votos…");
  else main.innerHTML = window.SKI_STATIONS.page(station?.key);
  const title = p?.title || item?.name || station?.label || (view === "otras" ? "Otras opciones" : tabs.find(([id]) => id === section)[2]);
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
  if (ev.target.hasAttribute("data-access-filter")) {
    const view = ev.target.dataset.accessFilter;
    const filter = ev.target.value;
    if (view === "otras") state.archiveAccess = filter;
    else state.accessFilter = filter;
    if (view === "planes" || view === "otras") {
      history.replaceState(null, "", "#" + view + (filter === "all" ? "" : "/" + filter));
    }
    render();
    $("#main [data-access-filter]")?.focus({ preventScroll: true });
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
  const [section, filter] = recordHash().split("/");
  if ((section === "planes" || section === "otras") && (!filter || Object.hasOwn(accessFilters, filter))) {
    if (section === "otras") state.archiveAccess = filter || "all";
    else state.accessFilter = filter || "all";
  }
  render();

}
window.addEventListener("hashchange", () => {
  if ($("#sources").open) $("#sources").close();
  if ($("#lightbox").open) $("#lightbox").close();
  enterView();
  window.scrollTo(0, 0);
  $("#main").focus({ preventScroll: true });
});
enterView();

document.addEventListener("ski-suggestions-updated", () => {
  const section = $("#group-suggestions");
  if (section) section.innerHTML = window.SKI_VOTING.suggestions();
});

document.addEventListener("ski-voting-updated", () => {
  const focused = document.activeElement?.dataset.vote;
  document.querySelectorAll("[data-selection-hint]").forEach(node => { node.textContent = window.SKI_VOTING.selectionHint(); });
  if (["votaciones", "comparar"].includes(recordHash().split("/")[0])) {
    render();
  } else {
    // A live ballot update must leave the current map, photo and open itinerary in place.
    document.querySelectorAll("[data-vote-control]").forEach(control => {
      const html = window.SKI_VOTING.button(control.dataset.voteControl);
      control.innerHTML = html;
    });
    document.querySelectorAll("[data-vote-count]").forEach(link => {
      const label = window.SKI_VOTING.countLabel(link.dataset.voteCount);
      link.hidden = !label;
      if (link.textContent !== label) link.textContent = label;
    });
  }
  if (focused) document.querySelector(`[data-vote="${CSS.escape(focused)}"]`)?.focus({preventScroll: true});
});
