(function() {

    angular.module('main', [])
        .controller('ChartCtrl', function($http) {
            $http.get('/api/interview_by_year')
                .then(function(data) {
                    console.log(data);
                    var data = data.data;
                    var xAxis = [];
                    var series = [];
                    var series1 = [];
                    data.sort(function(a, b) {
                            return a.year - b.year
                        })
                        .forEach(function(item) {
                            xAxis.push(item.year);
                            series.push(item.count);
                            series1.push(item.count * 2);
                        })
                    $('#id_chart').highcharts({
                        chart: {
                            type: 'line'
                        },
                        xAxis: {
                            categories: xAxis,
                            title: {
                                text: 'year'
                            }
                        },
                        yAxis: [{
                            title: {
                                text: 'n'
                            },
                            opposite: true,
                            max: 100
                        }, {
                            title: {
                                text: 'd'
                            },
                            max: 200
                        }],
                        series: [{
                            name: 'year',
                            data: series,
                            yAxis: 0
                        }, {
                            name: 'year double',
                            data: series1,
                            yAxis: 1
                        }]
                    })
                });
        });
})();

