import {Injectable} from '@angular/core'
import { FormControl, FormGroup, Validator } from '@angular/forms';


@Injectable({providedIn : 'root'})
export class Matchpassword implements Validator {
    validate(formGroup : FormGroup){
        const{ password , confirmpassword } = formGroup.value;
        if(password === confirmpassword){
            return null;
        }else{
            return {passworddontmatch : true}
        }   
    }
}
