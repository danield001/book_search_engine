const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!, description: String!, authors: [String]!, title: String!,  image: String, link: String): User
    removeBook(bookId: ID!): User
    login(email: String!, password: String!): Auth
}

type Query {
    me: User
}

`

module.exports = typeDefs;