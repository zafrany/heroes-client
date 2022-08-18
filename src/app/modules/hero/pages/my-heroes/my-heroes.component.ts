import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';


@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.scss']
})
export class MyHeroesComponent implements OnInit {

  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getMyHeroes();
    this.heroService.heroList.subscribe((heroes)=>{
      this.heroes = heroes;
    })
    this.heroes = this.heroService.heroesList;
    console.log("onNgInit called");
  }

  getMyHeroes() : void {
    this.heroService.getMyHeroes().subscribe(
      {
        error: (err =>{
        console.log("get my heroes error!");
      }),
      next: data => {
        console.log("getMyHeroes data =" + JSON.stringify(data));
        this.heroService.setHeroList(data);
        this.heroes = data;
        console.log(this.heroes);
      }
      })
  }

  trainHero(hero : Hero){
    this.heroService.trainHero(parseInt(hero.id)).subscribe({
      error: (err =>{
      console.log("train hero error!");
    }),
    next: data => {
      const index = this.heroes.findIndex(hero => hero.id === data.id);
      this.heroes[index ] = data;
    }
    })
  }
}
