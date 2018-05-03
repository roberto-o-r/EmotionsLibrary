import { Component, OnInit } from '@angular/core';
import { FeelingService } from '../shared/services/feeling.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  feelings;
  activeId = 0;

  constructor(private feelingService: FeelingService) { }

  ngOnInit() {
    // Get feelings.
    this.feelingService.getFeelings().subscribe(feelings => {
      this.feelings = feelings;
      this.feelings.map(feeling => {
        const relatedFeelings = feelings.filter(f => feeling.related.some(r => r == f.id));
        const oppositeFeelings = feelings.filter(f => feeling.opposite.some(r => r == f.id));
        feeling.relatedFeelings = relatedFeelings;
        feeling.oppositeFeelings = oppositeFeelings;
        return { ...feeling }
      })
    });
  }

}
