import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../models/post.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = 'posts';

  constructor(private http: HttpClient) {}

  getPosts(userId:number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.baseUrl}/${this.url}?userId=${userId}`);
  }
}
