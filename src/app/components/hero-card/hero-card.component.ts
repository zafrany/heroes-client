import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero!: Hero;

  constructor(private heroService : HeroService) { }

  ngOnInit(): void {
  }

  trainHero(){
    this.heroService.trainHero(parseInt(this.hero.id)).subscribe({
      error: (err =>{
      console.log("train hero error!");
    }),
    next: data => {
      this.hero = data;
    }
    })
  }
}
