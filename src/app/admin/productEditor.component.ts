import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from './mime-type.validator';
import {Subscription} from 'rxjs';


@Component({
  templateUrl: 'productEditor.component.html',
  styleUrls: ['productEditor.component.css']
})
export class ProductEditorComponent implements OnInit, OnDestroy {
  public editing: boolean = false;
  public product: Product;
  public newCat: string;
  public newSubCat: string;
  public formSubmitted: boolean = false;
  public catEnable = false;
  public subCatEnable = false;
  public form: FormGroup;
  public imagePreview: string;
  private subsUpdatedProduct: Subscription;

  constructor(private repository: ProductRepository,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.editing = this.activeRoute.snapshot.params['mode'] == 'edit';
    // this.pCategory = activeRoute.snapshot.params['parentCategory'];
    this.product = new Product();
    if (this.editing) {
      Object.assign(this.product,
        this.repository.getProduct(this.activeRoute.snapshot.params['id']));
    } else {
      this.product.parentCategory = 'shop';
    }
    this.form = new FormGroup({
      'name': new FormControl(this.product.name || null, {validators: [Validators.required]}),
      'parentCategory': new FormControl(this.product.parentCategory || null, {validators: [Validators.required]}),
      'category': new FormControl(this.product.category || null, {validators: [Validators.required]}),
      'newCategory': new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      'subcategory': new FormControl(this.product.subcategory || ''),
      'newSubcategory': new FormControl({value: '', disabled: true}),
      'description': new FormControl(this.product.description || null, {validators: [Validators.required]}),
      'img': new FormControl(this.product.img || null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      }),
      'diameter': new FormControl(this.product.diameter || '', {validators: [Validators.pattern('[0-9\\.]+$')]}),
      'price': new FormControl(this.product.price || null, {validators: [Validators.pattern('[0-9\\.]+$'), Validators.required]}),

    });
    this.form.get('parentCategory').valueChanges
      .subscribe(changedPCat => {
        this.product.parentCategory = changedPCat;
        this.product.subcategory = '';
        this.form.patchValue({subcategory: null});
        this.product.category = null;
      });
    this.form.get('category').valueChanges
      .subscribe(changedCat => {
        this.product.category = changedCat;
      });
    this.form.get('subcategory').valueChanges
      .subscribe(changedSCat => {
        this.product.subcategory = changedSCat;
      });
  }

  newCatCheck() {
    this.catEnable = !this.catEnable;
    if (this.catEnable) {
      this.form.get('newCategory').enable();
    } else {
      this.form.get('newCategory').disable();
    }
  }

  newSubCatCheck() {
    this.subCatEnable = !this.subCatEnable;
    if (this.subCatEnable) {
      this.form.get('newSubcategory').enable();
    } else {
      this.form.get('newSubcategory').disable();
    }
  }

  public changeProductCategory(): void {
    if (this.form.value.newCategory) {
      this.form.patchValue({category: this.form.value.newCategory});
      this.product.category = this.form.value.newCategory;
    } else {
      return;
    }
  }

  public changeProductSubCategory(): void {
    if (this.form.value.newSubcategory) {
      this.form.patchValue({subcategory: this.form.value.newSubcategory});
      this.product.subcategory = this.form.value.newSubcategory;
    } else {
      return;
    }
  }

  get categories(): string[] {
    if (!this.product.parentCategory) {
      return;
    }
    return this.repository.getCategories(this.product.parentCategory);
  }

  get parentCategory(): string[] {
    return this.repository.getParentCategories();
  }

  get subCategories(): string[] {
    if (!this.product.category) {
      return;
    }
    return this.repository.getSubCategories(this.product.category);
  }

  public removeImg() {
    // this.imagePreviewCollection.splice(i, 1);
    this.form.patchValue({'img': null});
    this.form.get('img').updateValueAndValidity();
    this.imagePreview = '';
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // this.imagePreviewCollection.push(reader.result as string);
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.product.img = reader.result as string;
    this.form.patchValue({'img': file});
    this.form.get('img').updateValueAndValidity();
  }

  console(v) {
    console.log(v);
  }

  save() {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    } else {
      if (!this.editing) {
        this.repository.addProduct(
          this.form.value.name,
          this.form.value.parentCategory,
          this.form.value.category,
          this.form.value.subcategory,
          this.form.value.description,
          this.form.value.diameter,
          this.form.value.price,
          this.form.value.img,
          new Date().toLocaleString()
        );
      } else {
        this.repository.updateProduct(
          this.product._id,
          this.form.value.name,
          this.form.value.parentCategory,
          this.form.value.category,
          this.form.value.subcategory,
          this.form.value.description,
          this.form.value.diameter,
          this.form.value.price,
          this.form.value.img,
          new Date().toLocaleString()
        );
      }
      this.formSubmitted = false;
      this.form.reset();
      this.subsUpdatedProduct = this.repository.productsUpdated.subscribe(update => {
        if (update) {
          this.router.navigateByUrl('/admin/main/products');
        }
      });

    }
  }

  ngOnDestroy() {
    if (this.subsUpdatedProduct) {
      this.subsUpdatedProduct.unsubscribe();
    }
  }

}
