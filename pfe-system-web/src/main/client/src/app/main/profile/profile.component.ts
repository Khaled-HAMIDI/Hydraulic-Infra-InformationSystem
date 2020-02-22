import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './profile.service';
import { fuseAnimations } from '@fuse/animations';
import { ToolsService } from '@ayams/services/tools.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ProfileComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    private toolsService: ToolsService
  ) { 
    this.toolsService.loadTranslations(french, arabic);
  }

  ngOnInit() {
  }

}
