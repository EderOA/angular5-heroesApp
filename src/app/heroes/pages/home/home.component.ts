import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px;
    }
    `]
})
export class HomeComponent implements OnInit {

  //auth!: Auth; //undefined

  get auth(){
    return this.authService.auth;
  }
  
  constructor( private routr : Router,
              private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.routr.navigate(['/auth']);
  }

}
