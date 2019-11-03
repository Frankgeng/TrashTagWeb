import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.scss']
})
export class CardsPageComponent implements OnInit {
  name = name;
  constructor() { }

  ngOnInit() {
    const endPoint = "http://127.0.0.1:5000/receiver";
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
          var image = <HTMLImageElement>document.getElementById('image');
          image.src = event.pic;
          var userName = document.getElementById('name');
          userName = event.name;
          var location = document.getElementById('location');
          location.textContent = event.location;
          var time = document.getElementById('time');
          time.textContent = event.time;
          var eventName = document.getElementById('eventName');
          eventName.textContent = event.eventName;
          
        }
      })
    })
      .then((data) => {})
      .catch((err)=>console.log(err))
  
  }

}
