import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestService } from '../../../shared/services/rest.service';


@Component({
	selector: 'app-wallet-balance',
	templateUrl: './wallet-balance.component.html',
	styleUrls: ['./wallet-balance.component.css']
})
export class WalletBalanceComponent implements OnInit {
    entryChartPie: EChartOption;
    userHistory: [];
    userBalance: [];
    statusBalance: {
        pendente: 0,
        confirmado: 0,
        rejeitado: 0
    };
	constructor(private restService: RestService) { }

	ngOnInit() {
        this.entryChartPie = this.defaultConfig;
        this.restService.callApi("getUserHistory").then(r => {
            this.userHistory = r["body"];
        });
        this.restService.callApi("getUserBalance").then(r => {
            this.userBalance = r["body"];
            this.mountChart();
            this.moutStatusBalance();
        });
    }

    moutStatusBalance() {
        this.userBalance.forEach(u => {
            let key = u["status"] || "";
            if (u["movimentationType"] == "Entrada") {
                this.statusBalance[key.toLowerCase()] += u["vlrTotal"];
            } else {
                this.statusBalance[key.toLowerCase()] -= u["vlrTotal"];
            }
        });
    }

    mountChart() {
        let filterBalance = this.userBalance.filter(b => { return b["movimentationType"] == "Entrada" });
        let data = [];
        filterBalance.forEach(b => {
            let idx = -1;
            data.find( (r, i) => { 
                if ( r["name"] == b["transactionType"] ) {
                    idx = i;
                    return true;
                }
            });
            if (idx > 0) {
                data[idx]["value"] += b["vlrTotal"];
            } else {
                data.push({
                    name: b["name"],
                    value: b["vlrTotal"]
                });
            }
        });
        this.entryChartPie.series["data"] = data;
    }
    
    defaultConfig = {
        color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
        tooltip: {
            show: true,
            backgroundColor: 'rgba(0, 0, 0, .8)'
        },
        xAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [{
            name: 'Entrada de LQX',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

}
