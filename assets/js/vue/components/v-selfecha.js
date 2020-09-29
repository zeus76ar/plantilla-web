Vue.component('vue-selfecha', {
    model: {
        prop: 'fecha',
        event: 'modificado'
    },
    props: {
        anios: {
            type: Array,
            required: false
        },
        mostrar_mes_corto: {
            type: Boolean,
            required: true
        },
        fecha: {
            // 'dd/mm/aaaa', 'dd-mm-yyyy'
            type: String,
            required: true
        },
        altura_max: {
            type: Number,
            default: 160
        }
    },
    data: function() {
        return {
            xanios:[],
            anio: 0,
            meses: [{ id: 1, mes: 'Enero', corto: 'Ene' }, 
            { id: 2, mes: 'Febrero', corto: 'Feb' },
            { id: 3, mes: 'Marzo', corto: 'Mar' }, { id: 4, mes: 'Abril', corto: 'Abr' },
            { id: 5, mes: 'Mayo', corto: 'May' }, { id: 6, mes: 'Junio', corto: 'Jun' },
            { id: 7, mes: 'Julio', corto: 'Jul' },{ id: 8, mes: 'Agosto', corto: 'Ago' },
            { id: 9, mes: 'Septiembre', corto: 'Sep' }, { id: 10, mes: 'Octubre', corto: 'Oct' },
            { id: 11, mes: 'Noviembre', corto: 'Nov' },{ id: 12, mes: 'Diciembre', corto: 'Dic' }],
            mes: {},
            dia: '01',
            ofecha: new Date()
        }
    },
    computed: {
        dias: function() {
            var retorno = [];
            var limite = this.diaMaxPorMes(this.anio, this.mes.id);
            var valor;

            for (i = 1; i <= limite; i++)
            {
                valor = i.toString();

                if (valor.length < 2) valor = ( '0' + valor );

                retorno.push(valor);
            }

            return retorno;
        }
    },
    watch: {
        anio: function(newval, oldval) {
            if ( oldval != 0 ) this.validarDia();

            this.formatearFecha();
        },
        mes: function(newval, oldval) {
            if ( typeof oldval.id != 'undefined' ) this.validarDia();

            this.formatearFecha();
        },
        dia: function(newval, oldval) {
            this.formatearFecha();
        }
    },
    methods: {
        diaMaxPorMes: function (anio, mes) {
            // anio: integer - año de la fecha buscada
            // mes: integer - 1 (Enero), 2 (Febrero) ... 12 (Diciembre)

            var dias = [31, (((anio % 4) == 0) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var ind = mes - 1;

            return dias[ind];
        },
        asignarAnio: function() {
            var anio = this.ofecha.getFullYear();
            var valor;

            if ( this.xanios.indexOf(anio) >= 0 )
            {
                valor = anio;
            }
            else
            {
                var ind = this.xanios.length - 1;

                valor = this.xanios[ind];
            }

            this.anio = valor;
        },
        asignarMes: function() {
            var mes = this.ofecha.getMonth();

            this.mes = this.meses[mes];
        },
        asignarDia: function() {
            var dia = this.ofecha.getDate().toString();
            
            if (dia.length < 2) dia = ( '0' + dia );

            this.dia = dia;
        },
        revisarFecha: function() {
            if (this.fecha === '') return;

            var partes = this.fecha.split('/');
            var mensaje = '';

            if ( partes.length != 3 )
            {
                partes = this.fecha.split('-');
            }

            if (partes.length != 3) {
                mensaje = 'Error: La Fecha no tiene un formato valido: dd/mm/yyyy' +
                ' o dd-mm-yyyy';

                console.log(mensaje);

                return;
            }

            this.ofecha = new Date(partes[2], (partes[1] - 1), partes[0]);

            if ( this.xanios.indexOf( this.ofecha.getFullYear() ) < 0 )
            {
                this.ofecha = new Date();

                mensaje = 'Error: El año de la Fecha no coincide con' +
                ' los años pasados como parametro.';

                console.log(mensaje);
            }
        },
        revisarAnios: function() {
            var condicion = ( this.anios.length < 1 );

            if ( condicion )
            {
                this.xanios = [];
                this.xanios.push( this.ofecha.getFullYear() );
            }
            else
            {
                this.xanios = this.anios;
            }
        },
        formatearFecha: function() {
            var retorno = '  /  /    ';

            if ( typeof this.mes.id != 'undefined' )
            {
                var mes = this.mes.id.toString();
                
                if (mes.length < 2) mes = ( '0' + mes );

                retorno = this.dia + '/' + mes + '/' + this.anio;
            }

            this.$emit('modificado', retorno);
        },
        validarDia: function() {
            var diamaxmes = this.diaMaxPorMes( this.anio, this.mes.id );
            var condicion = parseInt(this.dia) > diamaxmes;

            if ( condicion )
            {
                diamaxmes = diamaxmes.toString();
                
                if (diamaxmes.length < 2) diamaxmes = ( '0' + diamaxmes );

                this.dia = diamaxmes;
            }
        }

    },
    mounted: function() {
        this.revisarAnios();
        this.revisarFecha();
        this.asignarAnio();
        this.asignarMes();
        this.asignarDia();
    },
    template: '<div class="w3-row">' +
    '<div class="w3-third">' +
    '    <vue-multiselect v-model="dia" ' +
    '    v-bind:options="dias" ' +
    '    v-bind:searchable="true" ' +
    '    v-bind:close-on-select="true" ' +
    '    v-bind:allow-empty="false" ' +
    '    v-bind:show-labels="false" ' +
    '    v-bind:maxHeight="altura_max" ' +
    '    placeholder="Dia..."' +
    '    name="dia">' +
    '        <span slot="noResult">No hay concidencias.</span>' +
    '        <span slot="noOptions">Sin datos.</span>' +
    '    </vue-multiselect>' +
    '</div>' +
    '<div class="w3-third">' +
    '    <vue-multiselect v-model="mes" ' +
    '    track-by="id" ' +
    '    v-bind:label="( mostrar_mes_corto ) ? \'corto\' : \'mes\' "' +
    '    v-bind:options="meses" ' +
    '    v-bind:searchable="true" ' +
    '    v-bind:close-on-select="true" ' +
    '    v-bind:allow-empty="false" ' +
    '    v-bind:show-labels="false" ' + 
    '    v-bind:maxHeight="altura_max" ' +
    '    placeholder="Mes..."' +
    '    name="mes">' +
    '        <span slot="noResult">No hay concidencias.</span>' +
    '        <span slot="noOptions">Sin datos.</span>' +
    '    </vue-multiselect>' +
    '</div>' +
    '<div class="w3-third">' +
    '    <vue-multiselect v-model="anio" ' +
    '    v-bind:options="xanios" ' +
    '    v-bind:searchable="true" ' +
    '    v-bind:close-on-select="true" ' +
    '    v-bind:allow-empty="false" ' +
    '    v-bind:show-labels="false" ' +
    '    v-bind:maxHeight="altura_max" ' +
    '    placeholder="Año..."' +
    '    name="anio">' +
    '        <span slot="noResult">No hay concidencias.</span>' +
    '        <span slot="noOptions">Sin datos.</span>' +
    '    </vue-multiselect>' +
    '</div>' +
    '</div>'
});