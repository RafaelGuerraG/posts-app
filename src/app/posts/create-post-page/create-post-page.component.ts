import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { NewPost } from '../../models/post.model';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-create-post-page',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './create-post-page.component.html'
})
export class CreatePostPageComponent {
  private readonly postsSvc = inject(PostsService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService); // inyecta el ToastService

  onSubmit(formValue: NewPost): void {
    this.postsSvc.createPost(formValue).subscribe({
      next: () => {
        this.toast.success('Publicación creada'); // toast éxito
        this.router.navigate(['/posts']);
      },
      error: (e) => {
        this.toast.error(e.message ?? 'Error al crear'); // toast error
      }
    });
  }
}