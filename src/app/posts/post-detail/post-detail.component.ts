import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})

export class PostDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postsSvc = inject(PostsService);

  post?: Post;
  loading = false;
  errorMsg = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.errorMsg = 'ID inválido'; return; }
    this.loading = true;
    this.postsSvc.getPost(id).subscribe({
      next: (p) => { this.post = p; this.loading = false; },
      error: (e) => { this.errorMsg = e.message ?? 'Error al cargar'; this.loading = false; }
    });
  }

  back(): void {
    this.router.navigate(['/posts']);
  }

  edit(): void {
    if (this.post?.id) this.router.navigate(['/posts', this.post.id, 'edit']);
  }
}


