import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatBadgeModule
    ],
    exports: [
        MatCardModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatBadgeModule
    ]
})
export class MaterialModule { }
