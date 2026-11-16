(() => {
  "use strict";
  // Local time, 12–13 Dec 2026. Travel/queue estimates are planning allowances,
  // never operator schedules. Keep the two kinds of times separate in the UI.
  const clock = (h, m = 0) => h * 60 + m;
  const ceil5 = (n) => Math.ceil(n / 5) * 5;
  const time = (n) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
  const duration = (text, fallback) => {
    const value = (text || "").split("·").pop();
    const h = value.match(/(\d+)\s*h(?:\s*(\d+))?/);
    if (h) return Number(h[1]) * 60 + Number(h[2] || 0);
    const m = value.match(/(?:\d+[–-])?(\d+)\s*min/);
    return m ? Number(m[1]) : fallback;
  };
  const bases = {
    avoriaz: { name: "Avoriaz · Prodains", drive: 75, first: clock(8,45), published: true, shop: "Intersport Place Centrale", shopOpen: clock(8,30), end: clock(16), walk: 5, kind: "avoriaz" },
    orelle: { name: "Orelle · Francoz", drive: 115, first: clock(9), published: true, shop: "Orelle Sports", shopOpen: clock(8,30), end: clock(15,30), walk: 5, kind: "orelle" },
    cenis: { name: "Val Cenis · Vieux Moulin", drive: 150, first: clock(9), published: true, saturdayUnknown: true, shop: "Jeannot Sports · Lanslevillard", shopOpen: clock(8,30), end: clock(16), walk: 10, kind: "cenis" },
    carroz: { name: "Les Carroz · Kédeuze", drive: 50, first: clock(9), published: false, shop: "Ski Plus · frente a Kédeuze", shopOpen: clock(8,30), shopUnknown: true, end: clock(15,50), walk: 5 },
    flaine: { name: "Flaine · Forum", drive: 65, first: clock(9), published: false, shop: "Simond Sports · Forum", shopOpen: clock(8,30), shopUnknown: true, end: clock(16), walk: 5 },
    thorens: { name: "Val Thorens · Cascades / 2 Lacs", drive: 140, first: clock(9), published: true, shop: "Eskiador · rue du Soleil", shopOpen: clock(8,30), end: clock(16), walk: 5 },
  };
  const extraBases = {
    gets: { name: "Les Gets · Chavannes si abre", drive: 60, first: clock(9), end: clock(16), warning: "Preapertura parcial. Chavannes y sus horas aún no están confirmados." },
    morzine: { name: "Morzine · Pléney si abre", drive: 70, first: clock(9), end: clock(16), warning: "Preapertura según nieve natural. Pléney y sus horas aún no están confirmados." },
    chatel: { name: "Châtel · Pré-la-Joux", drive: 95, first: clock(9), end: clock(16), warning: "Sector de preapertura. Falta la primera y última subida de Pierre Longue." },
    manigod: { name: "Manigod · Croix Fry", drive: 75, first: clock(9), end: clock(16,15), warning: "Horario general del dominio 09:00–17:00 publicado. Falta confirmar el primer remonte de Croix Fry. Ruta modelo de 1 h 15 con subida desde el pueblo, por medir hasta la tienda." },
    contamines: { name: "Les Contamines · Montjoie", drive: 80, first: clock(8,50), end: clock(16), published: true, warning: "Ruta modelo de 1 h 20 hasta Le Lay, con acceso desde el pueblo. Bajad al valle antes de las 17:00." },
    bornand: { name: "Le Grand-Bornand · Rosay", drive: 55, first: clock(9), end: clock(16,15), warning: "Horario general del dominio 09:00–17:00 publicado. Primera y última subida de Rosay por concretar." },
    clusaz: { name: "La Clusaz · Beauregard", drive: 65, first: clock(8,55), end: clock(16), published: true },
    chamonix: { name: "Chamonix · Planpraz", drive: 75, first: clock(8,50), end: clock(16), published: true, warning: "Horario de Planpraz. Manteneos en el sector que cubra el forfait y bajad antes de las 16:45." },
    praz: { name: "Praz de Lys · frente de nieve", drive: 65, first: clock(9), end: clock(16), warning: "Preapertura Fest’Hiv. Horas y sector por publicar. Acceso por Taninges, evitando el col de la Ramaz." },
    tignes: { name: "Tignes · Le Lac", drive: 165, first: clock(9), end: clock(15,30), warning: "Las 09:00 son un objetivo provisional de salida desde la base. Las 09:30 de Grande Motte corresponden a un remonte superior." },
    valdisere: { name: "Val d’Isère · frente de nieve", drive: 175, first: clock(9), end: clock(15,30), warning: "Primera subida de la base por publicar. No crucéis tarde hacia Tignes. Acceso por Bourg-Saint-Maurice." },
    plagne: { name: "La Plagne · Plagne Centre", drive: 140, first: clock(9), end: clock(15,30), warning: "Primera subida local por publicar. Vanoise Express tiene su propio horario. El modelo permanece en el sector local." },
    arcs: { name: "Les Arcs · Arc 1800", drive: 150, first: clock(9), end: clock(15,30), warning: "Primera subida local por publicar. El modelo permanece en Les Arcs y no presupone cruzar Paradiski." },
    deuxAlpes: { name: "Les Deux Alpes · Jandri 1", drive: 175, first: clock(9), end: clock(15,30), published: true, warning: "Volved al primer tramo del Jandri antes de su cierre de las 16:15. Acceso por Grenoble." },
    champery: { name: "Champéry · Croix-de-Culet", drive: 105, first: clock(9), end: clock(15,30), warning: "Preapertura suiza. Teleférico, primer viaje y regreso por confirmar en el parte del día." },
    morgins: { name: "Morgins · Foilleuse", drive: 95, first: clock(9), end: clock(15,30), warning: "Preapertura suiza. Primera y última subida por publicar. Elegid alquiler en la base de Foilleuse." },
    verbier: { name: "Verbier · Médran", drive: 130, first: clock(8,45), end: clock(15,45), published: true },
    villars: { name: "Villars · acceso por concretar", drive: 105, first: clock(9), end: clock(15,30), warning: "Apertura progresiva. Falta elegir remonte, tienda y horario. El tiempo de ruta llega a Villars." },
    diablerets: { name: "Les Diablerets · sector local", drive: 110, first: clock(9), end: clock(15,30), warning: "Sector local por concretar. No presupone el forfait ni el teleférico de Glacier 3000." },
    glacier: { name: "Glacier 3000 · Col du Pillon", drive: 110, first: clock(9), end: clock(15,15), published: true, warning: "Primer teleférico a las 09:00. Esquí desde las 09:15, después de subir. Consultad la última bajada del día." },
    lelex: { name: "Lélex · La Catheline", drive: 60, first: clock(9), end: clock(15,30), unavailable: true, warning: "La temporada regular empieza el 19. Este modelo NO es un plan de esquí disponible para el 12–13 salvo anuncio de preapertura." },
    thollon: { name: "Thollon · telecabina", drive: 80, first: clock(9), end: clock(15,30), unavailable: true, warning: "La temporada regular empieza el 19. Este modelo NO es un plan de esquí disponible para el 12–13 salvo anuncio de preapertura." },
    houches: { name: "Les Houches · Bellevue / Prarion", drive: 60, first: clock(8,45), end: clock(15,15), published: true, warning: "Solo si se confirma la preapertura. Último regreso publicado a las 16:00." },
  };
  const config = (key) => bases[key] || { shop: "Tienda junto al remonte · por elegir", shopOpen: clock(8,30), shopUnknown: true, walk: 5, ...extraBases[key] };

  function make(key, lodging = {}) {
    const c = config(key);
    const l = { name: "Alojamiento por elegir", transfer: 15, mode: "drive", model: true, ...lodging };
    const av = c.kind === "avoriaz", or = c.kind === "orelle", ce = c.kind === "cenis";
    const onFoot = l.mode === "walk" || l.mode === "ski";
    const sat = [], sun = [], notes = [];
    const add = (list, at, action, detail = "") => list.push({ at: ceil5(at), action, detail });
    let arrival = c.shopOpen - 15;
    if (av) arrival = clock(8,15);
    if (ce) arrival = clock(7,45);
    const departure = arrival - c.drive - 30;
    add(sat, departure - 45, "Despertar en Ecla", "Desayuno y bolsas listas.");
    add(sat, departure, "Salir en coche", `${c.drive} min de ruta + 30 min de margen.`);
    add(sat, arrival, "Aparcar en el acceso", c.name);
    let firstSat;
    if (av) {
      add(sat, clock(8,30), "Recoger / cargar forfait", "En Prodains. Forfait comprado y soporte preparados.");
      add(sat, clock(8,45), "Subir sin esquís en Prodains", "4 min de cabina + unos 10 min a pie a la tienda.");
      add(sat, clock(9), "Recoger y probar material", `${c.shop}. Reservamos 30 min para siete.`);
      firstSat = clock(9,35);
    } else if (ce) {
      add(sat, clock(8), "Recoger pulseras Tous en Piste", "Vieux Moulin. Después, ir andando a Jeannot Sports.");
      add(sat, c.shopOpen, "Recoger y probar material", `${c.shop}. Reservamos 30 min para siete.`);
      firstSat = clock(9,10);
    } else {
      add(sat, c.shopOpen, "Recoger y probar material", `${c.shop}. Reservamos 30 min para siete.`);
      add(sat, c.shopOpen + 30, l.included ? "Canjear el forfait incluido" : "Recoger / comprar forfait", l.included ? "Con el bono. Confirmar entrega antes del check-in." : or ? "En taquilla. Llevar los siete carnés de estudiante." : "15 min previstos. Mejor llevar la compra preparada.");
      firstSat = Math.max(c.first, c.shopOpen + 45 + c.walk);
    }
    add(sat, firstSat, av ? "Empezar a esquiar en Avoriaz" : "Primera subida prevista", av ? "Desde la zona de Place Centrale. Elegir un remonte abierto del forfait local." : or ? "Telecabina de Orelle. Unos 13 min hasta Plan Bouchet." : c.name);
    add(sat, clock(12,30), "Pausa para comer", "30–45 min. Bocadillo para ahorrar.");
    add(sun, clock(12,30), "Pausa para comer", "Después, seguir en el mismo sector de regreso.");

    // Return equipment before any road transfer, on both days.
    let satCar, sunCar;
    const finish = (list, sunday) => {
      if (av) add(list, clock(15,30), "Volver hacia el centro de Avoriaz", "Anticiparse a los cierres de enlaces. Seguir el parte del sector.");
      add(list, c.end, or ? "Regresar hacia Grand Fond" : "Últimas pistas y regreso", or ? "Estar allí a las 15:30. Última conexión a Orelle a las 16:00." : "No esperar a la última subida. Volver al acceso de recogida.");
      let at = c.end + (or ? 45 : 10);
      if (av) {
        add(list, at, sunday || l.splitRent ? "Devolver material en la tienda" : "Dejar material en la consigna", `${c.shop}. Bajamos sin equipo.`);
        add(list, at + 20, "Bajar en Prodains", "4 min de cabina y paseo al aparcamiento.");
        return at + 35;
      }
      if (onFoot && !sunday) {
        add(list, at, l.mode === "ski" ? "Volver esquiando a la residencia" : "Volver a pie al alojamiento", l.mode === "ski" ? "Si abre la pista de retorno. Si no, volver andando." : `${l.transfer} min andando, con el material.`);
        return at + l.transfer;
      }
      add(list, at, sunday || l.splitRent ? "Devolver material en la tienda" : "Guardar equipo junto al remonte", sunday || l.splitRent ? "Dejar todo antes de ir al coche." : key === "carroz" ? "Casilleros de Kédeuze. Antes de las 16:30." : ce ? "Consigna gratuita de Jeannot Sports." : or ? "Dos casilleros de cuatro en Francoz." : "Consigna de la tienda, acordada al reservar.");
      return at + 20;
    };
    satCar = finish(sat, false);
    sunCar = finish(sun, true);
    let homeAt;
    if (onFoot) homeAt = Math.max(clock(17), satCar);
    else {
      add(sat, satCar, l.homeEcla ? "Volver en coche a Ecla" : "Ir en coche al alojamiento", `${l.transfer} min${l.homeEcla ? " + 30 min de margen" : " + 10 min de margen"}. Sin esquís en el coche.`);
      homeAt = Math.max(clock(17), satCar + l.transfer + (l.homeEcla ? 30 : 10));
    }
    add(sat, homeAt, l.homeEcla ? "Llegar a Ecla" : "Entrar y dejar las bolsas", l.homeEcla ? "Esta variante duerme en casa." : l.name + ". Hora de entrada acordada al reservar.");
    if (onFoot) add(sat, homeAt + 5, "Guardar los esquís", "Guardaesquís del alojamiento, con espacio reservado para siete.");
    if (l.spa) add(sat, Math.max(clock(18), homeAt + 30), "Sauna / jacuzzi opcional", l.spa);
    const dinner = Math.max(clock(20), homeAt + 60);
    add(sat, dinner, "Cenar y preparar el domingo", "Ropa, forfait y desayuno listos.");
    add(sat, Math.max(clock(22,30), dinner + 90), "Dormir", l.name);

    // Target the first published ascent Sunday, allowing checkout before skiing.
    let ready = av ? clock(8,15) : or ? clock(8,15) : ce ? clock(8,15) : c.first - 30;
    const transfer = l.transfer + (onFoot ? 5 : l.homeEcla ? 30 : 15);
    const sundayDeparture = ready - transfer;
    const morning = [];
    add(morning, sundayDeparture - (l.homeEcla ? 45 : 65), "Despertar y desayunar", l.homeEcla ? "Preparar la salida." : "Cerrar alojamiento y cargar las bolsas antes de esquiar.");
    add(morning, sundayDeparture, onFoot ? "Salir andando del alojamiento" : "Salir en coche", onFoot ? `${l.transfer} min a pie + 5 min de margen. Material del guardaesquís.` : `${l.transfer} min de ruta + ${l.homeEcla ? 30 : 15} min de margen. Sin esquís.`);
    add(morning, ready, onFoot ? "Llegar al acceso" : "Aparcar junto al remonte", c.name);
    let firstSun = c.first;
    if (av) {
      add(morning, clock(8,45), "Primera cabina de Prodains", "Sin material. 4 min de cabina + unos 10 min andando.");
      add(morning, clock(9), "Recuperar equipo de la consigna", `${c.shop}. Forfait ya preparado.`);
      firstSun = clock(9,10);
      add(morning, firstSun, "Empezar a esquiar", "Estimación tras el paseo y la recogida.");
    } else {
      if (!onFoot) add(morning, or ? ready : Math.max(ready, c.shopOpen), "Recuperar equipo guardado", ce ? "Jeannot Sports abre a las 08:30. 10 min para recoger + 10 min andando." : "Consigna junto al acceso. Prever 10 min.");
      if (or) add(morning, clock(8,30), "Recoger forfait del domingo", "15 min previstos en taquilla. Horario de apertura por confirmar.");
      add(morning, c.first, "Primera subida prevista", key === "glacier" ? "Teleférico 09:00. Esquí desde las 09:15." : c.name);
    }
    sun.unshift(...morning);
    add(sun, sunCar, "Coger el coche y volver a Ecla", `${c.drive} min de ruta + 30 min de margen + 20 min de pausa.`);
    const back = ceil5(sunCar + c.drive + 50);
    add(sun, back, "Llegar a Ecla Archamps", "Fin del fin de semana. Cena en la residencia.");

    if (av) notes.push("Primera cabina de Prodains a las 08:45. Al recoger el equipo arriba, esquí previsto a las 09:35 el sábado y 09:10 el domingo. Subir antes como peatón requiere comprobar billete y coste.");
    else if (firstSat > c.first) notes.push(`Objetivo de apertura ${time(c.first)}. El sábado calculamos ≈${time(firstSat)} por la recogida de siete equipos y forfaits. Para adelantarlo, la tienda debe confirmar entrega más temprana o preparación previa.`);
    if (!c.published || c.saturdayUnknown) notes.push(c.saturdayUnknown ? "Sábado de Val Cenis sin primera ni última subida publicadas. Las 09:10 significan estar listos, no una apertura confirmada. Domingo Vieux Moulin abre a las 09:00." : `Las ${time(c.first)} son un objetivo provisional. Falta la primera y última subida exactas del acceso para el 12–13.`);
    if (c.shopUnknown) notes.push(`Las ${time(c.shopOpen)} de la tienda son una hipótesis de trabajo. Apertura, recogida y almacenamiento para siete pendientes de acordar.`);
    if (l.model) notes.push(`Noche aún sin casa concreta. Modelo con ${l.transfer} min ${onFoot ? "andando" : "en coche"} al remonte. Hay que recalcular al elegir la dirección.`);
    if (l.warning) notes.push(l.warning);
    if (c.warning) notes.push(c.warning);
    if (l.included) notes.push("El bono del paquete debe permitir recoger el forfait el sábado por la mañana, antes de recibir la habitación. Falta confirmar este punto con el proveedor.");
    return { label: l.label || c.name, station: c.name, lodging: l.name, saturday: sat, sunday: sun, departure: ceil5(departure), back, firstSat, firstSun, first: c.first, published: !!c.published, saturdayUnknown: !!c.saturdayUnknown, unavailable: !!c.unavailable, avoriaz: av, notes, sources: l.sources || [] };
  }

  function forPlan(p) {
    const route = window.ROUTES[p.route];
    const access = window.SKI_ACCESS.plans[p.id];
    const foot = access.mode === "walk" || access.mode === "ski";
    const transfer = foot ? (p.slope === "carroz" ? 12 : 10) : duration(route.homeLift, 15);
    const model = make(p.slope, { name: p.home, transfer, mode: access.mode, model: false, included: ["cosy", "cheval"].includes(p.id), spa: p.jacuzzi !== "No" ? p.jacuzzi : p.sauna !== "No" ? p.sauna : "", warning: ["fleur", "ancolie"].includes(p.id) ? "El modelo no confirma la entrada el sábado ni una tarifa de una noche para siete. El calendario consultado no permitía esa entrada." : "" });
    if (p.id.endsWith("inicio")) {
      model.station = "Les Carroz · sector de iniciación por concretar";
      model.notes.push("Kédeuze es el punto de recogida del material. El forfait de iniciación solo incluye determinados remontes. Falta identificar el primer acceso abierto que cubra ese pase y ajustar el paseo desde Ski Plus.");
      [model.saturday, model.sunday].forEach(day => day.forEach(row => { if (row.action === "Primera subida prevista") row.detail = "Solo en un remonte abierto que cubra el forfait de iniciación. Acceso y paseo por concretar."; }));
    }
    return [model];
  }
  const generic = (key, extra = {}) => make(key, extra);
  function forArchive(a, i) {
    const fromPlan = (id, label, extra = {}) => {
      const p = window.PLANS.find((p) => p.id === id);
      const r = window.ROUTES[p.route];
      return make(p.slope, { name: p.home, transfer: duration(r.homeLift, 15), mode: window.SKI_ACCESS.plans[p.id].mode, model: false, label, ...extra });
    };
    const models = {
      0: () => [make("avoriaz", { name: "Avoreaz G · Morzine", transfer: 10, model: false })],
      1: () => [make("gets", { name: "Apartamento con sauna", transfer: 5, mode: "walk", model: false, spa: "Sauna del apartamento.", warning: "Pista local a 250 m, pero el remonte no está identificado. Este modelo usa Chavannes solo como referencia y el paseo real puede cambiar." })],
      2: () => [make("gets", { name: "Ceiba · Carmine Lodge", transfer: 8, mode: "walk", model: false, warning: "Paseo de 490 m a Chavannes. Usar este acceso solo si abre." })],
      3: () => [make("chatel", { name: "Chalet La Voraz", transfer: 12, model: false, warning: "Modelo por Pré-la-Joux. Alquiler y consigna en ese acceso por concretar. El remonte a 300 m del chalet no resuelve la preapertura." })],
      4: () => [make("orelle", { name: "Auberge HI Valmeinier", transfer: 25, model: false, warning: "La oferta consultada era para seis. Falta la séptima plaza." })],
      5: () => [make("orelle", { name: "Le Shantoné · Beaune", transfer: 25, model: false, warning: "Oferta original para seis. Falta cerrar las siete plazas." })],
      6: () => [generic("manigod")], 7: () => [generic("contamines")], 8: () => [generic("bornand")], 9: () => [generic("clusaz")], 10: () => [generic("chamonix")],
      11: () => [generic("gets"), generic("morzine"), generic("chatel")], 12: () => [generic("praz")],
      13: () => [generic("tignes"), generic("valdisere")], 14: () => [generic("plagne"), generic("arcs")], 15: () => [generic("deuxAlpes")],
      16: () => [generic("champery"), generic("morgins")], 17: () => [generic("verbier")],
      18: () => [generic("glacier"), generic("villars"), generic("diablerets")],
      19: () => [generic("houches"), generic("lelex"), generic("thollon")],
      20: () => [fromPlan("turche", "La Turche · Avoriaz"), fromPlan("fleur", "Fleur · Avoriaz", { warning: "Entrada el sábado y tarifa para siete aún no disponibles en el calendario consultado." })],
      21: () => [make("thorens", { label: "Cheval + Hôtel 3 Vallées", name: "Dos alojamientos en Val Thorens", transfer: 10, mode: "walk", model: false, included: true, warning: "Dos bonos y dos recepciones. Acordar punto de encuentro. Guardar el equipo en cada residencia." }), make("thorens", { label: "Cosy + Cheval", name: "Cosy + Cheval Blanc", transfer: 10, mode: "ski", model: false, included: true })],
      22: () => {
        const m = make("thorens", { name: "Centro UCPA Val Thorens", transfer: 10, mode: "ski", model: false, included: true, warning: "Pack de una noche y siete plazas sin confirmar. Horario de recepción y entrega de material UCPA por acordar. Eskiador NO es la tienda de este paquete." });
        m.saturday = m.saturday.map(row => row.action === "Recoger y probar material" ? { ...row, detail: "En el centro UCPA. 08:30 es una hipótesis pendiente de aceptación por el centro." } : row);
        m.sunday = m.sunday.map(row => row.action === "Devolver material en la tienda" ? { ...row, action: "Devolver material al centro UCPA", detail: "Antes de volver andando al coche." } : row);
        return [m];
      },
      23: () => [fromPlan("loft", "Avoriaz · reservas separadas", { warning: "El pack oficial de Avoriaz exige tres noches. Este horario usa una noche en Cluses con reservas separadas, no ese pack." }), fromPlan("cenis", "Val Cenis · reservas separadas", { warning: "El pack Bronze exigía dos noches y figuraba agotado. Modelo con casa y entradas reservadas por separado." })],
      24: () => [mixed("bornand"), mixed("clusaz")],
      25: () => [make("avoriaz", { name: "Ecla Archamps", transfer: 75, homeEcla: true, model: false, warning: "Variante de dos excursiones. Es la única que no incluye una noche fuera de Ecla." })],
      26: () => {
        const m = fromPlan("loft", "Avoriaz + sauna en Morzine", { warning: "Sauna del centro acuático de Morzine, no del loft. Abre el sábado hasta las 19:00. Añadir entrada y confirmar siete plazas." });
        m.saturday = m.saturday.filter(row => !["Ir en coche al alojamiento", "Entrar y dejar las bolsas"].includes(row.action));
        m.saturday.push({ at: clock(16,45), action: "Conducir a la sauna de Morzine", detail: "30 min previstos con aparcamiento y paseo, por verificar. Sin material." }, { at: clock(17,15), action: "Sauna opcional en Morzine", detail: "Hasta las 18:15, si hay plazas." }, { at: clock(18,15), action: "Conducir al loft de Cluses", detail: "45 min previstos + 15 min de margen, por verificar con la ruta exacta." }, { at: clock(19,15), action: "Entrar en el loft", detail: "Acordar llegada tardía con el anfitrión." });
        m.saturday.sort((a,b) => a.at - b.at);
        return [m];
      },
      27: () => [fromPlan("loft", "Modelo · Place Centrale + loft", { warning: "Esta ficha compara tiendas. El horario usa Intersport Place Centrale y el loft como modelo. Cambiar de tienda requiere recalcular paseo, horario y consigna." })],
    };
    const list = models[i]();
    const sources = [
      ...window.skiLiftHours(null, i).flatMap(row => row.sources || []),
      ...(a.links || []),
      ...window.SKI_GEAR_LOGISTICS.forArchive(a).sources,
    ];
    return list.map(m => ({ ...m, sources: [...m.sources, ...sources] }));
  }

  // The multi-station variant uses an explicit valley base, not a fictional
  // distance from an accommodation that has not been chosen.
  function mixed(second) {
    const m = make("avoriaz", { name: "Loft de Cluses · base modelo", transfer: 40, model: false, splitRent: true });
    const c = config(second), drive = 60;
    const out = clock(8,15) - drive - 15;
    const add = (at, action, detail = "") => ({ at, action, detail });
    m.label = `Avoriaz + ${c.name}`;
    m.station = `Sábado Avoriaz · domingo ${c.name}`;
    m.first = c.first;
    m.published = !!c.published;
    m.sunday = [
      add(out - 65, "Despertar y desayunar", "Dejar el loft y cargar las bolsas."),
      add(out, "Salir de Cluses en coche", "Modelo de 60 min por Saint-Pierre-en-Faucigny + 15 min de margen. Ruta por verificar. Evitar el col de la Colombière."),
      add(clock(8,15), "Aparcar junto al acceso", c.name),
      add(clock(8,30), "Recoger el segundo alquiler", "Tienda junto al remonte por elegir. Apertura 08:30 supuesta; 30 min para siete."),
      add(clock(9), "Recoger el forfait de un día", "15 min previstos. Es distinto al del sábado."),
      add(clock(9,20), "Primera subida prevista", c.name),
      add(clock(12,30), "Pausa para comer", "30–45 min."),
      add(c.end, "Últimas pistas y regreso", "Volver al mismo acceso."),
      add(c.end + 10, "Devolver los esquís", "Antes de volver al coche."),
      add(c.end + 30, "Salir en coche hacia Ecla", `${c.drive} min + 30 min de margen + 20 min de pausa.`),
      add(c.end + 30 + c.drive + 50, "Llegar a Ecla Archamps", "Cena en la residencia."),
    ];
    m.back = m.sunday.at(-1).at;
    m.avoriaz = false;
    m.firstSun = clock(9,20);
    m.notes = m.notes.filter(n => !n.startsWith("Primera cabina"));
    m.openingText = `Sábado Prodains 08:45 · domingo ${c.name}, ${time(c.first)}${c.published ? "" : " provisional"}`;
    m.notes.push("Base asumida en el loft de Cluses. Dos alquileres de un día y dos forfaits distintos. La recogida del domingo retrasa la primera subida respecto a la apertura.");
    m.notes.push("Falta elegir tienda del domingo y medir Cluses → acceso. Los 60 min son una hipótesis y deben ajustarse antes de reservar.");
    return m;
  }

  const cache = new Map(), selected = new Map();
  const listHTML = (list) => `<ol class="day-steps">${list.map(row => `<li><time>${time(row.at)}</time><div><strong>${e(row.action)}</strong>${row.detail ? `<small>${e(row.detail)}</small>` : ""}</div></li>`).join("")}</ol>`;
  function contents(key, models) {
    const index = Math.min(selected.get(key) || 0, models.length - 1), m = models[index];
    const head = `<div class="sectionhead"><h2>El fin de semana, paso a paso</h2><span class="minor">12–13 dic · hora local</span></div>
      ${models.length > 1 ? `<label class="itinerary-select">Elegir variante<select data-itinerary-select="${e(key)}">${models.map((m,i) => `<option value="${i}" ${i === index ? "selected" : ""}>${e(m.label)}</option>`).join("")}</select></label>` : ""}`;
    if (m.unavailable) return head + `<p class="itinerary-notes"><strong>${e(m.station)} · apertura prevista el 19.</strong><br>No hay itinerario de esquí viable el 12–13 con el calendario publicado. Elegid Les Houches en el selector, sujeto a su preapertura.</p>`;
    return head + `
      <dl class="trip-summary"><div><dt>Salir de Ecla · sáb.</dt><dd>${time(m.departure)}</dd></div><div><dt>${m.avoriaz ? "Esquiar" : "Primer remonte"} · sáb.</dt><dd>≈${time(m.firstSat)}</dd></div><div><dt>${m.avoriaz ? "Esquiar" : "Primer remonte"} · dom.</dt><dd>${m.firstSun === m.first && m.published ? "" : "≈"}${time(m.firstSun)}</dd></div><div><dt>Volver a Ecla · dom.</dt><dd>≈${time(m.back)}</dd></div></dl>
      <p class="schedule-key">${m.openingText ? e(m.openingText) : `${m.published ? "Apertura publicada" : "Apertura por publicar"} · ${e(m.station)}${m.published ? ` · ${time(m.first)}${m.saturdayUnknown ? " solo el domingo" : ""}` : ""}`}. Las demás horas son estimaciones de planificación.</p>
      ${m.notes.length ? `<ul class="itinerary-notes"><li>${e(m.notes[0])}</li></ul>` : ""}
      ${m.notes.length > 1 ? `<details class="planning-assumptions itinerary-pending"><summary>${m.notes.length - 1} condiciones y datos por cerrar</summary><ul>${m.notes.slice(1).map(n => `<li>${e(n)}</li>`).join("")}</ul></details>` : ""}
      <div class="weekend-grid"><section class="itinerary-day"><h3>Sábado <small>Salir · esquiar · dormir</small></h3>${listHTML(m.saturday)}</section><section class="itinerary-day"><h3>Domingo <small>Primera subida · regreso</small></h3>${listHTML(m.sunday)}</section></div>
      <details class="planning-assumptions"><summary>Márgenes y supuestos del horario</summary><ul><li>30 min de margen en la ida desde Ecla, 15 min desde una casa del valle y 5 min a pie.</li><li>30 min para probar siete equipos y 15 min para forfaits. Con colas o cambios de botas tardaréis más.</li><li>La salida del domingo incluye 65 min para desayuno, maletas y dejar el alojamiento. Equipaje al coche antes de esquiar.</li><li>Entrada a la casa prevista desde las 17:00, pendiente de acordar. Sauna y jacuzzi requieren su propio horario y reserva.</li><li>El regreso incluye 30 min de margen y una pausa de 20 min. Nieve y tráfico pueden alargar los trayectos.</li><li>Material junto al remonte o arriba tras subir en cabina. Guardado allí antes de ir en coche a dormir y devuelto antes de volver a Ecla.</li></ul></details>`;
  }
  function panel(key, models) {
    cache.set(key, models);
    return `<section class="weekend-plan" data-itinerary="${e(key)}" aria-label="Itinerario del fin de semana">${contents(key, models)}</section>`;
  }
  document.addEventListener("change", event => {
    const el = event.target.closest("select[data-itinerary-select]");
    if (!el) return;
    const key = el.dataset.itinerarySelect;
    selected.set(key, Number(el.value));
    const panel = el.closest("[data-itinerary]");
    panel.innerHTML = contents(key, cache.get(key));
    panel.querySelector("select")?.focus({ preventScroll: true });
  });
  window.SKI_ITINERARIES = { forPlan, forArchive, panel, time };
})();
