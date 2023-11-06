### Parcel

Simplemente ejecutando parcel apuntando a un fichero html ya fuciona. Esto es porque Parcel tiene como EntryPoint en fichero inicial de nuestro proyecto:

```sh
npx parcel index.html`
```

Sin hacer nada, ninguna configuración, ha generado una carpeta `/dist`, con todas las imagenes, los `css` y el `mapping de los css`, el `JS` y el `mapping del JS`.

```sh
➜  frontend-pro-main-parcel git:(main) ✗ npx parcel index.html
Server running at http://localhost:1234
✨ Built in 1.72s
```

Sin que le digamos nada, sustituye los links que teníamos por los css `/dit/index.html`

```html
    <!-- CSS -->
    <link rel="stylesheet" href="/index.43b35a30.css">
    <link rel="stylesheet" href="/index.6560e507.css">
    <!-- img -->
    <img src="/logo.726d37a8.png" alt="Quidditch Games XV">
```


Le dices por donde ha de entrar y el va detectando diferentes rutas. Resultado: en la carpeta dist tenemos el compilador de esos archivos.

---

   
1. `rm -rf dist` Eliminamos de nuevo la carpeta.
2. creamos carpeta `src` y movemos todos los html dentro, también la carpeta `img`, `css` y `js`
3. `npx parcel src/index.html`
   🚨 Build failed.

@parcel/core: Failed to resolve '/teams.html' from './src/index.html'
@parcel/resolver-default: Cannot load file './teams.html' in './'.

4. Resolvemos problema: vamos al index y le ponemos las './'.
```html
                  <div class="menu-items">
                    <li><a href="./">Inicio</a></li>
                    <li><a href="./teams.html">Equipos</a></li>
                    <li><a href="./contact.html">Contacto</a></li>
```
verás que te irán saliendo falloas y has de ir arreglando en los html lo que te diga

```sh
➜  frontend-pro-main-parcel git:(main) ✗ npx parcel src/index.html
Server running at http://localhost:1234
✨ Built in 714ms
```

ya funciona. vete a visitarla http://localhost:1234

5. cambiamos los archivos de `.css` a `.sass`
   
```sh
@parcel/core: Failed to resolve 'css/common.css' from './src/index.html'
@parcel/resolver-default: Cannot load file './css/common.css' in './src'.
💡 Did you mean './css/common.scss'?
💡 Did you mean './css/form.scss'?
```

cambio el nombre de la carpets `css` a `styles/`

resolvemos los `.css` a `.scss` de los `.html`

```html
    <!-- CSS -->
    <link rel="stylesheet" href="css/common.ccs">
    <link rel="stylesheet" href="css/home.css">
    a
    <!-- CSS -->
    <link rel="stylesheet" href="styles/common.sccs">
    <link rel="stylesheet" href="styles/home.scss">
```

va instalando cosas a la vez que cambiamos

```sh
Installing @parcel/transformer-sass...
⠸ Building form.scss...
```

6. pasamos todos los `.js` a `.ts`  
   
   `/form/main.js` --> `form/index.ts`

   etc

   Fíjate que te avisa de errores

7. corrige las lineas  html de todos los html `<scrpits>`

```html
<script type="module" src="js/form/main.js"></script>

<script type="module" src="js/form/index.ts"></script>
```

8. truco para ver que la cahé no guarde cosas. Elimina el caché y carga de nuevo
   `rm -rf dist .parcel-cache` de esta forma verás los fallos de verdad, no los gurada el caché.

9.  en `package.json` le meto
    
```json
    "browserslist": [
        ">0.2%"
    ],
```

10. Añado la carpeta `scr/template/` y meto dentro todos los html
11. le digo que ahora está en los templates la entrada `npx parcel src/templates/index.html`
12. corrigo todo lo que pide `../img/favicon.ico`, `../styles/home.scss`, ../

```html
<link rel="icon" type="image/png" href="../img/favicon.ico">

<!-- CSS -->
<link rel="stylesheet" href="../styles/common.scss">
<link rel="stylesheet" href="../styles/home.scss">

<script type="module" src="../js/form/index.ts"></script>
```
13. configuramos los scripts de json

```json
  "scripts": {
    "dev": "parcel src/templates/index.html"
  },
```

Hemos de instalar parcel de forma local

```sh
npm i -D parcel

