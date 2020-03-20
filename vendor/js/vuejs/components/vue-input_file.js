// depende de font-awesome
Vue.component('vue-input-file', {
    props: {
        value: File,
        texto_seleccionar: '',
        texto_archivo: '',
        clase_label: '',
        clase_button:''
    },
    methods: {
        handleFileChange: function(e) {
            // Whenever the file changes, emit the 'input' event with the file data.
            this.$emit('input', e.target.files[0]);
        }
    },
    template: '<label v-bind:class="clase_label">' +
    '<div v-bind:class="clase_button">' +
    '   <span v-if="value"><i class="fa fa-file"></i> ' +
    '   {{ texto_archivo }} {{ value.name }}</span>' +
    '   <span v-else><i class="fa fa-search"></i> {{ texto_seleccionar }}</span>' +
    '</div>' +
    '<input type="file" style="display: none;" v-on:change="handleFileChange">' +
    '</label>'
});
