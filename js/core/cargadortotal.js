$(document).on("ready",inicio);
function inicio(){
	var menu=$("ul.nav-stacked li.funo > a");
	menu.toggle(function(e) {
         $(this).parent().find('ul.oculto').slideDown("fast");
    },function(e) {
         $(this).parent().find('ul.oculto').slideUp("fast");
    });
	
	$("ul.nav-stacked li.funo.active > a").click();
	
	$(document).ajaxStop(function() {
	
    }).ajaxSuccess(function(event, XMLHttpRequest, ajaxOptions) {
        $("input[type=date]").datepicker({changeMonth: true,changeYear: true,yearRange:"c-100:c+10"});
		
		
		/*$('form.formulario').on('submit', function(e) {
			alert("asd");
			e.preventDefault(); // prevent native submit
			$(this).ajaxSubmit({
				target: '#resultadoformulario'
			})
		});*/
    });
	$(document).on('submit','form.formulario', function(e) {
		e.preventDefault(); // prevent native submit
    	$(this).ajaxSubmit({
        	target: '#respuestaformulario'
    	})
		$('html, body').animate({scrollTop:$("#respuestaformulario").position().top-200},300);
		 
	});
	
	$(document).on('click','.enlacepost',function(e){
		e.preventDefault();
		var dest=$(this).attr("href")!=""?$(this).attr("href"):$(this).attr("data-destino");
		var mensaje=$(this).attr("data-mensaje");
		var resp=$(this).attr("data-respuesta");
		var campos=$(this).attr("data-campos");
		if(mensaje!=""){
			if(confirm(mensaje)){
				$.post(dest,campos,function(data){$(resp).html(data)})
			}
		}else{
			$.post(dest,campos,function(data){$(resp).html(data)})
		}
	});
	$(document).on('click','#actualizarventana',function(e){
		location.reload();	
	});
	$(document).on('click','#exportarexcel',function(e){
		e.preventDefault();
		var html='<table border="1">'+$(this).next("table").html()+'</table>';
		//alert(datos);
		while (html.indexOf('á') != -1) html = html.replace('á', '&aacute;');
  while (html.indexOf('é') != -1) html = html.replace('é', '&eacute;');
  while (html.indexOf('í') != -1) html = html.replace('í', '&iacute;');
  while (html.indexOf('ó') != -1) html = html.replace('ó', '&oacute;');
  while (html.indexOf('ú') != -1) html = html.replace('ú', '&uacute;');
  while (html.indexOf('º') != -1) html = html.replace('º', '&ordm;');
		/*window.open('data:application/vnd.ms-excel;Content-Disposition:attachment;file=export_filename.xls;name=hebe.xls,' +encodeURIComponent(html));
    e.preventDefault();
		//$.post(folder+"exportar/excel.php",{'dataexcel':datos},function(data){$("#respuestaexcel").html(data)});		*/
		//getting values of current time for generating the file name
        var dt = new Date();
        var day = dt.getDate();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();
        var hour = dt.getHours();
        var mins = dt.getMinutes();
        var postfix = day + "." + month + "." + year + "_" + hour + "." + mins;
        //creating a temporary HTML link element (they support setting file names)
        var a = document.createElement('a');
        //getting data from our div that contains the HTML table
        var data_type = 'data:application/vnd.ms-excel';
       // var table_div = $(this).next("table");
        var table_html = html.replace(/ /g, '%20');
        a.href = data_type + ', ' + table_html;
        //setting the file name
        a.download = 'tabla_exportada_' + postfix + '.xls';
        //triggering the function
        a.click();
        //just in case, prevent default behaviour
        e.preventDefault();
	});
}
