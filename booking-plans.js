(() => {
  "use strict";

  const equipment = {
    avoriaz: {
      kind: "gear",
      label: "Alquilar material",
      url: "https://www.intersport-avoriaz.com/magasins/place-centrale/",
      note: "Intersport Place Centrale · Avoriaz.",
    },
    carroz: {
      kind: "gear",
      label: "Alquilar material",
      url: "https://ski-plus.fr/categorie-produit/ski/",
      note: "Ski Plus · frente a Kédeuze. Cotizar dos días con casco y confirmar apertura del 12–13.",
    },
    cenis: {
      kind: "gear",
      label: "Alquilar material",
      url: "https://www.intersport-rent.fr/fr/stations-ski/maurienne/val-cenis/val-cenis-lanslevillard/rue-de-la-mairie",
      note: "Jeannot Sports · Lanslevillard. Alquiler junto a pistas y consigna gratuita publicada. Precio para siete pendiente.",
    },
    flaine: {
      kind: "gear",
      label: "Alquilar material",
      url: "https://www.simond-sports.com/location-ski",
      note: "Elegid Flaine Forum. Consigna gratuita publicada. Cotizar dos días con casco y comprobar servicio el 12–13.",
    },
    orelle: {
      kind: "gear",
      label: "Alquilar material",
      url: "https://easyresv3.wintersteiger.at/index_easyrent.php?shopid=100753",
      note: "Orelle Sports · recogida en Francoz, Orelle.",
    },
    thorens: {
      kind: "gear",
      label: "Alquilar material",
      url: "https://location-ski.sport2000.fr/magasins/204-sport-2000-eskiador-val-thorens",
      note: "Sport 2000 Eskiador · rue du Soleil, Val Thorens.",
    },
  };

  const forfaits = {
    avoriaz: {
      kind: "pass",
      label: "Comprar forfait",
      url: "https://www.skipass-avoriaz.com/fr/hiver/forfait/forfait-avoriaz-hiver?shopDate=2026-12-12&shopDrawer=1&shopValCat=2DAY",
      note: "Rock On Snow · pase de dos días para Avoriaz.",
    },
    cenis: {
      kind: "pass",
      label: "Comprar forfait del festival",
      url: "https://tousenpiste.valcenis.com/billets",
      note: "La entrada a Tous en Piste incluye el esquí de ambos días.",
    },
    debutant: {
      kind: "pass",
      label: "Forfait de iniciación",
      url: "https://lescarroz.skipass-grand-massif.com/",
      note: "Elegid «Les Carroz Débutant» para los días 12 y 13.",
    },
    villages: {
      kind: "pass",
      label: "Comprar forfait Villages",
      url: "https://www.skipass-grand-massif.com/",
      note: "Elegid el dominio «Villages» y dos jornadas.",
    },
    flaine: {
      kind: "pass",
      label: "Comprar forfait Flaine",
      url: "https://www.skipass-grand-massif.com/",
      note: "Elegid el dominio «Flaine» y dos jornadas.",
    },
    orelleStudent: {
      kind: "pass",
      label: "Forfait en taquilla",
      url: "https://www.orelle.net/station-ski/forfaits-de-ski",
      note: "Tarifa estudiante en Orelle. Llevad el carné y pedid dos pases de un día.",
    },
    orelleAdult: {
      kind: "pass",
      label: "Comprar forfait",
      url: "https://ski.orelle.net/",
      note: "Elegid «Orelle–Val Thorens» y dos días.",
    },
  };

  const esquiadesFlocons =
    "https://www.esquiades.com/hoteles/510746_village-de-vacances-les-flocons-verts";
  const esquiadesPackages = {
    cosy: "https://www.esquiades.com/hoteles/520929_cosy-val-tho-ski-aux-pieds",
    cheval:
      "https://www.esquiades.com/hoteles/1300789_residence-cheval-blanc-ski-in-out-with-wifi-in-val-thorens-v24-by-versant-collec",
  };

  function stay(plan) {
    if (plan.media === "flocons") {
      return {
        kind: "stay",
        label: "Ver alojamiento",
        url: esquiadesFlocons,
        note: "Elegid solo alojamiento para siete.",
      };
    }
    const action = {
      kind: "stay",
      label: "Ver alojamiento",
      url: plan.houseLink[1],
    };
    if (plan.cap6)
      action.note = "La tarifa mostrada corresponde a seis personas.";
    if (plan.id === "ancolie")
      action.note =
        "Consultad disponibilidad de una noche para siete con el propietario.";
    return action;
  }

  window.SKI_PLAN_BOOKING = (plan, { student = true } = {}) => {
    const pack = esquiadesPackages[plan.id];
    if (pack) {
      return [
        {
          kind: "package",
          label: "Alojamiento + forfait",
          url: pack,
          note: "Esquiades · elegid seis personas y el paquete con dos días de forfait.",
        },
        equipment.thorens,
      ];
    }

    const lodging = stay(plan);
    switch (plan.slope) {
      case "avoriaz":
        return [lodging, equipment.avoriaz, forfaits.avoriaz];
      case "cenis":
        return [lodging, equipment.cenis, forfaits.cenis];
      case "orelle":
        return [
          lodging,
          equipment.orelle,
          student ? forfaits.orelleStudent : forfaits.orelleAdult,
        ];
      case "carroz":
        return [
          lodging,
          equipment.carroz,
          plan.id.endsWith("-inicio") ? forfaits.debutant : forfaits.villages,
        ];
      case "flaine":
        return [lodging, equipment.flaine, forfaits.flaine];
      default:
        return [lodging];
    }
  };
})();
