import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from '../../models/user.model';
import { PostsComponent } from './components/posts/posts.component';
import { LoadingSpinnerComponent } from '../../common/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [PostsComponent, LoadingSpinnerComponent],
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  isPostsLoading: boolean = false;
  userImage: string =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  isUserLoading: boolean = false;
  selectedUser!: {
    userId: number;
    username: string;
    userImage: string;
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isUserLoading = true;
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.isUserLoading = false;
      },
      error: () => {
        this.isUserLoading = false;
      },
    });
  }

  loadPosts(userId: number, username: string) {
    this.selectedUser = {
      userId,
      username,
      userImage: this.userImage,
    };
  }

  triggerPostsLoading(loading: boolean) {
    this.isPostsLoading = loading;
  }

  isActive(userId: number): boolean {
    return this.selectedUser?.userId === userId;
  }
}
