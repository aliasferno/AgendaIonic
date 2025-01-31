import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-aperfil',
  templateUrl: './aperfil.page.html',
  styleUrls: ['./aperfil.page.scss'],
  standalone:false
})
export class AperfilPage implements OnInit {
  txt_nombre:string = "";
  txt_apellido:string = "";
  txt_correo:string = "";
  txt_clave:string = "";
  txt_cclave:string = "";
  cod_persona:string = "";
  persona: any = [];
  mensaje:string = "";

  constructor(
    private servicio: AccesoService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {
    this.servicio.getSession('cod_persona').then((res:any)=>{
      this.cod_persona = res;
      this.cargarDatos();
    });
  }

  ngOnInit() {
  }

  vclave(){
    if(this.txt_clave != this.txt_cclave){
      this.mensaje = "Las contrasenas no coinciden";
    }else{
      this.mensaje = "";
    }
  }
  actualizar(){
    if(this.txt_nombre!="" && this.txt_correo!="" && this.txt_clave!="")
    {
      let datos = {
        action:'aperfil',
        nombre: this.txt_nombre,
        apellido: this.txt_apellido,
        correo: this.txt_correo,
        clave: this.txt_clave,
        cod_persona: this.cod_persona
      }
      this.servicio.postData(datos).subscribe((res:any) => {
        if(res.estado){
          this.servicio.showToast(res.mensaje, 3000);
          this.navCtrl.navigateRoot('/menu');
        }
        else{
          this.servicio.showToast(res.mensaje, 3000);
        }
      });
    }
    else{
      this.servicio.showToast('Faltan datos por llenar', 3000);
    }
  }
  cargarDatos(){
    let datos = {
      "action":"dpersona",
      "cod_persona":this.cod_persona
    }

    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.persona = res.data;
        this.txt_nombre = this.persona.nombre;
        this.txt_apellido = this.persona.apellido;
        this.txt_correo = this.persona.correo;
      }else{
        this.servicio.showToast(res.message, 2000);
      }
    })
  }

  cancelar(){
    this.navCtrl.navigateRoot('/menu');
  }

}
