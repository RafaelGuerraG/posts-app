import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject
} from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, NonNullableFormBuilder
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';

type PostFormModel = { userId: number; title: string; body: string; };

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnChanges {
  // usa el builder no–nullable para evitar null/undefined en controles
  private readonly fb = inject(NonNullableFormBuilder);

  @Input() initial?: Post | null = null;
  @Input() submitLabel = 'Guardar';
  @Output() submitted = new EventEmitter<PostFormModel>();

  form!: FormGroup<{
    userId: FormControl<number>;
    title:  FormControl<string>;
    body:   FormControl<string>;
  }>;

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: this.fb.control(1, { validators: [Validators.required, Validators.min(1)] }),
      title:  this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),
      body:   this.fb.control('', { validators: [Validators.required, Validators.minLength(5)] }),
    });

    if (this.initial) this.patch(this.initial);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initial'] && !changes['initial'].firstChange && this.form) {
      this.patch(this.initial ?? null);
    }
  }

  private patch(post: Post | null): void {
    if (!post) return;
    this.form.patchValue({ userId: post.userId, title: post.title, body: post.body });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitted.emit(this.form.getRawValue());
  }

  get f() { return this.form.controls; }
}
