import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [
        MatCardModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ]
})
export class MaterialModule { }
