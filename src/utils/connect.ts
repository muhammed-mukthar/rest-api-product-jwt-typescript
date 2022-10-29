import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'


async function connect(){
const dbUri=config.get<string>('dbUri')
try{
 await mongoose.connect(dbUri)
 .then(()=>logger.info('connected to db')
 )
}catch(err){
       logger.error('err in mongoose connect');
    process.exit(1)
}

}

export default connect