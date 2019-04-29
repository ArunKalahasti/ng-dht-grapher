export class ESP_DHT_META_Model {
    records: number;
    pages: number;
    pageSize: number;
    currentPage: number;
    pageResults: number;
}

export class ESP_DHT_DATA_Model {
    time: number;
    temperature: number;
    humidity: number;

    constructor(time, temperature, humidity) {
        this.time = time;
        this.temperature = temperature;
        this.humidity = humidity;
    }

    static parse = (raw: any): ESP_DHT_DATA_Model => {
        return new ESP_DHT_DATA_Model(
            raw["@"],
            raw["T"],
            raw["H"]
        );
    }
}

export class ESPDHTModel {
    meta: ESP_DHT_META_Model;
    data: ESP_DHT_DATA_Model[];
}
