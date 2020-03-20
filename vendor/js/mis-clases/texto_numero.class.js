/*
Clase Texto_Numero().
Descripcion: permite convertir texto a numero (decimal. binario, octal y hexa) 
y viceversa.
version: 19.01
subversion: 15
autor: Ariel Balmaceda
dependencias: caracteres.class.js
*/

function Texto_Numero() {
    // propiedades
    this.texto = '';
    this.numero = '';
    this.sistema = '';
    this.error = '';
    this.oc = new Caracteres();
    this.rellenos = {
        decimal: 3,
        binario: 8,
        octal: 3,
        hexa: 2
    }

    // metodos privados
    this._validarTexto = function() {
        this.error = '';

        if (this.oc.trim(this.texto) === '')
        {
            this.error = 'El Texto esta vacio.';
        }
    }

    this._validarNumVacio= function() {
        this.error = '';
        
        if (this.oc.trim(this.numero) === '')
        {
            this.error = 'El Numero esta vacio.';
        }
    }

    this._validarNumDecimal = function() {
        this._validarNumVacio();

        if (this.error === '')
        {
            var limite = this.numero.length;
            var condicion;

            for (var i = 0; i < limite; i++)
            {
                condicion = isNaN(this.numero.substr(i, 1));

                if (condicion)
                {
                    this.error = 'El Numero no es Decimal.';
                    break;
                }
            }
        }
    }

    this._validarNumBinario = function() {
        this._validarNumVacio();

        if (this.error === '')
        {
            var condicion;

            for (i = 0; i < this.numero.length; i++)
            {
                condicion = (isNaN(this.numero.substr(i, 1))) || 
                (parseInt(this.numero.substr(i, 1)) > 1);

                if (condicion)
                {
                    this.error = 'El Numero no es Binario.';
                    break;
                }
            }
        }
    }

    this._validarNumOctal = function() {
        this._validarNumVacio();

        if (this.error === '')
        {
            var condicion;

            for (i = 0; i < this.numero.length; i++)
            {
                condicion = (isNaN(this.numero.substr(i, 1))) || 
                (parseInt(this.numero.substr(i, 1)) > 7);

                if (condicion)
                {
                    this.error = 'El Numero no es Octal.';
                    break;
                }
            }
        }
    }

    this._validarNumOctal = function() {
        this._validarNumVacio();

        if (this.error === '')
        {
            var condicion;

            for (i = 0; i < this.numero.length; i++)
            {
                condicion = (isNaN(this.numero.substr(i, 1))) || 
                (parseInt(this.numero.substr(i, 1)) > 7);

                if (condicion)
                {
                    this.error = 'El Numero no es Octal.';
                    break;
                }
            }
        }
    }

    this._validarNumHexa = function() {
        this._validarNumVacio();

        if (this.error === '')
        {
            var condicion, num, letras_permitidas = 'ABCDEF';

            for (i = 0; i < this.numero.length; i++)
            {
                num = this.numero.substr(i, 1);
                condicion = isNaN(num);

                if (condicion)
                {
                    condicion = letras_permitidas.includes(num.toString().toUpperCase());
                    
                    if (! condicion)
                    {
                        this.error = 'El Numero no es Hexa.';
                        break;
                    }
                }
            }
        }
    }

    this._rellenarString = function(texto) {
        var limite;
        
        switch(this.sistema)
        {
            case 'd':
                limite = (this.rellenos.decimal - texto.toString().length);
            break;
            case 'b':
                limite = (this.rellenos.binario - texto.toString().length);
            break;
            case 'o':
                limite = (this.rellenos.octal - texto.toString().length);
            break;
            case 'h':
                limite = (this.rellenos.hexa - texto.toString().length);
            break;
        }

        if (limite > 0) texto = this.oc.padLeft(texto, '0', limite);

        return texto;
    }
    
    // metodos publicos
    this.setTexto = function(texto) {
        this.texto = texto;
    }

    this.getTexto = function() {
        return this.texto;
    }

    this.setNumero = function(numero) {
        this.numero = numero;
    }

    this.getNumero = function() {
        return this.numero;
    }

    this.setSistema = function(sistema) {
        this.sistema = sistema;
    }

    this.getSistema = function() {
        return this.sistema;
    }

    this.getError = function() {
        return this.error;
    }

    this.convertirTextoEnNumero = function() {
        this._validarTexto();

        if (this.error !== '') return;

        var numero = [];
        var limite = this.texto.length;
        
        for (var i = 0; i < limite; i++)
        {
            switch (this.sistema)
            {
                case 'd':
                    numero[i] = this.texto.charCodeAt(i);
                break;
                case 'b':
                    numero[i] = this.texto.charCodeAt(i).toString(2);
                break;
                case 'o':
                    numero[i] = this.texto.charCodeAt(i).toString(8);
                break;
                case 'h':
                    numero[i] = this.texto.charCodeAt(i).toString(16);
                break;
                default:
                    numero[i] = '';
                    this.error = 'El sistema ' + this.sistema + ' elegido es incorrecto.';
            }

            numero[i] = this._rellenarString(numero[i]);
        }
        
        this.numero = numero.join('');
    }

    this.convertirNumeroEnTexto = function() {
        var cantidad;

        switch(this.sistema)
        {
            case 'd':
                cantidad = this.rellenos.decimal;
                this._validarNumDecimal();
            break;
            case 'b':
                cantidad = this.rellenos.binario;
                this._validarNumBinario();
            break;
            case 'o':
                cantidad = this.rellenos.octal;
                this._validarNumOctal();
            break;
            case 'h':
                cantidad = this.rellenos.hexa;
                this._validarNumHexa();
            break;
        }

        if (this.error === '')
        {
            var numeros = [], j = 0;

            for (var i = 0; i < this.numero.length;)
            {
                numeros[j] = this.numero.substr(i, cantidad);
                i += cantidad;
                j++;
            }

            var codigo;

            for (i = 0; i < numeros.length; i++)
            {
                switch(this.sistema)
                {
                    case 'd':
                        codigo = parseInt(numeros[i], 10);
                    break;
                    case 'b':
                        codigo = parseInt(numeros[i], 2);
                    break;
                    case 'o':
                        codigo = parseInt(numeros[i], 8);
                    break;
                    case 'h':
                        codigo = parseInt(numeros[i], 16);
                    break;
                }

                this.texto += String.fromCharCode(codigo);
            }
        }
    }
}
