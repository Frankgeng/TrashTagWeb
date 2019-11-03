import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CardComponent;
  @Input('name') name: string;
  @Input('location') location: string;
  @Input('time') time: string;
  @Input('eventName') eventName: string;
  @Input('image') image: string;
  constructor() { }

  ngOnInit() {
  }

}
