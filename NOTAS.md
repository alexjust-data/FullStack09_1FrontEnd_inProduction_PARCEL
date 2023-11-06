### Parcel

Simplemente ejecutando parcel e un fichero html ya fuciona, ya que tiene el entrypoint sobre este fichero 

`npx parcel index.html`

Si hacer nada ha generado muchas cosas en `dist`

```sh
➜  frontend-pro-main-parcel git:(main) ✗ npx parcel index.html
Server running at http://localhost:1234
✨ Built in 1.72s
```

A creado carpetas `/dist` con imgenes, css, js, mapings, etc . El solo ha sustituido.

Le dice spor donde ha de entrar y el va deteectando diferentes rutas. Resultado: enla carpeta dist tenemos el compilador.

---

   
1. `rm -rf dist`
2. creamos carpeta `src` y movemos todos los html dentro, también la carpeta `img`, `css` y `js`
3. `npx parcel src/index.html`
   🚨 Build failed.

@parcel/core: Failed to resolve '/teams.html' from './src/index.html'
@parcel/resolver-default: Cannot load file './teams.html' in './'.
4. vamos al index y le ponemos las './'.
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

5. cambiamos los archivos de .css a .sass
```sh
@parcel/core: Failed to resolve 'css/common.css' from './src/index.html'
@parcel/resolver-default: Cannot load file './css/common.css' in './src'.
💡 Did you mean './css/common.scss'?
💡 Did you mean './css/form.scss'?
```

cambio el nombre de la carpets `css` a `styles/`

resolvemos los .css a .scss de los .html

```html
    <!-- CSS -->
    <link rel="stylesheet" href="css/common.ccs">
    <link rel="stylesheet" href="css/home.css">
    a
    <!-- CSS -->
    <link rel="stylesheet" href="styles/common.sccs">
    <link rel="stylesheet" href="styles/home.scss">
```

va instalando cosas a la ves que cambiamos

```sh
Installing @parcel/transformer-sass...
⠸ Building form.scss...
```

6. pasamos todos los `.js` a `.ts`
   /form/main.js --> form/index.ts
   etc

   Fíjate que te avisa de errores

7. corrige las lineas  html de todos los html `<scrpits>`
   `<script type="module" src="js/form/main.js"></script>`

   `<script type="module" src="js/form/index.ts"></script>`

8. truco para ver que la cahé no guarde cosas. Elimina el caché y carga de nuevo
   `rm -rf dist .parcel-cache`

9. en package.json.json le meto
    ```json
      "browserslist": [
            ">0.2%"
        ],
    ```

10. Añado la carpeta `scr/template/` y meto dentro todos los html
11. le digo que ahora está en los tempaltes la entrada `npx parcel src/templates/index.html`
12. corrigo todo l oque pide ../img/favicon.ico, ../styles/home.scss ../
    ```html
        <link rel="icon" type="image/png" href="../img/favicon.ico">
    
    <!-- CSS -->
    <link rel="stylesheet" href="../styles/common.scss">
    <link rel="stylesheet" href="../styles/home.scss">

    <script type="module" src="../js/form/index.ts"></script>
    ```
13. configuramos los scripts de json