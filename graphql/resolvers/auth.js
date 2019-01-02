const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email});
            if (existingUser) {
                throw new Error('Benutzername bereits vergeben!');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });
            const result = await user.save();
            return {...result._doc, password: null, _id: result.id};
        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        // TODO in production use same error, to not give away hints
        if (!user) {
            throw new Error("Benutzer nicht vorhanden");
        }
        const passwordIsEqual = await bcrypt.compare(password, user.password);
        if (!passwordIsEqual) {
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'fvsdbihasdpissdxco', {
            expiresIn: '1h'
        });
        return {userId: user.id, token: token, tokenExpiration: 1};
    },
};
