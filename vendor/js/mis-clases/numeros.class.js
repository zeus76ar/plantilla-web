/*
version: 17.06
subversion: 27
autor: Ariel Balmaceda
*/
function Numeros(){
    this.formatoEs = function(numero, decimales){
        var xnumero = parseFloat(numero);
        var xdecimales = parseInt(decimales);
        var retorno = '';

        if ((xdecimales < 0) || (xdecimales > 20)){
            var mensaje = 'formatoEs() - Error: la cantidad de decimales' + 
            ' debe ser entre 0 y 20';

            console.log(mensaje);

            return numero;
        }

        xnumero = xnumero.toFixed(xdecimales);
        retorno = new String(xnumero);
        
        return retorno.replace('.', ',');
    }
}// fin function