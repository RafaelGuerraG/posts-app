import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { CreatePostPageComponent } from './posts/create-post-page/create-post-page.component';
import { EditPostPageComponent } from './posts/edit-post-page/edit-post-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new', component: CreatePostPageComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/:id/edit', component: EditPostPageComponent },
  { path: '**', redirectTo: 'posts' }
];
