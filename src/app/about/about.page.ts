import { Component, OnInit ,ViewChild} from '@angular/core';
import { IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})

export class AboutPage implements OnInit {
 
  @ViewChild('slides', {static: true}) slides: IonSlides;
  constructor() { }

  ngOnInit() {

  }
  moveToPrev(slides) {
    slides.slidePrev();
  }
  moveToNext(slides){
   
    slides.slideNext()
}
}
