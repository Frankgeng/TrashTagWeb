import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.scss']
})
export class CardsPageComponent implements OnInit {
  cards: card[];
  constructor() {
    this.cards = [];
  }

  ngOnInit() {
    const endPoint = "http://127.0.0.1:5000/receiver";
    let parentThis = this;
    fetch(endPoint,
      {
      method: 'POST',
      headers: new Headers(),
      body:JSON.stringify({add:'false'}),
      mode: 'cors'
    }).then((res) => {
      res.json().then(function(inner){
        for (let i in inner) {
          const event = inner[i];
          console.log(event); // contains everything!
          var image = new Image();
          // image.src = event.pic;
          // document.body.appendChild(image);
          let userName = event.name;
          let location = event.location;
          let time = event.time;
          let eventName = event.eventName;
          parentThis.cards.push({name: userName, location: location, time: time, eventName: eventName, image: event.pic});
        }
      })
    })
      .then((data) => {})
      .catch((err)=>console.log(err))

  }

}
