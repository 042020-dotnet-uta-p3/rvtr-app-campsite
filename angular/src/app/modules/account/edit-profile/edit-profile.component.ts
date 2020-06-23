import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Profile } from './../../../data/profile.model';
import { AccountService } from './../../../services/account/account.service';

@Component({
  selector: 'uic-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class EditProfileComponent implements OnInit {

  // properties
  hideProfile = true;
  profiles: Profile[];
  imageError: string;
  isImageSaved: boolean;
  newProfile: Profile = {
    id: 0,
    accountId: Number(this.accountService.getUserId()),
    email: null,
    name: {
      id: 0,
      family: null,
      given: null
    },
    phone: null,
    age: 'Adult',
    image: null
  };

  // functions
  // boolean toggle to show/hide the add new profile section in html
  toggleProfile() {
    this.hideProfile = !this.hideProfile;
  }

  // For transferring uploaded image to base64
  async fileChangeEvent(fileInput: any) {
    const result = await this.accountService.validateImage(fileInput);
    this.isImageSaved = result.valid;
    if (this.isImageSaved) {
      this.newProfile.image = result.message;
    } else {
      this.imageError = result.message;
    }
  }

  // removing a selected image from the add new profile section
  removeImage() {
    this.newProfile.image = null;
    this.isImageSaved = false;
  }

  // get profile inofrmation from the profile api
  getProfiles() {
    this.accountService.getProfile(this.accountService.getUserId()).subscribe(
      profile => this.profiles = profile
    );
  }

  // adds a new profile to the array of profiles in the data:Account property
  addProfile() {
    if (this.profiles.some(x => x.name.given === this.newProfile.name.given &&
      x.name.family === this.newProfile.name.family) ||
      this.accountService.isNullOrWhitespace(this.newProfile.name.given) ||
      this.accountService.isNullOrWhitespace(this.newProfile.name.family) ||
      this.accountService.isNullOrWhitespace(this.newProfile.email) ||
      this.newProfile.phone.toString().length !== 10) {
      console.log('Error, please try again');
    } else {
      this.accountService.postProfile(this.newProfile).subscribe(profile => {
        this.getProfiles();
        this.toggleProfile();
      });
    }
  }

  // remove a profile from array of profiles in the data:Account property
  removeProfile(profileId: number) {
    this.accountService.deleteProfile(profileId).subscribe(profile =>
      this.getProfiles()
    );
  }

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
    this.getProfiles();
  }
}
