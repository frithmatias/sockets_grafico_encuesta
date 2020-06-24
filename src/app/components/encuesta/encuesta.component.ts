import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 4', 'Pregunta 4'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] =[
    {data: [ 65, 59, 80, 81 ], label: 'Entrevistados'}
  ];

  constructor(private http: HttpClient, public wsService: WebsocketService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/grafica/encuesta').subscribe((data: any) => {
      console.log(data);
      this.barChartData = data;
    });
    this.escucharSocket();

  }
  escucharSocket() {
    this.wsService.listen('cambio-data-encuesta').subscribe((data: any) => {
      console.log(data);
      this.barChartData = data;
    });
  }
   

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

}
