import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
  standalone: false,
})
export class RclavePage implements OnInit {

  txt_correo:string = "";
  txt_clave:string = "";
  txt_cclave:string = "";
  cod_persona:string = "";
  mensaje:string = "";
  existe:boolean = false;
  persona:any = [];

  constructor(private servicio: AccesoService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
  vclave(){
    if(this.txt_clave != this.txt_cclave){
      this.mensaje = "Las contrasenas no coinciden";
    }else{
      this.mensaje = "";
    }
  }

  consultar(){
    let datos = {
      "action":"rcuenta",
      "correo":this.txt_correo
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.persona = res.data;
        this.cod_persona = this.persona.codigo;
        this.existe = true;
      }else{
        this.servicio.showToast(res.message, 2000);
      }
    })
  }

  guardar(){
    let datos = {
      "action":"sclave",
      "clave":this.txt_clave,
      "cod_persona":this.cod_persona
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.servicio.showToast(res.mensaje, 2000);
        this.modalCtrl.dismiss();
      }else{
        this.servicio.showToast(res.mensaje, 2000);
      }
    })
  }

}
