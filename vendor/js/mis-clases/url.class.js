/*
version: 17.06
subversion: 09
autor: Ariel Balmaceda
*/
function Url(){
    this.obtenerParamGet = function(){
        //?a=agregar&p=P0001
        var param = window.location.search;
        var retorno = '{';

        if (param != ''){
            param = param.replace('?', '');
            
            var pares = param.split('&');
            var elementos;

            for (var i = 0; i < pares.length; i++){
                elementos = pares[i].split('=');

                retorno += '"' + elementos[0] + '": "' + elementos[1] + '"';

                if (i < (pares.length - 1)) retorno += ', ';
            }
        }

        retorno += '}';
        
        return JSON.parse(retorno);
    }
}// fin function