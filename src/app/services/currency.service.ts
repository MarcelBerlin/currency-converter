import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;
    return this.http.get<any>(url); 
  }




}

