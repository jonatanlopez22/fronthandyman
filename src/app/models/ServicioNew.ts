export class ServicioNew {

    idEmpleado: number;
    idServicio: number;
    horaI: number;
    horaF: number;
    horasDiurnas: number;
    horasDominicales: number;
    horasNocturnas: number;
    fechaF: String;
    fechaI: String;
    semana: number;


    constructor(idEmpleado: number, idServicio: number, horaI: number, horaF: number, horasDiurnas: number, horasDominicales: number, horasNocturnas: number, fechaI: String, fechaF: String, semana: number) {

        this.idEmpleado = idEmpleado;
        this.idServicio = idServicio;
        this.horaI = horaI;
        this.horaF = horaF;
        this.horasDiurnas = horasDiurnas;
        this.horasDominicales = horasDominicales;
        this.horasNocturnas = horasNocturnas;
        this.fechaI = fechaI;
        this.fechaF = fechaF;
        this.semana = semana;

    }



}