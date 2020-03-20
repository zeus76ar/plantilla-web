/*
version: 17.06
subversion: 08
autor: Ariel Balmaceda
*/
// esta clase depende de la clase caracteres.class.js
// defino la 'clase'
function Almacen (){
    // propiedades
    this.tipo = '';// string - tipo de almacenamiento a usar
    this.claveAlmacen = '';// string - clavepara el almacen
    this.error = '';//string - mensaje de error de la clase
    this.tiempoCookie = 0;// numero de dias hasta que expire la cookie

    // metodos
    this.usarTipoCookie = function(tiempo){
        this.tipo = 'ck';
        this.tiempoCookie = parseInt(tiempo);
    }
    
    this.usarTipoLocalStorage = function(){
        if (typeof(Storage) !== "undefined") {
            this.tipo = 'ls';
        } else {
            this.usarTipoCookie(365);//cookie q expira dentro de un año
            this.error = 'No se puede usar LocalStorage. Se utilizaran Cookies.';
        }
    }

    this.usarTipoSesionStorage = function(){
        if (typeof(Storage) !== "undefined") {
            this.tipo = 'ss';
        } else {
            this.usarTipoCookie(0);//cookie q expira al terminar la sesion
            this.error = 'No se puede usar LocalStorage. Se utilizaran Cookies.';
        }
    }

    this.validarClaveAlmacen = function(){
        this.error = '';
        var oc = new Caracteres();

        if (oc.trim(this.claveAlmacen) == ''){
            this.error = 'La Clave para el Almacen esta vacia.';
            return;
        }
    }

    this.validarTipoAlmacen = function(){
        this.error = '';

        if ((this.tipo != 'ck') && (this.tipo != 'ls') && 
        (this.tipo != 'ss')){
            this.error = 'El tipo para el Almacen no es valido.';
            return;
        }
    }

    this.setAlmacen = function(dato){
        //dato: objeto en formato JSON

        this.validarTipoAlmacen();

        if (this.error != '') return;

        var xdato = JSON.stringify(dato);

        if (this.tipo == 'ck'){
             this.setCookie(xdato);
        }else if(this.tipo == 'ls'){
            this.setLstorage(xdato);
        }else if(this.tipo == 'ss'){
            this.setSstorage(xdato);
        }
    }

    this.getAlmacen = function(){
        this.validarTipoAlmacen();

        if (this.error != '') return;

        var retorno = '{}';

        if (this.tipo == 'ck'){
            retorno = this.getCookie();
        }else if(this.tipo == 'ls'){
            retorno = this.getLstorage();
        }else if(this.tipo == 'ss'){
            retorno = this.getSstorage();
        }

        if (retorno == null) retorno = '{}';

        retorno = JSON.parse(retorno);

        return retorno;
    }

    this.deleteAlmacen = function(){
        this.validarTipoAlmacen();

        if (this.error != '') return;

        if (this.tipo == 'ck'){
            this.deleteCookie();
        }else if(this.tipo == 'ls'){
            this.deleteLstorage();
        }else if(this.tipo == 'ss'){
            this.deleteSstorage();
        }
    }

    // Cookies
    this.setCookie = function (dato){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        var cookie = (this.claveAlmacen + '=' + dato);
        
        if (parseInt(this.tiempoCookie) > 0){
            var d = new Date();
            d.setTime(d.getTime() + (this.tiempoCookie * 24 * 60 * 60 * 1000));

            cookie += (";expires=" + d.toUTCString());
        }

        cookie += ";path=/";

        window.document.cookie = cookie;
    }

    this.getCookie = function () {
        this.validarClaveAlmacen();

        if (this.error != '') return;

        var name = this.claveAlmacen + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        var retorno = '';

        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            
            if (c.indexOf(name) == 0) {
                retorno = c.substring(name.length, c.length);
                break;
            }
        }
        
        return retorno;
    }

    this.deleteCookie = function(){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        var d = new Date(1999, 1, 31, 0, 0, 0, 0);
        var cookie = this.claveAlmacen + "=; expires=" + d.toUTCString() + "; path=/";
        
        document.cookie = cookie;
    }

    // Local Storage
    this.setLstorage = function(dato){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        localStorage.setItem(this.claveAlmacen, dato);
    }

    this.getLstorage = function(){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        return localStorage.getItem(this.claveAlmacen);
    }

    this.deleteLstorage = function(){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        localStorage.removeItem(this.claveAlmacen);   
    }

    // Session Storage
    this.setSstorage = function(dato){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        sessionStorage.setItem(this.claveAlmacen, dato);
    }

    this.getSstorage = function(){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        return sessionStorage.getItem(this.claveAlmacen);
    }

    this.deleteSstorage = function(){
        this.validarClaveAlmacen();

        if (this.error != '') return;

        sessionStorage.removeItem(this.claveAlmacen);   
    }
}// fin function