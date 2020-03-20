/*
version: 18.05
subversion: 06
autor: Ariel Balmaceda
*/
function Caracteres (){
    // metodos
    this.lTrim = function (texto) {
        var expresion = '^\s+';
        var flags = 'gm';
        var er = new RegExp(expresion, flags);
        var x = new String(texto);

        return x.replace(er, '');
    }

    this.rTrim = function (texto) {
        var expresion = '\s+$';
        var flags = 'gm';
        var er = new RegExp(expresion, flags);
        var x = new String(texto);

        return x.replace(er, '');
    }

    this.trim = function (texto) {
        var x = this.lTrim(texto);
        x = this.rTrim(x);

        return x;
    }

    this.padLeft = function (texto, relleno, limite) {
        /*
        texto: la cadena a rellenar.
        relleno: el caracter para usar de relleno.
        limite: la cantidad a rellenar.
        */
        var xrelleno = '';
        
        texto = texto + '';
        relleno = relleno + '';
        limite = parseInt(limite);

        if (this.trim(texto) == '')
        {
            console.log('Carateres.padLeft - Error: Falta el parametro texto');
            return;
        }

        if (limite < 1)
        {
            console.log('Carateres.padLeft - Error: Falta el parametro limite');
            return;
        }

        for (var i = 0; i < limite; i++)
        {
            xrelleno += relleno;
        }

        return (xrelleno + texto);
    }

    this.padRight = function (texto, relleno, limite) {
        /*
        texto: la cadena a rellenar.
        relleno: el caracter para usar de relleno.
        limite: la cantidad a rellenar.
        */
        var xrelleno = '';
        
        texto = texto + '';
        relleno = relleno + '';
        limite = parseInt(limite);
        
        if (this.trim(texto) == '')
        {
            console.log('Carateres.padRight - Error: Falta el parametro texto');
            return;
        }

        if (limite < 1)
        {
            console.log('Carateres.padRight - Error: Falta el parametro limite');
            return;
        }

        for (var i = 0; i < limite; i++)
        {
            xrelleno += relleno;
        }

        return (texto + retorno);
    }

    this.padCenter = function (texto, relleno, limite) {
        /*
        texto: la cadena a rellenar.
        relleno: el caracter para usar de relleno.
        limite: la cantidad a rellenar.
        */
        var xrelleno = '';
        
        texto = texto + '';
        relleno = relleno + '';
        limite = parseInt(limite);
        
        if (this.trim(texto) == '')
        {
            console.log('Carateres.padCenter - Error: Falta el parametro texto');
            return;
        }

        if (limite < 1)
        {
            console.log('Carateres.padCenter - Error: Falta el parametro limite');
            return;
        }

        for (var i = 0; i < limite; i++)
        {
            xrelleno += relleno;
        }

        return (xrelleno + texto + xrelleno);
    }
}