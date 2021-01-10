module.exports = {
    facebook: {
        clientID: process.env.FB_CLIENTID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        profileFields: ['email', 'displayName', 'photos'],
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true
    }
}