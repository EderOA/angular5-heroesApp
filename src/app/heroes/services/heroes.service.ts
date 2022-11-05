import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


import { Heroe } from '../interfaces/heroe.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  baseURL: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseURL }/heroes`)
  }

  getHeroePorId( id: string) : Observable<Heroe>{
    return this.http.get<Heroe>(`${ this.baseURL }/heroes/${ id }`)
  }

  getSugerencias( termino: string) : Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseURL }/heroes?q=${ termino}&_limit=6`)
    
  }

  agregaHeroe( heroe: Heroe) : Observable<Heroe>{
    return this.http.post<Heroe>(`${ this.baseURL }/heroes`, heroe);
  }

  actualizarHeroe( heroe: Heroe) : Observable<Heroe>{
    return this.http.put<Heroe>(`${ this.baseURL }/heroes/${ heroe.id }`, heroe);
  }
  borrarHeroe( id: string) : Observable<any>{
    return this.http.delete<any>(`${ this.baseURL }/heroes/${ id }`);
  }

  
}
