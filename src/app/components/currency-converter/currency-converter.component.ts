import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {

  result: number | null = null;
  amount: number = 1;
  targetCurrency: string = 'USD';
  currencies: string[] = ['USD', 'GBP', 'CHF', 'JPY', 'AUD']; // beliebig erweiterbar
  isLoading: boolean = false;
  errorMessage: string | null = null;
  

  constructor(private currencyService: CurrencyService) { }

  convert() {
    this.isLoading = true;
    this.errorMessage = null;
    this.currencyService.convertCurrency('EUR', this.targetCurrency, this.amount).subscribe({
      next: (data) => {
        console.log('Antwort:', data);
        const rate = data.rates[this.targetCurrency];
        this.result = rate * this.amount; // Betrag berechnen
        this.isLoading = false;
      },
      error: (err) => {
      console.error('Fehler beim Abruf', err);
      this.errorMessage = 'Fehler beim Abrufen der Umrechnung. Bitte versuche es erneut!'
      this.isLoading = false;
    },
  });
}

}
