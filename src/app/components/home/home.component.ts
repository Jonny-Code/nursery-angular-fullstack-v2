import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { ProductRepository } from "../../models/product.repository";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  cartProducts: Product[];
  cartProdsPerPage = localStorage.length;
  name: string;
  company: string;
  location: string;
  email: string;
  hasAccount: boolean;

  constructor(private repo: ProductRepository) {}

  ngOnInit() {
    let items = { ...localStorage };
    let arr = [];
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        arr.push(JSON.parse(element));
      }
    }
    this.cartProducts = arr;
    if (sessionStorage.length > 0) {
      this.hasAccount = true;
      this.name = JSON.parse(sessionStorage.getItem("account")).name;
      this.company = JSON.parse(sessionStorage.getItem("account")).company;
      this.location = JSON.parse(sessionStorage.getItem("account")).location;
      this.email = JSON.parse(sessionStorage.getItem("account")).email;
    } else this.hasAccount = false;
  }

  get cart(): Product[] {
    return this.cartProducts.slice(0, this.cartProdsPerPage);
  }

  getSelectOptions = (): Array<any> => {
    return new Array(localStorage.length);
  };

  changeCartSize = (newSize: number) => {
    this.cartProdsPerPage = newSize;
  };

  openCart = () => {
    let items = { ...localStorage };
    let arr = [];
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const element = items[key];
        arr.push(JSON.parse(element));
      }
    }
    this.cartProducts = arr;
  };

  removeCartItem = (e: number) => {
    localStorage.removeItem(`${e}`);
    this.repo.getProducts().forEach(prod => {
      if (e == prod.id) prod.inCart = false;
    });
    this.ngOnInit();
  };
}
