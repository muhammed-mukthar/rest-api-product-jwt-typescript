
import {Request,Response} from 'express'
import  config  from 'config';
import logger from '../utils/logger'
import { createSession, findSessions } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJwt } from '../utils/jwt.utils';
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
  const userId=res.locals.user._id
  console.log(userId);
  

  const sessions=await findSessions({user:userId,valid:false})
  console.log({sessions});
  
  return  res.send(sessions)
}