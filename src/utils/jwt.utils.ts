import jwt from 'jsonwebtoken';
import config from 'config'
const privateKey=config.get<string>("privateKey")
const publicKey=config.get<string>("publicKey")

export function signJwt(object:Object,options?:jwt.SignOptions|undefined){
  return jwt.sign(object,publicKey,{
      ...(options && options)
  })
  }
  

export function verifyJwt(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
  ) {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
      "ascii"
    );
  
    try {
      const decoded = jwt.verify(token, publicKey);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (e: any) {
      console.error(e);
      return {
        valid: false,
        expired: e.message === "jwt expired",
        decoded: null,
      };
    }
  }
  