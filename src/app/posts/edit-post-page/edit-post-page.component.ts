import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { PostFormComponent } from '../post-form/post-form.component';
import { ToastService } from '../../shared/toast.service'; 

@Component({
  selector: 'app-edit-post-page',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './edit-post-page.component.html'
})


export class EditPostPageComponent implements OnInit {
  private readonly postsSvc = inject(PostsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService)

  post: Post | null = null;
  loading = false;
  errorMsg = '';
  successMsg = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.errorMsg = 'ID inválido'; return; }
    this.loading = true;
    this.postsSvc.getPost(id).subscribe({
      next: (p) => { this.post = p; this.loading = false; },
      error: (e) => {  this.toast.error(e.message ?? 'Error al cargar');  }
    });
  }

  onSubmit(value: Omit<Post, 'id'>): void {
    if (!this.post?.id) return;
  
    // Evita PUT si no hubo cambios (bonus elegante)
    const before = { userId: this.post.userId, title: this.post.title, body: this.post.body };
    if (this.equals(before, value)) {
      // opcional: this.toast.info('No hay cambios para guardar');
      return;
    }
  
    this.successMsg = this.errorMsg = '';
    this.postsSvc.updatePost(this.post.id, { id: this.post.id, ...value }).subscribe({
      next: () => {
        const merged = { ...this.post!, ...value };          // 👈 objeto ya actualizado
        this.toast.success('Publicación actualizada');
        this.router.navigate(['/posts', this.post!.id], {    // 👈 pasa el post en state
          state: { post: merged }
        });
      },
      error: (e) => this.errorMsg = e.message ?? 'Error al actualizar'
    });
  }
  
  private equals(a: Omit<Post,'id'>, b: Omit<Post,'id'>): boolean {
    return a.userId === b.userId &&
           a.title.trim() === b.title.trim() &&
           a.body.trim() === b.body.trim();
  }
  
}
