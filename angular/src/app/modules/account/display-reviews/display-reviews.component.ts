import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Review } from './../../../data/review.model';
import { AccountService } from './../../../services/account/account.service';
import { ReviewService } from './../../../services/lodging/review.service';
import { LodgingService } from './../../../services/lodging/lodging.service';

@Component({
  selector: 'uic-display-reviews',
  templateUrl: './display-reviews.component.html'
})
export class DisplayReviewsComponent implements OnInit {

  // properties
  reviews: Review[];

  // functions
  // http get to call the most recent 2 reviews by the account from the review service. using account id.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard
  getReviews() {
    const id: string = this.accountService.getUserId();
    this.reviewService.get(undefined, new HttpParams().set('AccoundId', id))
    .pipe(map(reviews => reviews.slice(0, 2)))
    .subscribe(val => {
      this.reviews = val;
      this.reviews.forEach(review =>
        this.lodgingService.get(review.lodgingId.toString(), new HttpParams().set('IncludeImages', true.toString()))
        .subscribe((lodging: any) =>
        review.lodging = lodging));
    });
  }

  constructor(private readonly accountService: AccountService,
              private readonly reviewService: ReviewService,
              private readonly lodgingService: LodgingService
    ) { }

  ngOnInit(): void {
    this.getReviews();
  }
}
