import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Setting } from 'src/app/models/Setting';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Setting;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Setting Saved', {
      cssClass: 'alert-success',
      timeout: 5000,
    });
  }
}
