// main
var app = new Vue({
    el: '#app',
    data: {
        eventos: []
    },
    methods: {
        padL: function(texto, relleno, longitud) {
            var resultado = texto;

            while (resultado.length < longitud)
            {
                resultado = (relleno + resultado);
            }
            
            return resultado;
        },
        generarFechaYmd: function(fecha) {
            var resultado;
            
            resultado = fecha.getFullYear().toString() + '-' + 
            this.padL((fecha.getMonth() + 1).toString(), '0', 2) + '-' + 
            this.padL(fecha.getDate().toString(), '0', 2);
            
            return resultado;
        },
        generarHoraMin: function(fecha) {
            var resultado;
            
            resultado = this.padL(fecha.getHours().toString(), '0', 2) + ':' + 
            this.padL(fecha.getMinutes().toString(), '0', 2);
            
            return resultado;
        },
        generarEventos: function() {
            var i, ahora, item, fecha, hora = 9;

            ahora = new Date();
            fecha = ahora;

            item = {
                fecha: this.generarFechaYmd(ahora),
                hora: ('0' + hora + ':30'),
                evento: 'Evento 1'
            };

            this.eventos.push(item);

            i = 1;
            
            while( i < 3)
            {
                fecha.setDate(fecha.getDate() + 1);

                item = {
                    fecha: this.generarFechaYmd(fecha),
                    hora: ((hora + i) + ':30'),
                    evento: 'Evento ' + (i + 1)
                };
    
                this.eventos.push(item);

                i++;
            }
        }
    },
    mounted: function() {
        this.generarEventos();
    }
});