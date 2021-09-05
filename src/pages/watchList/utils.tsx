export class LocalStorageService {
  // any потому что мы не знаем что покладут в localStorage
  // eslint-disable-next-line
  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // any потому что мы не знаем что лежит в localStorage
  // eslint-disable-next-line
  static getItem(key: string): any {
    const data = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }

    return null;
  }
}
