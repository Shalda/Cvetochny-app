import {Component, OnInit} from '@angular/core';
import {Visual} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {mimeType} from './mime-type.validator';
import {projectionDef} from '@angular/core/src/render3/instructions';

@Component({
    templateUrl: 'visualEditor.component.html',
    styleUrls: ['visualEditor.component.css']
})
export class VisualEditorComponent implements OnInit {
    public editing: boolean = false;
    public product: Visual;
    public newCategory: string;
    public formSubmitted: boolean = false;
    public form: FormGroup;
    public imagePreviewCollection = new Array<string>();


    constructor(private repository: ProductRepository,
                private router: Router,
                private activeRoute: ActivatedRoute,
                private fb: FormBuilder) {

    }

    ngOnInit() {
        this.editing = this.activeRoute.snapshot.params['mode'] == 'edit';
        this.product = new Visual();
        if (this.editing) {
            Object.assign(this.product, this.repository.getVisual(this.activeRoute.snapshot.params['id']));
        } else {
            this.product.parentCategory = 'oformlenie';
        }
        this.form = this.fb.group({
            'name': [this.product.name || null, [Validators.required]],
            'parentCategory': [this.product.parentCategory || null, [Validators.required]],
            'category': [this.product.category || null, [Validators.required]],
            'description': [this.product.description || null, [Validators.required]],
            'price': [this.product.price || null, [Validators.pattern('[0-9\\.]+$'), Validators.required]],
            'img': this.fb.array([], [Validators.required])
        });
        const imagesForm = <FormArray>this.form.controls['img'];
        if (this.product.img && this.product.img.length > 0) {
            for (const image of this.product.img) {
                imagesForm.push(this.fb.control(image));
            }
        }
    }

    onImagePicked(event: Event) {
        const imagesForm = <FormArray>this.form.controls['img'];
        this.imagePreviewCollection = [];
        const fileList = (event.target as HTMLInputElement).files;
        while (imagesForm.length !== 0) {
            imagesForm.removeAt(0);
        }
        for (let i = 0; i < fileList.length; i++) {
            {
                const reader = new FileReader();
                reader.readAsDataURL(fileList[i]);
                reader.onload = () => {
                    this.imagePreviewCollection.push(reader.result as string);
                };
            }
            imagesForm.push(this.fb.control(fileList[i]));
            this.form.get('img').updateValueAndValidity();
        }
    }

    removeImg(i) {
        const imagesForm = <FormArray>this.form.controls['img'];
        this.imagePreviewCollection.splice(i, 1);
        imagesForm.removeAt(i);
    }

    save() {
        this.formSubmitted = true;
        if (this.form.invalid) {
            return;
        } else {
            if (!this.editing) {
                this.repository.addVisual(
                    this.form.value.name,
                    this.form.value.parentCategory,
                    this.form.value.category,
                    this.form.value.description,
                    this.form.value.price,
                    this.form.controls['img'].value
                );
                console.log(this.form.controls['img'].value);
            } else {
                this.repository.updateVisual(
                    this.product._id,
                    this.form.value.name,
                    this.form.value.parentCategory,
                    this.form.value.category,
                    this.form.value.description,
                    this.form.value.price,
                    this.form.controls['img'].value
                );
            }
            this.formSubmitted = false;
            this.form.reset();
            this.router.navigateByUrl('/admin/main/visuals');
        }
    }
}
