// main
var app = new Vue({
    el: '#app',
    data: {
        texto: '',
        textarea: '',
        checks: ['sugar', 'milk'],
        checks_selec: [],
        radios: ['male', 'female'],
        radio_selec: 'male',
        select: 0,
        select_options:[
            {texto: 'Seleccione una opcion', valor: 0},
            {texto: 'Opcion A', valor: 1},
            {texto: 'Opcion B', valor: 2}
        ],
        archivo: ''
    },
    methods: {
        obtenerArchivo: function(event) {
            this.archivo = event.target.files[0]
        },
        enviarDatos: function() {
            alert('Click en el boton Aceptar!!');
        }
    }
});