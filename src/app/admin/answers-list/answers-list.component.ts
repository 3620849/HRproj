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
@Component({
  selector: 'app-answers-list',
  standalone: true,
  imports: [ButtonModule,DateAgoPipe,ChipModule,TagModule, TableModule, RatingModule, FormsModule],
  templateUrl: './answers-list.component.html',
  styleUrl: './answers-list.component.scss'
})
export class AnswersListComponent implements OnInit {
  readonly answersStore = inject(AnswerListStore);
  constructor( private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.answersStore.loadAnswersList(id,0,10);
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
  goTo(id:string){
    this.router.navigateByUrl('admin/answer/'+id);
  }
}