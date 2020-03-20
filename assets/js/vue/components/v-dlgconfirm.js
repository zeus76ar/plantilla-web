Vue.component('vue-dlgconfirm', {
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
        btntextoaceptar: {
            type: String,
            required: true
        },
        btntextocancelar: {
            type: String,
            required: true
        },
        btncoloraceptar: {
            type: String,
            required: false
        },
        btncolorcancelar: {
            type: String,
            required: false
        }
    },
    computed: {
        mostrar: function() {
            var retorno = ((this.visible) ? 'block' : 'none');

            return retorno;
        },
        boton_color_aceptar: function() {
            var retorno = 'w3-teal';
            var condicion = (typeof this.btncoloraceptar !== 'undefined') && 
            (this.btncoloraceptar !== '');

            if (condicion) retorno = this.btncoloraceptar;

            return retorno;
        },
        boton_color_cancelar: function() {
            var retorno = '';
            var condicion = (typeof this.btncolorcancelar !== 'undefined') && 
            (this.btncolorcancelar !== '');

            if (condicion) retorno = this.btncolorcancelar;

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
    '       <a href="#" class="w3-button w3-border w3-small" ' +
    '       v-bind:class="boton_color_aceptar" ' +
    '       v-on:click.prevent="$emit(\'aceptar\')">{{ btntextoaceptar }}</a>' +
    '       <a href="#" class="w3-button w3-border w3-small" ' +
    '       v-bind:class="boton_color_cancelar" ' +
    '       v-on:click.prevent="$emit(\'cancelar\')">{{ btntextocancelar }}</a>' +
    '   </footer>' +
    '</div>' +
    '</div>'
});