import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private authService: AuthService) {}
  private _heroList : Hero[] = [];

  private _heroListSubject = new Subject<Hero[]>();
  heroList = this._heroListSubject.asObservable();

  getMyHeroes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
    });
    return this.http.get<Hero[]>(environment.serverUrl + '/heroes/myHeroes', {headers: headers});
  }

  setHeroList(heroList: Hero[]){
    this._heroList = heroList;
    this._heroListSubject.next(this._heroList);
  }
}
