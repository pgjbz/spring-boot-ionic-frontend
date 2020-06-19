import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items : CategoriaDTO[];
  bucketUrl : string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoriaService: CategoriaService) {
  }

  ionViewDidLoad(): void {
    this.categoriaService.findAll().subscribe(response => this.items = response, error => {});
  }

  showProdutos(codigoCategoria: string): void{
    this.navCtrl.push('ProdutosPage', { codigoCategoria });
  }

}
