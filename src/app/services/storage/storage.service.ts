import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async saveLocalStorage(name: string, data: {}): Promise<boolean> {
    localStorage.setItem(name, JSON.stringify(data));
    const savedData = await this.getLocalStorage(name);
    if (savedData) {
      return true;
    } else {
      return false;
    }
  }

  getLocalStorage(name: string) {
    const _data = localStorage.getItem(name);
    const data = _data ? JSON.parse(_data) : null;
    return data;
  }

  async deleteLocalStorage() {
    localStorage.clear();
  }
}
