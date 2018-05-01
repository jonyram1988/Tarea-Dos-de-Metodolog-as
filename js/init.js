$(function() {
	// variables globales
	var dateToday = new Date();
	var tableRow = '';
	var tableDiv = $('#tableDiv');
	// mostrar la fecha de hoy
	$('strong.dateToday').html(dateToday.getDate() + '/' + (dateToday.getMonth()+1) + '/' + dateToday.getFullYear())
	// get ajax farmacias de turno
	$.ajax({
		url: 'http://farmanet.minsal.cl/index.php/ws/getLocalesTurnos',
		type: 'GET',
		dataType: 'json'
	}).done(function(data, textStatus, errorThrown) {
		if(textStatus === 'success'){
			// recorrer todo los datos para mostrarlos en la tabla
			$.each(data, function(index, row) {
				// crear html con fila
				tableRow += '<tr>';
				tableRow += '<td>'+row.local_nombre+'</td>';
				tableRow += '<td>'+row.local_direccion+'</td>';
				tableRow += '<td>'+row.localidad_nombre+'</td>';
				tableRow += '<td>'+row.funcionamiento_hora_apertura+' PM</td>';
				tableRow += '<td>'+row.funcionamiento_hora_cierre+' AM</td>';
				tableRow += '<td>'+row.local_telefono+'</td>';
				tableRow += '<td><a href="https://www.google.com/maps/search/'+row.local_lat+','+row.local_lng+'" target="_blank" title="Ver Ubicación de la Farmacia en Google Maps">Ver Mapa</a></td>';
				tableRow += '</tr>';
			});
			// agregar al dom la informacion de la farmacia
			tableDiv.find('tbody').append(tableRow);
		}
	}).fail(function(response, textStatus, errorThrown) {
	});
});