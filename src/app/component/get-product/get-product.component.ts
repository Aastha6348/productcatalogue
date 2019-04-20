import { Component, OnInit} from '@angular/core';
import { ProductDataService } from '../../services';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.scss']
})

/**
 * This is the component which is entry component for the App.
 */
export class GetProductComponent implements OnInit {

  title = 'products-app';
  productsObj: any;
  productContent: any;
  constructor(private productDataService: ProductDataService) { }

  ngOnInit() {
    this.getContentJSON();
  }

  /**
  * This is a function fetches data from service and puts up in Array object
  */
  getContentJSON() {
    this.productDataService.getJSON('productcatalogue').subscribe(data => {
      this.productsObj = data;
      const updatedProductData = JSON.parse(localStorage.getItem('updatedProductData'));
      if (updatedProductData) {
        for (const index in this.productsObj) {
          if (this.productsObj[index]['name'] === updatedProductData['name']) {
            this.productsObj.splice(index, 1);
          }
        }
        this.productsObj.push(updatedProductData);
      }
      this.productContent = this.productsObj;
    }, err => {
      console.error(err);
    });
  }

  /**
  * This is a function where we store the to be updated product data in localStorage
  * and redirects the user to edit product Page
  */
  onUpdateClick(index: number) {
    localStorage.clear();
    const data = this.fetchProductData(index);
    localStorage.setItem('editData', JSON.stringify(data));
    window.location.href = '/edit-product';
  }

  /**
  * This is a function fetches the complete data of selected product
  */
  fetchProductData(index: number) {
    const obj: Object = {
      name: this.productContent[index].name,
      weight: this.productContent[index].weight,
      availability: this.productContent[index].availability,
      isEditable: this.productContent[index].isEditable,
      pricingTier: this.productContent[index].pricingTier,
      productUrl: this.productContent[index].productUrl,
      priceRange: this.productContent[index].priceRange
    };
    return obj;
  }
}
