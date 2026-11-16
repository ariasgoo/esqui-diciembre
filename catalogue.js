(() => {
  "use strict";
  window.SKI_PLAN_ALLOWED = plan => !!plan && plan.night != null && !plan.id.endsWith("inicio");
  window.SKI_ARCHIVE_ALLOWED = entry => !!entry && (entry.kind !== "Alojamiento" || /\d/.test(entry.price || ""));
  // Published Ski Plus catalogue: intermediate equipment 80 € + helmet 12 €.
  // This is a planning price, not a confirmed dated reservation or promotion.
  for (const plan of window.PLANS.filter(p => p.slope === "carroz" && window.SKI_PLAN_ALLOWED(p))) {
    plan.gear = [92, 92];
    plan.estimated = true;
    plan.gearInfo = "Ski Plus · tarifa publicada de dos días para material intermedio (esquís, botas y bastones), 80 €, más casco, 12 €. Total orientativo 92 € por persona. Confirmar apertura y disponibilidad del 12–13. La promoción anunciada no se ha descontado.";
    plan.sources = [...(plan.sources || []), ["Ski Plus · paquete intermedio y casco", "https://ski-plus.fr/location/package-dynamique-homme/"]];
    if (plan.tag === "Material local por cotizar") plan.tag = "Tarifa de catálogo";
  }
  for (const plan of window.PLANS.filter(p => ["cosy","cheval"].includes(p.id))) {
    plan.gear = [53.58,53.58];
    plan.gearInfo = "Sport 2000 Eskiador · tarifa intermedia observada el 16 de noviembre para el 12–13 de diciembre de 2026: esquís 34,20 €, botas 11,40 € y casco 7,98 €, total 53,58 € por persona. Cotización individual en un contexto de seis personas; no confirma stock para siete. Confirmar bastones y disponibilidad al reservar.";
    plan.estimated = true;
  }
})();
