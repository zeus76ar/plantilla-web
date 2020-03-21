Vue.component('vue-password-input', {
    model: {
        prop: 'texto',
        event: 'keyup'
    },
    props: {
        texto: {
            type: String,
            required: true
        },
        autofocus: {
            type: Boolean,
            required: true
        },
        nombre_campo: {
            type: String,
            required: false
        },
        css_borde: {
            type: String,
            required: false
        },
        css_boton: {
            type: String,
            required: false
        },
        css_input: {
            type: String,
            required: false
        },
        estilos_input: {
            type: Object,
            required: false
        },
        icono_visible: {
            type: String,
            required: false
        },
        icono_oculto: {
            type: String,
            required: false
        }
    },
    data: function() {
        var datos = {
            visible: false
        };

        return datos;
    },
    computed: {
        autofoco: function() {
            var retorno = false;

            if (this.autofocus) retorno = true;

            return retorno;
        },
        name: function () {
            var retorno = '';

            if (this.nombre_campo !== '') retorno = this.nombre_campo;

            return retorno;
        },
        tipo: function() {
            var tipo = 'password';

            if (this.visible) tipo = 'text';

            return tipo;
        },
        icono_boton: function() {
            var icono = this.icono_visible;

            if (this.visible) icono = this.icono_oculto;

            return icono;
        }
    },
    methods: {
        mostrar: function() {
            this.visible = !this.visible;
        }
    },
    template: '<div v-bind:class="css_borde">' + 
    '<input v-bind:type="tipo" v-bind:value="texto"' + 
    ' v-bind:name="name"' + 
    ' v-bind:autofocus="autofoco"' + 
    ' v-on:keyup="$emit(\'keyup\', $event.target.value)"' + 
    ' v-bind:class="css_input" v-bind:style="estilos_input">' + 
    '<button v-on:click.prevent="mostrar()" v-bind:class="css_boton">' + 
    '   <span v-bind:class="icono_boton"></span>' + 
    '</button>' + 
    '</div>'
});