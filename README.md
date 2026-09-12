# SYNERGY · Demostración para el jurado

Abre **index.html** con doble clic en Edge o Chrome. Mantén `index.html`, `styles.css`, `visual-refresh.css`, `experience.css`, `experience.js`, `state.js` y `app.js` en la misma carpeta. No requiere instalación, internet, cuentas ni claves. Los cambios se conservan en ese navegador; usa siempre el mismo navegador y ruta durante la presentación.

Opcional: con Node.js instalado, ejecuta `node server.cjs` en esta carpeta y abre http://127.0.0.1:4173. Cambiar entre archivo local y servidor crea almacenes de demostración independientes.

## Recorrido de tres minutos

1. **0:00–0:25 — Bienvenida e inicio.** Pulsa «Explorar demostración». Presenta el lema y los tres servicios. Activa «Modo presentación»; el botón de expandir activa pantalla completa. Puedes usar F11 si el navegador no admite la API.
2. **0:25–1:15 — Station.** Pulsa «Ir al paso». Selecciona Mall del Pacífico; explica que el mapa es esquemático y todos los puntos son ejemplos. Revisa y confirma la reserva de USD 8,00. La reserva aún no carga: pulsa «Iniciar carga simulada». Dos avances de diez minutos simulados llevan la batería inicial del 62 % al 80 %. Muestra el recibo y el saldo de USD 26,50.
3. **1:15–2:10 — Mobile.** Pulsa «Siguiente servicio». Escribe «Calle Demo 123, frente al parque», deja «Solicitar ahora», revisa y confirma USD 15,00. Avanza a técnico asignado, en camino, cargando y completado. Muestra la ficha ficticia y el recibo. La batería queda en 98 % y el saldo en USD 11,50. Para mostrar agenda, elige fecha futura y usa «Simular llegada de la fecha» antes del seguimiento.
4. **2:10–2:45 — Home.** Pulsa «Siguiente servicio». Presenta USD 1.199,00 por venta e instalación y la evaluación técnica necesaria. Completa sector, vivienda y horario; revisa y confirma la evaluación demo. El registro aparece debajo del formulario, sin cargo.
5. **2:45–3:00 — Cierre.** Abre Billetera y muestra los movimientos. Explica que es un prototipo local. Para repetir, pulsa «Reiniciar demo» y confirma: vuelve al acceso, con 62 % y USD 34,50.

## Qué está simulado

- Estaciones, sectores, posiciones, distancias, conectores, potencia y disponibilidad. Los nombres de puntos proceden del HTML de referencia; no acreditan estaciones operativas ni alianzas. El mapa SVG es local y esquemático, sin cartografía ni navegación real.
- Vehículo, batería, capacidad usada en el cálculo (55,4 kWh), energía y minutos. Los controles manuales adelantan escenarios y no prometen tiempos reales. No hay temporizadores de carga ni seguimiento que continúen al cambiar de pantalla.
- Reservas y solicitudes, técnico Alex, van, agenda y seguimiento. Una fecha programada queda guardada y bloquea el seguimiento hasta avanzar el reloj demo.
- Billetera, recargas, cargos y recibos. El saldo inicial es un movimiento explícito; cada servicio tiene una identidad y un único débito. Solo se admite un servicio activo. La cancelación previa a cargar es gratuita dentro de la demo; detener Station registra USD 8,00 y distingue «Carga detenida». Estas reglas de simulación no son condiciones comerciales confirmadas.
- Home registra una evaluación local, sin contacto real ni cobro. Compatibilidad y alcance requieren evaluación técnica.
- Perfil, preferencias e historial se guardan únicamente en la clave `synergy-demo-v1` de localStorage. Introduce solo datos ficticios. No hay inicio de sesión ni pagos reales.

Para operar realmente harían falta backend y cuentas, estaciones verificadas, inventario/disponibilidad, comunicación con cargadores, validación de compatibilidad, mapas y geolocalización, despacho de técnicos, agenda, notificaciones y pasarela de pagos con sus reglas comerciales definidas.

## Archivos y mantenimiento

- `index.html`: entrada y estructura base accesible.
- `styles.css`: estructura adaptable y modo presentación.
- `visual-refresh.css`: identidad luminosa, paleta eléctrica y temas.
- `state.js`: estado inicial y transiciones de negocio independientes del navegador.
- `app.js`: vistas, formularios, navegación, confirmaciones y persistencia.
- `server.cjs`: servidor local opcional, solo en 127.0.0.1.
- `tests/`: pruebas de lógica y navegador.
- `verification/`: capturas de la aplicación.

Se revisaron el HTML original y el texto de las 15 diapositivas de `Synergy Plan de Negocios nueva (1).pptx`. Los servicios y precios se contrastaron con las diapositivas 5 y 6. Se conserva la base tecnológica HTML/CSS/JavaScript y los datos demo útiles del prototipo; se reemplazan su estructura limitada a teléfono y su lógica de sesiones. Los archivos originales de Descargas no se modificaron. No se incorporan proyecciones financieras ni afirmaciones de mercado a la aplicación.

## Verificación

Ejecuta `node --test tests/state.test.cjs`. Para pruebas de navegador, inicia `node server.cjs`, instala Playwright en un entorno de pruebas o define `PLAYWRIGHT_PATH` a su paquete existente y ejecuta `node tests/browser.test.cjs`. La prueba usa Microsoft Edge instalado.

Pruebas realizadas: Station completo y detenido; estación ocupada; búsqueda, filtros y orden; saldo insuficiente; bloqueo de servicios simultáneos; Mobile inmediato, programado y cancelado; Home; recarga repetida; persistencia; batería por encima del 80 %; edición, tema, texto seguro y reinicio. Recorridos automáticos de navegador en 390, 760, 1024 y 1440 px, sin desbordamiento horizontal ni errores JavaScript. Apertura de archivo local con el contexto del navegador sin conexión. Capturas de escritorio y móvil inspeccionadas visualmente.

Límites: comprobado en Edge de escritorio con tamaños móviles emulados, no en dispositivos físicos, Safari ni un proyector real. El plan se revisó mediante extracción de texto, no se renderizó en PowerPoint. No existen integraciones externas que probar.

## Animaciones y sonido

La recarga simulada reproduce una secuencia local de 2,8 segundos con carrito SVG, billetes, monedas, billetera SYNERGY, importe real y contador de saldo. El movimiento financiero se confirma antes de la animación y no depende de ella; omitirla, silenciarla o recargar la página no repite el crédito. El botón Continuar y Escape omiten la secuencia.

Al iniciar Station, el conector se acopla al vehículo y tres pulsos recorren el cable desde el cargador. Avanzar y completar una carga tienen señales sonoras breves. El botón Sonido/Sin sonido guarda la preferencia localmente en `synergy-sound-muted`. Los sonidos son sintetizados con Web Audio, sin internet ni archivos de audio. Si el navegador bloquea el audio, las operaciones continúan normalmente.

La preferencia de movimiento reducido elimina desplazamientos y contador progresivo, mostrando el saldo final directamente. Los sonidos y la secuencia se limpian al ocultar la página, omitir o reiniciar.

`experience.js` y `experience.css` contienen la capa audiovisual, separada del estado financiero. Verificación: `node tests/experience.test.cjs` con el mismo PLAYWRIGHT_PATH de las otras pruebas. Comprobados importes 10/20/50, doble confirmación, contador, creación de audio Web Audio, silencio persistente, Escape, movimiento reducido y pantalla móvil. Las capturas se revisaron visualmente; la síntesis se comprobó técnicamente, sin escucha en altavoces físicos.
