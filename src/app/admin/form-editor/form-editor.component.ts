import { CommonModule } from '@angular/common';
import { Component, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { AdminService } from '../admin.service';
import { Form } from '../model/form.model';
import { CurrentFormStore } from './currentForm.store';
import { getState } from '@ngrx/signals';
import { QuestionData } from '../../shared/model/question-data.model';
import { Option } from '../../shared/model/question-data.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [CheckboxModule,ToastModule,PanelModule,InputTextareaModule ,ReactiveFormsModule,DropdownModule,FileUploadModule,FormsModule,CommonModule,InputTextModule,CardModule],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {
  readonly currentFormStore = inject(CurrentFormStore);
  reviews:number|undefined = 0;
  form:FormGroup;
  questions:FormArray;
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
    { name: 'Video blitz', code: 'videoBlitz' },
    { name: 'Video', code: 'video' },
    { name: 'Text fields', code: 'inputText' },
    { name: 'Checkbox(single choise)', code: 'checkboxSingle' },
    { name: 'Checkbox(multiple choise)', code: 'checkboxMultiple' },
  ]; 
  id:string|null;
  formHeader:string = 'New Form'
  saveBtnTxt:string = 'Save'
  constructor(private router: Router,private msgSrv:MessageService,private route:ActivatedRoute,private fb: FormBuilder,private adminSrv:AdminService,private messageService: MessageService){
    this.id = this.route.snapshot.paramMap.get('id');
    let data:WritableSignal<Form|null> = signal(null);
    if(this.id){
      this.formHeader = 'Edit Form';
      this.saveBtnTxt = 'Update';
      effect(()=>{
        const state = getState(this.currentFormStore);
        if(state.form){
          this.form = new FormGroup({});
          this.buildFormByData(state.form);
          this.reviews = state.form.reviews;
        }
      })
      this.currentFormStore.loadForm(this.id);
    }else{ 
      this.buildEmptyForm();
    }
  }
  ngOnInit() {
    
  }

  buildFormByData(data:Form){
    const statusVal:any = this.findStatus(data.status);
    this.questions = this.fb.array([
      new FormGroup({
        questionType: this.fb.control({ name: 'Video', code: 'video' },Validators.required),
        sec: this.fb.control('5',Validators.required),
        text: this.fb.control('',Validators.required),
        options: this.fb.array([]),
        shareable: this.fb.control(true)
      })
    ]);
    const group = {
      systemGroup: new FormGroup({
        startTitle: this.fb.control(data.systemGroup.startTitle,Validators.required),
        startSubTitle: this.fb.control(data.systemGroup.startSubTitle,Validators.required),
        startBtn: this.fb.control(data.systemGroup.startBtn,Validators.required),
        questionHeader: this.fb.control(data.systemGroup.questionHeader,Validators.required),
        submit: this.fb.control(data.systemGroup.submit,Validators.required),
        finishTitle: this.fb.control(data.systemGroup.finishTitle,Validators.required),
        finishSubTitle: this.fb.control(data.systemGroup.finishSubTitle,Validators.required),
        sec: this.fb.control(data.systemGroup.sec,Validators.required),
      }),
      title: this.fb.control(data.title,Validators.required),
      company:this.fb.control(data.company,Validators.required),
      status: this.fb.control(statusVal,Validators.required),
      logo: this.fb.control(data.logo,Validators.required),
      intro: new FormGroup({
        text: this.fb.control(data.intro.text,Validators.required)
      }),
      questions: this.questions,
      finish: new FormGroup({
        text: this.fb.control(data.intro.text,Validators.required)
      })
    }
    this.form = new FormGroup(group);
    if(data){
      this.deleteQuestion(0);
    }
    
    data.questions?.forEach((q:QuestionData)=>{
      this.addQuestion(q);
    })
    if(data?.reviews! > 0){
      this.questions.disable();
    }
  }
  findStatus(text:string){
    return this.statuses.find(el=> el.code === text);
  }
  findType(text:string){
    return this.qType.find(el=> el.code === text);
  }
  buildEmptyForm(){    
    this.questions = this.fb.array([
      new FormGroup({
        questionType: this.fb.control({ name: 'Video', code: 'video' },Validators.required),
        sec: this.fb.control('5',Validators.required),
        text: this.fb.control('',Validators.required),
        options: this.fb.array([]),
        shareable: this.fb.control(true)
      })
    ]);
    this.form = new FormGroup({
      systemGroup: new FormGroup({
        startTitle: this.fb.control("Welcome",Validators.required),
        startSubTitle: this.fb.control("at online assesment",Validators.required),
        startBtn: this.fb.control("Start",Validators.required),
        questionHeader: this.fb.control("Question",Validators.required),
        submit: this.fb.control("Submit",Validators.required),
        finishTitle: this.fb.control("Finish",Validators.required),
        finishSubTitle: this.fb.control("well done",Validators.required),
        sec: this.fb.control("sec",Validators.required),
      }),
      title: this.fb.control('',Validators.required),
      company:this.fb.control('',Validators.required),
      status: this.fb.control({ name: 'ACTIVE', code: 'ACTIVE' },Validators.required),
      logo: this.fb.control('',Validators.required),
      intro: new FormGroup({
        text: this.fb.control(this.defaultIntro,Validators.required)
      }),
      questions: this.questions,
      finish: new FormGroup({
        text: this.fb.control(this.defaultFinish,Validators.required)
      })
    })
  }
  addQuestion(q:QuestionData|null=null){
    let qTypeV = q?.questionType? this.findType(q.questionType) : { name: 'Video', code: 'video' };
    let secV = q?.sec? q.sec : -1;
    let textV = q?.text? q.text : '';
    let optionsV:any[] = [];
    if(q?.options && q.options.length>0){
      q.options.forEach((op:Option)=>{
       optionsV.push(new FormGroup({
          text:this.fb.control(op.text,Validators.required),
          sec:this.fb.control(op.sec,Validators.required)
        }))
      })
    }
    let shareable = true;
    if(q && q?.shareable != undefined){
      shareable = q?.shareable;
    }
    const formGroup:FormGroup = new FormGroup({
      shareable:this.fb.control(shareable),
      questionType: this.fb.control(qTypeV,Validators.required),
      sec: this.fb.control(secV),
      text: this.fb.control(textV,Validators.required),
      options: this.fb.array(optionsV)
    })  
    formGroup.get('sec')!.setValidators(this.requiredIfFieldNotEq(formGroup, 'questionType','videoBlitz'));
    formGroup.get('text')!.setValidators(this.requiredIfFieldNotEq(formGroup, 'questionType','videoBlitz'));
    this.questions.push(formGroup);
  }

  requiredIfFieldNotEq(form: FormGroup,field:string,value:string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const needRequire = form.get(field)?.value !== value
      const noValue = needRequire ? !(control.value) : false
      return noValue ? {required: control.value} : null;
    };
  }
  
  getOptions(item:any){
    let res = (item.get('options') as FormArray).controls;

    return res;
  }
  addOption(question:any){
    question.get('options')
    .push(new FormGroup({
      text:this.fb.control('',Validators.required),
      sec:this.fb.control('-1',Validators.required)
    }));
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
    if(this.form.value){
      const formDto = JSON.parse(JSON.stringify(this.form.value));
      console.log(formDto);      
      formDto.status  = formDto.status.code;
      formDto.questions?.map((question:any) => {
        question.questionType = question.questionType.code;
        if(question.questionType === "videoBlitz"){
          delete question.sec;
        }
        return question;
      })
      if(this.id){
        formDto.id = this.id;
      }
      if(this.id){
        this.adminSrv.updateForm(formDto).subscribe(res=>{
          this.msgSrv.add({ severity: 'success', summary: 'Success', detail:'Form updated'});       
          this.router.navigateByUrl('/admin');
        });
      } else {
        if(this.form.value.questions){
          this.adminSrv.saveForm(formDto).subscribe(res=>{
            this.msgSrv.add({ severity: 'success', summary: 'Success', detail:'Form saved'});            
            this.router.navigateByUrl('/admin');
          });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail:'please add questions'});
        }        
      }
    }   
  }

}
