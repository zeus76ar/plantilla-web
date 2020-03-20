var html5_editor_opt= {
    // new VueHtml5Editor(options)
    // global component name
    name: "vue-html5-editor",
    // if set true,will append module name to toolbar after icon
    showModuleName: false,
    // class，font-awesome
    // custom icon class of built-in modules,default using font-awesome
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // config image module
    image: {
        // max file size
        sizeLimit: 512 * 1024,
        // base64
        // upload config,default null and convert image to base64
        upload: {
            url: null,
            headers: {},
            params: {},
            fieldName: {}
        },
        // localResizeIMG null
        // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
        // set null to disable compression
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // handle response data，return image url
        uploadHandler(responseText){
            //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    // (en-us),（zh-cn）
    //default en-us, en-us and zh-cn are built-in
    language: "es-ar",
    i18n: {
        //specify your language here
        "es-ar": {
            "align": "alinear",
            "image": "imagen",
            "list": "lista",
            "link": "vinculo",
            "unlink": "desvincular",
            "table": "tabla",
            "font": "fuente",
            "full screen": "pantalla completa",
            "text": "texto",
            "eraser": "borrador",
            "info": "info",
            "color": "color",
            "please enter a url": "porfavor, ingresa una url",
            "create link": "crear",
            "bold": "negrita",
            "italic": "cursiva",
            "underline": "subrayado",
            "strike through": "tachado",
            "subscript": "subíndice",
            "superscript": "superindice",
            "heading": "cabecera",
            "font name": "nombre fuente",
            "font size": "tamaño fuente",
            "left justify": "justificar izquierda",
            "center justify": "justificar centro",
            "right justify": "justificar derecha",
            "ordered list": "lista ordenada",
            "unordered list": "lista desordenada",
            "fore color": "color frente",
            "background color": "color fondo",
            "row count": "filas",
            "column count": "columnas",
            "save": "guardar",
            "upload": "subir",
            "progress": "progreso",
            "unknown": "desconocido",
            "please wait": "porfavor espera...",
            "error": "error",
            "abort": "abortar",
            "reset": "reiniciar",
            "hr": "regla horizontal",
            "undo": "deshacer",
            "line height": "altura linea",
            "exceed size limit": "limite de tamaño excedido"
        }
    },
    // the modules you don't want
    hiddenModules: [],
    // keep only the modules you want and customize the order.
    // can be used with hiddenModules together
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen",
        "info",
    ],
    // extended modules
    modules: {
        //omit,reference to source code of build-in modules
    }
}
