import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Toast, ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  private readonly postsSvc = inject(PostsService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  posts: Post[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.errorMsg = '';
    const start = performance.now();
  
    this.postsSvc.getPosts(10).subscribe({
      next: (data) => {
        this.posts = data;
        this.stopLoadingWithMinDuration(start, 2000); // 2s mínimo
      },
      error: (err) => {
        this.errorMsg = err.message ?? 'No se pudo cargar.';
        this.stopLoadingWithMinDuration(start, 1500);
      }
    });
  }
  
  
  private stopLoadingWithMinDuration(start: number, minMs: number): void {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, minMs - elapsed);
    setTimeout(() => { this.loading = false; }, remaining);
  }

  view(post: Post): void {
    this.router.navigate(['/posts', post.id]);
  }

  edit(post: Post): void {
    this.router.navigate(['/posts', post.id, 'edit']);
  }

  delete(post: Post): void {
    if (!post.id) return;
    const ok = window.confirm(`¿Eliminar publicación #${post.id}?`);
    if (!ok) return;

    this.postsSvc.deletePost(post.id).subscribe({
      next: () => {
        // Simular borrado exitoso en UI
        this.posts = this.posts.filter(p => p.id !== post.id);
        this.toast.success('Publicación eliminada correctamente')
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => this.errorMsg = err.message ?? 'Error al eliminar'
    });
  }

  create(): void {
    this.router.navigate(['/posts/new']);
  }
}