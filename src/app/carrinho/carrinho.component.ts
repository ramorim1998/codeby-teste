import { Totalizers } from './models/totalizers';
import { CarrinhoService } from './services/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Item } from './models/item';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  listaCarrinho: Item[] = [];
  totalValue: number = 0;
  constructor(private carrinhoService: CarrinhoService) {
   }

  ngOnInit(): void {
    this.getItems();
    this.getValue();
  }
  getItems() {
    this.carrinhoService.getItems().subscribe((items: Item[]) => this.listaCarrinho = items)
  }
  getValue() {
    this.carrinhoService.getTotal().subscribe( (totalizer:Totalizers[]) => {
      this.getFinalValue(totalizer);
    });
  }

  getFinalValue(totalizer:Totalizers[]) {
    this.totalValue = totalizer[0].value + totalizer[1].value;
  }
}
