Vue.component('vue-carousel', {
    props: {
        items: {
            //item[0].imagen, item[0].caption
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
        },
        opimagen: {
            // opimagen.tipo: 'clase' o 'estilo'
            // opimagen.altura: 100 (numero) -solo si tipo es estilo
            type: Object,
            required: true
        },
        poscaption: {
            // 'topleft', 'topmiddle', 'topright'
            // 'left', 'middle', 'right'
            // 'bottomleft', 'bottommiddle', 'bottomright'
            type: String,
            required: true
        },
        animacion: {
            // 'top', 'bottom', 'left', 'right'
            // 'opacity', 'zoom', 'fading', 'spin'
            type: String,
            required: true
        },
        alincaption: {
            // 'left', 'center', 'right'
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            indactual: 0,
            pausa: false,
            color_controles: (this.tema == 'claro') ? 'w3-white' : 'w3-black',
            estilo_imagen: {
                width: '100%',
                height: this.opimagen.altura + 'px'
            },
            pos_caption: 'w3-display-' + this.poscaption,
            animacion_imagen: 'w3-animate-' + this.animacion,
            clase_imagen: ((this.opimagen.tipo == 'clase') ? 'w3-image' : ''),
            alin_caption: ((this.alincaption == 'center') ? 'w3-center' : ('w3-' + this.alincaption + '-align'))
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
    'v-on:mouseleave="pausa = false" ' +
    'v-if="items.length">' +
    '   <img v-for="(item, index) in items"' +
    '   v-bind:src="item.imagen" ' + 
    '   v-bind:key="index" ' +
    '   v-show="index == indactual" ' +
    '   v-bind:class="[clase_imagen, animacion_imagen]" ' +
    '   v-bind:style="(opimagen.tipo == \'estilo\') ? estilo_imagen : \'\'">' +
    '   <div class="w3-container w3-padding-16 w3-opacity-min" ' +
    '   v-bind:class="[color_controles, pos_caption, alin_caption]">' +
    '       <span v-html="items[indactual].caption"></span>' +
    '   </div>' +
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