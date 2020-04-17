import { Injectable } from '@angular/core';
import { Setting } from '../models/Setting';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Setting = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
  };

  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Setting {
    return this.settings;
  }

  changeSettings(setting: Setting) {
    console.log(setting);
    localStorage.setItem('settings', JSON.stringify(setting));
  }
}
