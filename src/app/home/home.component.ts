import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
          var image = new Image();
          image.src = event.pic;
          console.log(image)
          //document.body.appendChild(image); // Make it not ugly lol
        }
      })
    })
      .then((data) => {})
      .catch((err)=>console.log(err))
  }
  

}
