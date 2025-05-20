import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListDto } from '../../core/models/list.model';
import { environment } from '../../../environments/environment';



@Injectable({ providedIn: 'root' })
export class ListService {
  private apiUrl = `${environment.apiBaseUrl}/lists`;

  constructor(private http: HttpClient) {}

  getUserLists(): Observable<ListDto[]> {
    return this.http.get<ListDto[]>(this.apiUrl);
  }

  getListById(id: number): Observable<ListDto> {
  return this.http.get<ListDto>(`${this.apiUrl}/${id}`);
}


  createList(name: string): Observable<any> {
  return this.http.post(this.apiUrl, name, {
    headers: { 'Content-Type': 'application/json' }
  });
}

}
