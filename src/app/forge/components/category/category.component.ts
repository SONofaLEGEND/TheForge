import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private router:Router){}
  category:string;

  selectCategory(){
    if(this.category)
    {
      this.router.navigate(['/cpu']);
    }
    else
    {console.log('error');}
  }

}
