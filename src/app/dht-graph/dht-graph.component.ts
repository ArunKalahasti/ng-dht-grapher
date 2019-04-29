import { Component, OnInit, Input } from '@angular/core';
import { EspDHTService } from '../http/esp.dht.service';

import { Observable } from 'rxjs';

import { ESP_DHT_DATA_Model } from '../http/esp.dht.model';

import * as d3 from 'd3';

@Component({
  selector: 'app-dht-graph',
  templateUrl: './dht-graph.component.html',
  styleUrls: ['./dht-graph.component.scss'],
  providers: [EspDHTService]
})
export class DhtGraphComponent implements OnInit {
  @Input() server: string;

  dataObservable: Observable<ESP_DHT_DATA_Model[]>;
  options: any;
  data: any;
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Sensor Value';
  timeline = true;

  convertUnits = false;

  colorScheme = {
    domain: ['#A10A28', '#67a3fc', '#C7B42C', '#AAAAAA']
  };
  multi: any[];

  constructor(
    private espDHTService: EspDHTService
  ) { }

  ngOnInit() {
    this.dataObservable = this.espDHTService.connect(this.server);
    this.dataObservable.subscribe(this.handleData);
    this.espDHTService.initialLoad(this.server);
    this.options = {
      chart: {
        type: 'lineChart',
        interpolate: 'basis',
        useInteractiveGuideline: true,
        height: 450,
        transitionDuration: 350,
        showLegend: true,
        // pointSize: 0,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: (d) => { return d.time; },
        y: (d) => { return d.temperature; },
        xScale: d3.time.scale(),
        xAxis: {
          ticks: d3.time.seconds,
          tickFormat: (d) => {
            return d3.time.format('%H:%M:%S')(new Date(d * 1000));
          }
        },
        yAxis: {
          axisLabel: 'Gross volume',
          tickFormat: (d) => {
            if (d == null) {
              return 0;
            }
            return d3.format('.02f')(d);
          },
          axisLabelDistance: 400
        }
      }
    }

    this.data = [
      {
        key: "Cumulative Return",
        values: [
        ]
      }
    ];
  }

  handleData = (data) => {
    this.multi = this.formatData(data);
    this.data = [
      {
        key: "Cumulative Return",
        values: data
      }
    ];
  }

  formatData(data) {
    const tempData = [];
    const humidityData = [];
    data.forEach(element => {
      const d = new Date(0);
      d.setUTCSeconds(element.time);
      tempData.push({name:d, value:element.temperature});
      humidityData.push({name:d, value:element.humidity});
    });
    return [
      {
        name: 'Temperature',
        series: tempData
      },
      {
        name: 'Humidity',
        series: humidityData
      }
    ];
  }

  refreshData() {
    this.espDHTService.initialLoad(this.server);
  }

  fetchNew() {
    this.espDHTService.fetchUpdates(this.server);
  }
}
