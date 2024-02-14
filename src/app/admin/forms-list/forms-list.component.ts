import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsStore } from './forms.store';

@Component({
  selector: 'app-forms-list',
  standalone: true,
  imports: [RouterModule, InputTextModule, InputGroupModule, InputGroupAddonModule, BadgeModule, AvatarModule, AvatarGroupModule, TagModule, FormsModule, ButtonModule, TableModule, CommonModule, RatingModule],
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss'
})
export class FormsListComponent implements OnInit {
  readonly formsListStore = inject(FormsStore);
  constructor(private messageService: MessageService, private router: Router) {
  }
  ngOnInit(): void {
    this.formsListStore.loadForms(0,10);
  }

  public getSeverity(status: string): any {
    switch (status) {
      case 'ACTIVE':
        return 'info';
      case 'SUSPENDED':
        return 'warning';
      case 'DONE':
        return 'success';
    }
  }
  public saveToBuffer(str: string) {
    navigator.clipboard.writeText(str).then().catch(e => console.error(e));
    this.messageService.add({ severity: 'success', summary: 'Copy', detail: 'saved to clipboadr' });
  }
  gotToAnsers(id: string) {
    this.router.navigateByUrl('admin/answers-list/' + id);
  }
  editExam(id: string) {
    this.router.navigateByUrl('admin/editor/' + id);
  }
}
