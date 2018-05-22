import {RouterConfig} from '@angular/router';
import {PersonalSettings} from './personal-settings-component';
export const PersonalSettingsRoute: RouterConfig = [
    {
        path: 'administration-personalSettings', component: PersonalSettings
    }
];
export const PersonalSettingsCancelledRoute: RouterConfig = [
    {
        path: 'personalsettingscancelled', component: PersonalSettings
    }
];
