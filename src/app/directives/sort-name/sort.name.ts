import {OnInit, Renderer, Input } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';
@Directive({selector: '[sortName]'})

/**
 * This Attribute Directive is made to sort the products based on Names
 */
export class SortDirective implements OnInit {
  @Input('data') columns: any;
  @Input('sortKey') key: any;
  private toggleSort: boolean = false;

  constructor (private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit () {
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      const parentNode = this.el.nativeElement.parentNode;
      const children   = parentNode.children;
      if (this.columns && this.key) {
        const sortedData: any = this.sortArray();
      }
      this.toggleSort = !this.toggleSort;
    });
  }

  /**
   * This is the function which sorts Names in Product table
   */
  sortArray (): Array<any> {
    const tempArray: Array<any> = this.columns;
    tempArray.sort((a, b) => {
      const aKey = a[this.key];
      const str1: string = a[this.key].toLowerCase();
      const str2: string = b[this.key].toLowerCase();
        if (this.toggleSort) {
          if (str1 < str2) {
            return -1;
          }
          if (str1 > str2) {
            return 1;
          }
        } else {
          if (str1 > str2) {
            return -1;
          }
          if (str1 < str2) {
            return 1;
          }
        }
      return 0;
    });
    return tempArray;
  }
}
