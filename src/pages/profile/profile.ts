import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalUser } from '../../models/local_user';
import { StorageService } from '../../services/store.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageService: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser: LocalUser = this.storageService.getLocalUser();

    if(localStorage && localUser.email)
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.cliente = response; 
          this.getImageIfExists();
        }, 
        error => {}
      )
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      response => this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`, 
    error => {});
  }

}
