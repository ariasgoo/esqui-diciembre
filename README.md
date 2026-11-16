# Esquí en diciembre

[Visor del 12–13 de diciembre de 2026](https://ariasgoo.github.io/esqui-diciembre/)

Una noche y dos días de esquí para siete personas de 20 años desde Ecla Archamps. GitHub Pages publica `main` desde la raíz. Para abrir en local, `python3 -m http.server`.

«Planes» reúne estaciones y alojamientos. Las cuatro estaciones principales son Avoriaz, Val Thorens–Orelle, Les Carroz y Val Cenis. Flaine se conserva en «Otras estaciones estudiadas», plegada. Las antiguas rutas de estaciones siguen abriendo el mismo catálogo. Se ha retirado el comparador y los planes exclusivos de iniciación o sin tarifa de alojamiento. `catalogue.js` aplica estos criterios sin borrar las fuentes históricas.

Los alojamientos alternativos sin precio de noche tampoco aparecen en las fichas, «Otras» ni en las chinchetas. Se conservan los números de las ubicaciones restantes.

Cada estación empieza por distancia y tiempo desde Ecla. El perfil resume dominio, colores por número de pistas, un escenario propio de kilómetros abiertos para el 12–13, mapa oficial y dos puntos clave. Los escenarios tienen baja confianza y no son un parte oficial ni previsión de nieve. `resort-facts.js` recoge las fuentes. El operador no publica kilómetros por cada color; no se convierten recuentos a longitudes. Villages tiene fuentes discrepantes de recuento y no se inventa su reparto por colores.

Precios orientativos consultados el 16 de noviembre. La ficha empieza por el desglose. El selector cambia persona/grupo; las tarifas de estudiante se aplican cuando corresponden. Ski Plus publica 80 € de material intermedio +12 € de casco por dos días; se usa 92 €, sin descontar una promoción no validada. Eskiador mostró 53,58 € intermedio con botas y casco para el 12–13; no confirma siete equipos disponibles ni bastones. Val Cenis conserva su subtotal conocido con «+ material», porque no hay una cotización local verificable; nunca se presenta como total completo.

La consigna se explica y se suma aparte del precio principal. Orelle usa dos casilleros por 32 € para el grupo y Kédeuze dos por 44 €. Avoriaz requiere cotizar la consigna. El equipo siempre se recoge junto al acceso o arriba tras subir sin esquís; se guarda antes de conducir a dormir y se devuelve antes del regreso. No se transportan esquís en los coches.

`itineraries.js` prepara las salidas del sábado, recogida, esquí, alojamiento y regreso del domingo. No hay horarios para levantarse ni comidas. Coche en azul y esquí en verde. Sauna y jacuzzi solo aparecen más abajo como extras cuando existen. Las condiciones y fuentes quedan en desplegables y «Recursos».

El mapa mantiene las chinchetas y rutas. Clic en estación abre su perfil; clic en número abre el plan del alojamiento. Las casas con varios pases priorizan el dominio seleccionado. Se conservan los números de las casas restantes. El selector permite ver ubicaciones y rutas.

Datos originales en `plans.js`, `extras.js`, `archive.js`; viajes en `routes.js`; fotos/atribuciones en `media.js`; acceso en `access-data.js`, horas en `lift-hours.js`, ubicaciones en `lodging-pins.js`.

El acceso requiere SMS a un móvil español. La sesión de Firebase queda recordada en ese navegador. «Votaciones» sustituye al comparador: solo los siete teléfonos verificados del grupo pueden votar varios planes, cambiar sus votos y consultar quién ha elegido cada opción. Firestore guarda la lista privada y los votos, con reglas de servidor. Configuración, límites, pruebas y operación en [Acceso y votaciones](docs/votaciones.md).
