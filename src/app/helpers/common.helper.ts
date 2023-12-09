import { startWith, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class CommonHelper {
  constructor() { }

  objectHash(obj, separator = ':') {
    return Object.keys(obj)
      .sort()
      .map(v => obj[v])
      .join(separator);
  }

  authorize(requirep) {
    const userp = JSON.parse(localStorage.getItem('permissions')).map(v => v.name);
    if (!requirep) { return true; }
    return userp.filter(p2 => requirep.startsWith(p2)).length
  }
}

export { CommonHelper };
