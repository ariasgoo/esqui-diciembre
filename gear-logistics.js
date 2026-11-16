(() => {
  "use strict";

  const avoriaz = {
    title: "Coche hasta Prodains · material arriba en Avoriaz",
    pickup: "Aparcáis en Prodains y subís 4 min en teleférico sin material. Camináis hasta Intersport Place Centrale, 7 place Centrale, y allí probáis botas y recogéis esquís. El paseo hasta la tienda se hace por la estación.",
    night: "El sábado dejáis el equipo en la consigna de Intersport y bajáis sin esquís al coche. El servicio está publicado. Falta confirmar siete plazas y su suplemento, que se añade a la base mostrada.",
    return: "El domingo volvéis a subir sin equipo, lo recogéis y esquiáis. Al acabar, devolvéis todo en la tienda antes de bajar en teleférico. Tienda de 08:30 a 19:00 ambos días.",
    booking: "Reservar material y una noche de consigna con la misma tienda.",
    sources: [
      ["Intersport Avoriaz · consigna en tienda", "https://www.intersport-avoriaz.com/services/consigne/"],
      ["Place Centrale · ubicación y apertura del 11 de diciembre", "https://www.intersport-rent.fr/fr/stations-ski/haute-savoie/avoriaz/place-centrale"],
      ["Prodains · acceso de ida y vuelta", "https://www.avoriaz.com/sejourner/acces-et-transport/telepherique-des-prodains/"],
    ],
  };
  const orelle = {
    title: "Alquiler y consigna junto a la telecabina de Orelle",
    pickup: "Conducís hasta Francoz y aparcáis. Recogéis el equipo en Orelle Sports, junto a la telecabina, y lo lleváis en la cabina hasta las pistas. Tienda de 08:30 a 18:00.",
    night: "El sábado guardáis los siete equipos en dos casilleros de cuatro junto a la telecabina. Una noche cuesta 32 € para el grupo. Se paga aparte del precio principal.",
    return: "El domingo sacáis el equipo de los casilleros y subís en cabina. Al terminar, bajáis con él y lo devolvéis en Orelle Sports antes de volver al coche. Casilleros de 07:30 a 18:00.",
    booking: "Reservar dos casilleros de cuatro, del sábado al domingo. Disponibilidad de ambos pendiente.",
    sources: [
      ["Orelle Sports · recogida y horario", "https://www.orelle-sports.com/contact/"],
      ["Orelle · casilleros y tarifa de una noche", "https://orelle.net/fiche/village/commerces-et-services/5630091"],
      ["Situación de la consigna junto a la telecabina", "https://ski.orelle.net/acces-parking/"],
    ],
  };
  const cenis = {
    title: "Alquiler en Lanslevillard · consigna gratuita publicada",
    pickup: "Aparcáis en Lanslevillard y recogéis el equipo en Jeannot Sports, 49 rue de la Mairie. La estación sitúa la tienda a menos de 300 m de pistas. Para Tous en Piste usáis el acceso Vieux Moulin y camináis entre tienda y remonte.",
    night: "El sábado dejáis los esquís en la consigna gratuita con código individual que anuncia Jeannot Sports y regresáis sin material a la casa.",
    return: "El domingo recogéis el equipo y lo devolvéis a la misma tienda al acabar. Sábado de 08:30 a 19:30 y domingo de 08:30 a 19:00, según la ficha de Intersport.",
    booking: "Cotizar dos días con casco para siete y confirmar sitio en la consigna. Se ha retirado el antiguo alquiler en Orelle y su precio.",
    sources: [
      ["Jeannot Sports · consigna gratuita y proximidad a pistas", "https://www.valcenis.com/commerce-et-service/jeannot-sports-val-cenis/"],
      ["Jeannot Sports · tienda, horario y reserva", "https://www.intersport-rent.fr/fr/stations-ski/maurienne/val-cenis/val-cenis-lanslevillard/rue-de-la-mairie"],
    ],
  };
  const carrozDrive = {
    title: "Coche hasta Kédeuze · alquiler al lado del remonte",
    pickup: "Aparcáis en Kédeuze y vais a pie a Ski Plus, frente a la telecabina. Allí recogéis el material y camináis a la cabina. El nuevo alquiler y la apertura de la tienda el 12–13 están por confirmar.",
    night: "El sábado dejáis el equipo en los casilleros de Kédeuze. Dos casilleros de cuatro cuestan 44 € por una noche para siete. Se pagan aparte del precio principal. Los casilleros se anuncian de 08:30 a 16:30.",
    return: "El domingo recuperáis los esquís en Kédeuze y, al terminar, devolvéis todo en Ski Plus antes de subir al coche. Depositad el equipo el sábado antes de las 16:30.",
    booking: "Cotizar siete equipos con casco en Ski Plus y reservar dos casilleros de cuatro para una noche.",
    sources: [
      ["Ski Plus · tienda y consigna frente a Kédeuze", "https://ski-plus.fr/le-magasin/"],
      ["Les Carroz · casilleros a 22 € por noche", "https://www.lescarroz.com/equipement/consignes-a-skis-les-carroz-daraches/"],
      ["Reserva independiente de casilleros", "https://lescarroz.navic.fr/"],
    ],
  };
  const carrozWalk = {
    ...carrozDrive,
    title: "Alquiler junto a Kédeuze · traslado andando al hotel",
    pickup: "Recogéis el material en Ski Plus, frente a Kédeuze, y desde allí camináis a la cabina. Desde Flocons Verts podéis acceder a pie por calles, unos 12 min, o por la cinta Figaro si funciona.",
    night: "Podéis volver andando con los esquís al hotel y pedir un sitio para guardarlos. Si preferís dejarlos en Kédeuze, los dos casilleros para siete cuestan 44 € la noche, un extra opcional.",
    return: "El domingo volvéis andando con el equipo, esquiáis y lo devolvéis en Ski Plus antes de partir en coche.",
    booking: "Cotizar dos días con casco en la tienda y confirmar la apertura el 12–13 y dónde guarda el hotel los siete equipos.",
  };
  const flaine = {
    title: "Coche hasta Flaine Forum · alquiler allí",
    pickup: "Aparcáis en P2 Flaine Forum y camináis al frente de nieve. Recogéis el material en Simond Sports de Forum. Elegid este barrio al reservar.",
    night: "La tienda Simond Sports anuncia consigna gratuita. El sábado dejáis allí los esquís y volvéis sin material al hotel de Les Carroz.",
    return: "El domingo conducís otra vez a Flaine, recuperáis el equipo y lo devolvéis en Forum antes de regresar al coche.",
    booking: "Cotizar los siete equipos con casco y confirmar consigna y apertura el 12–13. Se ha retirado el alquiler de Les Carroz del presupuesto.",
    sources: [
      ["Simond Sports · alquiler y consigna gratuita", "https://www.simond-sports.com/location-ski"],
      ["Simond Sports · ubicación en Flaine Forum", "https://www.simond-sports.com/magasins-sport"],
    ],
  };
  const thorens = {
    title: "Alquiler en Val Thorens · alojamiento a pie de pista",
    pickup: "Dejáis el coche en Val Thorens y camináis a Sport 2000 Eskiador, rue du Soleil, para recoger el material. Desde la tienda podéis llevarlo a pie al alojamiento.",
    night: "Guardáis el equipo en el guardaesquís de vuestra residencia. Confirmad las plazas asignadas al apartamento al reservar.",
    return: "El domingo devolvéis los esquís en Eskiador y vais andando al coche.",
    booking: "Alquiler en la estación y alojamiento con guardaesquís. Confirmar espacio para vuestro grupo.",
    sources: [["Eskiador · ubicación de la tienda", "https://location-ski.sport2000.fr/magasins/204-sport-2000-eskiador-val-thorens"]],
  };
  const localWalk = {
    title: "Recogida local y traslado a pie",
    pickup: "Elegid la tienda enlazada en la propia estación y caminad desde ella al sector abierto. Falta concretar el recorrido desde la tienda hasta este alojamiento.",
    night: "Para la noche, reservad guardaesquís en el alojamiento o consigna en la tienda. La capacidad y cualquier suplemento están por confirmar.",
    return: "El domingo devolved el equipo en la misma estación antes de ir al coche.",
    booking: "Esta variante aún requiere confirmar tienda, recorrido a pie y almacenamiento para siete.",
    sources: [],
  };
  const generic = {
    ...localWalk,
    title: "Material local pendiente de concretar",
    pickup: "La opción aún necesita un acceso y una tienda concretos. Elegid alquiler junto al remonte abierto o arriba tras subir en cabina.",
    night: "Reservad consigna en ese mismo acceso o alojamiento al que podáis llegar a pie con los esquís. Disponibilidad y precio pendientes.",
  };
  const byPlan = (plan) => {
    if (plan.slope === "avoriaz") return avoriaz;
    if (plan.slope === "cenis") return cenis;
    if (plan.slope === "orelle") return orelle;
    if (plan.slope === "carroz") return plan.media === "ferme" ? carrozDrive : carrozWalk;
    if (plan.slope === "flaine") return flaine;
    return thorens;
  };
  const byArchive = {
    "Avoreaz G": avoriaz,
    "Cómo cambiaba la noche de 6 a 7": avoriaz,
    "Dos excursiones desde Archamps": avoriaz,
    "Añadir sauna al loft": avoriaz,
    "Auberge HI Valmeinier": orelle,
    "Le Shantoné": orelle,
    "Dos reservas de Esquiades": thorens,
    "UCPA · Pack Mini": {
      title: "Equipo del propio centro UCPA",
      pickup: "El paquete incluye material que se recoge en el centro de Val Thorens. Casco aparte.",
      night: "El material permanece en el centro donde dormís. Confirmad el servicio del paquete elegido.",
      return: "El domingo se devuelve al centro antes de recoger el coche.",
      booking: "Siete plazas y venta del paquete de una noche pendientes para esas fechas.",
      sources: [["UCPA · centro de Val Thorens", "https://www.ucpa.com/destination/village-sportif/val-thorens"]],
    },
    "Una estación cada día": {
      title: "Dos estaciones · dos alquileres independientes",
      pickup: "El sábado alquiláis arriba en Avoriaz y devolvéis allí los esquís al acabar. El domingo hacéis una reserva nueva en la estación elegida.",
      night: "La noche del sábado se pasa sin equipo. Cada estación necesita su propia reserva de material.",
      return: "Devolved el equipo cada tarde en la tienda de ese día antes de volver al coche.",
      booking: "Las dos tarifas de alquiler están por cotizar. La referencia anterior de alquiler en Annemasse se ha retirado.",
      sources: avoriaz.sources,
    },
    "Otras tiendas de alquiler": {
      ...avoriaz,
      booking: "Si cambiáis de tienda, comprobad su consigna nocturna y el precio para siete. El alquiler en Annemasse exigiría transportar los esquís en coche.",
    },
  };
  ["Apartamento con sauna · 103 m²", "Ceiba · Carmine Lodge"].forEach(name => { byArchive[name] = localWalk; });
  byArchive["Chalet La Voraz · L’Ourson"] = {
    ...generic,
    title: "Châtel · alquiler en el sector abierto",
    pickup: "Conducid hasta Linga o Pré-la-Joux y recoged los esquís junto al acceso que abra. La tienda enlazada debe confirmar recogida en ese sector.",
    booking: "La tienda y la consigna junto al acceso abierto están pendientes. Alquilar junto al chalet requeriría trasladar el equipo hasta las pistas.",
  };
  byArchive["Packs de los eventos"] = {
    ...generic,
    booking: "Para Avoriaz, alquiler y consigna arriba. Para Val Cenis, Jeannot Sports en Lanslevillard. Ningún paquete está cerrado para vuestra única noche.",
    sources: [...avoriaz.sources, ...cenis.sources],
  };
  window.SKI_GEAR_LOGISTICS = {
    forPlan: byPlan,
    forArchive: item => byArchive[item.name] || generic,
  };
})();
