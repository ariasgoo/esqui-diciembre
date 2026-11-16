# Esquí en diciembre

[Visor del 12–13 de diciembre de 2026](https://ariasgoo.github.io/esqui-diciembre/)

Una noche y dos días de esquí para siete personas de 20 años desde Ecla Archamps. GitHub Pages publica `main` desde la raíz. Para abrir en local, `python3 -m http.server`.

La navegación principal contiene «Opciones», «Votos» y «Mapa». La portada empieza con tres estaciones plegadas, cada una con foto, trayecto, kilómetros y pros/contras. La cabecera despliega o recoge los alojamientos debajo. Al abrir una estación se pliega la anterior. La apertura se conserva al votar, filtrar y volver desde una ficha durante la misma visita.

Los nueve planes principales se agrupan en Avoriaz (loft de Cluses, chalet de Arâches y Fleur des Alpes), Val Thorens–Orelle (Modane, Cosy, apartamento de Saint-Michel y hotel Ô Saint Michel) y Les Carroz (Flocons Verts y chalet de Arâches con Villages). La ampliación incorpora las cinco opciones que el propietario había votado. Fleur se puede votar con su oferta para seis, y la ficha indica consultar la séptima plaza y la llegada del sábado. Cosy y Ô Saint Michel también identifican su tarifa para seis. Val Cenis, Flaine y las demás variantes están en el enlace pequeño «Otras opciones». Los 17 identificadores de plan y sus votos siguen admitidos.

Cada estación muestra el trayecto desde Ecla indicando «en coche», el total de kilómetros esquiables del dominio, un pro y un contra. El pie de página indica que la apertura depende de la nieve. Cada alojamiento resume una ventaja, una desventaja y el precio por persona. El recuento junto al botón de votar enlaza a los resultados del alojamiento. El filtro permite elegir acceso andando, en coche o directo con esquís. Al abrir una ficha aparece primero el desglose con barra de proporciones; después están pros/contras, fotos y enlaces de reserva. Itinerario, estancia y condiciones se despliegan a petición. Las rutas anteriores siguen funcionando.

Los alojamientos alternativos sin precio de noche tampoco aparecen en las fichas, «Otras» ni en las chinchetas. Se conservan los números de las ubicaciones restantes.

Cada estación empieza por distancia y tiempo desde Ecla. El perfil resume dominio, colores por número de pistas, mapa oficial y dos puntos clave. `resort-facts.js` recoge las fuentes. El operador no publica kilómetros por cada color; no se convierten recuentos a longitudes. Villages tiene fuentes discrepantes de recuento y no se inventa su reparto por colores.

Precios orientativos consultados el 16 de noviembre. La ficha empieza por el desglose. El selector del desglose cambia persona/grupo; al volver al catálogo se muestran importes por persona. las tarifas de estudiante se aplican cuando corresponden. Ski Plus publica 80 € de material intermedio +12 € de casco por dos días; se usa 92 €, sin descontar una promoción no validada. Eskiador mostró 53,58 € intermedio con botas y casco para el 12–13; no confirma siete equipos disponibles ni bastones. Val Cenis conserva su subtotal conocido con «+ material», porque no hay una cotización local verificable; nunca se presenta como total completo.

La consigna se explica y se suma aparte del precio principal. Orelle usa dos casilleros por 32 € para el grupo y Kédeuze dos por 44 €. Avoriaz requiere cotizar la consigna. El equipo siempre se recoge junto al acceso o arriba tras subir sin esquís; se guarda antes de conducir a dormir y se devuelve antes del regreso. No se transportan esquís en los coches.

`itineraries.js` prepara las salidas del sábado, recogida, esquí, alojamiento y regreso del domingo. No hay horarios para levantarse ni comidas. Coche en azul y esquí en verde. Sauna y jacuzzi solo aparecen más abajo como extras cuando existen. Las condiciones y fuentes quedan en desplegables y «Recursos».

El mapa empieza con los alojamientos principales y sus accesos, incluido el trayecto directo a Val Thorens para Cosy. «Ver todos los lugares» abre los demás puntos. Clic en estación abre su perfil; clic en número abre el plan del alojamiento. Las casas con varios pases priorizan el dominio seleccionado. Se conservan los números de las casas restantes. El selector permite ver ubicaciones y rutas.

Datos originales en `plans.js`, `extras.js`, `archive.js`; viajes en `routes.js`; fotos/atribuciones en `media.js`; acceso en `access-data.js`, horas en `lift-hours.js`, ubicaciones en `lodging-pins.js`.

El acceso requiere SMS a un móvil español. La sesión de Firebase queda recordada en ese navegador. «Votos» muestra los planes que ya tienen votos, incluidos los secundarios, con foto del alojamiento, recuento y nombres. El enlace del recuento abre directamente los resultados de ese plan, incluso si tiene cero votos. Solo los siete teléfonos verificados del grupo pueden votar varios planes, cambiar sus votos y consultar quién ha elegido cada opción. Firestore guarda la lista privada y los votos, con reglas de servidor. Configuración, límites, pruebas y operación en [Acceso y votaciones](docs/votaciones.md).

«Sugerencias del grupo» aparece en Opciones cuando el bot aprueba una oferta de alojamiento o material enviada con `@Codex`. La ficha muestra el total para siete, enlaza a la oferta y admite votos. Las fichas se incorporan como datos de Firestore, sin reemplazar código ni opciones existentes.

El diseño usa información progresiva para que los detalles se abran cuando se necesitan y selección múltiple explícita. Referencias de diseño consultadas: [Nielsen Norman Group](https://www.nngroup.com/articles/progressive-disclosure/) y [GOV.UK Design System](https://design-system.service.gov.uk/components/checkboxes/).

Verificación de la versión 21: recorrido real con los SDK de Firebase en emuladores locales, alta por código simulado, voto múltiple, retirada de voto, nombres y recuentos, votos en opciones secundarias y sesión tras recargar. Se revisaron las 17 fichas, 19 estaciones, 19 ubicaciones, enlaces del mapa y pantallas de 320, 390, 768 y 1280 px. Las pruebas no escribieron votos en producción. El propietario confirmó después haber iniciado sesión y votado, y se comprobó una papeleta real mediante una consulta de lectura.

Verificación de la versión 22: acordeones con ratón y teclado, conservación de la apertura al votar/filtrar/volver, nueve planes principales y cinco promociones presentes en resultados, sin duplicados en la lista secundaria. Recorrido con Firebase en emuladores, sin escrituras en producción. Revisados los cuatro accesos del mapa y ausencia de desbordamiento en 320, 390, 768 y 1280 px.
