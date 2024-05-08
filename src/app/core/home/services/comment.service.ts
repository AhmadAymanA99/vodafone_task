import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Comment } from '../../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url: string = 'comments';

  constructor(private http: HttpClient) {}

  getComments(postId:number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.baseUrl}/${this.url}?postId=${postId}`);
  }
}
