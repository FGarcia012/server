'use stric'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRouter from '../users/user.routes.js'
import productoRouter from '../productos/producto.routes.js'

const routes = (app) =>{
    app.use('/users', userRouter)
    app.use('/producto', productoRouter)
}


const configs = (app) =>{
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

export const initserver = () =>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server rounning on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}