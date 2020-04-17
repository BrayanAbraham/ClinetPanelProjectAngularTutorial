import { Injectable } from '@angular/core';
import { Setting } from '../models/Setting';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Setting = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
  };

  constructor() {}

  getSettings(): Setting {
    return this.settings;
  }
}
