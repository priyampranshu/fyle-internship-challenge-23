import { Component } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'responsive-webpage';
  username: string = '';
  userDetails: any;
  repositories: any[] = [];
  pagedRepositories: any[][] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  itemsPerPageOptions: number[] = [10, 25, 50, 100];
  loading: boolean = false;

  constructor(private githubService: GithubService) {}

  searchUser() {
    if (this.username) {
      this.loading = true;
      this.githubService.getUserDetails(this.username)
        .subscribe(
          (data) => {
            this.userDetails = data;
            this.searchRepositories();
          },
          (error) => {
            console.error('Error fetching user details:', error);
            this.loading = false;
          }
        );
    }
  }

  searchRepositories() {
    if (this.username) {
      this.githubService.getRepositories(this.username)
        .subscribe(
          (data: any[]) => {
            this.repositories = data;
            this.setPagedRepositories();
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching repositories:', error);
            this.loading = false;
          }
        );
    }
  }

  setPagedRepositories() {
    this.pagedRepositories = [];
    for (let i = 0; i < this.repositories.length; i += this.itemsPerPage) {
      this.pagedRepositories.push(this.repositories.slice(i, i + this.itemsPerPage));
    }
    this.currentPage = 0;
  }

  onItemsPerPageChange() {
    this.setPagedRepositories();
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.pagedRepositories.length - 1) {
      this.currentPage++;
    }
  }
}
