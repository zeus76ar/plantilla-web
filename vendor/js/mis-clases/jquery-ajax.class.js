/*
version: 17.08
subversion: 08
autor: Ariel Balmaceda
depende de nprogress y jquery
*/
function jqueryAjax(){
    this.prepararId = function (id_objeto){
        if (id_objeto.substring(0,1) != '#') id_objeto = '#' + id_objeto;
        
        return id_objeto;
    }

    this.enviarDatos = function (id_form, nom_funcion){
        id_form = this.prepararId(id_form);
        
        var url = $(id_form).attr("action");
        
        NProgress.start();
        
        var request = $.ajax({
            url: url,
            method: "POST",
            data: $(id_form).serializeArray()
        });
        
        request.done(function(data){
            NProgress.done();
            
            nom_funcion(data);
        });
        
        request.fail(function(jqXHR, textStatus){
            NProgress.done();
            
            console.log("enviarDatos() - error: " + textStatus);
        });
    }

    this.enviarDatosGet = function(url, param, nom_funcion){
        NProgress.start();
        
        var request = $.ajax({
            url: url,
            method: "GET",
            data: param
        });
        
        request.done(function(data){
            NProgress.done();

            nom_funcion(data);
        });
        
        request.fail(function(jqXHR, textStatus){
            NProgress.done();
            
            console.log("enviarDatosGet() - error: " + textStatus);
        });
    }

    this.enviarDatosPostSinForm = function(url, param, nom_funcion){
        NProgress.start();

        var request = $.ajax({
            url: url,
            method: "POST",
            data: param
        });
        
        request.done(function(data){
            NProgress.done();

            nom_funcion(data);
        });
        
        request.fail(function(jqXHR, textStatus){
            NProgress.done();
            
            console.log("enviarDatosPostSinForm() - error: " + textStatus);
        });
    }

    this.cargarContenido = function(url, destino, nom_funcion){
        NProgress.start();

        var request = $.ajax({
            url: url,
            method: "GET"
        });
        
        request.done(function(data){
            NProgress.done();

            $(destino).html('');
		    $(destino).html(data);

            nom_funcion(data);
        });
        
        request.fail(function(jqXHR, textStatus){
            NProgress.done();
            
            console.log("cargarContenido() - error: " + textStatus);
        });
    }

    this.enviarDatosConArchivos = function (id_form, nom_funcion){
        NProgress.start();

        //var formData = new FormData($(".formulario")[0]);
        var formData = new FormData(document.getElementById(id_form));
        var url = $(this.prepararId(id_form)).attr("action");

        var request = $.ajax({
            url: url,
            method: "POST",
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false
        });
        
        request.done(function(data){
            NProgress.done();

            nom_funcion(data);
        });
        
        request.fail(function(jqXHR, textStatus){
            NProgress.done();
            
            console.log("enviarDatosConArchivos() - error: " + textStatus);
        });
    }
}
