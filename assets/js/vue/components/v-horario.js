Vue.component('vue-horario', {
    props: {
        horainicio: {
            type: Number,
            required: true
        },
        horafin: {
            type: Number,
            required: true
        },
        eventos: {
            type: Array,
            required: true
        },
        clasehora: {
            type: String,
            required: true
        },
        claseboton: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            ofechas: new Fechas(),
            fecha_sel: new Date(),
            tipo: 'd',
            titulo_dia: '',
            ir: 'hoy',
            semana: [],
            titulo_horario: '',
            mes: []
        }
    },
    computed: {
        rango: function() {
            var horas = new Array();
            var i, hora;

            for (i = this.horainicio; i <= this.horafin; i++)
            {
                hora = (i < 10) ? ('0' + i.toString()) : i.toString();
                horas.push(hora);
            }

            return horas;
        }
    },
    methods: {
        generarTituloDia: function() {
            var dia = this.ofechas.obtenerNombreDia(this.fecha_sel.getDay());
            var numero = this.fecha_sel.getDate();
            
            this.titulo_dia = dia + ' ' + numero;
        },
        cambiarFecha: function(opcion) {
            // opcion: string. '+', '-' o '*'

            var nuevo_dia;

            switch (opcion)
            {
                case '*':
                    this.fecha_sel = new Date();
                    this.ir= 'hoy';
                    
                    break;
                case '-':
                    nuevo_dia = this.generarDiaLimite(opcion);

                    this.fecha_sel.setDate(nuevo_dia);
                    this.ir= 'ant';
                    
                    break;
                case '+':
                    nuevo_dia = this.generarDiaLimite(opcion);

                    this.fecha_sel.setDate(nuevo_dia);
                    this.ir= 'sig';

                    break;
            }

           this.inicio();
        },
        buscarEvento: function(fecha, hora, opcion) {
            //fecha: string (aaaa-mm-dd)
            //hora: string (hh:mm)
            //opcion: string ('d', 's', 'm')

            var i, retorno = '', marca = '*', condicion;

            for (i = 0; i < this.eventos.length; i++)
            {
                if (opcion == 'm')
                {
                    condicion = this.eventos[i].fecha == fecha;

                    if (condicion)
                    {
                        retorno = marca;
                        break;
                    }
                }
                else
                {
                    condicion = (this.eventos[i].fecha == fecha) && 
                    (this.eventos[i].hora == hora);
                    
                    if (condicion)
                    {
                        retorno = (opcion == 'd') ? this.eventos[i].evento : marca;
                        break;
                    }
                }
            }

            return retorno;
        },
        generarSemana: function() {
            this.semana = [
                {dia: 'Do', fecha: '', dia_largo: 'Domingo'}, 
                {dia: 'Lu', fecha: '', dia_largo: 'Lunes'}, 
                {dia: 'Ma', fecha: '', dia_largo: 'Martes'}, 
                {dia: 'Mi', fecha: '', dia_largo: 'Miercoles'}, 
                {dia: 'Ju', fecha: '', dia_largo: 'Jueves'}, 
                {dia: 'Vi', fecha: '', dia_largo: 'Viernes'}, 
                {dia: 'Sa', fecha: '', dia_largo: 'Sabado'}
            ];

            this.cargarDiaSemana(this.fecha_sel);

            // calculo los dias anteriores a fecha seleccionada
            var fecha_tmp = 
            new Date(this.fecha_sel.getFullYear(), this.fecha_sel.getMonth(), this.fecha_sel.getDate());

            for (i = (this.fecha_sel.getDay() - 1); i >= 0; i--)
            {
                fecha_tmp.setDate((fecha_tmp.getDate() - 1));

                this.cargarDiaSemana(fecha_tmp);
            }

            // calculo los dias siguientes a fecha seleccionada
            var fecha_tmp = 
            new Date(this.fecha_sel.getFullYear(), this.fecha_sel.getMonth(), this.fecha_sel.getDate());

            for (i = (this.fecha_sel.getDay() + 1); i < this.semana.length; i++)
            {
                fecha_tmp.setDate((fecha_tmp.getDate() + 1));

                this.cargarDiaSemana(fecha_tmp);
            }

        },
        cargarDiaSemana: function(fecha) {
            // fecha: objeto Date()

            var dia = fecha.getDate().toString();

            if (dia.length < 2) dia = '0' + dia;

            this.semana[fecha.getDay()].fecha = this.ofechas.convertirFechaYmd(fecha, '-');
            this.semana[fecha.getDay()].dia += (' ' + dia);
        },
        generarTituloHorario: function() {
            var texto = '';

            switch (this.tipo)
            {
                case 'd':
                    var anio = this.fecha_sel.getFullYear();
                    var num_mes = this.fecha_sel.getMonth();
                    var nom_mes = this.ofechas.obtenerNombreMes((num_mes + 1));

                    texto = nom_mes + ' ' + anio;
                    
                    break;
                case 's':
                    var partes = this.semana[0].fecha.split('-');
                    var mes_1 = this.ofechas.obtenerNombreMes(partes[1]);
                    var anio_1 = partes[0];
            
                    partes = this.semana[(this.semana.length - 1)].fecha.split('-');
                    var mes_2 = this.ofechas.obtenerNombreMes(partes[1]);
                    var anio_2 = partes[0];
            
                    texto = mes_1 + ' ' + anio_1;
            
                    if (mes_1 != mes_2)
                    {
                        texto += ' - ' + mes_2 + ' ' + anio_2;
                    }

                    break;
                case 'm':
                    var partes = this.semana[0].fecha.split('-');
                    var mes = this.ofechas.obtenerNombreMes(partes[1]);
                    var anio = partes[0];

                    texto = mes + ' ' + anio;

                    break;

            }

            this.titulo_horario = texto;
        },
        seleccionarDia: function(fecha) {
            // fecha: string (aaaa-mm-dd)
            var partes = fecha.split('-');

            this.fecha_sel = 
            new Date(parseInt(partes[0]), (parseInt(partes[1]) - 1), parseInt(partes[2]));

            this.tipo = 'd';
            this.generarTituloDia();
        },
        generarDiaLimite: function(opcion) {
            var retorno;

            switch ( opcion )
            {
                case '-':
                    switch (this.tipo)
                    {
                        case 'd':
                            retorno = (this.fecha_sel.getDate() - 1);
                            break;
                        case 's':
                            retorno = (this.fecha_sel.getDate() - 7);
                            break;
                        case 'm':
                            retorno = (this.fecha_sel.getDate() - 30);
                            break;
                    }

                    break;
                case '+':
                    switch (this.tipo)
                    {
                        case 'd':
                            retorno = (this.fecha_sel.getDate() + 1);
                            break;
                        case 's':
                            retorno = (this.fecha_sel.getDate() + 7);
                            break;
                        case 'm':
                            retorno = (this.fecha_sel.getDate() + 30);
                            break;
                    }

                    break;
            }

            return retorno;
        },
        generarMes: function() {
            var i, j, condicion, fecha_tmp;

            this.mes = [];

            for (i = 0; i < 6; i++)
            {
                this.mes[i] = [];

                for (j = 0; j < 7; j++)
                {
                    this.mes[i][j] = {
                        dia: '',
                        fecha: ''
                    };
                }
            }

            for (i = 0; i < 31; i++)
            {
                fecha_tmp = new Date(this.fecha_sel.getFullYear(), 
                this.fecha_sel.getMonth(), (i + 1));

                condicion = fecha_tmp.getMonth() != this.fecha_sel.getMonth();

                if (condicion) break;

                this.cargarDiaMes(fecha_tmp);
            }
        },
        cargarDiaMes: function(fecha) {
            // fecha: objeto Date()

            var dia = fecha.getDate().toString(), i, j;
            var condicion;

            if (dia.length < 2) dia = ' ' + dia;

            for (i = 0; i < 6; i++)
            {
                condicion = this.mes[i][6].fecha !== '';

                if (condicion) continue;
               
                condicion = this.mes[i][fecha.getDay()].fecha === '';

                if (condicion)
                {
                    this.mes[i][fecha.getDay()].dia = dia;
                    
                    this.mes[i][fecha.getDay()].fecha = 
                    this.ofechas.convertirFechaYmd(fecha, '-');

                    break;
                }
            }
        },
        inicio: function() {
            this.generarTituloDia();
            this.generarSemana();
            this.generarMes();
            this.generarTituloHorario();
        }
    },
    mounted: function() {
        this.inicio();
    },
    template: '<div>' +
    '<div class="w3-row w3-margin-bottom">' +
    '   <div class="w3-third">' +
    '       <div class="w3-bar">' +
    '           <a class="w3-button w3-small w3-border" v-on:click="tipo = \'d\'" ' +
    '           v-bind:class="(tipo == \'d\') ? claseboton : \'\'">Dia</a>' +
    '           <a class="w3-button w3-small w3-border" v-on:click="tipo = \'s\'" ' +
    '           v-bind:class="(tipo == \'s\') ? claseboton : \'\'">Semana</a>' +
    '           <a class="w3-button w3-small w3-border" v-on:click="tipo = \'m\'" ' +
    '           v-bind:class="(tipo == \'m\') ? claseboton : \'\'">Mes</a>' +
    '       </div> ' +
    '   </div>' +
    '   <div class="w3-third">&nbsp;</div>' +
    '   <div class="w3-third">' +
    '       <div class="w3-bar">' +
    '           <a class="w3-button w3-small w3-border" ' +
    '           v-bind:class="(ir == \'ant\') ? claseboton : \'\'" ' +
    '           v-on:click="cambiarFecha(\'-\')">' +
    '               <i class="fa fa-angle-left"></i>' +
    '           </a>' +
    '           <a class="w3-button w3-small w3-border" ' +
    '           v-bind:class="(ir == \'hoy\') ? claseboton : \'\'" ' +
    '           v-on:click="cambiarFecha(\'*\')">Hoy</a>' +
    '           <a class="w3-button w3-small w3-border" ' +
    '           v-bind:class="(ir == \'sig\') ? claseboton : \'\'" ' +
    '           v-on:click="cambiarFecha(\'+\')">' +
    '               <i class="fa fa-angle-right"></i>' +
    '           </a>' +
    '       </div> ' +
    '   </div>' +
    '</div>' + 
    '<div class="w3-responsive">' +
    '   <table class="w3-table w3-striped w3-bordered w3-hoverable" v-show="tipo == \'d\'">' +
    '       <thead>' +
    '           <tr v-bind:class="clasehora">' +
    '               <th colspan="3" class="w3-center">{{ titulo_horario }}</th>' +
    '           </tr>' +
    '           <tr v-bind:class="clasehora">' +
    '               <th colspan="3" class="w3-center">{{ titulo_dia }}</th>' +
    '           </tr>' +
    '       </thead>' +
    '       <tbody>' +
    '           <template v-for="hora in rango">' +
    '               <tr>' +
    '                   <td rowspan="4" class="w3-xlarge w3-center" style="width: 11%; padding-top: 10%;"' +
    '                   v-bind:class="clasehora">{{ hora }}</td>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">00</td>' +
    '                   <td>' +
    '                       {{ buscarEvento(ofechas.convertirFechaYmd(fecha_sel, \'-\'), (hora + \':00\'), \'d\') }}' +
    '                   </td>' +
    '               </tr>' +
    '               <tr>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">15</td>' +
    '                   <td>' +
    '                       {{ buscarEvento(ofechas.convertirFechaYmd(fecha_sel, \'-\'), (hora + \':15\'), \'d\') }}' +
    '                   </td>' +
    '               </tr>' +
    '               <tr>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">30</td>' +
    '                   <td>' +
    '                       {{ buscarEvento(ofechas.convertirFechaYmd(fecha_sel, \'-\'), (hora + \':30\'), \'d\') }}' +
    '                   </td>' +
    '               </tr>' +
    '               <tr>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">45</td>' +
    '                   <td>' +
    '                       {{ buscarEvento(ofechas.convertirFechaYmd(fecha_sel, \'-\'), (hora + \':45\'), \'d\') }}' +
    '                   </td>' +
    '               </tr>' +
    '           </template>' +
    '       </tbody>' +
    '   </table>' +
    '   <table class="w3-table w3-striped w3-bordered w3-hoverable" v-show="tipo == \'s\'">' +
    '       <thead>' +
    '           <tr v-bind:class="clasehora">' +
    '               <th colspan="9" class="w3-center">{{ titulo_horario }}</th>' +
    '           </tr>' +
    '           <tr v-bind:class="clasehora">' +
    '               <th colspan="2">&nbsp;</th>' +
    '               <th class="w3-center" v-for="item in semana">{{ item.dia }}</th>' +
    '           </tr>' +
    '       </thead>' +
    '       <tbody>' +
    '           <template v-for="hora in rango">' +
    '               <tr>' +
    '                   <td rowspan="4" class="w3-xlarge w3-center" style="width: 11%; padding-top: 10%;"' +
    '                   v-bind:class="clasehora">{{ hora }}</td>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">00</td>' +
    '                   <td class="w3-center" v-for="item in semana">' +
    '                       <a style="cursor:pointer;" ' +
    '                       v-if="buscarEvento(item.fecha, (hora + \':00\'), \'s\') == \'*\'" ' +
    '                       v-on:click="seleccionarDia(item.fecha)">' +
    '                           <i class="fa fa-circle-o"></i>' +
    '                       </a>' +
    '                       <span v-else>&nbsp;</span>' +
    '                   </td>' +
    '               </tr>' +
    '               <tr>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">15</td>' +
    '                   <td class="w3-center" v-for="item in semana">' +
    '                       <a style="cursor:pointer;" ' +
    '                       v-if="buscarEvento(item.fecha, (hora + \':15\'), \'s\') == \'*\'" ' +
    '                       v-on:click="seleccionarDia(item.fecha)">' +
    '                           <i class="fa fa-circle-o"></i>' +
    '                       </a>' +
    '                       <span v-else>&nbsp;</span>' +
    '                   </td>' +
    '               </tr>' +
    '               <tr>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">30</td>' +
    '                   <td class="w3-center" v-for="item in semana">' +
    '                       <a style="cursor:pointer;" ' +
    '                       v-if="buscarEvento(item.fecha, (hora + \':30\'), \'s\') == \'*\'" ' +
    '                       v-on:click="seleccionarDia(item.fecha)">' +
    '                           <i class="fa fa-circle-o"></i>' +
    '                       </a>' +
    '                       <span v-else>&nbsp;</span>' +
    '                   </td>' +
    '               </tr>' +
    '               <tr>' +
    '                   <td class="w3-center" v-bind:class="clasehora" style="width: 9%;">45</td>' +
    '                   <td class="w3-center" v-for="item in semana">' +
    '                       <a style="cursor:pointer;" ' +
    '                       v-if="buscarEvento(item.fecha, (hora + \':45\'), \'s\') == \'*\'" ' +
    '                       v-on:click="seleccionarDia(item.fecha)">' +
    '                           <i class="fa fa-circle-o"></i>' +
    '                       </a>' +
    '                       <span v-else>&nbsp;</span>' +
    '                   </td>' +
    '               </tr>' +
    '           </template>' +
    '       </tbody>' +
    '   </table>' +
    '   <table class="w3-table w3-striped w3-bordered w3-hoverable" v-show="tipo == \'m\'">' +
    '       <thead>' +
    '           <tr v-bind:class="clasehora">' +
    '               <th colspan="7" class="w3-center">{{ titulo_horario }}</th>' +
    '           </tr>' +
    '           <tr v-bind:class="clasehora">' +
    '               <th class="w3-center" v-for="item in semana">{{ item.dia.substring(0, 2) }}</th>' +
    '           </tr>' +
    '       </thead>' +
    '       <tbody>' +
    '           <template v-for="item in mes">' +
    '               <tr>' +
    '                   <td class="w3-right-align w3-large" ' +
    '                   v-for="d in item">' +
    '                       <a style="cursor:pointer;" ' +
    '                       v-if="buscarEvento(d.fecha, \'\', \'m\') == \'*\'" ' +
    '                       v-on:click="seleccionarDia(d.fecha)">' +
    '                          ({{ d.dia }})' +
    '                       </a>' +
    '                       <span v-else>' +
    '                           {{ (d.dia == \'\') ? \'&nbsp;\' : d.dia }}' +
    '                       </span>' +
    '                   </td>' +
    '               </tr>' +
    '           </template>' +
    '       </tbody>' +
    '   </table>' +
    '</div>' +
    '</div>'
});