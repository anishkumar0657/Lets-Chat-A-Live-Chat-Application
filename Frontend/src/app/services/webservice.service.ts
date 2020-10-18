import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  readonly ROOT_URL: any;
  constructor(private readonly http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
  }
  //post function
  post(uri: string, payload: Object) {
    console.log(`${this.ROOT_URL}/${uri}`);
    console.log(payload);
    return this.http.post(`${this.ROOT_URL}/${uri}/`, payload, httpOptions);
  }

  //get function
  get(uri: string) {
    console.log(`${this.ROOT_URL}/${uri}`);
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  //delete funtion
  delete(uri: string) {
    console.log(`${this.ROOT_URL}/${uri}`);
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  put(uri: string, payload: Object) {
    console.log(`${this.ROOT_URL}/${uri}`);
    console.log(payload);
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload, httpOptions);
  }
}
