import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
//import { StaticDataSource } from "./static.datasource";
import { RestService } from "../services/rest.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded: boolean = false;

  constructor(private rest: RestService, private http: HttpClient) {}

  loadOrders() {
    this.loaded = true;
    this.rest.getOrders().subscribe(orders => (this.orders = orders));
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.rest.saveOrder(order);
  }

  updateOrder(order: Order) {
      this.rest.updateOrder(order).subscribe(order => {
          this.orders.splice(this.orders.
              findIndex(o => o.id == order.id), 1, order);
      });
  }

  deleteOrder(id: number) {
    this.rest.deleteOrder(id);
  }
}
