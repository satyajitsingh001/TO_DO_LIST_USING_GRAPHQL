import { ApolloServer} from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from './schemaGql.js'
import mongoose  from "mongoose";
import jwt from 'jsonwebtoken';
import {DB_URI, JWT_SECRET} from './config.js'

mongoose.connect(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log('Database connected')
})

mongoose.connection.on("error",(err)=>{
    console.error(`Error connecting to database ${err}`)
})


//import models here
import './models/Quotes.js'
import './models/User.js'

import resolvers from './resolvers.js'


//This is middleware
const context = ({req})=>{
    const {authorization} = req.headers
    if(authorization){
        const {userId} = jwt.verify(authorization,JWT_SECRET)
        return {userId}
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:context,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground 
    ]
})

server.listen().then(({url})=>{
    console.log(`🚀 Server ready at ${url}`);
})