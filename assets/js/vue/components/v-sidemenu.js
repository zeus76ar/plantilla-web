Vue.component('vue-sidemenu', {
    props: {
        colormenu: {
            type: String,
            required: true
        },
        colorsubmenu: {
            type: String,
            required: true
        },
        colormenusel: {
            type: String,
            required: true
        }
    },
    data: function() {
        param = {
            id_sidemenu: 'nsidebar',
            id_overlay: 'doverlay',
            id_accordion: [
                'accord_1',
                'accord_2',
                'accord_3',
                'accord_4'
            ]
        };

        return param;
    },
    methods: {
        verSideMenu: function() {
            var op_mostrar = 'block', op_ocultar = 'none';
            var menu = document.getElementById(this.id_sidemenu);
            var overlay = document.getElementById(this.id_overlay);
            var condicion = (menu.style.display.indexOf(op_mostrar) >= 0);
            
            menu.style.display = (condicion)?op_ocultar:op_mostrar;
            overlay.style.display = (condicion)?op_ocultar:op_mostrar;
        },
        verAccordion: function(ind) {
            var x = document.getElementById(this.id_accordion[ind]);
            var clase = 'w3-hide', i, y;
            var id_parent = x.parentNode.id;

            // cierro los otros accordion que esten abiertos
            for (i = 0; i < this.id_accordion.length; i++)
            {
                if ((i == ind) || (this.id_accordion[i] == id_parent)) continue;
                
                y = document.getElementById(this.id_accordion[i]);

                if (y.className.indexOf(clase) == -1) 
                {
                    y.className += (' ' + clase);
                }
            }
            
            //
            if (x.className.indexOf(clase) == -1) {
                x.className += (' ' + clase);
            } else {
                x.className = x.className.replace((' ' + clase), '');
            }
        }
    },
    template: '<div>' +
    '<!-- Sidebar/menu -->' +
    '<nav class="w3-sidebar w3-collapse w3-black w3-animate-left" ' +
    'v-bind:class="colormenu" style="z-index:3;width:230px;" v-bind:id="id_sidemenu">' +
    '   <div class="w3-container w3-row w3-margin-top">' +
    '       <div class="w3-col s4">' +
    '           <img src="assets/img/avatar2.png" ' +
    '           class="w3-circle w3-margin-right" style="width:46px">' +
    '       </div>' +
    '       <div class="w3-col s8">' +
    '           <span class="w3-padding"><strong>Usuario</strong></span>' +
    '           <div class="w3-bar">' +
    '               <a href="perfil.html" class="w3-bar-item w3-button" ' + 
    '               title="Mi Perfil">' +
    '                   <i class="fa fa-user"></i>' +
    '               </a>' +
    '               <a href="login.html" class="w3-bar-item w3-button" ' +
    '               title="Salir">' +
    '                   <i class="fa fa-sign-out"></i>' +
    '               </a>' +
    '           </div>' +
    '       </div>' +
    '   </div>' +
    '   <div class="w3-container w3-margin-top w3-border-top menu_ppal">' +
    '       <h6>Menu</h6>' +
    '   </div>' +
    '   <div class="w3-bar-block menu_ppal">' +
    '       <a href="index.html" ' +
    '       class="w3-bar-item w3-button w3-padding" ' + 
    '       v-bind:class="colormenusel">' +
    '           <i class="fa fa-home"></i> Home' +
    '       </a>' +
    '       <button class="w3-button w3-block w3-left-align" ' +
    '       v-on:click="verAccordion(0)">' +
    '           <i class="fa fa-square-o"></i> Templates <i ' +
    '           class="fa fa-angle-down"></i>' +
    '       </button>' +
    '       <div v-bind:id="id_accordion[0]" v-bind:class="colorsubmenu" ' +
    '       class="w3-bar-block w3-card-4 w3-hide">' +
    '           <a href="blank.html" class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> En Blanco' +
    '           </a>' +
    '           <a href="login.html" class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-sign-in"></i> Login' +
    '           </a>' +
    '           <a href="form.html" class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-edit"></i> Formulario' +
    '           </a>' +
    '           <a href="tabla.html" class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-table"></i> Tabla' +
    '           </a>' +
    '           <a href="listado.html" class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-table"></i> Listado' +
    '           </a>' +
    '           <a href="custom_fields.html" class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Campos personalizados' +
    '           </a>' +
    '       </div>' +
    '       <button class="w3-button w3-block w3-left-align" ' +
    '       v-on:click="verAccordion(1)">' + 
    '           <i class="fa fa-square-o"></i> Vue Components <i ' +
    '           class="fa fa-angle-down"></i>' +
    '       </button>' +
    '       <div v-bind:id="id_accordion[1]" v-bind:class="colorsubmenu" ' +
    '       class="w3-bar-block w3-card-4 w3-hide">' +
    '           <a href="datetime.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Datetime' +
    '           </a>' +
    '           <a href="validacion.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Validacion' +
    '           </a>' +
    '           <a href="autocomplete.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Autocomplete' +
    '           </a>' +
    '           <a href="html5_editor.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> HTML5 editor' +
    '           </a>' + 
    '           <a href="dlgalert.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Dialog Alert' +
    '           </a>' + 
    '           <a href="dlgconfirm.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Dialog Confirm' +
    '           </a>' + 
    '           <a href="slider.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Slider' +
    '           </a>' + 
    '           <a href="horario.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Horario' +
    '           </a>' + 
    '           <button class="w3-button w3-block w3-left-align" ' +
    '           v-bind:class="colorsubmenu" v-on:click="verAccordion(2)">' +
    '               &nbsp;&nbsp;<i class="fa fa-square-o"></i> Campos <i ' +
    '               class="fa fa-angle-down"></i>' +
    '           </button>' + 
    '           <div v-bind:id="id_accordion[2]" v-bind:class="colorsubmenu" ' +
    '           class="w3-bar-block w3-card-4 w3-hide">' +
    '               <a href="input_file.html" ' + 
    '               class="w3-bar-item w3-button w3-padding">' +
    '                   &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-file"></i> Input File' +
    '               </a>' +
    '               <a href="select.html" ' + 
    '               class="w3-bar-item w3-button w3-padding">' +
    '                   &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-file"></i> Select Field' +
    '               </a>' +
    '               <a href="input-spinner.html" ' + 
    '               class="w3-bar-item w3-button w3-padding">' +
    '                   &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-file"></i> Input Spinner' +
    '               </a>' +
    '               <a href="password.html" ' + 
    '               class="w3-bar-item w3-button w3-padding">' +
    '                   &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-file"></i> Password' +
    '               </a>' +
    '           </div>' + 
    '       </div>' +
    '       <a href="grafico.html" class="w3-bar-item w3-button w3-padding">' +
    '           <i class="fa fa-pie-chart"></i> Grafico' +
    '       </a>' +
    '       <a href="mapa.html" class="w3-bar-item w3-button w3-padding">' +
    '           <i class="fa fa-map"></i> Mapa' +
    '       </a>' +
    '       <button class="w3-button w3-block w3-left-align" ' +
    '       v-on:click="verAccordion(3)">' + 
    '           <i class="fa fa-square-o"></i> Temas <i ' +
    '           class="fa fa-angle-down"></i>' +
    '       </button>' +
    '       <div v-bind:id="id_accordion[3]" v-bind:class="colorsubmenu" ' +
    '       class="w3-bar-block w3-card-4 w3-hide">' +
    '           <a href="blank_purple.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Deep Purple' +
    '           </a>' +
    '           <a href="blank_green.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Green' +
    '           </a>' +
    '           <a href="blank_red.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Red' +
    '           </a>' +
    '           <a href="blank_orange.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Orange' +
    '           </a>' +
    '           <a href="blank_blue_gray.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Blue Gray' +
    '           </a>' +
    '           <a href="blank_indigo.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Indigo' +
    '           </a>' +
    '           <a href="blank_teal.html" ' +
    '           class="w3-bar-item w3-button w3-padding">' +
    '               &nbsp;&nbsp;<i class="fa fa-file"></i> Teal' +
    '           </a>' +
    '       </div>' + 
    '   </div>' +
    '</nav>' +
    '<!-- Overlay effect when opening sidebar on small screens -->' +
    '<div class="w3-overlay w3-hide-large w3-animate-opacity" ' +
    'v-on:click="verSideMenu()" style="cursor:pointer" ' +
    'title="close side menu" v-bind:id="id_overlay"></div></div>'
});