# Acceso y votaciones

Publicado el 16 de noviembre de 2026. La web sigue alojada en GitHub Pages.

El SMS utiliza el proyecto existente de Calditos, calditos-personal-cp, y su proveedor Teléfono de Firebase. La identidad CP existente fue aceptada por Google. Se añadió ariasgoo.github.io a los dominios autorizados conservando los demás. Se creó una clave web exclusiva de esquí, restringida a GitHub, al dominio auxiliar de Firebase y a Identity Toolkit, Secure Token y Firestore. La clave original de Calditos conserva sus restricciones. firebase-config.json es configuración pública de cliente, no una credencial administrativa. No hay tokens administrativos, cuentas de servicio ni teléfonos en el repositorio.

Se mantienen únicamente SMS a España y el límite compartido de 100 solicitudes diarias durante la prueba de Google, comprobado sin modificarlo. No se creó otro proyecto para acumular cuotas ni se convirtió la facturación a pago.

## Sesión

Firebase usa browserLocalPersistence, como Calditos. No se vuelve a pedir SMS al recargar o volver con esa sesión válida. No se promete duración literal infinita: borrar los datos, usar otro navegador o que Google revoque el acceso puede exigir verificar otra vez. El nombre se guarda tras verificar el móvil.

La aplicación de Firebase se llama esqui-diciembre y conserva su propio estado. No modifica las sesiones de Calditos ni de Codex. La entrada visual exige acceso por SMS, pero las imágenes y los datos públicos del viaje siguen siendo archivos estáticos. Los votos y el registro de participantes sí están protegidos por reglas de servidor.

## Datos y permisos

Firestore usa la base esqui-diciembre, región europe-west3 (Frankfurt), separada del almacenamiento Neon de Calditos. Google confirmó freeTier: true: es la primera base de Firestore del proyecto. No se activaron copias, PITR ni TTL de pago. El coste de los SMS sigue el proyecto compartido de Google.

Las colecciones viven en skiTrips/diciembre-2026/:

- members: siete números verificados en los metadatos actuales del grupo de WhatsApp, incluido el propietario. Cada registro contiene teléfono, grupo de origen, fecha y permiso. Ningún cliente puede escribirlos ni listar la colección; cada teléfono solo puede consultar su propio permiso.
- profiles: cualquier teléfono verificado puede guardar y leer su propio nombre.
- ballots: solo los teléfonos habilitados pueden leer los resultados y escribir su propio voto. La clave es el SHA-256 del teléfono, calculado también por las reglas: cambiar de cuenta, navegador o dispositivo conserva un único voto por teléfono. Un registro permite varios planes distintos y se puede cambiar o eliminar la selección.

Las reglas comprueban el proveedor de autenticación Teléfono, pertenencia vigente, clave del propietario, nombre del perfil, últimos cuatro dígitos, planes permitidos, ausencia de duplicados y fecha de servidor. Los votos no guardan números completos. La interfaz muestra nombres, recuentos y barras, y escucha cambios en directo. Los alojamientos de iniciación o sin tarifa no son opciones válidas de voto. Nadie se registra automáticamente usando la lista del grupo: cada persona debe verificar su teléfono.

## Operación privada

El puente de WhatsApp puede exportar los siete participantes actuales mediante POST /api/ski-voters, con su protección local de origen y CSRF. Es una exportación privada; no cambia los chats habilitados ni envía mensajes. La copia está en /var/lib/hugo-whatsapp-codex/ski-voters.json. Hay que volver a verificar el grupo si cambia su composición y actualizar también los permisos de Firestore; no se autoriza por nombres ni números escritos por terceros.

El operador del Mac conserva los recibos y el despliegue administrativo en .private/operator/, ignorado por Git y con permisos privados. Su script usa exclusivamente la sesión existente de Firebase CLI de CP. verify consulta configuración y permisos; publish-rules crea y publica una versión de las reglas; seed-members exige el registro de siete identidades verificadas. No imprimir claves, tokens ni el archivo de teléfonos. No sustituir credenciales ni iniciar otro login.

Cambiar los planes originales requiere actualizar y probar `firestore.rules`. Las sugerencias verificadas se añaden al registro `skiTrips/diciembre-2026/catalogue/suggestions`, cuyo listado de IDs también validan las reglas de voto. La identidad de la VPS solo puede leer ese documento y añadirle una ficha validada, hasta 12. Los participantes no pueden modificar el registro. El número de participantes de la configuración pública debe coincidir con la lista verificada.

## Validación

Se comprobaron cuatro pruebas de lógica y ocho de reglas de Firestore en un proyecto local demo-esqui-voting: alta de teléfonos ajenos, prohibición de votar fuera del grupo, privacidad del registro, propiedad del voto, selección múltiple, duplicados, planes excluidos, campos falsificados, identidad recreada, concurrencia y retirada de permisos.

Las pruebas de navegador usan una sesión nueva, Firebase Auth y Firestore locales, teléfonos ficticios y bloqueo de las API de producción. El código de producto no contiene modo de prueba, números ficticios ni desactivación de reCAPTCHA. Se comprobó alta, selección de varios planes, nombres, recarga con sesión conservada y acceso móvil. No se envían SMS reales ni se crean votos de prueba en producción.

En producción se releyeron las reglas publicadas, los siete miembros, la región, los dominios y las restricciones. Las lecturas anónimas de miembros, perfiles y votos devuelven 403. El primer SMS real y su código deben comprobarse con la persona presente; no se dan por probados por haber usado el emulador.

Para repetir las pruebas:

    npm ci
    npm test
    npx firebase-tools emulators:exec --config firebase.test.json --project demo-esqui-voting --only firestore "npm run test:rules"

Usar una configuración vacía de Firebase CLI para las pruebas, un proyecto demo- y el Java que exija el emulador instalado. No utilizar perfiles o sesiones reales como fixtures.
