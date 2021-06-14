export function GenerateChart(ApiUrl) {
    $.ajax({
        url: `${ApiUrl}/api/vote/votes`,
        success: (data) => {
            if (data.totalCount == 0) {
                toastr.warning('Não há nenhum voto salvo');
                return;
            }
            var datasets = [];
            function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
            for (var current of data.votesPerCandidate) {
                datasets.push({
                    label: current.candidateName,
                    data: [current.percent],
                    backgroundColor: getRandomColor()
                })
            }

            new Chart($('#ChartContainer')[0].getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Resultado da votação'],
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: context => `${context.dataset.label} - ${context.formattedValue}%`
                            }
                        }
                    }
                }
            });
        },
        error: function (data) {
            toastr.error('Houve um erro ao tentar buscar os dados');
        }
    })
}