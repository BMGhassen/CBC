// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// interface Blog {
//   // Define the properties of your blog data here
// }
// interface PackDetails{
//   title: string;
//   prix: number;
// }
// @Injectable({
//   providedIn: 'root'
// })
 

//  export class BlogDataService {
//    private blogSource = new BehaviorSubject<any[]>([]);
//    blogs$: Observable<Blog[]> = this.blogSource.asObservable();
  
//   constructor() { }
  
//   setBlogs(blogs: Blog[]) 
//   {
//     console.log("8888");
//       this.blogSource.next(blogs); // Share a copy to avoid mutation
//       console.log("9999"+this.blogSource);
//   }
// }

// export class PackDetailsService {
//   private packDetailsSource = new BehaviorSubject<PackDetails | null>(null);
//   packDetails$: Observable<PackDetails | null> = this.packDetailsSource.asObservable();

//   setPackDetails(details: PackDetails) {
//     this.packDetailsSource.next(details);
//   }
// }

