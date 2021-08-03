export class Servicio {

    id: number;
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

    
    constructor(listar: { id: number; idEmpleado: number; idServicio: number; horaI: number; horaF: number;  horasDiurnas: number; horasDominicales: number; horasNocturnas: number; fechaI: String;fechaF: String; semana: number; }) {

        this.id = listar.id;
        this.idEmpleado = listar.idEmpleado;
        this.idServicio = listar.idServicio;
        this.horaI = listar.horaI;
        this.horaF = listar.horaF;
        this.horasDiurnas = listar.horasDiurnas;
        this.horasDominicales = listar.horasDominicales;
        this.horasNocturnas = listar.horasNocturnas;
        this.fechaI = listar.fechaI;
        this.fechaF = listar.fechaF;
        this.semana = listar.semana;

    }

}