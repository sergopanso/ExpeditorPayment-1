import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'expeditors',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../expeditors/expeditors.module').then(m => m.ExpeditorsModule)
          },
          {
            path: 'customers',
            loadChildren: () =>
              import('../expeditors/expeditors.module').then(m => m.ExpeditorsModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/expeditors',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
