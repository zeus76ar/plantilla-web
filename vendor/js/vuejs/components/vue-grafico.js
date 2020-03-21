// depende de chart.js
Vue.component('vue-grafico', {
    props: {
        id_grafico: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        datos: {
            type: Array,
            required: true
        },
        etiquetas: {
            type: Array,
            required: true
        },
        mostrar: {
            type: Boolean,
            required: true
        },
        opciones: {
            type: Object
        },
        css: {
            type: String
        }
    },
    computed: {
        grafico_opciones : function() {
            return {
                type: this.tipo,
                data: {
                    labels: this.etiquetas,
                    datasets: this.datos
                },
                options: this.opciones
            };
        }
    },
    watch: {
        mostrar: function(value) {
            if (value)
            {
                this.dibujarGrafico();
            }
        }
    },
    methods: {
        dibujarGrafico: function() {
            var ctx = document.getElementById(this.id_grafico).getContext('2d');

            var grafico = new Chart(ctx, this.grafico_opciones);
        }
    },
    mounted: function() {
        if (this.mostrar) this.dibujarGrafico();
    },
    template: '<div v-bind:class="css">' + 
    '<canvas v-bind:id="id_grafico"></canvas>' +
    '</div>'
});