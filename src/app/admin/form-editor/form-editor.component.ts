import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [PanelModule,InputTextareaModule ,ReactiveFormsModule,DropdownModule,FileUploadModule,FormsModule,CommonModule,InputTextModule,CardModule],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {

  form:FormGroup;
  questions:FormArray = this.fb.array([
    new FormGroup({
      questionType: this.fb.control('',Validators.required),
      text: this.fb.control('',Validators.required),
      options: this.fb.array([])
    })
  ]);
  defaultIntro = 'Congradulation, you were selected as candidate to this role.'+ 
  'After you press button below will begin demonstration of our app wit example question you can stop' + 
  'it in any time and return back in any time later.';
  defaultFinish = 'We will contact you after reivew.';

  statuses = [
    { name: 'ACTIVE', code: 'ACTIVE' },
    { name: 'SUSPENDED', code: 'SUSPENDED' },
    { name: 'DONE', code: 'DONE' }
  ]; 
  qType = [
    { name: 'Video sequence', code: 'videoBlitz' },
    { name: 'Video', code: 'video' },
    { name: 'Text fields', code: 'inputText' },
    { name: 'Checkbox(single choise)', code: 'checkboxSingle' },
    { name: 'Checkbox(multiple choise)', code: 'checkboxMultiple' },
  ]; 
  constructor(private route:ActivatedRoute,private fb: FormBuilder){
    
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    let data;
    if(id){
      //TODO load question
      //build form
      //put data in form
    } 
    this.buildForm(data)
     
  }
  buildForm(data:any){
    if(!data){
      this.form = new FormGroup({
        title: this.fb.control('',Validators.required),
        company:this.fb.control('',Validators.required),
        status: this.fb.control('',Validators.required),
        intro: new FormGroup({
          text: this.fb.control(this.defaultIntro,Validators.required)
        }),
        questions: this.questions,
        finish: new FormGroup({
          text: this.fb.control(this.defaultFinish,Validators.required)
        })
      })
    } else {

    }    
  }
  addQuestion(){
    this.questions.push(
      new FormGroup({
        questionType: this.fb.control('',Validators.required),
        text: this.fb.control('',Validators.required),
        options: this.fb.array([])
      })
    )
  }
  getOptions(item:any){
    let res = (item.get('options') as FormArray).controls;

    return res;
  }
  addOption(question:any){
    question.get('options').push(this.fb.control('',Validators.required));
  }

  deleteQuestion(id:number){
    this.questions.removeAt(id);
  }
  typeChange(item:any){
    const arr = item.get('options');
    while(arr.length > 0) {
      arr.removeAt(0);
    }
  }
  save(){
    console.log(this.form.value);    
  }

}
