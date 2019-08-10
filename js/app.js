/*var btnSaludar = document.getElementById('btnSaludar');
//var txtNombre = document.getElementById('txtNombre');
var txtBase = document.getElementById("btnBase");
var txtExponente = document.getElementById("txtExponente");
//boton.addEventListener("click", potencia);*/

/*function potencia() {
    var base = document.getElementById("txtBase");
    var potencia = document.getElementById("txtExponente");
    var resultado = 1;
    for (var i = 1; i <= potencia.value; i++) {
        console.log("i");
        resultado = resultado * base.value;
    }
    alert("El resultado es: " + resultado);
}*/

/*btnSaludar.addEve0tListener('click', function() {
   var resultado = 1;
   for(var i = 1; i <= txtExponente.value; i++){
       resultado = resultado * txtBase.value;
   }
   alert('El resultado es ' + resultado);
});*/
document.addEventListener('keydown', movimiento);

const DIMENSION = 80;
const DIMENSION_MATRIZ = 6;
const CANTIDAD_ELEMENTOS_MAX = 10;
const CANTIDAD_ELEMENTOS_MIN = 1;
const LEFT = 37;
const UP = 38;
const DOWN = 40;
const RIGHT = 39;
const ENTER = 13;

var fondo = document.getElementById('fondo');
var lapiz = fondo.getContext('2d');
var x = 0;
var y = 0;
var matriz = new Array(DIMENSION_MATRIZ);
var intentos = 3;

var tecla = {
    LEFT: LEFT,
    UP: UP,
    DOWN: DOWN,
    RIGHT: RIGHT,
    ENTER: ENTER,
}

var tile = { //Clase con 3 propiedades
    url: './img/tile.png',
    imagen: Image,
    cargaOk: false
}
tile.imagen = new Image(); //Se instancia un nuevo objeto de tipo imagen
tile.imagen.src = tile.url;
tile.imagen.addEventListener('load', function() {
    tile.cargaOk = true;
    dibujar(); //Esto es un evento para detectar una carga del lado de la página
});

var cerdo = {
    url: './img/cerdo.png',
    imagenC: Image,
    cargaOk: false
}
cerdo.imagenC = new Image();
cerdo.imagenC.src = cerdo.url;
cerdo.imagenC.addEventListener('load', function() {
    cerdo.cargaOk = true;
    dibujar(); //Esto es un evento para detectar una carga del lado de la página
});

var vaca = {
    url: './img/vaca.png',
    imagenV: Image,
    cargaOk: false
}
vaca.imagenV = new Image();
vaca.imagenV.src = vaca.url;
vaca.imagenV.addEventListener('load', function() {
    vaca.cargaOk = true;
    dibujar(); //Esto es un evento para detectar una carga del lado de la página
});

var llave = {
    url: './img/llave.png',
    imagenLl: Image,
    cargaOk: false
}
llave.imagenLl = new Image();
llave.imagenLl.src = llave.url;
llave.imagenLl.addEventListener('load', function() {
    llave.cargaOk = true;
    dibujar(); //Esto es un evento para detectar una carga del lado de la página
});

iniciarMatriz();
generarAnimales('v');
generarAnimales('c');

function iniciarMatriz() {
    for (var i = 0; i < matriz.length; i++) {
        matriz[i] = new Array(DIMENSION_MATRIZ);
        for (var j = 0; j < matriz.length; j++) {
            matriz[i][j] = 'x';
        }
    }
}

function generarAnimales(tipo) {
    var numero = aleatorio(CANTIDAD_ELEMENTOS_MAX, CANTIDAD_ELEMENTOS_MIN);
    var noContaminado = aleatorio(numero, 1);
    for (var i = 1; i <= numero; i++) {
        if (i == noContaminado) {
            asignar(tipo, true);
        }
        asignar(tipo, false);
    }
}

function asignar(tipo, noContaminado) {
    var resultado = false;
    do {
        var fila = aleatorio(5, 0);
        var columna = aleatorio(5, 0);
        if (matriz[fila][columna] == 'x') {
            if (noContaminado == true) {
                if (tipo == 'v') {
                    matriz[fila][columna] = 'vb';
                } else {
                    matriz[fila][columna] = 'cb';
                }
                matriz[fila][columna] = 'b';
            } else {
                matriz[fila][columna] = tipo;
            }
            resultado = true;
        }
    } while (!resultado);
    return resultado;
}

function dibujar() {
    if (tile.cargaOk == true) //Se valida si el fondo está cargado para cargar las demás imagenes
    {
        lapiz.drawImage(tile.imagen, 0, 0);
        /*dibujarVacas(aleatorio(10, 1));
        dibujarCerdos(aleatorio(10, 1));*/
        dibujarMatriz();
        dibujarLlave();
    }
}

function dibujarMatriz() {
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz.length; j++) {
            if (matriz[i][j] == 'v' || matriz[i][j] == 'vb') {
                lapiz.drawImage(vaca.imagenV, j * DIMENSION, i * DIMENSION);
            } else if (matriz[i][j] == 'c' || matriz[i][j] == 'cb') {
                lapiz.drawImage(cerdo.imagenC, j * DIMENSION, i * DIMENSION);
            }
        }
    }
}

/*function dibujarVacas(numero) {
    for (i = 1; i <= numero; i++) {
        lapiz.drawImage(vaca.imagenV, aleatorio(5, 0) * DIMENSION, aleatorio(5, 0) * DIMENSION);
    }
}

function dibujarCerdos(numero) {
    for (i = 1; i <= numero; i++) {
        lapiz.drawImage(cerdo.imagenC, aleatorio(5, 0) * DIMENSION, aleatorio(5, 0) * DIMENSION);
    }
}*/

function dibujarLlave() {
    x = aleatorio(5, 0);
    y = aleatorio(5, 0);
    lapiz.drawImage(llave.imagenLl, x * DIMENSION, y * DIMENSION);
}

function aleatorio(maximo, minimo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo; //Random genera números aleatorios
}

function movimiento(evento) {
    switch (evento.keyCode) {
        case tecla.LEFT:
            x = x - 1;
            dibujar();
            break;
        case tecla.RIGHT:
            x = x + 1;
            dibujar();
            break;
        case tecla.UP:
            y = y - 1;
            dibujar();
            break;
        case tecla.DOWN:
            y = y + 1;
            dibujar();
            break;
        case tecla.ENTER:
            if (matriz[y][x] == 'vb' || matriz[y][x] == 'cb') {
                alert('!!!JUEGO GANADO!!!');
                location.reload();
            } else {
                intentos = intentos - 1;
                if (intentos == 0) {
                    alert('!!!GAME OVER!!! ;-(');
                    location.reload();
                }
            }
            alert(matriz[y][x]);
            break;
    }
}

console.log(fondo);