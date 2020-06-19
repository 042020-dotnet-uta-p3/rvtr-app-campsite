import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LodgingRoutingModule } from './lodging-routing.module';
import { LodgingComponent } from './lodging/lodging.component';
import { LodgingDetailComponent } from './lodging-detail/lodging-detail.component';
import { LodgingSearchFormComponent } from './lodging-search-form/lodging-search-form.component';
<<<<<<< HEAD
import { LodgingDisplayReviewComponent } from './lodging-display-review/lodging-display-review.component';
import { LodgingReviewListComponent } from './lodging-review-list/lodging-review-list.component';
import { LodgingReviewComponent } from './lodging-review/lodging-review.component';

@NgModule({
  declarations: [LodgingComponent, LodgingDetailComponent, LodgingSearchFormComponent, LodgingDisplayReviewComponent, LodgingReviewListComponent, LodgingReviewComponent],
=======
import { LodgingReviewModalComponent } from './lodging-review-modal/lodging-review-modal.component';

@NgModule({
  declarations: [LodgingComponent, LodgingDetailComponent, LodgingSearchFormComponent, LodgingReviewModalComponent],
>>>>>>> master
  imports: [
    CommonModule,
    LodgingRoutingModule,
    ReactiveFormsModule,
  ]
})

export class LodgingModule { }
