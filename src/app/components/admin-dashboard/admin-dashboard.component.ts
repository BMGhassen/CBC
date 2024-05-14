import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Msgadmin1Component } from '../msgadmin1/msgadmin1.component';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [CommonModule, RouterOutlet, RouterModule, Msgadmin1Component]
})
export class AdminDashboardComponent {
    gencontrat=false;
    cl=false;
    serv=false;
    clmsg=false;
    vismsg=false;
    contrat=false;
    factures=false;
    


}
