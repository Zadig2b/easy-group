import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ListDto } from '../../core/models/list.model';
import { Person } from '../models/person.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ListService {
  private apiUrl = `${environment.apiBaseUrl}/lists`;

  constructor(private http: HttpClient) {}

 getUserLists(): Observable<ListDto[]> {
  return this.http.get<ListDto[]>(this.apiUrl).pipe(
    catchError((err) => {
      console.error('Erreur lors du chargement des listes :', err);
      return of([]); // 🔒 Empêche les relances infinies
    })
  );
}


  getListById(id: number): Observable<ListDto> {
    return this.http.get<ListDto>(`${this.apiUrl}/${id}`);
  }

  getListPersons(id: number): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/${id}/persons`).pipe(
      catchError((err) => {
        console.error('Erreur lors du chargement des personnes', err);
        return of([]); // Pas de relance infinie, renvoie une liste vide
      })
    );
  }

  createList(name: string): Observable<any> {
    return this.http.post(this.apiUrl, name, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
