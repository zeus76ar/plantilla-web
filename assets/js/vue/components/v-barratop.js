Vue.component('vue-barratop', {
    template: '<div>' +
    '<!-- Top container -->' +
    '<div class="w3-bar w3-top w3-large w3-theme-d3" style="z-index:4">' +
    '   <span class="w3-bar-item" style="cursor:pointer;" ' +
    '   v-on:click="mostrarAcerca(true)"><strong>AB software</strong></span>' +
    '   <div class="w3-right w3-margin-left">' +
    '   <a href="#" class="w3-bar-item w3-button w3-small w3-hover-opacity">' +
    '       <i class="fa fa-bell"></i>' +
    '       <span class="w3-badge w3-white">15</span>' +
    '   </a>' +
    '   <button class="w3-bar-item w3-button w3-hide-large w3-hover-none' +
    '   w3-hover-text-light-grey" v-on:click="verSideMenu()">' +
    '       <i class="fa fa-bars"></i>' +
    '   </button>' +
    '   </div>' +
    '</div>' +
    '<!-- modal acerca de -->' +
    '<div class="w3-modal" v-bind:style="{ display: mostrar, \'z-index\': 5 }">' +
    '   <div class="w3-modal-content w3-animate-zoom">' +
    '       <header class="w3-container w3-theme">' +
    '           <span v-on:click="mostrarAcerca(false)" ' +
    '           class="w3-button w3-display-topright w3-hover-opacity">' +
    '               <span class="fa fa-times"></span>' +
    '           </span>' +
    '           <h3>Acerca de...</h3>' +
    '       </header>' +
    '       <div class="w3-container w3-padding">' +
    '           <h4>{{ titulo }}</h4>' +
    '           <strong>{{ subtitulo }}</strong>' +
    '           <p>' +
    '               <strong>Versión:</strong> {{ version }} <br>' +
    '               <strong>Subversión:</strong> {{ subversion }}<br>' +
    '               <strong>Análisis y Desarrollo:</strong> ' +
    '               Ariel Balmaceda. Analista Programador.<br>' +
    '               <strong>Ficha Técnica</strong><br>' +
    '               Front-end: {{ frontend }}<br>' +
    '               Back-end: {{ backend }}<br>' +
    '               DB: {{ db }}<br>' +
    '           </p>' +
    '           <strong>© 2018. Todos los derechos reservados.</strong>' +
    '       </div>' +
    '   </div>' +
    '</div></div>',
    data: function() {
        return {
            mostrar: 'none',
            titulo: 'Plantilla 2019',
            subtitulo: 'Mi plantilla web 2019',
            version: '2020.03',
            subversion: '17',
            frontend: 'W3.css, Vue.js',
            backend: 'PHP 5, Flight.',
            db: 'MySQL'
        };
    },
    methods: {
        verSideMenu: function() {
            var op_mostrar = 'block', op_ocultar = 'none';
            var id_sidemenu = 'nsidebar', id_overlay = 'doverlay';

            var menu = document.getElementById(id_sidemenu);
            var overlay = document.getElementById(id_overlay);
            var condicion = (menu.style.display.indexOf(op_mostrar) >= 0);
            
            menu.style.display = (condicion)?op_ocultar:op_mostrar;
            overlay.style.display = (condicion)?op_ocultar:op_mostrar;
        },
        mostrarAcerca: function(opcion) {
            this.mostrar = (opcion) ? 'block': 'none';
        }
    }
});
