import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatList} from "@angular/material/list";

@Component({
  selector: 'app-lex',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatInputModule,
    CommonModule, ReactiveFormsModule, MatCardContent, MatToolbar, MatToolbarRow, MatList
  ],
  templateUrl: './lex.component.html',
  styleUrl: './lex.component.css'
})


export class LexComponent {

  conversations: Conversation[] = [];

  addUserForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient,private fb: FormBuilder) {}

  saveUserTyped() {
    this.conversations.push({
      party: 'Me',
      text: this.addUserForm.value.question,
    });

    this.postSveUserTyped(this.addUserForm.value)
        .subscribe((response: any) => {
          this.conversations.push({ party: 'Lex', text: response.createdAt });
        });
    this.addUserForm.reset();
  }
  public postSveUserTyped(user: any): Observable<any> {
    const url = 'https://reqres.in/api/users';
    return this.http.post<any>(url, user);
  }
  ngOnInit(): void {}
}
export interface Conversation {
  party: 'Me' | 'Lex';
  text: any;
}


