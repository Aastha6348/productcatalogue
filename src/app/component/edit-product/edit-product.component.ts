import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDataService } from '../../services';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

/**
 * This is the component which is entry component for the App.
 * This accounts for Add, delete and show products
 */
export class EditProductComponent implements OnInit {

  formdata;
  priceRange;
  pricingInfoData;

  constructor(private productDataService: ProductDataService) { }

  ngOnInit() {

    // Fetching the data to be updated from localstorage
    const editData = JSON.parse(localStorage.getItem('editData'));
    if (editData) {
      this.getContentJSON(editData['pricingTier'], editData);
    } else {
      window.alert('please Go back and select a product');
      window.location.href = '';
    }
    localStorage.clear();
  }

  /**
  * This is a function which adds the contact from table
  * this will be triggered when user click on Add Contact Button
  */
  onAddClick(data: any): void {
    localStorage.setItem('updatedProductData', JSON.stringify(data));
    window.location.href = '';
  }

  /**
  * This is a function fetches data from service and puts up in Array object
  */
  getContentJSON(pricingtier: any, editData: any) {
    this.productDataService.getJSON('pricinginfo').subscribe(data => {
      this.pricingInfoData = data;

      // Setting form's default data which needs to be updated.
      this.formdata = new FormGroup({
        name: new FormControl(editData['name'], [Validators.required, Validators.minLength(10)]),
        weight: new FormControl(editData['weight'], [Validators.required]),
        availability: new FormControl(editData['availability']),
        productUrl: new FormControl(editData['productUrl'], [Validators.required]),
        pricingTier: new FormControl(editData['pricingTier'], [Validators.required]),
        isEditable: new FormControl('', [Validators.required]),
        priceRange: new FormControl('')
      });
      this.priceRange = this.pricingInfoData[this.formdata.controls.pricingTier.value];
    },
      err => {
        console.error(err);
      });
  }

  /**
  * This is a function which fetches the change in priceTier Value
  */
  onSelect(data: any) {
    this.priceRange = this.pricingInfoData[data]; // Setting new Value for dropdown data
  }

  /**
  * This is a function which redirects to productCatalogue page
  */
  goBack() {
    window.location.href = '';
  }
}
