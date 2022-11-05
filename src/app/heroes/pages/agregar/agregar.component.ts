import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators'
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px
  }
  `]
})
export class AgregarComponent implements OnInit {

  publishers =[
    {
      id: 'DC Comics',
      description : 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      description : 'Marvel - Comics'
    }
  ]

  heroe : Heroe = {
    superheroe        : '',
    alter_ego         : '',
    characters        : '',
    first_appearance  : '',
    publisher         : Publisher.DCComics,
    alt_img           : '',
    
  };

  

  constructor( 
    private activatedRoute : ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {

    
    if ( this.router.url.includes('editar') ){
      
       this.activatedRoute.params
         .pipe(
           switchMap( ({id}) => this.heroeService.getHeroePorId( id ) )
         )
         .subscribe( heroe  => this.heroe = heroe);
    }
    
  }

  Guardar(){
    console.log(this.heroe);
    if (this.heroe.superheroe !== undefined){
      if (this.heroe.superheroe.trim().length === 0){
        return;
      }
    }


    console.log(this.heroe.id);

    if ( this.heroe.id){
      this.heroeService.actualizarHeroe(this.heroe)
          .subscribe( heroe => {
            this.mostrarSnackBar('Registro actualizado correctamente');
          })
    }
    else{
      this.heroeService.agregaHeroe(this.heroe)
        .subscribe( heroe =>{
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackBar('Heroe creado correctamente');
        })
      
    }
    
  }

  borrarHeroe(){

    const dialog =  this.dialog.open( ConfirmarComponent,{
                    width: '250px',
                    data: this.heroe
                  });
    
    dialog.afterClosed().subscribe(
      (result) => {
        if (result){
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe( resp =>{
              this.router.navigate(['/heroes']);
            })

        }
      }
    )

    
      
  }

  mostrarSnackBar( mensaje: string){
    this.snackbar.open(mensaje, 'ok!',{
      duration: 2500 
    })
  }

}
