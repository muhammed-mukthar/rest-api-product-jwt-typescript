
import {Request,Response} from 'express'
import  config  from 'config';
import logger from '../utils/logger'
import { createSession, findSessions } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJwt } from '../utils/jwt.utils';
import { updateSession } from '../schema/session.schema';
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken=signJwt(
    { ...user,session:session._id},
     {expiresIn: config.get('accessTokenTtl')}//15m
 )


  // create a refresh token
 
  const refreshToken=signJwt(
    { ...user,session:session._id},
     {expiresIn: config.get('refreshTokenTtl')}//15m
 )


  // return access & refresh tokens

  return res.send({ accessToken, refreshToken });
}

export async function getUserSesssionsHandler(req: Request, res: Response) {
  const userId=await res.locals.user._id
console.log(userId,'hallo');

  

  const sessions=await findSessions({user:userId,valid:true})
  
  console.log('sessions',sessions);
  

  return  res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response){
  const sessionId=res.locals.user.session
  await updateSession({_id:sessionId},{valid:false})
  return res.send({
    accessToken:null,
    refreshToken:null
  })
}