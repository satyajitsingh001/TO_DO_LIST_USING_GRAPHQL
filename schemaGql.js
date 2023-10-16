import { gql } from "apollo-server";

const typeDefs = gql`

    type Query{
        users:[User]
        user(_id:ID!):User   
        quotes:[Quotes]
        iquote(by:ID!):[Quotes]
        myprofile:User
    }

    type User{
        _id:ID
        firstname:String
        lastname:String
        email:String
        quotes:[Quotes]
    }

    type Quotes{
        name:String
        by:ID
    }

    type Token{
        token:String
    }

    type Mutation{
        signupUser(userNew:UserInput!):User
        signinUser(userSignin:UserSigninInput!):Token
        createQuote(name:String!):String
    }

    input UserInput{
        firstname: String!
        lastname:  String! 
        email :    String!
        password :String!
    }

    input UserSigninInput{
        email :   String!
        password :String!
    }
`

export default typeDefs ;