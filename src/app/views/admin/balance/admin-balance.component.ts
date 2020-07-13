import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestService } from '../../../shared/services/rest.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
	selector: 'app-admin-wallet-balance',
	templateUrl: './admin-balance.component.html',
	styleUrls: ['./admin-balance.component.css']
})
export class AdminBalanceComponent implements OnInit {
    entryChartPie: EChartOption; 
    formFilter: FormGroup;
    balanceHistory: [];
    statusList;
    transactionList;
    movimentationList;
    balance;
    entrada;
    seeGraphic;
    saida;
	constructor(private restService: RestService, private fb: FormBuilder) { }

	ngOnInit() {
        this.entryChartPie = this.defaultConfig;
        this.statusList = ["Confirmado", "Pendente", "Rejeitado"];
        this.transactionList = ["Cadastro","Cashback", "Indicação", "Saque"];
        this. movimentationList = ["Entrada", "Saída"];
        this.formFilter = this.fb.group({
            status: [''],
            transactionType: [''],
            movimentationType: ['']  
        });
        this.findValues();
    }

    cleanFilter() {
        let clean = {
            status: null,
            transactionType: null,
            movimentationType: null
        }
        this.formFilter.setValue(clean);
    }

    findValues() {
        this.resetTotal();
        this.seeGraphic = false;
        let body = this.getBodyRequest();
        this.restService.callApi("getBalance", body).then(r => {
            this.balance = r["body"];
            this.calc();
        });
        this.restService.callApi("getHistoryBalance", body).then(r => {
            this.balanceHistory = r["body"];
        });
    }
    getBodyRequest() {
        let body = {
            status: this.formFilter.value["status"],
            transactionType: this.formFilter.value["transactionType"],
            movimentationType: this.formFilter.value["movimentationType"]
        }
        if (!body["status"]){
            delete body["status"];
        }
        if (!body["transactionType"]){
            delete body["transactionType"];
        }
        if (!body["movimentationType"]){
            delete body["movimentationType"];
        }
        return body;
    }

    resetTotal() {
        this.saida = {
            Confirmado: 0,
            Pendente: 0,
            Rejeitado: 0,
            total: 0
        }
        this.entrada = {
            Confirmado: 0,
            Pendente: 0,
            Rejeitado: 0,
            total: 0
        }
    }

    calc() {
        this.balance.forEach(r => {
            if(r["movimentationType"] == "Saída") {
                this.saida[r["status"]] += r["vlrTotal"];
                this.saida["total"] += r["vlrTotal"];
            }
            if(r["movimentationType"] == "Entrada") {
                this.entrada[r["status"]] += r["vlrTotal"];
                this.entrada["total"] += r["vlrTotal"];
            }
        });
        this.mountChart();
    }

    mountChart() {
        let data = [];
        this.balance.forEach(b => {
            let idx = -1;
            data.find( (r, i) => { 
                if ( r["name"] == b["transactionType"] ) {
                    idx = i;
                    return true;
                }
            });
            if (idx >= 0) {
                data[idx]["value"] += b["vlrTotal"];
            } else {
                data.push({
                    name: b["transactionType"],
                    value: b["vlrTotal"]
                });
            }
        });
        this.entryChartPie.series[0]["data"] = data;
        this.seeGraphic = data.length > 0;
    }
    
    defaultConfig = {
        color: ['#62549c', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
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
