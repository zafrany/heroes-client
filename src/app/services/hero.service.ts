import { Injectable } from '@angular/core';
import { Subject, tap } from "rxjs";
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

  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.token}`
  });

  getMyHeroes() {
    return this.http.get<Hero[]>(environment.serverUrl + '/heroes/myHeroes', {headers: this.headers});
  }

  getAllHeroes() {
    return this.http.get<Hero[]>(environment.serverUrl + '/heroes/', {headers: this.headers});
  }

  trainHero(heroId : number) {
    return this.http.patch<Hero>(environment.serverUrl + `/heroes/:${heroId}/RemainingTrains`,{}, {headers: this.headers}).pipe(tap(data => {
      this.updateHero(data);
    }));
  }

  setHeroList(heroList: Hero[]){
    this._heroList = heroList;
    this._heroListSubject.next(this._heroList);
  }

  updateHero(updatedHero : Hero) {
    var res = this._heroList.find(hero => hero.id === updatedHero.id);
    res = updatedHero;
    this._heroListSubject.next(this._heroList);
  }
}
