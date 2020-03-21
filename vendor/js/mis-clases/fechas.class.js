/*
version: 19.06
subversion: 10
autor: Ariel Balmaceda
*/

function Fechas ()
{
    // metodos
    this.generarMeses = function () 
    {
        var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        return meses;
    }
    
    this.generarDias = function () 
    {
        var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves",
            "Viernes", "Sabado"
        ];
    
        return dias;
    }
    
    this.generarDiaMaxPorMes = function (anio)
    {
        var dias = [31, (((anio % 4) == 0) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
        return dias;
    }
    
    this.obtenerNombreMes = function (num_mes)
    {
        // num_mes: numero entre 1-12
        var meses = this.generarMeses();
    
        return meses[(num_mes - 1)];
    }
    
    this.obtenerNombreDia = function (num_dia)
    {
        // num_dia: numero entre 1-7 o 0-6
        var dias = this.generarDias();
    
        if (num_dia == 7) num_dia = 0;
    
        return dias[num_dia];
    }
    
    this.obtenerDiaMaxMes = function (num_mes, anio)
    {
        // num_mes: numero entre 1-12
        var dias = this.generarDiaMaxPorMes(anio);
    
        return dias[(num_mes - 1)];
    }
    
    this.obtenerNumeroDiaSemana = function (fecha) 
    {
        /*
        fecha: string - formato 'dd/mm/yyyy'
        devuelve el numero del dia de la semana
        para una fecha dada.
        retorno: 0(Domingo) - 1, 2, ..., 6 (Lunes, ..., Sabado)
        */
        var partes = fecha.split('/');
    
        var xfecha = new Date(parseInt(partes[2]), (parseInt(partes[1]) - 1),
            parseInt(partes[0]), 0, 0, 0);
    
        var dia_semana = xfecha.getDay();
    
        return dia_semana;
    }
    
    this.formatearFechaLarga = function (fecha) 
    {
        /*
        fecha: string - formato 'dd/mm/yyyy'
        */
        var dia_semana = this.obtenerNumeroDiaSemana(fecha);
        var partes = fecha.split('/');
    
        var fecha_larga = this.obtenerNombreDia(dia_semana) + ', ' + partes[0] +
            ' de ' + this.obtenerNombreMes(partes[1]) + ' de ' + partes[2];
    
        return fecha_larga;
    }
    
    this.formatearFechaDmy = function (fecha)
    {
        // fecha: objeto Date()

        return this.convertirFecha(fecha, '/', 'dma')
    }

    this.convertirFechaYmd = function (fecha, separador)
    {
        //fecha: objeto Date()
        //separador: string ('-', '/', '.')

        return this.convertirFecha(fecha, separador, 'amd');
    }

    this.convertirFechaDmy = function (fecha, separador)
    {
        //fecha: objeto Date()
        //separador: string ('-', '/', '.')

        return this.convertirFecha(fecha, separador, 'dma');
    }

    this.fechaEsHoy = function (fecha, separador) 
    {
        //fecha: string('aaaa-mm-dd', 'aaaa/mm/dd')
        //separador: string ('-', '/', '.')
        
        var retorno = false;
        var hoy = new Date(), retorno = false;
        var hoy_amd = this.convertirFechaYmd(hoy, separador);
    
        if (hoy_amd == fecha) retorno = true;
    
        return retorno;
    }

    this.convertirFecha = function(fecha, separador, opcion) {
        //fecha: objeto Date()
        //separador: string ('-', '/', '.')
        //opcion: string ('amd', 'dma')

        var fecha_formato = '';
        var dia_fecha = fecha.getDate().toString();
        var mes_fecha = (fecha.getMonth() + 1).toString();
        var anio_fecha = fecha.getFullYear().toString();

        if (mes_fecha.length < 2) mes_fecha = '0' + mes_fecha;
    
        if (dia_fecha.length < 2) dia_fecha = '0' + dia_fecha;

        if (opcion == 'amd')
        {
            fecha_formato = anio_fecha + separador + mes_fecha + separador + dia_fecha;
        }
        else
        {
            fecha_formato = dia_fecha + separador + mes_fecha + separador + anio_fecha;
        }

        return fecha_formato;
    }
}// fin function
