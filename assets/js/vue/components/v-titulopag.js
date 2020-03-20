Vue.component('vue-titulopag', {
    props: {
        titulo: {
            type: String,
            required: true
        },
        subtitulo: {
            type: String,
            required: true
        },
        icono: {
            type: String,
            required: true
        }
    },
    template: '<div class="w3-container w3-padding-16">' +
    '   <div class="w3-padding-small w3-white">' +
    '       <span class="w3-large"><i v-bind:class="icono"></i> {{ titulo }}</span> <span class="w3-text-gray">{{ subtitulo }}</span>' +
    '   </div>' +
    '</div>'
});