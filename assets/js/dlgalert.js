// main
var app = new Vue({
    el: '#app',
    data: {
        mostrar: true
    },
    methods: {
        aceptar: function() {
            this.mostrar = false;
            console.log('click en aceptar!!')
        }
    }
});