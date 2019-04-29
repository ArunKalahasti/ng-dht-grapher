import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ESPDHTModel, ESP_DHT_DATA_Model } from './esp.dht.model';

@Injectable({
  providedIn: 'root'
})
export class EspDHTService {

  data: ESP_DHT_DATA_Model[];

  currentPage: number = 0;

  serverDataSubjects: {[key: string]: Subject<ESP_DHT_DATA_Model[]>} = {};

  constructor(
    private http: HttpClient
  ) {}

  connect(server: string) {
    const serverDataSubject = new Subject<ESP_DHT_DATA_Model[]>();
    this.serverDataSubjects[server] = serverDataSubject;
    this.http.get("http://" + server + "/")
    .pipe(
      retry(3)
      )
      .subscribe((res) => {
        console.log(res);
      });
      return serverDataSubject;
  }

  initialLoad(server: string) {
    this.data = []
    console.log('STARTING DATA LOAD');
    this.getPage(server).subscribe((start:ESPDHTModel) => {
      this.getNextPage(server, start);
    });

  }

  fetchUpdates(server: string){
    console.log('STARTING DATA FETCH FOR UPDATES');
    this.getPage(server, this.currentPage).subscribe((start:ESPDHTModel) => {
      this.getNextPage(server, start);
    });
  }

  getNextPage(server: string, current: ESPDHTModel) {
    this.serverDataSubjects[server].next(this.data);
    if(current.meta.currentPage < current.meta.pages) {
      this.getPage(server, current.meta.currentPage+1)
      .subscribe((next: ESPDHTModel) => {
        // console.log(next);
        // console.log(this.data);
        setTimeout(()=>{
          this.getNextPage(server, next);
        }, 100);
      });
    } else {
      console.log('********************** DONE');
      console.log(this.data);
      this.currentPage = current.meta.currentPage;
    }
  }

  getPage(server:string, pageNumber: number = 0){
    return this.http.get("http://" + server + "/api?page="+pageNumber)
    .pipe(
      retry(3),
      map((res:any) => {
        let model: ESPDHTModel = new ESPDHTModel();
        model.meta = res.meta;
        model.data = [];
        res.data.forEach(element => {
          const dataElement = ESP_DHT_DATA_Model.parse(element);
          const found = this.data.some(el => el.time === dataElement.time);
          if (!found) {
            model.data.push(dataElement);
            this.data.push(dataElement);
          }
        });
        return model;
      })
    );
  }
}
