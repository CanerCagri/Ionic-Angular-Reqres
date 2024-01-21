import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  data: any[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private http: HttpClient) {}

  ngOnInit() {}

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData(event = null) {
    this.http
      .get<{ data: any[] }>('https://reqres.in/api/users?page=2')
      .subscribe(
        (resp: { data: any[] }) => {
          this.data = resp.data.map(user => {
            return {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              avatar: user.avatar
            };
          });
        },
        (error) => {
          console.error('HTTP request failed', error);
        }
      );
  }
}
