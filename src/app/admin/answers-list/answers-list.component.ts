import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { DateAgoPipe } from '../../shared/pipes/date-ago.pipe';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AnswerListStore } from './answers-list.store';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-answers-list',
  standalone: true,
  imports: [InputTextModule,InputGroupAddonModule,InputGroupModule,ButtonModule,DateAgoPipe,ChipModule,TagModule, TableModule, RatingModule, FormsModule],
  templateUrl: './answers-list.component.html',
  styleUrl: './answers-list.component.scss'
})
export class AnswersListComponent implements OnInit {
  readonly answersStore = inject(AnswerListStore);
  examId:string;
  constructor( private router: Router, private route:ActivatedRoute,private messageService: MessageService) { }

  ngOnInit() {
   this.examId = this.route.snapshot.paramMap.get('id')!;
    if(this.examId){
      this.answersStore.loadAnswersList(this.examId,0,10);
    }
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'NEW': 
        return 'info';
      case 'CHECKED':
        return 'success';
      case 'BAD':
        return 'danger';
    }
  }
  goTo(userId:string){
    this.router.navigateByUrl('admin/answer/'+this.examId,{state:{userId}});
  }
  public saveToBuffer(str: string) {
    navigator.clipboard.writeText(str).then().catch(e => console.error(e));
    this.messageService.add({ severity: 'success', summary: 'Copy', detail: 'saved to clipboadr' });
  }
}