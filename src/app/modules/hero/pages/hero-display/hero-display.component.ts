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

  heroes: Hero[] = [];
  ngOnInit(): void {
    this.heroService.heroList.subscribe((heroes)=>{
      this.heroes = heroes;
    })
    this.getAllHeroes();
    this.heroes = this.heroService.heroesList;
  }

  getAllHeroes() {
    this.heroService.getAllHeroes().subscribe(
      {
        error: (err =>{
        console.log("get my heroes error!");
      }),
      next: data => {
        console.log("getAllHeroes data =" + JSON.stringify(data));
        this.heroService.setHeroList(data);
        this.heroes = data;
        console.log(this.heroes);
      }
      })
  }
}
