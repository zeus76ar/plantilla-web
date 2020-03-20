// main
var app = new Vue({
    el: '#app',
    data: {
        barras: {
            mostrar: true,
            tipo: 'bar',
            etiquetas: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datos: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
            extras: {
                responsive: true,
				title: {
					display: true,
					text: 'Bar Chart'
				},
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        },
        torta: {
            mostrar: true,
            tipo: 'pie',
            etiquetas: ['Red', 'Orange', 'Yellow'],
            datos: [{
                data: [100, 200, 50],
                label: 'Datos',
                backgroundColor: [
                    'rgba(192, 57, 43, 0.7)',
                    'rgba(211, 84, 0, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ]
            }],
            extras: {
                responsive: true,
				title: {
					display: true,
					text: 'Pie Chart'
				}
            }
        },
        dona: {
            mostrar: true,
            tipo: 'doughnut',
            etiquetas: ['Red', 'Orange', 'Yellow'],
            datos: [{
                data: [100, 200, 50],
                label: 'Datos',
                backgroundColor: [
                    'rgba(192, 57, 43, 0.7)',
                    'rgba(211, 84, 0, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ]
            }],
            extras: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Doughnut Chart'
                }
            }
        },
        linea: {
            mostrar: true,
            tipo: 'line',
            etiquetas: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datos: [{
                label: 'My First dataset',
                backgroundColor:'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                data: [-100, -60, -20, 10, 40, 70, 80]
            },{
                label: 'My Second dataset',
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
                data: [100, 60, 20, -10, -40, -70, -80]
            }],
            extras: {
                responsive: true,
				title: {
					display: true,
					text: 'Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}   
            }
        },
    }
});