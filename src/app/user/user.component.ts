import { Component, OnInit } from '@angular/core';
import { ServicioNew } from '../models/ServicioNew';
import { UserService } from '../shared/services/user.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  public showValidar = true;
  public showCalcular = false;
  public showEnviar = false;


  horasDiurnas: any;
  horasDominicales: any;
  horasNocturnas: any;

  horasDiurnas1: any;
  horasNocturnas1: any;


  diasD: any;
  diaI: any;
  diaF: any;

  semanaI: any;
  semanaF: any;
  semanaT: any;

  createFormGroup() {

    return new FormGroup({

      idEmpleado: new FormControl('', Validators.required),
      idServicio: new FormControl('', Validators.required),
      horaI: new FormControl('', Validators.required),
      horaF: new FormControl('', Validators.required),
      fechaI: new FormControl('', Validators.required),
      fechaF: new FormControl('', Validators.required),

    });

  }
  calcularForm: FormGroup

  constructor(private service: UserService) {
    this.calcularForm = this.createFormGroup();
  }

  ngOnInit() {

  }

  public idEmpleado = new FormControl(['', Validators.required]);
  public idServicio = new FormControl(['', Validators.required]);
  public horaI = new FormControl(['', Validators.required]);
  public horaF = new FormControl(['', Validators.required]);
  public fechaI = new FormControl(['', Validators.required]);
  public fechaF = new FormControl(['', Validators.required]);


  public newForm = new FormGroup({
    idEmpleado: this.idEmpleado,
    idServicio: this.idServicio,
    horaI: this.horaI,
    horaF: this.horaF,
    fechaI: this.fechaI,
    fechaF: this.fechaF,

  });

  verDiaInicial() {
    let fecha = this.calcularForm.value.fechaI

    this.service.getDia(fecha).subscribe(data =>
      this.diaI = data)

    console.log(' ok 1 ', this.diaI);

  }

  verDiaFinal() {
    let fecha = this.calcularForm.value.fechaF

    this.service.getDia(fecha).subscribe(data =>
      this.diaF = data)

    console.log(' ok 2 ', this.diaF);

  }

  verSemanaI() {
    timer(1000)
    console.log(' ok 3');

    let fechaI = this.calcularForm.value.fechaI;

    this.service.getSemanaf(fechaI).subscribe(data =>
      this.semanaI = data);
  }

  verSemanaF() {
    timer(1000)

    console.log(' ok 4');

    let fechaF = this.calcularForm.value.fechaF;

    this.service.getSemanaf(fechaF).subscribe(data =>
      this.semanaF = data);
  }


  calcularDias() {

    console.log(' ok 11');

    let fechaI = this.calcularForm.value.fechaI;
    let fechaF = this.calcularForm.value.fechaF;

    this.service.getDias(fechaI, fechaF).subscribe(data =>
      this.diasD = data);

  }

  calDom() {

    let horaI = this.calcularForm.value.horaI;
    let horaF = 24;
    let fechaI = this.calcularForm.value.fechaF;
    let fechaF = this.calcularForm.value.fechaF;

    this.service.getCalcularH(horaI, horaF, fechaI, fechaF).subscribe(data =>
      this.horasDominicales = data);

  }

  calDom2() {

    let horaI = this.calcularForm.value.horaI;
    let horaF = this.calcularForm.value.horaF;
    let fechaI = this.calcularForm.value.fechaF;
    let fechaF = this.calcularForm.value.fechaF;

    this.service.getCalcularH(horaI, horaF, fechaI, fechaF).subscribe(data =>
      this.horasDominicales = data);

  }

  calDom3() {

    let horaI1 = 0;
    let horaF1 = this.calcularForm.value.horaF;
    let fechaI1 = this.calcularForm.value.fechaI;
    let fechaF1 = this.calcularForm.value.fechaI;

    this.service.getCalcularHN(horaI1, horaF1, fechaI1, fechaF1).subscribe(data =>
      this.horasDominicales = data);

  } 

  calNoc1() {

    let num1 = this.horasNocturnas1
    let num2 = this.horasNocturnas

    this.service.getCalN1(num1, num2).subscribe(data =>
      /* this.horasExtraNT = data); */
      this.horasDiurnas = data);

  }

  calDiu1() {

    let num1 = this.horasDiurnas1
    let num2 = this.horasDiurnas

    this.service.getCalN1(num1, num2).subscribe(data =>
      /* this.horasExtraN = data); */
      this.horasNocturnas = data);

  }


  calcularHoras() {

    timer(1000)

    console.log('calcular inicio');

    let horaI = this.calcularForm.value.horaI;
    let horaF = this.calcularForm.value.horaF;
    let fechaI = this.calcularForm.value.fechaI;
    let fechaF = this.calcularForm.value.fechaF;

    let diasD = this.diasD;
    

    if (diasD < 0 ||  horaI >= 20 && horaI > horaF && fechaI == fechaF) {

      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "la fecha de finalizacion no es valida 1111 lope !",
        timer: 5500,
      })

      window.location.reload();

    } else if (this.diaI == 'domingo' && fechaI == fechaF && diasD == 0) { /* funcional */

      console.log('calcular 0 ');

      this.horasDiurnas = 0;
      this.horasNocturnas = 0;

      this.service.getCalcularH(horaI, horaF, fechaI, fechaF).subscribe(data =>
        this.horasDominicales = data);

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional2 */(horaI >= 20 && horaF <= 7 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI != 'domingo') {

      console.log('calcular 1');

      this.horasDominicales = 0;
      this.horasDiurnas = 0;
 

      this.service.getCalcularH(horaI, horaF, fechaI, fechaF).subscribe(data =>
        this.horasNocturnas = data);

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional2 */(horaI >= 20 && horaF <= 7 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI == 'domingo') {

      console.log('calcular 2');

      this.horasDiurnas = 0;


      this.calDom();

      let horaF1 = this.calcularForm.value.horaF;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaI;
      let fechaF1 = this.calcularForm.value.fechaF;
      let horaN = this.horasDominicales;

      this.service.getCalHNoc1(horaI1, horaF1, fechaI1, fechaF1, horaN).subscribe(data =>
        this.horasNocturnas = data);

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional1 */(horaI >= 20 && horaF > 7 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI == 'domingo') {

      console.log('calcular 3');


      this.calDom();

      let horaF1 = this.calcularForm.value.horaF;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaI;
      let fechaF1 = this.calcularForm.value.fechaF;
      let horaN = this.horasDominicales;

      this.service.getCalHNoc1(horaI1, horaF1, fechaI1, fechaF1, horaN).subscribe(data =>
        this.horasNocturnas1 = data);

      let horaF2 = 7;
      let horaI2 = this.calcularForm.value.horaI;
      let fechaI2 = this.calcularForm.value.fechaI;
      let fechaF2 = this.calcularForm.value.fechaF;

      this.service.getCalHNoc2(horaI2, horaF2, fechaI2, fechaF2, horaN).subscribe(data =>
        this.horasNocturnas = data);

      this.calNoc1();

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional1 */(horaI >= 20 && horaF > 7 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI != 'domingo') {

      console.log('calcular 4');

      this.horasDominicales = 0;

      let horaF1 = this.calcularForm.value.horaF;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaI;
      let fechaF1 = this.calcularForm.value.fechaF;
      let horaN = this.horasDominicales;

      this.service.getCalHNoc1(horaI1, horaF1, fechaI1, fechaF1, horaN).subscribe(data =>
        this.horasNocturnas1 = data);

      let horaF2 = 7;
      let horaI2 = this.calcularForm.value.horaI;
      let fechaI2 = this.calcularForm.value.fechaI;
      let fechaF2 = this.calcularForm.value.fechaF;

      this.service.getCalHNoc2(horaI2, horaF2, fechaI2, fechaF2, horaN).subscribe(data =>
        this.horasNocturnas = data);

      this.calNoc1();

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional1 */(horaI >= 7 && horaF <= 20 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI == 'domingo') {

      console.log('calcular 5');

      this.horasNocturnas = 0;
  

      this.calDom2();

      let horaF1 = this.calcularForm.value.horaF;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaI;
      let fechaF1 = this.calcularForm.value.fechaF;
      let horaN = this.horasDominicales;

      this.service.getCalHDiu1(horaI1, horaF1, fechaI1, fechaF1, horaN).subscribe(data =>
        this.horasDiurnas = data);

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional1 */(horaI >= 7 && horaF <= 20 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI != 'domingo') {

      console.log('calcular 6');

      this.horasDominicales = 0;
      this.horasNocturnas = 0;


      this.service.getCalcularH(horaI, horaF, fechaI, fechaF).subscribe(data =>
        this.horasDiurnas = data);

      this.showEnviar = true;
      this.showCalcular = false;



    } else if /* funcional */(horaI >= 7 && horaF > 20 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI != 'domingo') {

      console.log('calcular 7');


      this.horasDominicales = 0;

      let horaF1 = this.calcularForm.value.horaF;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaI;
      let fechaF1 = this.calcularForm.value.fechaF;
      let horaN = this.horasDominicales;

      this.service.getCalHDiu1(horaI1, horaF1, fechaI1, fechaF1, horaN).subscribe(data =>
        this.horasDiurnas1 = data);

      let horaF2 = 20;
      let horaI2 = this.calcularForm.value.horaI;
      let fechaI2 = this.calcularForm.value.fechaI;
      let fechaF2 = this.calcularForm.value.fechaF;

      this.service.getCalHDiu2(horaI2, horaF2, fechaI2, fechaF2, horaN).subscribe(data =>
        this.horasDiurnas = data);

      this.calDiu1();

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional */(horaI >= 7 && horaF > 20 && this.semanaI == this.semanaF && diasD >= 0 && fechaI != fechaF && this.diaI == 'domingo') {

      console.log('calcular 8');


      this.calDom2();

      let horaF1 = this.calcularForm.value.horaF;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaI;
      let fechaF1 = this.calcularForm.value.fechaF;
      let horaN = this.horasDominicales;

      this.service.getCalHNoc1(horaI1, horaF1, fechaI1, fechaF1, horaN).subscribe(data =>
        this.horasDiurnas1 = data);

      let horaF2 = 20;
      let horaI2 = this.calcularForm.value.horaI;
      let fechaI2 = this.calcularForm.value.fechaI;
      let fechaF2 = this.calcularForm.value.fechaF;

      this.service.getCalHNoc2(horaI2, horaF2, fechaI2, fechaF2, horaN).subscribe(data =>
        this.horasDiurnas = data);

      this.calDiu1();

      this.showEnviar = true;
      this.showCalcular = false;

    } else if /* funcional */(this.semanaI < this.semanaF && horaI >= 20 && horaF < 24  && diasD >=0) {

      console.log('calcular 10');
        
      this.horasDiurnas = 0;


      this.calDom3();

      let horaF1 = 24;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaF;
      let fechaF1 = this.calcularForm.value.fechaF;
      
      this.service.getCalcularHN(horaI1, horaF1, fechaI1, fechaF1, ).subscribe(data =>
        this.horasNocturnas = data);

        this.showEnviar = true;
        this.showCalcular = false;

    } else if /* funcional */(this.semanaI < this.semanaF && horaI >= 7 && horaI < 20 && horaF < 24  && diasD >=0) {

      console.log('calcular 11');

      this.horasNocturnas = 0;

      this.calDom3();


      let horaF1 = 20;
      let horaI1 = this.calcularForm.value.horaI;
      let fechaI1 = this.calcularForm.value.fechaF;
      let fechaF1 = this.calcularForm.value.fechaF;
      
      this.service.getCalcularHN(horaI1, horaF1, fechaI1, fechaF1, ).subscribe(data =>
        this.horasDiurnas = data);

        let horaF2 = 24;
        let horaI2 = this.calcularForm.value.horaI;
        let fechaI2 = this.calcularForm.value.fechaI;
        let fechaF2 = this.calcularForm.value.fechaI;
  
        this.service.getCalcularHN(horaI2, horaF2, fechaI2, fechaF2).subscribe(data =>
        this.horasDiurnas1 = data);
          
      this.calDiu1();

      this.showEnviar = true;
      this.showCalcular = false;


/* prueva */
        console.log('dom',this.horasDominicales)
        console.log('noc',this.horasNocturnas)
        console.log('diu',this.horasDiurnas)

    } 
  }

  validar() {
    if (this.calcularForm.valid) {

      this.showValidar = false;
      this.showCalcular = true;
      this.showEnviar = false;

      console.log('inicio');
    } else {

      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios   11111!",

      })

      this.showValidar = true;
      this.showCalcular = false;
      this.showEnviar = false;

    }

  }

  calcular() {
    console.log('paso2');

    timer(1000)
    this.verDiaInicial();
    timer(1000)
    this.calcularDias();
    timer(1000)
    this.verSemanaI();
    timer(1000)
    this.verSemanaF();
    timer(1000)
    this.calcularHoras();
    timer(1000)

  }

  enviar() {
    if (
      this.diaI == undefined ||
      this.horasDominicales == undefined && this.semanaI < this.semanaF  ||
      this.semanaI == this.semanaF && this.horasDiurnas == undefined && this.diaI == undefined ||
      this.semanaI == this.semanaF && this.horasNocturnas == undefined && this.diaI == undefined ||
      this.semanaI < this.semanaF && this.horasDiurnas == undefined && this.diaI == undefined ||
      this.semanaI < this.semanaF && this.horasNocturnas == undefined && this.diaI == undefined ||
      this.semanaI < this.semanaF && this.horasNocturnas == undefined && this.diaI == undefined ||
      this.semanaI < this.semanaF && this.horasDiurnas == undefined && this.diaI == undefined ||

      this.semanaI == this.semanaF && this.horasNocturnas != undefined && this.horasDiurnas == undefined ||
      this.semanaI == this.semanaF && this.horasDiurnas != undefined && this.horasNocturnas == undefined ||
      this.semanaI == this.semanaF && this.horasDominicales != undefined && this.horasNocturnas == undefined ||
      this.semanaI == this.semanaF && this.horasDominicales != undefined && this.horasDiurnas == undefined||

      this.semanaI < this.semanaF && this.horasNocturnas == undefined||
      this.semanaI < this.semanaF && this.horasDiurnas == undefined||
      this.semanaI < this.semanaF && this.horasDiurnas != undefined &&  this.horasNocturnas == undefined||
      this.diaI== 'sábado' && this.diaF== 'domingo' && this.calcularForm.value.horaI >= 20 && this.calcularForm.value.horaF < 24 && this.diasD >= 0 && this.horasNocturnas == undefined ||
      this.diaI== 'sábado' && this.diaF== 'domingo' && this.calcularForm.value.horaI >= 20 && this.calcularForm.value.horaF < 24 && this.diasD >= 0 && this.horasDominicales == undefined ||
      this.diaI== 'sábado' && this.diaF== 'domingo' && this.calcularForm.value.horaI >= 7 && this.calcularForm.value.horaI < 20 &&  this.calcularForm.value.horaF <24 && this.diasD >= 0 && this.horasNocturnas == undefined ||
      this.diaI== 'sábado' && this.diaF== 'domingo' && this.calcularForm.value.horaI >= 7 && this.calcularForm.value.horaI < 20 && this.calcularForm.value.horaF <24 && this.diasD >= 0 && this.horasDominicales == undefined 
    ) {
     
      this.calcular();

      console.log('enviar 1');

    } else if (this.semanaI == this.semanaF && this.horasDiurnas != undefined && this.horasNocturnas > 0 ||
      this.semanaI == this.semanaF && this.horasDiurnas != undefined && this.horasDiurnas > 0
      || this.semanaI == this.semanaF && this.diaI != undefined
    ) {

      this.registrar()

      console.log('enviar 2');

    } else if (this.semanaI == this.semanaF && this.horasNocturnas > 0 ||
      this.semanaI == this.semanaF && this.horasDiurnas > 0) {

      this.registrar()

      console.log('enviar 3');
    } else if (this.semanaI < this.semanaF &&   this.calcularForm.value.horaI >= 20 && this.calcularForm.value.horaF <24 && this.diasD >= 0 && this.horasDominicales != undefined && this.horasNocturnas  != undefined
      ) {

      this.registrar1();

      this.registrar2();


      console.log('enviar 4');

       }else if (this.semanaI < this.semanaF &&   this.calcularForm.value.horaI >= 7 &&   this.calcularForm.value.horaI < 20 && this.calcularForm.value.horaF <24 && this.diasD >= 0 && this.horasDominicales != undefined && this.horasNocturnas  != undefined
        ) {
  
        this.registrar2();
  
        this.registrar1();
  
        console.log('enviar 4');
  
         } else {

      Swal.fire({
        icon: 'error',
        title: 'la fecha no es valida 44444 !',

      })

    }
  }

  registrar() {

    if (this.semanaI == this.semanaF || this.semanaI < this.semanaF) {

      console.log('registro 1');

      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.calcularForm.value.fechaI;
      let fechaF = this.calcularForm.value.fechaF;
      let horasDiurnas = this.horasDiurnas;
      let horasDominicales = this.horasDominicales;
      let horasNocturnas = this.horasNocturnas;
      let semana = this.semanaI;


      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasDiurnas, horasDominicales, horasNocturnas, fechaI, fechaF, semana)
      console.log(servicioNew, 'data')
      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 5500,
        });

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid!',

      })

      );
        window.location.reload(); 

    } else if (this.semanaI < this.semanaF) {

      console.log('registro 2');

      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.calcularForm.value.fechaI;
      let fechaF = this.calcularForm.value.fechaF;
      let horasDiurnas = this.horasDiurnas;
      let horasDominicales = this.horasDominicales;
      let horasNocturnas = this.horasNocturnas;
      let semana = this.semanaI;

      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasDiurnas, horasDominicales, horasNocturnas, fechaI, fechaF, semana)
      console.log(servicioNew);

      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 5500,
        });

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid 22222!',

      })

      );
       window.location.reload();

    } else {
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios 3333333!",

      })
    }

  }

  registrar1() {

    if (this.calcularForm.valid) {


      console.log('registro 3');

      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.calcularForm.value.fechaI;
      let fechaF = this.calcularForm.value.fechaF;
      let horasDiurnas = this.horasDiurnas;
      let horasDominicales = 0;
      let horasNocturnas = this.horasNocturnas;
      let semana = this.semanaI;
      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasDiurnas, horasDominicales, horasNocturnas, fechaI, fechaF, semana)
      console.log(servicioNew)

      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid 333333!',

      })

      );
       window.location.reload(); 

    } else {
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios 444444!",

      })
    }


  }

  registrar2() {

    if (this.calcularForm.valid) {

      console.log('registro 3');

      let idEmpleado = this.calcularForm.value.idEmpleado;
      let idServicio = this.calcularForm.value.idServicio;
      let horaI = this.calcularForm.value.horaI;
      let horaF = this.calcularForm.value.horaF;
      let fechaI = this.calcularForm.value.fechaI;
      let fechaF = this.calcularForm.value.fechaF;
      let horasDiurnas = 0;
      let horasDominicales = this.horasDominicales;
      let horasNocturnas = 0;
      let semana = this.semanaF;

      let servicioNew = new ServicioNew(idEmpleado, idServicio, horaI, horaF, horasDiurnas, horasDominicales, horasNocturnas, fechaI, fechaF, semana)
      console.log(servicioNew)

      this.service.saveReporte(servicioNew).subscribe(data => {
        console.log(data);

      }, error => Swal.fire({
        icon: 'error',
        title: 'invalid 333333!',

      })

      );
       window.location.reload(); 

    } else {
      Swal.fire({
        icon: 'error',
        title: 'invalid',
        text: "todos los campos son necesarios 444444!",

      })
    }


  }

  

}
