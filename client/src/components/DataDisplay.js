import React, { Component } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Moment from 'moment';

export default class DataDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readSubmissions: [],
            totalSubmissions: [],
            intervalIsSet: false,
            chartOptions: {
                chart: {
                    zoomType: 'x',
                    type: 'spline',
                    height: '60%',
                    backgroundColor: null
                },
                title: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Date',
                        style: {
                            color: 'white',
                            fontSize: '12px'
                        }
                    }
                },
                yAxis: {
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
                    },
                    min: 0,
                    title: {
                        text: 'Messages',
                        style: {
                            color: 'white',
                            fontSize: '12px'
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'white',
                        fontSize: '12px'
                    }
                },
                credits: {
                    enabled: false
                },
                colors: ['#6CF', '#39F', '#06C', '#036', '#000'],

                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                }
            }
        };
    };

    formatData(result) {
        this.setState({ data: [] });
        let dates = {};
        let data = [];

        result.forEach((r) => {
            if (!dates[Moment(r.createdAt).format('MM/DD/YYYY')]) dates[Moment(r.createdAt).format('MM/DD/YYYY')] = 1;
            else dates[Moment(r.createdAt).format('MM/DD/YYYY')] += 1;
        });

        for (var d in dates) {
            var date = [];
            date[0] = Moment.utc(d).valueOf();
            date[1] = dates[d];
            data.push(date);
        }

        return data;
    }

    formatTotalSubmissions(result) {
        this.setState({ totalSubmissions: this.formatData(result) });
    }

    formatReadSubmissions(result) {
        let readSubmissions = result.filter(r => r.readBy);

        this.setState({ readSubmissions: this.formatData(readSubmissions) });
    }

    getDataFromDb = () => {
        fetch("http://localhost:3001/api/getAllData")
            .then(data => data.json())
            .then(res => {
                this.formatTotalSubmissions(res.data);
                this.formatReadSubmissions(res.data);
                this.updateSeries();
            });
    };

    updateSeries = () => {
        this.setState({
            chartOptions: {
                series: [{
                        name: 'Total Submissions',
                        data: this.state.totalSubmissions
                    },
                    {
                        name: 'Read Submissions',
                        data: this.state.readSubmissions
                    }
                ]
            }
        })
    }

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 10000);
            this.setState({ intervalIsSet: interval });
        }
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    render() {
        return (
            <div className="highchart col-md-8">
                <HighchartsReact highcharts={Highcharts} allowChartUpdate="true" options={this.state.chartOptions} />
            </div>
        );
    };
}