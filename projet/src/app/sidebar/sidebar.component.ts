import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../Service/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
 

  constructor(private authService: AuthService) {}
  visible = false;
  role: string | null = null;


  Affiche() {
    if (this.visible === false) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.role = localStorage.getItem("userRole");
      console.log('je suis admin sidebar', localStorage.getItem("userRole"));
    });
  }


}
