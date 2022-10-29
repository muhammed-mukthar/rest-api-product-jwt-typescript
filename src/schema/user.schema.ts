
import {object,string} from 'zod'
export const createUser =object({

    body:object({
        name:string({
            required_error:'Name is required'
        }),
        password:string({
            required_error:'password is required'
        }).min(6,'password is too short'),
        passwordConfirmation:string({
            required_error:'password is required'
        }).min(6,'passwordConfirm is too short'),
        email:string({
            required_error:"Email is required"
        }).email('Not a valid email')
}).refine((data)=>data.password === data.passwordConfirmation,{
    message:"password do not match",
    path:['passwordConfirmation']
})
})