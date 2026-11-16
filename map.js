(() => {
  "use strict";

  const data = window.SKI_MAP_DATA;
  const accesses = [
    {
      id: "les-carroz",
      name: "Les Carroz",
      access: "Telecabina de Kédeuze",
      route: "flocons",
    },
    {
      id: "flaine",
      name: "Flaine",
      access: "Aparcamiento P2 · Forum",
      route: "flocons-flaine",
    },
    {
      id: "avoriaz",
      name: "Avoriaz",
      access: "Teleférico de Les Prodains · P1",
      route: "cluses",
    },
    {
      id: "val-thorens",
      name: "Val Thorens",
      access: "Aparcamiento P2 · barrio Soleil",
      route: "cosy",
      station: "val-thorens-orelle",
    },
    {
      id: "orelle",
      name: "Orelle",
      access: "Telecabina de Francoz",
      route: "mod-orelle",
      station: "val-thorens-orelle",
    },
    {
      id: "val-cenis",
      name: "Val Cenis",
      access: "Telecabina de Vieux Moulin",
      route: "mod-cenis",
    },
  ];
  const houses = window.SKI_LODGINGS;
  const forAccess = (active) => active ? houses.list.filter((h) => h.accesses.includes(active.id)) : houses.list;
  const selectedHouse = (key = "") => key.startsWith("casa-") ? houses.byId(key.slice(5)) : undefined;
  const houseKey = (h) => "casa-" + h.id;
  const houseHref = (h) => "#mapa/" + houseKey(h);
  const byId = new Map(accesses.map((a) => [a.id, a]));
  const earth =
    "https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-lakes/";
  const relief =
    "https://github.com/tilezen/joerd/blob/master/docs/attribution.md";
  const osm = "https://www.openstreetmap.org/copyright";
  const esc = (text) =>
    String(text).replace(
      /[&<>"']/g,
      (chr) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[chr],
    );
  const distance = (a) => window.ROUTES[a.route].originLift;
  const km = (value) => Number(value.toFixed(2));
  const coords = (lon, lat) => [(lon - 6) * 77.51, (46.3 - lat) * 111.19];
  const towns = [
    ["Ginebra", 6.1432, 46.2044],
    ["Annecy", 6.1294, 45.8992],
    ["Chambéry", 5.9178, 45.5646],
    ["Albertville", 6.392, 45.6755],
    ["Cluses", 6.5791, 46.0612],
    ["Bonneville", 6.408, 46.0797],
    ["Morzine", 6.709, 46.1798],
    ["Moûtiers", 6.5312, 45.4844],
    ["Modane", 6.6693, 45.2012],
    ["Annemasse", 6.2365, 46.195],
    ["Chamonix", 6.8694, 45.9237],
    ["Aix-les-Bains", 5.9123, 45.6886],
    ["La Roche-sur-Foron", 6.312, 46.0676],
  ];
  const arrow =
    '<svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10h11m-5-5 5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function projection(active, small) {
    const width = small ? 380 : 680;
    const height = small ? 370 : 500;
    const visible = active ? [active] : accesses;
    const bounds = visible.map((a) => data.routes[a.id].bounds);
    for (const h of forAccess(active)) {
      const [x, y] = coords(h.lon, h.lat);
      bounds.push([x, y, x, y]);
    }
    const x1 = Math.min(...bounds.map((b) => b[0])),
      y1 = Math.min(...bounds.map((b) => b[1]));
    const x2 = Math.max(...bounds.map((b) => b[2])),
      y2 = Math.max(...bounds.map((b) => b[3]));
    const scale = Math.min(
      (width - (small ? 92 : 141)) / (x2 - x1),
      (height - 87) / (y2 - y1),
    );
    const dx = width / 2 - ((x1 + x2) / 2) * scale;
    const dy = height / 2 - ((y1 + y2) / 2) * scale;
    const pixel = ([x, y]) => [km(x * scale + dx), km(y * scale + dy)];
    return { width, height, scale, dx, dy, pixel };
  }

  function drawMap(active, small) {
    const { width, height, scale, dx, dy, pixel } = projection(active, small);
    const title = active
      ? "De Ecla Archamps a " + active.access + ", " + active.name + ", con los alojamientos de esa ruta"
      : "Alojamientos y rutas desde Ecla Archamps a seis accesos de esquí";
    const positions = [
      { label: "Ecla Archamps", point: pixel(data.start), home: true },
      ...(active ? [active] : accesses).map((a) => ({
        label: a.name,
        point: pixel(data.routes[a.id].stop),
        id: a.id,
      })),
    ];
    const places = towns.map(([name, lon, lat]) => ({
      label: name,
      point: pixel(coords(lon, lat)),
      town: true,
    }));
    const blocked = positions.map(({ point: [x, y] }) => [
      x - 7,
      y - 7,
      x + 7,
      y + 7,
    ]);
    const isClear = (box) =>
      box[0] > 4 &&
      box[1] > 4 &&
      box[2] < width - 4 &&
      box[3] < height - 4 &&
      !blocked.some(
        (b) => b[0] < box[2] && b[2] > box[0] && b[1] < box[3] && b[3] > box[1],
      );
    // Cerca de una estación hay varios edificios en unos cientos de metros.
    // La línea une cada chincheta desplazada con su ubicación real.
    const placePins = () => forAccess(active).map((h) => {
      const [x, y] = pixel(coords(h.lon, h.lat));
      let cx = x, cy = y - 13;
      let box;
      for (let step = 0; step < 920; step++) {
        const radius = step === 0 ? 0 : 3.1 * Math.sqrt(step);
        const angle = step * 2.399963;
        cx = km(x + Math.cos(angle) * radius);
        cy = km(y - 13 + Math.sin(angle) * radius);
        box = [cx - 11, cy - 11, cx + 11, cy + 15];
        if (isClear(box)) break;
      }
      blocked.push(box);
      const name = h.number + ". " + h.name + (h.approximate ? " · zona aproximada" : "");
      return {
        line: '<path class="sm-pin-line" d="M' + x + ',' + y + ' L' + cx + ',' + cy + '"/><circle class="sm-anchor" cx="' + x + '" cy="' + y + '" r="1.8"/>',
        mark: '<a class="sm-pin' + (h.approximate ? ' sm-pin-zone' : '') + '" href="' + houseHref(h) +
          '" aria-label="' + esc(name) + '"><title>' + esc(name) + '</title><g transform="translate(' + cx + ' ' + cy +
          ')"><rect x="-12" y="-12" width="24" height="28" fill="transparent"/><path class="sm-pin-body" d="M0 13 C-2 9 -9.5 4 -9.5 -1 A9.5 9.5 0 1 1 9.5 -1 C9.5 4 2 9 0 13Z"/><text text-anchor="middle" y="2.5">' +
          h.number + '</text></g></a>',
      };
    });
    const labels = [];
    function placeLabels(points) {
      for (const p of points) {
        const [x, y] = p.point;
        if (x < 6 || x > width - 6 || y < 6 || y > height - 6) continue;
        const size = p.town ? 10 : small ? 12 : 13;
        const labelWidth = size * p.label.length * 0.57;
        const offsets = p.home
          ? [
              [-11, -11],
              [11, -11],
              [-11, 17],
              [11, 17],
            ]
          : p.town
            ? [
                [6, -6],
                [6, 12],
                [-6, 12],
                [-6, -6],
              ]
            : [
                [11, -7],
                [11, 15],
                [-11, -7],
                [-11, 15],
                [14, 30],
                [-14, 30],
                [14, -23],
                [-14, -23],
                [-23, 42],
                [23, 42],
              ];
        for (const [ox, oy] of offsets) {
          const tx = km(x + ox),
            ty = km(y + oy);
          const left = ox < 0 ? tx - labelWidth : tx,
            top = ty - size;
          const box = [left - 3, top - 1, left + labelWidth + 3, ty + 4];
          if (!isClear(box)) continue;
          blocked.push(box);
          const text =
            '<text x="' +
            tx +
            '" y="' +
            ty +
            '" text-anchor="' +
            (ox < 0 ? "end" : "start") +
            '" font-size="' +
            size +
            '" class="' +
            (p.town ? "sm-town" : "sm-label") +
            '">' +
            esc(p.label) +
            "</text>";
          if (p.town)
            labels.push(
              '<g><circle class="sm-town-dot" cx="' +
                x +
                '" cy="' +
                y +
                '" r="1.5"/>' +
                text +
                "</g>",
            );
          else if (p.home) labels.push(text);
          else {
            const leader =
              Math.abs(oy) > 19
                ? '<path class="sm-leader" d="M' +
                  x +
                  "," +
                  y +
                  " L" +
                  (tx + (ox < 0 ? 3 : -3)) +
                  "," +
                  (ty - 4) +
                  '"/>'
                : "";
            labels.push(
              '<a href="#mapa/' +
                p.id +
                '" tabindex="-1">' +
                leader +
                text +
                "</a>",
            );
          }
          break;
        }
      }
    }
    placeLabels(positions);
    const pins = placePins();
    placeLabels(places);
    function road(a, cls) {
      return (
        '<path class="' +
        cls +
        '" vector-effect="non-scaling-stroke" d="' +
        data.routes[a.id].path +
        '"/>'
      );
    }
    const [rx, ry, ex, ey] = data.terrainBounds;
    let routes = accesses
      .filter((a) => a !== active)
      .map((a) => road(a, active ? "sm-inactive" : "sm-route"))
      .join("");
    if (active)
      routes +=
        road(active, "sm-road-edge") + road(active, "sm-route sm-chosen");
    const marks = positions
      .map((p) => {
        const [x, y] = p.point;
        if (p.home)
          return (
            '<a href="#mapa/casa-ecla" aria-label="Residencia Ecla Archamps"><title>Ecla Archamps</title><circle class="sm-home-edge" cx="' +
            x +
            '" cy="' +
            y +
            '" r="6.8"/><circle class="sm-home" cx="' +
            x +
            '" cy="' +
            y +
            '" r="3.5"/></a>'
          );
        return (
          '<a href="#mapa/' +
          p.id +
          '" aria-label="Ver ruta a ' +
          esc(p.label) +
          '"><circle fill="transparent" cx="' +
          x +
          '" cy="' +
          y +
          '" r="10"/><circle class="sm-stop" cx="' +
          x +
          '" cy="' +
          y +
          '" r="4.8"/></a>'
        );
      })
      .join("");
    const length = [50, 25, 10, 5, 2].find((m) => m * scale <= 82) || 1;
    const bx = width - 16 - length * scale,
      by = height - 18;
    const scaleBar =
      '<g class="sm-scale"><path d="M' +
      bx +
      "," +
      (by - 4) +
      "v4h" +
      length * scale +
      'v-4"/><text x="' +
      (bx + (length * scale) / 2) +
      '" y="' +
      (by - 7) +
      '" text-anchor="middle">' +
      length +
      " km</text></g>";
    const north =
      '<g transform="translate(' +
      (width - 23) +
      ',22)" class="sm-north"><path d="M0 0 -3.2 8 0 6.5 3.2 8Z"/><text x="0" y="20" text-anchor="middle">N</text></g>';
    return (
      '<svg class="sm-canvas ' +
      (small ? "sm-small" : "sm-wide") +
      '" viewBox="0 0 ' +
      width +
      " " +
      height +
      '" role="group" aria-label="' +
      esc(title) +
      '">' +
      '<g transform="translate(' +
      dx +
      " " +
      dy +
      ") scale(" +
      scale +
      ')">' +
      '<image class="sm-terrain" href="map-relief.webp" x="' +
      rx +
      '" y="' +
      ry +
      '" width="' +
      (ex - rx) +
      '" height="' +
      (ey - ry) +
      '" preserveAspectRatio="none"/>' +
      data.lakes
        .map((poly) => '<path class="sm-water" d="' + poly + '"/>')
        .join("") +
      '<g class="sm-roads">' +
      routes +
      "</g></g>" +
      pins.map((pin) => pin.line).join("") +
      labels.join("") +
      marks +
      pins.map((pin) => pin.mark).join("") +
      north +
      scaleBar +
      "</svg>"
    );
  }

  function resources(id) {
    const active = byId.get(id);
    const house = selectedHouse(id);
    if (house) return [["Ubicación · " + house.name, house.source], ["Cartografía · OpenStreetMap", osm]];
    const routes = (active ? [active] : accesses).map((a) => [
      "Cómo llegar · " + a.name,
      window.ROUTES[a.route].links[1][1],
    ]);
    return [
      ...routes,
      ...forAccess(active).map((h) => ["Ubicación · " + h.name, h.source]),
      ["Punto de salida · Ecla Archamps", houses.origin.source],
      ["Rutas por carretera · OSRM", "https://project-osrm.org/"],
      ["Cartografía de carreteras · OpenStreetMap y licencia ODbL", osm],
      ["Lagos · Natural Earth", earth],
      ["Relieve · Mapzen, EU-DEM y Copernicus", relief],
    ];
  }

  const routeLink = (a) =>
    '<a class="sm-choice" ' +
    (a.active ? 'aria-current="page" ' : "") +
    'href="#mapa/' +
    a.id +
    '"><span><strong>' +
    esc(a.name) +
    "</strong><small>" +
    esc(a.access) +
    '</small></span><span class="sm-measure">' +
    esc(distance(a)) +
    "</span></a>";
  function houseIndex(visible) {
    return '<details class="sm-houses"><summary>Alojamientos <span>' + visible.length + '</span></summary><div>' +
      visible.map((h) => '<a class="sm-index-row" href="' + houseHref(h) + '"><b>' + h.number +
        '</b><span><strong>' + esc(h.name) + '</strong><small>' + esc(h.town) +
        (h.approximate ? ' · Zona aproximada' : '') + '</small></span></a>').join('') +
      '</div></details>';
  }

  function chooser(active, house) {
    const option = (id, name, chosen) => '<option value="' + id + '"' + (chosen ? ' selected' : '') + '>' + esc(name) + '</option>';
    return '<div class="sm-switch"><label for="sm-destination">Ver en el mapa</label><select id="sm-destination" data-ski-map-select>' +
      option('', 'Vista general', !active && !house) +
      '<optgroup label="Alojamientos">' + houses.list.map((h) => option(houseKey(h), h.number + '. ' + h.name + ' · ' + h.town, h === house)).join('') +
      '</optgroup><optgroup label="Salida">' + option(houseKey(houses.origin), houses.origin.name, house === houses.origin) +
      '</optgroup><optgroup label="Rutas a pistas">' + accesses.map((a) => option(a.id, a.name, a === active)).join('') +
      '</optgroup></select></div>';
  }

  function areaMap(active) {
    return '<figure class="sm-frame">' + drawMap(active, false) + drawMap(active, true) +
      '<figcaption class="sm-credit"><a href="' + osm +
      '" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a><span>·</span>Natural Earth<span>·</span><a href="' +
      relief + '" target="_blank" rel="noopener noreferrer">EU-DEM / Copernicus</a></figcaption></figure>';
  }

  const external = (url, label) => '<a class="sm-plans" href="' + esc(url) +
    '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' ↗</a>';

  function streetMap(h) {
    const half = h.approximate ? 0.009 : 0.005;
    const bbox = [h.lon - half * 2, h.lat - half, h.lon + half * 2, h.lat + half]
      .map((v) => v.toFixed(6)).join(',');
    const marker = h.lat + ',' + h.lon;
    const embed = 'https://www.openstreetmap.org/export/embed.html?' + new URLSearchParams({bbox, layer: 'mapnik', marker});
    const full = 'https://www.openstreetmap.org/?mlat=' + h.lat + '&mlon=' + h.lon + '#map=' + (h.approximate ? 15 : 17) + '/' + h.lat + '/' + h.lon;
    const origin = houses.origin;
    const route = 'https://www.google.com/maps/dir/?' + new URLSearchParams({
      api: '1', origin: origin.lat + ',' + origin.lon, destination: marker, travelmode: 'driving',
    });
    return '<section class="sm-lodging-detail"><div class="sm-lodging-title"><span class="sm-serial">' +
      (h.number || 'E') + '</span><div><h2>' + esc(h.name) + '</h2><p>' + esc(h.town) +
      (h.approximate ? ' · <strong>Zona aproximada</strong>' : '') + '</p></div></div>' +
      '<p class="sm-location">' + esc(h.location) + '</p><iframe class="sm-street" title="' +
      esc('Mapa de ' + h.name + (h.approximate ? ', zona aproximada' : '')) + '" src="' + esc(embed) +
      '" loading="lazy"></iframe><nav class="sm-house-actions" aria-label="Ver ubicación">' + external(full,'Ampliar mapa') +
      (h === origin ? '' : external(route, h.approximate ? 'Ruta a la zona desde Ecla' : 'Ruta desde Ecla')) +
      '<a class="sm-plans" href="#mapa">Vista general</a></nav><h3>Opciones en este lugar</h3><div class="sm-related">' +
      h.options.map((o) => '<a href="#' + o.ref + '">' + esc(o.title) + arrow + '</a>').join('') +
      '</div></section>';
  }

  function render(id) {
    const active = byId.get(id);
    const house = selectedHouse(id);
    const list = accesses.map((a) => routeLink({ ...a, active: a === active })).join('');
    const visible = forAccess(active);
    const trip = active ? '<div class="sm-trip"><div><span>Desde Ecla hasta ' + esc(active.name) +
      '</span><strong>' + esc(distance(active)) + '</strong><small>' + esc(active.access) +
      '</small></div><a class="sm-plans" href="#estacion/' + (active.station || active.id) +
      '">Ver planes ' + arrow + '</a></div>' : '';
    const map = house ? streetMap(house) : areaMap(active) +
      '<div class="sm-map-key"><span><i class="sm-key-house"></i>Alojamiento</span><span><i class="sm-key-zone"></i>Zona aproximada</span><span><i class="sm-key-stop"></i>Acceso a pistas</span></div>' + trip;
    return '<div class="heading"><h1>Mapa de rutas y alojamientos</h1><p>Elige una chincheta para ver la casa, su ubicación y los planes que empiezan allí.</p></div>' +
      chooser(active, house) + '<div class="sm-layout"><div class="sm-left">' + map + houseIndex(visible) +
      '</div><aside class="sm-list" aria-label="Destinos"><h2>Accesos en coche</h2>' + list +
      '<a href="#mapa" class="sm-all">Vista general</a></aside></div>' +
      '<p class="fine sm-footnote">Las rutas a las estaciones salen de Ecla. Distancias de ida y tiempos aproximados sin tráfico ni nieve.</p>';
  }
  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-ski-map-select]"))
      location.hash = event.target.value
        ? "mapa/" + event.target.value
        : "mapa";
  });
  window.SKI_MAP = { render, resources };
})();
