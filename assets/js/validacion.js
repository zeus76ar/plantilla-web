// componente para validacion
Vue.use(VeeValidate, {
    locale: 'es',
    dictionary: {
        es: { 
            messages: vee_messages, 
            attributes: {}
        }
    }
});

// main
var app = new Vue({
    el: '#app',
    data: {
        texto: '',
        textarea: '',
        checks: ['sugar', 'milk'],
        checks_selec: [],
        radios: ['male', 'female'],
        radio_selec: '',
        select: 0,
        select_options:[
            {texto: 'Seleccionar...', valor: 0},
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
            this.$validator.validateAll().then((result) => {
                if (result)
                {
                    alert('Validacion OK!');
                }
                else
                {
                    alert('Revise los errores!');
                }
            });
        }
    }
});