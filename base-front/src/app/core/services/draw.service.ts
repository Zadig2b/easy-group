import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DrawDto } from '../models/draw.dto';

@Injectable({ providedIn: 'root' })
export class DrawService {
  constructor(private http: HttpClient) {}

  submitDraw(listId: string, draw: DrawDto): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/lists/${listId}/draws`, draw);
  }
}
