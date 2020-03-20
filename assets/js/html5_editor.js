Vue.use(VueHtml5Editor, html5_editor_opt);

// main
var app = new Vue({
    el: '#app',
    data: {
        content: '<strong>Texto</strong> de <i>ejemplo</i>'
    },
    methods: {
        updateData: function(data) {
            this.content = data;
        }
    }
});