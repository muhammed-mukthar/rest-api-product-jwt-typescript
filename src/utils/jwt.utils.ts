import jwt from 'jsonwebtoken';
import config from 'config'
const privateKey=config.get<string>("privateKey")
const publicKey=config.get<string>("publicKey")

export function signJwt(object:Object,options?:jwt.SignOptions|undefined){
  return jwt.sign(object,publicKey,{
      ...(options && options)
  })
  }
  

  export function verifyJwt(token:any){
    try{
      console.log("token er",token);
      
      const decoded=jwt.verify(token,publicKey)  
      return {
        valid:true,
        expired:true,
        decoded
    }
    }catch(e:any){
        console.log(e);
        
return {
    valid:false,
    expired:e.message ==='jwt expired',
    decoded:null
}
    }

}
  