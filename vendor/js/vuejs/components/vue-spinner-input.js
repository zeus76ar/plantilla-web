Vue.component('vue-spinner-input', {
    model: {
        prop: 'numero',
        event: 'keyup'
    },
    props: {
        numero: {
            type: String,
            required: true
        },
        minimo: {
            type: String,
            required: true
        },
        maximo: {
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
        mostrar_leyenda: {
            type: Boolean,
            required: true
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
        css_leyenda: {
            type: String,
            required: false
        },
        estilos_input: {
            type: Object,
            required: false
        }
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
        }
    },
    methods: {
        restar: function() {
            var numero = parseInt(this.numero);

            if (numero > parseInt(this.minimo))
            {
                numero--;
                this.$emit('keyup', numero.toLocaleString());
            }
        },
        sumar: function() {
            var numero = parseInt(this.numero);

            if (numero < parseInt(this.maximo))
            {
                numero++;
                this.$emit('keyup', numero.toLocaleString());
            }
        },
        keyup: function(e) {
            this.validarNumero(e);

            this.$emit('keyup', e.target.value);
        },
        validarNumero: function(evento) {
            var numero, caracter, retorno = '';
            var limite = evento.target.value.length;

            for (var i = 0; i < limite; i++)
            {
                caracter = evento.target.value[i];

                if (caracter === '-')
                {
                    retorno += caracter;
                }
                else
                {
                    numero = parseInt(caracter);
                
                    if (! isNaN(numero)) retorno += numero.toLocaleString();
                }
            }

            numero = parseInt(retorno);

            if (numero < this.minimo) retorno = this.minimo;

            if (numero > this.maximo) retorno = this.maximo;

            evento.target.value = retorno;
        }
    },
    template: '<div v-bind:class="css_borde">' + 
    '<button v-on:click.prevent="restar()" v-bind:class="css_boton">-</button>' + 
    '<input type="text" v-bind:value="numero"' + 
    ' v-bind:name="name"' + 
    ' v-bind:autofocus="autofoco"' + 
    ' v-on:keyup="keyup"' + 
    ' v-bind:class="css_input" v-bind:style="estilos_input">' + 
    '<button v-on:click.prevent="sumar()" v-bind:class="css_boton">+</button>' + 
    '<span v-show="mostrar_leyenda">' + 
    '   <br>' + 
    '   <span v-bind:class="css_leyenda">Min: {{ minimo}} - Max: {{ maximo }}</span>' + 
    '</span>' + 
    '</div>'
});