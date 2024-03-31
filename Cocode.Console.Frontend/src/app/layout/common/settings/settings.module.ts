import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { SettingsComponent } from 'app/layout/common/settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { SuggestionModule } from 'app/modules/neighbor/suggestion/suggestion.module';
import { SuggestionService } from 'app/modules/neighbor/suggestion/suggestion.service';

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        MatButtonModule,
        SuggestionModule,
    ],
    exports: [SettingsComponent],
    providers: [SuggestionService],
})
export class SettingsModule {}
