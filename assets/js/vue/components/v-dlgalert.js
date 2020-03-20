Vue.component('vue-dlgalert', {
    props:{
        visible: {
            type: Boolean,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        mensaje: {
            type: String,
            required: true
        },
        btntexto: {
            type: String,
            required: true
        },
        btncolor: {
            type: String,
            required: false
        }
    },
    computed: {
        mostrar: function() {
            var retorno = ((this.visible) ? 'block' : 'none');

            return retorno;
        },
        boton_color: function() {
            var retorno = 'w3-teal';
            var condicion = (typeof this.btncolor !== 'undefined') && (this.btncolor !== '');

            if (condicion) retorno = this.btncolor;

            return retorno;
        }
    },
    template: '<div class="w3-modal" v-bind:style="{ display: mostrar }">' +
    '<div class="w3-modal-content w3-animate-top" style="width: 350px;">' +
    '   <header class="w3-container w3-padding-small w3-light-gray">' +
    '       <h6>{{ titulo }}</h6>' + 
    '   </header>' +
    '   <div class="w3-container w3-padding-16">' +
    '       {{ mensaje }}' +
    '   </div>' +
    '   <footer class="w3-container w3-padding-small w3-right-align w3-light-gray">' +
    '       <a href="#" class="w3-button w3-small w3-border" ' +
    '       v-bind:class="boton_color" ' +
    '       v-on:click.prevent="$emit(\'aceptar\')">{{ btntexto }}</a>' +
    '   </footer>' +
    '</div>' +
    '</div>'
});