# Esquí en diciembre

[Visor del fin de semana del 12 y 13 de diciembre de 2026](https://ariasgoo.github.io/esqui-diciembre/)

Comparador estático para una noche y dos días de esquí desde Ecla Archamps. Las fichas reúnen precios, acceso a pie o en coche, horarios de remontes, fotos y condiciones. Los importes reflejan la consulta del 16 de noviembre de 2026. Cada ficha reúne los pros y contras documentados y los botones de reserva pertinentes. Las fuentes y los créditos de imágenes están en **Recursos**.

GitHub Pages sirve esta carpeta desde la rama `main`. Para abrir el visor en local, ejecuta `python3 -m http.server` y abre la dirección que indique el servidor.

La portada ordena las [tres recomendaciones](https://ariasgoo.github.io/esqui-diciembre/#recomendaciones) y explica el caso del chalet de seis plazas. El filtro [A pie hasta las pistas](https://ariasgoo.github.io/esqui-diciembre/#planes/a-pie) tiene en cuenta el sector del forfait del plan. La vista [Por estación](https://ariasgoo.github.io/esqui-diciembre/#estaciones) reúne las 19 estaciones o grupos estudiados. Cada ficha describe terreno, nivel, alojamientos, ventajas, límites y trayectos desde Ecla, con las fuentes en Recursos. Los perfiles están en `station-guide.js` y los planes se agrupan por el dominio de su forfait. El [mapa](https://ariasgoo.github.io/esqui-diciembre/#mapa) recoge los accesos en coche desde Ecla y los alojamientos identificados, con el grado de precisión publicado para cada uno.

La ficha del chalet de Arâches compara el acceso a Avoriaz con el de Les Carroz y enlaza las dos variantes locales de forfait. Explica que ambos dominios carecen de conexión por pistas o remontes y deja pendiente confirmar el skibus del 12–13 de diciembre.

En el mapa, los nombres y puntos de las estaciones abren su descripción en «Por estación». Las chinchetas numeradas y el índice de alojamientos abren directamente la ficha del plan, o la ficha alternativa cuando no hay un plan principal. Si una casa tiene varios forfaits, se prioriza el de la estación seleccionada. El selector del mapa conserva las vistas de rutas y ubicaciones.

Cada ficha explica la recogida del equipo, su almacenamiento la noche del sábado y la devolución antes de volver al coche. La logística está en `gear-logistics.js`. Avoriaz requiere cotizar la consigna. La consigna se describe con su coste en cada ficha y se suma aparte del precio principal. En Orelle, dos casilleros de cuatro cuestan 32 € para el grupo. Val Cenis, Les Carroz y Flaine usan tiendas en su propio acceso y muestran el nuevo alquiler por cotizar.

Los datos de los planes están en `plans.js`, las rutas en `routes.js`, las fotografías y atribuciones en `media.js` y el catálogo ampliado en `archive.js` y `extras.js`. El acceso al dominio de cada forfait se documenta en `access-data.js`, los horarios en `lift-hours.js` y las ubicaciones en `lodging-pins.js`. Los importes de grupo se calculan con la ocupación de cada oferta antes de redondear.

Cada plan muestra primero el desglose del precio, antes de los botones de reserva, las fotos, la estancia y el itinerario. Los controles por persona o grupo actualizan ese mismo desglose.

`itineraries.js` prepara los itinerarios de sábado y domingo de los 20 planes y las 28 fichas alternativas. Las fichas que agrupan estaciones permiten cambiar de variante. Incluyen despertar, trayecto, forfait, alquiler, primer remonte, almacenamiento, alojamiento, devolución y vuelta a Ecla. Las aperturas publicadas se distinguen de los objetivos provisionales. Lélex y Thollon no muestran un viaje viable el 12–13 con el calendario actual.

El horario reserva 30 min para siete equipos, 15 min para forfaits y márgenes de carretera. Son estimaciones, no citas de reserva. Las opciones sin casa usan una base modelo explícita y deben recalcularse al reservar. Avoriaz alcanza la cabina de Prodains de las 08:45, pero recoge el material arriba y empieza a esquiar después. El sábado de Val Cenis no tiene primera subida publicada. En Orelle se vuelve hacia Grand Fond a las 15:30 para anticiparse a la última conexión de las 16:00. En Kédeuze se guarda el material antes de las 16:30. Ninguna secuencia requiere llevar esquís en el coche.

Las fichas muestran datos rápidos, dos columnas de itinerario y enlaces de salto. La hora de levantarse el sábado encabeza el itinerario junto a la salida de Ecla. Solo se muestran los movimientos para esquiar, el alojamiento y el spa opcional. Los pasos de coche son azules y los de esquí verdes, también identificados por texto. Las condiciones extensas se consultan en desplegables. `itineraries.css` mantiene la presentación en una columna en móvil. Los precios conservan la consigna fuera del importe principal.
