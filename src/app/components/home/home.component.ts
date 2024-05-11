import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomicilicionComponent } from '../domicilicion/domicilicion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomicilicionComponent,RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
      constructor(){
        console.log('localStorage accessToken:', localStorage.getItem('accessToken'));
      }

      //BlogsArray = [{title:Blogs1,Content:hello,button:Click},{},{}]

      /**
       * GetBlogs(){
       * 
       * GetRequest
       * 
       * this.BlogsArray = response.blogs
       * }
       */
}
