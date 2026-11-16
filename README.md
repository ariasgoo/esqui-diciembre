# Esquí en diciembre

[Visor del fin de semana del 12 y 13 de diciembre de 2026](https://ariasgoo.github.io/esqui-diciembre/)

Comparador estático para una noche y dos días de esquí desde Ecla Archamps. Las fichas reúnen precios, acceso a pie o en coche, horarios de remontes, fotos y condiciones. Los importes reflejan la consulta del 16 de noviembre de 2026. Cada ficha reúne los pros y contras documentados y los botones de reserva pertinentes. Las fuentes y los créditos de imágenes están en **Recursos**.

GitHub Pages sirve esta carpeta desde la rama `main`. Para abrir el visor en local, ejecuta `python3 -m http.server` y abre la dirección que indique el servidor.

La portada ordena las [tres recomendaciones](https://ariasgoo.github.io/esqui-diciembre/#recomendaciones) y explica el caso del chalet de seis plazas. El filtro [A pie hasta las pistas](https://ariasgoo.github.io/esqui-diciembre/#planes/a-pie) tiene en cuenta el sector del forfait del plan. La vista [Por estación](https://ariasgoo.github.io/esqui-diciembre/#estaciones) agrupa los planes por el dominio de su forfait. El [mapa](https://ariasgoo.github.io/esqui-diciembre/#mapa) recoge los accesos en coche desde Ecla y los alojamientos identificados, con el grado de precisión publicado para cada uno.

Los datos de los planes están en `plans.js`, las rutas en `routes.js`, las fotografías y atribuciones en `media.js` y el catálogo ampliado en `archive.js` y `extras.js`. El acceso al dominio de cada forfait se documenta en `access-data.js`, los horarios en `lift-hours.js` y las ubicaciones en `lodging-pins.js`. Los importes de grupo se calculan con la ocupación de cada oferta antes de redondear.
