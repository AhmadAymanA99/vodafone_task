import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Post } from '../../../../models/post.model';
import { PostService } from '../../services/post.service';
import { LimitToPipe } from './limit-to.pipe';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [LimitToPipe, CommentsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnChanges {
  @Input() user !: { userId: number; username: string; userImage: string };
  isPostsLoading: boolean = false;
  postImage: string =
    'https://images.unsplash.com/photo-1714547509046-0cf60126f331?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  posts: Post[] = [];
  selectedPostId !: number ;


  constructor(private postService: PostService) {}

  ngOnChanges(changes: any): void {
    if( changes.user.currentValue?.userId === changes.user.previousValue?.userId) return;
    const userId = changes.user.currentValue.userId;
    this.getPosts(userId);
  }

  getPosts(userId: number) {
    this.isPostsLoading = true;
    this.postService.getPosts(userId).subscribe({
      next: (res) => {
        this.posts = res;
        this.isPostsLoading = false;
      },
      error: () => {
        this.isPostsLoading = false;
      },
    });
  }

  loadComments(postId:number){
this.selectedPostId = postId;
  }
}
