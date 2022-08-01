import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.scss']
})
export class MyHeroesComponent implements OnInit {

  _heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

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

  trainHero(hero : Hero){
    this.heroService.trainHero(parseInt(hero.id)).subscribe({
      error: (err =>{
      console.log("train hero error!");
    }),
    next: data => {
      var index = this._heroes.findIndex(hero => hero.id === data.id);
      this._heroes[index ] = data;
    }
    })
  }
}
