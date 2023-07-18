import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {
    path:'home',
    loadChildren:() => import ('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'infection',
    loadChildren:() => import ('./infection/infection.module').then(m=>m.InfectionModule)
  },
  {
    path:'doctor',
    loadChildren:() => import ('./doctor/doctor.module').then(m=>m.DoctorModule)
  },
  {
    path:'contactus',
    loadChildren:() => import ('./contactus/contactus.module').then(m=>m.ContactusModule)
  },
  {
    path:'aboutus',
    loadChildren:() => import ('./aboutus/aboutus.module').then(m=>m.AboutusModule)
  },
  {
    path:'settings',
    loadChildren:() => import ('./settings/settings.module').then(m=>m.SettingsModule)
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
