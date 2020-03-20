Vue.component('vue-slider', {
    props: {
        items: {
            type: Array,
            required: true
        },
        intervalo: {
            type: Number,
            required: true
        },
        automatico: {
            type: Boolean,
            required: true
        },
        tema: {
            // tema: claro, oscuro
            type: String,
            required: true
        },
        controles: {
            type: Boolean,
            required: true
        },
        indicadores: {
            type: Boolean,
            required: true
        }
    },
    data: function() {
        return {
            indactual: 0,
            pausa: false,
            color_controles: (this.tema == 'claro') ? 'w3-white' : 'w3-black'
        }
    },
    methods: {
        auto: function() {
            var lmover = this.mover, lintervalo = this.intervalo;
            
            window.setInterval(function() {
                lmover('auto');
            }, lintervalo);
        }, 
        mover: function(opcion) {
            var indice, condicion;

            condicion = (opcion == 'auto') && this.pausa;

            if (condicion) return;

            indice = this.indactual;
            
            if (opcion == '-')
            {
                indice--;
            }
            else
            {
                indice++;    
            }

            if (indice < 0)
            {
                indice = this.items.length - 1;
            }
            else if (indice >= this.items.length)
            {
                indice = 0;
            }

            this.indactual = indice;
        }
    },
    mounted: function() {
        if (this.automatico) this.auto();
    },
    template: '<div class="w3-display-container" ' +
    'v-on:mouseenter="pausa = true" ' +
    'v-on:mouseleave="pausa = false">' +
    '   <span '+
    '   class="w3-animate-right" ' +
    '   v-for="(item, index) in items" ' + 
    '   v-bind:key="index" ' +
    '   v-html="item" ' + 
    '   v-show="index == indactual">' +
    '   </span>' +
    '   <button class="w3-button w3-display-left w3-opacity-min" ' +
    '   v-on:click="mover(\'-\')" v-bind:class="color_controles" ' + 
    '   v-show="controles">&#10094;</button>' +
    '   <button class="w3-button w3-display-right w3-opacity-min"' +
    '   v-on:click="mover(\'+\')" v-bind:class="color_controles" ' +
    '   v-show="controles">&#10095;</button>' +
    '   <div class="w3-center w3-display-bottommiddle" v-show="indicadores">' +
    '       <span class="w3-badge w3-border w3-transparent" ' +
    '       style="height:14px;width:14px;padding:0;" ' +
    '       v-for="(item, index) in items" ' +
    '       v-bind:class="(index == indactual) ? color_controles: \'\'"></span>' +
    '   </div>' +
    '</div>'
});