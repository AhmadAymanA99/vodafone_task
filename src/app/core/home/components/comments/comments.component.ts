import { Component, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../../../models/comment.model';
import { LoadingSpinnerComponent } from '../../../../common/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  imports: [LoadingSpinnerComponent],
})
export class CommentsComponent {
  isCommentLoading: boolean = false;
  @Input()
  set postId(id: number) {
    this.getComments(id);
  }
  commentsData: Comment[] = [];

  constructor(private commentService: CommentService) {}

  getComments(postId: number) {
    const cachedComment = this.commentService.cachedComments$.value;
    if (cachedComment[postId]) {
      this.commentsData = cachedComment[postId];
      return;
    }
    this.isCommentLoading = true;
    this.commentService.getComments(postId).subscribe({
      next: (res) => {
        this.commentService.cachedComments$.next({
          ...cachedComment,
          [postId]: res,
        });
        this.isCommentLoading = false;
        this.commentsData = res;
      },
      error: (err) => {
        this.isCommentLoading = false;
      },
    });
  }
}
