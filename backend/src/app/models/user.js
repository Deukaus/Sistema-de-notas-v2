const mongoose = require('../../database/index');
const bcrypt = require('bcryptjs');
mongoose.set('useFindAndModify', false);

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    aluno: {
        type: Boolean,
        required: true,
    },
    dados: {
        nome: {
            type: String,
            required: true,
        },
        escola: {
            type: String,
            required: true,
        },
        turma: {
            type: String,
            required: true,
        }
    },
    notas: [{
        materia: {
            type: String,
            required: true,
        },
        bimestre: {
            n: [{
                type: Number,
                required: true,
            }],
            f: [{
                type: Number
            }],
            ac: [{
                type: Number
            }]
        }
    }],
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;