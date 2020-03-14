import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }
  numberWithSpaces(x: any): any {
    try {
      const parts = Number((x).toFixed(2)).toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    } catch (err) {
      console.log(x);
      return '';
    }
  }
  numberWithSpacesPercent(x: any): any {
    try {
      const parts = Number((x * 100).toFixed(2)).toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.') + '%';
    } catch (err) {
      console.log(x);
      return '';
    }
  }
  numberWithSpacesInt(x: any): any {
    try {
      return Number((x).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } catch (err) {
      console.log(x);
    }
  }
  getMonthName(index: number) {
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    return months[index - 1];
  }
}
