import { Component } from '@angular/core';
import { SecurityService } from '../shared/security-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})

export class AppComponent {
  title = 'MI Ishfaak';
  constructor(public securityService:SecurityService) {

    // this.securityService.GetIsUserActive().subscribe(data=>{
    //   if(data.toString()=="false"){
    //     window.location.href = (this.securityService.baseurl);      
    //   }     
    // });
    }

  ngOnInit(){
    // Storing a simple value
    //const user = { name: 'John', age: 30 };
    //sessionStorage.setItem('user', JSON.stringify(user));
    //alert('Data saved!');

  }
  
}
