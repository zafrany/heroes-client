import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-display',
  templateUrl: './hero-display.component.html',
  styleUrls: ['./hero-display.component.scss']
})
export class HeroDisplayComponent implements OnInit {

  constructor(private heroService : HeroService) { }

  _heroes: Hero[] = [];
  ngOnInit(): void {
    this.getMyHeroes();
  }

  getMyHeroes() {
    this.heroService.getMyHeroes().subscribe(
      {
        error: (err =>{
        console.log("get my heroes error!");
      }),
      next: data => {
        this.heroService.setHeroList(data);
        this._heroes = data;
        console.log(this._heroes);
      }
      })
  }
}