npm run dev
```

---

A partir de ahora tocaría ver en qué lo podemos mejorar

https://parceljs.org/features/development/  **development**


`--open`: abre automáticamente la entrada en su navegador predeterminado después de que se inicia Parcel. También puede pasar un nombre de navegador para abrir un navegador diferente, p. --safari abierto.

```json
  "scripts": {
    "dev": "parcel src/templates/index.html --open"
  },
```

Si te vas a `styles/foem.scss` y cambias los colores, por ejemplo, verás que lo hace sin más, sin tener que reiniciar la app, ni modifcar el estado, es capaz de reeemplazar el sccs un reload de verdad , sin configuracion.

Por ejemplo, es posible que necesite utilizar un determinado nombre de host para las cookies de autenticación o depurar problemas de contenido mixto. El servidor de desarrollo de Parcel admite HTTPS desde el primer momento. Puede utilizar un certificado generado automáticamente o proporcionar el suyo propio.

```sh
# https://parceljs.org/features/development/ :
parcel src/index.html --https
```

Para usar un certificado personalizado, deberá usar las opciones --certy --keyCLI para especificar el archivo del certificado y la clave privada, respectivamente.

```sh
# https://parceljs.org/features/development/ :
parcel src/index.html --cert certificate.cert --key private.key
```
Imagina que estás testeando en local una web que carga con un botton de pago con stripe, generalmente estos botones o los abrimos con https o no nos funciona. Podríamos pasarle una clave confirmada en nuestro navegador y nos abriría un https, si no le pasamos la clave nos lo abrirá igualmente pero nos tocará el verificador del tipico error de que no es un certificado confiable.

lo instalo:

```json
"scripts": {
    "dev": "parcel src/templates/index.html --open --https"
},
```
borro caché y verifico:

`rm -rf dist .parcel-cache && npm run dev`


`proxy API` nos puede ser vir para cuando hagamos aplicaciones de entorno clientes servidor. Lo he utilizado alguna vez en alguna aplicacion de angular. Imagina que tienes una app web que para la petición del formulario hace una petición `ajax` o `rex` al `/api`, el `for` hace un `POST` al `/api/contact` y nosotros no tenemos `/api/localhost:1234` tenemos `localhost:1234`, con esto:

```json
{
  "/api": {
    "target": "http://localhost:8000/",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

podemos hacer que `1234/api/` nos lo redirija aquí `"target": "http://localhost:8000/"`. Está bien porque a veces hemos de hacer pruevbas y no tenemos ganas de ir a cambiar toodos los end points , es decir modificar todas las llamdas de una aplicacion. Con un proxi lo podemos solucionar.

Fíjate que vamos modificando las `"dev": "parcel src/templates/index.html --open"`

---

NOTA: para `parcel` si incluyes un archivo nuevo en `templates/`parcel no lo reconoce porque no hay un enlace entre archivos que vaya de un sitio a ese archivo nuevo. Puede modificar esto pata que todo lo que haya en  `/templates/*`lo lea: `"dev": "parcel src/templates/* --open --https"`

Haz la prueba, cambia el nombre de un html y ponle 404.html

`rm -rf dist .parcel-cache && npm run dev`

fíjate que también lo compila y en el dist lo crea y renueva los js

---


Vamos a ver como funcionaría en **production** :

https://parceljs.org/features/production/ :

> El modo de producción de Parcel agrupa y optimiza automáticamente su aplicación para la producción. Se puede ejecutar usando el parcel buildcomando:
```sh
# https://parceljs.org/features/production/ :
parcel build src/index.html
```

ok, pues lo provamos

```json
  "scripts": {
    "dev": "parcel src/templates/* --open --https",
    "build": "parcel build templates/*"

  },
```

Quitaríamos el main del json

```json
"main": "index.js",
```

**Compresión** Parcel admite la compresión de paquetes utilizando Gzip y Brotli . Si bien muchos servidores comprimen datos sobre la marcha, otros requieren que cargues cargas útiles precomprimidas con anticipación. Esto también puede permitir una mejor compresión, lo que sería demasiado lento en cada solicitud de red.

Como no todo el mundo la necesita, la compresión no está habilitada de forma predeterminada. Para habilitarlo, agregue @parcel/compressor-gzipy/o @parcel/compressor-brotlia su .parcelrc.

```sh
# https://parceljs.org/features/production/ :
yarn add @parcel/compressor-gzip @parcel/compressor-brotli --dev
```
para ello necesitaremos instalar un fichero nuevo .`.parcelrc`

```json
{
  "compressors": {
    "*.{html,css,js,svg,map}": [
      "...",
      "@parcel/compressor-gzip",
      "@parcel/compressor-brotli"
    ]
  }
}
```

Pues lo instalo, pero fíjate que estamos utilizando `npm`

intslamos en consola:
```sh
npm i -D @parcel/compressor-gzip @parcel/compressor-brotli
```

creo fichero en `./parcelrc` y pego dento lo anterior

`rm -rf dist .parcel-cache && npm run dev`

cuando cargo me da problemas, lo souliono:

https://github.com/parcel-bundler/parcel/discussions/4697

```json
{
  "extends": "@parcel/config-default",
  "compressors": {
    "*.{html,css,js,svg,map}": [
      "@parcel/compressor-gzip",
      "@parcel/compressor-brotli"
    ]
  }
}
```

Podemos ver que lo que hace es comprimir todos los archivos en el dist, bueno, esto puede ser bueno para nvialos a produccion y allí dexcomprimirlos. Para páginas muy grandes tiene sentido.

---
Bueno, investiga todo lo que puedes lograr en produccion

---

Si vamos a **target** https://parceljs.org/features/targets/ :

Investiga todo lo que puedes hacer... por ejemplo esto es util:

>**publicUrl** Establece la URL base en la que se cargará este paquete en tiempo de ejecución. La ruta relativa del paquete desde se distDiragregará automáticamente. publicUrlpuede ser una URL completa (por ejemplo, https://some-cdn.com/o una ruta absoluta (por ejemplo /public, ) si los paquetes se cargan desde el mismo dominio que su sitio web.

Te permite sustituir la `erl` publica de todos aquellos `assets` que compila parcel. Es decir, si lo compilamos sin los compresores:

```json
{
  "extends": "@parcel/config-default",
  "compressors": {
    "*.{html,css,js,svg,map}": [
        "..."
    ]
  }
}
```

`rm -rf dist .parcel-cache && npm run dev`

y nos vamos ahora a `./dist/contact.html` y nos vamos a 

```html
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.c5ec8b79.ico">
```

nos pone una url absoluta `/favicon.c5ec8b79.ic` si queremos que la url en este punto sea relativa a algo, por ejemplo `https://static.keepcoding.io/favicon.c5ec8b79.ic` pues esto nos lo permite configurar

> Por defecto el publicUrles /. Este es un buen valor predeterminado si sus archivos HTML y otros activos se implementan en la misma ubicación. Si implementa activos en una ubicación diferente, probablemente necesitará configurar publicUrl. La URL pública también se puede configurar mediante la --public-urlopción CLI.

lo vamos hacer

```json
  "scripts": {
    "dev": "parcel src/templates/* --open --https",
    "build": "parcel build templates/* --public-url https://static.keepcoding.io"
  },
```

`rm -rf dist .parcel-cache && npm run dev`

nos abrimos el `dist/tem.html` verás que lo haincrustado en el favicon

```html
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="https://static.keepcoding.io/favicon.c5ec8b79.ico">
```

Esto está bien porque si nosotros nos llevamos el contenido al `cloud` por ejemplo Amazon S3, lo podemos configurar en el `bundel`, parcel lo tiene por defecto, todos los assets te los mete en esa url.

---

Fíjate todos los soportes que tiene parcel en el manú de la izquierda. Con todos esos soportes puedes jugar `LANGUAGES`

---

1. La diferencia con `webpack` es que webpack está mucho más extendido, y que por deabjo muchas apps lo usan. Si estás acostumbrado ha trabajar con webpack, tienes garantizado que tienes soporte para largo; herramientas como `view`, `angular` , etc utilizan webpack por debajo. 
2. A nivel de plugins quizás no tan genericas, hay bastantes más cosas de webpack que parcel.

Puedes ver las tendencias:

https://npmtrends.com/parcel-vs-rollup-vs-snowpack-vs-vite-vs-webpack


`Vite`, además esta libreria te permite crear aplicacione s de `React` y `View`. Vite esmás nueva que parcel y tiene mucho más exito.git commit

