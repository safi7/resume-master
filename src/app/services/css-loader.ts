import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CssLoaderService {
    constructor(private http: HttpClient) { }

    loadCssFile(url: string) {
        return this.http.get(url, { responseType: 'text' });
    }
}