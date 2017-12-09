import { Component, HostBinding } from '@angular/core';
import { Response } from '@angular/http';

import { routerTransition } from '../../../router.animations';

import { ToasterService } from '../../../components/toaster/toaster.service';
import { SecurityDatabaseService } from '../../../modules/security/services/security-database.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  providers: [SecurityDatabaseService, ToasterService],
  animations: [routerTransition()]
})
export class ControlPanelComponent {
  @HostBinding('@routerTransition') routerTransition;

  constructor(
    private securityDatabaseService: SecurityDatabaseService,
    private toasterService: ToasterService
  ) { }

  seed() {
    return this
      .securityDatabaseService
      .seed()
      .subscribe((response: Response) => {
        this.toasterService.pop('success', 'Success', 'Database has been seeded.');
      });
  }

  clear() {
    return this
      .securityDatabaseService
      .clear()
      .subscribe((response: Response) => {
        this.toasterService.pop('success', 'Success', 'Database has been cleaned.');
      });
  }

  destroy() {
    return this
      .securityDatabaseService
      .destroy()
      .subscribe((response: Response) => {
        this.toasterService.pop('success', 'Success', 'Database has been destroyed.');
      });
  }
}
