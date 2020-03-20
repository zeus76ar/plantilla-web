// main
var app = new Vue({
    el: '#app',
    data: {
        nom_ap: '',
        email: '',
        usuario: '',
        pass: ''
    },
    methods: {
        enviarDatos: function() {
            alert('Click en el boton Aceptar!!');
        }
    }
});