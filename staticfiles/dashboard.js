document.addEventListener('DOMContentLoaded', function () {
    fetch('/dados_grafico/')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(entry => entry.Estado);
            const values = data.map(entry => entry.Ocorrencias);

            const ctx = document.getElementById('graficoBarras').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Focos de incêndio (Janeiro a outubro de 2023)',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
});
