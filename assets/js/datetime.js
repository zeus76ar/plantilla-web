// main
var app = new Vue({
    el: '#app',
    data: {
        fecha: '',
        hora: '',
        fecha_hora: ''
    },
    mounted: function() {
        var hoy = new Date();
        
        this.fecha = hoy.toISOString();
        this.hora = hoy.toISOString();
        this.fecha_hora = hoy.toISOString();
    }
});