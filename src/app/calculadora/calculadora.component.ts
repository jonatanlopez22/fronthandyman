import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Servicio } from 'src/app/models/Servicio';
import Swal from 'sweetalert2';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent  {

  public showHorasE = false;
  public showHorasD = false;
  public showHorasN = false;


  title = 'cal';
  total1:any;
  total2:any;
  total3:any;
  total4:any;
  total5:any;
 

  horasE:any;

  servicios: Servicio[] | undefined;

createFormGroup(){

return new FormGroup({

idEmpleado:new FormControl('',[Validators.required]),
semana:new FormControl('',[Validators.required])

});

}

consultaForm:FormGroup 

constructor(private service:UserService) { 

this.consultaForm=this.createFormGroup();

}

  public idEmpleado = new FormControl('', Validators.required);
  public semana = new FormControl('', Validators.required);

  public newForm = new FormGroup({
    idEmpleado: this.idEmpleado,
    semana: this.semana,
  });

  consultar(){
    if(this.consultaForm.valid){

      let idEmpleado=this.consultaForm.value.idEmpleado;
      let semana=this.consultaForm.value.semana;
   
       this.service.getEmpleado(idEmpleado,semana) .subscribe(data => {
         console.log(data);
         this.servicios = data;
   
         this.ngOnInit() 
       })


    }else{Swal.fire({
      icon: 'error',
      title: 'invalid',
      text: "todos los campos son necesarios!",
    })
    
    }
   
  }

   ngOnInit() 
  {
    this.total1 = this.servicios?.reduce((
      acc,
      obj,
    ) => acc + (obj.horasDiurnas ),
    0);
    this.total2 = this.servicios?.reduce((
      acc,
      obj,
    ) => acc + (obj.horasDominicales ),
    0);
    this.total3 = this.servicios?.reduce((
      acc,
      obj,
    ) => acc + (obj.horasNocturnas ),
    0);
     this.total4 = this.total1+this.total2+this.total3;

    
     if(this.total4>48 && this.total1 > this.total2){
      this.horasE=this.total4-48  

    this.showHorasE = true;
    this.showHorasN = false;
    this.showHorasD = true;

    }else if(this.total4>48 && this.total2 > this.total1){

      this.showHorasE = true;
      this.showHorasN = true;
      this.showHorasD = false;
    }
    else{

      this.horasE=0
      this.showHorasE = false;
      this.showHorasN = true;

    } 
  } 

}