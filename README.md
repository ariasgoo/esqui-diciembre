# Esquí en diciembre

[Visor del 12–13 de diciembre de 2026](https://ariasgoo.github.io/esqui-diciembre/)

Una noche y dos días de esquí para siete personas de 20 años desde Ecla Archamps. GitHub Pages publica `main` desde la raíz. Para abrir en local, `python3 -m http.server`.

La navegación principal contiene «Opciones», «Votos» y «Mapa». La portada permite votar directamente cuatro planes, agrupados en tres estaciones, en este orden: Avoriaz (loft de Cluses y chalet de Arâches), Val Thorens por Orelle (apartamento de Modane) y Les Carroz (Les Flocons Verts). Se eligieron por precio, chalet con jacuzzi, dominio de altura y acceso andando respectivamente. Val Cenis, Flaine y las demás variantes están en el enlace pequeño «Otras opciones». La reducción afecta a la presentación; los 17 identificadores de plan y sus votos siguen admitidos.

Cada estación muestra el trayecto desde Ecla, los kilómetros del dominio y un escenario propio de apertura, un pro y un contra. Cada alojamiento resume una ventaja, una desventaja y el precio por persona junto a su botón de voto. El filtro permite elegir acceso andando, en coche o directo con esquís. Al abrir una ficha aparece primero el desglose con barra de proporciones; después están pros/contras, fotos y enlaces de reserva. Itinerario, estancia y condiciones se despliegan a petición. Las rutas anteriores siguen funcionando.

Los alojamientos alternativos sin precio de noche tampoco aparecen en las fichas, «Otras» ni en las chinchetas. Se conservan los números de las ubicaciones restantes.

Cada estación empieza por distancia y tiempo desde Ecla. El perfil resume dominio, colores por número de pistas, un escenario propio de kilómetros abiertos para el 12–13, mapa oficial y dos puntos clave. Los escenarios tienen baja confianza y no son un parte oficial ni previsión de nieve. `resort-facts.js` recoge las fuentes. El operador no publica kilómetros por cada color; no se convierten recuentos a longitudes. Villages tiene fuentes discrepantes de recuento y no se inventa su reparto por colores.

Precios orientativos consultados el 16 de noviembre. La ficha empieza por el desglose. El selector del desglose cambia persona/grupo; al volver al catálogo se muestran importes por persona. las tarifas de estudiante se aplican cuando corresponden. Ski Plus publica 80 € de material intermedio +12 € de casco por dos días; se usa 92 €, sin descontar una promoción no validada. Eskiador mostró 53,58 € intermedio con botas y casco para el 12–13; no confirma siete equipos disponibles ni bastones. Val Cenis conserva su subtotal conocido con «+ material», porque no hay una cotización local verificable; nunca se presenta como total completo.

La consigna se explica y se suma aparte del precio principal. Orelle usa dos casilleros por 32 € para el grupo y Kédeuze dos por 44 €. Avoriaz requiere cotizar la consigna. El equipo siempre se recoge junto al acceso o arriba tras subir sin esquís; se guarda antes de conducir a dormir y se devuelve antes del regreso. No se transportan esquís en los coches.

`itineraries.js` prepara las salidas del sábado, recogida, esquí, alojamiento y regreso del domingo. No hay horarios para levantarse ni comidas. Coche en azul y esquí en verde. Sauna y jacuzzi solo aparecen más abajo como extras cuando existen. Las condiciones y fuentes quedan en desplegables y «Recursos».

El mapa empieza con las tres estaciones y cuatro alojamientos de la selección. «Ver todos los lugares» abre los demás puntos. Clic en estación abre su perfil; clic en número abre el plan del alojamiento. Las casas con varios pases priorizan el dominio seleccionado. Se conservan los números de las casas restantes. El selector permite ver ubicaciones y rutas.

Datos originales en `plans.js`, `extras.js`, `archive.js`; viajes en `routes.js`; fotos/atribuciones en `media.js`; acceso en `access-data.js`, horas en `lift-hours.js`, ubicaciones en `lodging-pins.js`.

El acceso requiere SMS a un móvil español. La sesión de Firebase queda recordada en ese navegador. «Votos» muestra únicamente planes que ya tienen votos, incluidos los secundarios. solo los siete teléfonos verificados del grupo pueden votar varios planes, cambiar sus votos y consultar quién ha elegido cada opción. Firestore guarda la lista privada y los votos, con reglas de servidor. Configuración, límites, pruebas y operación en [Acceso y votaciones](docs/votaciones.md).

El diseño usa información progresiva para que los detalles se abran cuando se necesitan y selección múltiple explícita. Referencias de diseño consultadas: [Nielsen Norman Group](https://www.nngroup.com/articles/progressive-disclosure/) y [GOV.UK Design System](https://design-system.service.gov.uk/components/checkboxes/).

Verificación de la versión 21: recorrido real con los SDK de Firebase en emuladores locales, alta por código simulado, voto múltiple, retirada de voto, nombres y recuentos, votos en opciones secundarias y sesión tras recargar. Se revisaron las 17 fichas, 19 estaciones, 19 ubicaciones, enlaces del mapa y pantallas de 320, 390, 768 y 1280 px. Las pruebas no escribieron votos en producción. La entrega del primer SMS real sigue pendiente de una prueba con la persona presente.
