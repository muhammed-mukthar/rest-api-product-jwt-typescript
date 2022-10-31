import { Session } from 'inspector';
import { FilterQuery, UpdateQuery } from 'mongoose';
import {object,string } from 'zod';
import SessionModel, { SessionDocument } from '../models/session.model';

export const createSessionSchema=object({
  body:object({
    email:string({
        required_error:'email is required'
    }),
    password:string({
        required_error:'password is required'
    })
})
  })  

  export async function updateSession(query:FilterQuery<SessionDocument>,update:UpdateQuery<SessionDocument>){
return SessionModel.updateOne(query,update)
  }