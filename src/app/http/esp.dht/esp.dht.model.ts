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
}

export class ESPDHTModel {
    meta: ESP_DHT_META_Model;
    data: ESP_DHT_DATA_Model[];
}
