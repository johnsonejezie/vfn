import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pick } from 'lodash';

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
}, {
  timestamp: true,
});

adminSchema.methods = {
    toJSON() {
      const userObject = this.toObject();
      return pick(userObject, [
        '_id', 'username'
      ]);
    },
  
    generateAuthToken() {
      const admin = this;
      const access = 'auth';
      const token = jwt
        .sign({ _id: admin._id.toHexString(), access }, process.env.JWT_SECRET)
        .toString();
        admin.tokens.push({ access, token });
      return admin.save().then(() => token);
    },
  
    removeToken(token) {
      return this.update({
        $pull: {
          tokens: { token },
        },
      });
    },
  };
  
  adminSchema.statics = {
    findByToken(token) {
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        const err = new Error('Invalid token');
        err.status = 401;
        return Promise.reject(err);
      }
      return this.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth',
      });
    },
  
    findByCredentials(username, password) {
      return this.findOne({ username }).then((admin) => {
        if (!admin) {
          const err = new Error('Sorry, Email not found');
          err.status = 404;
          return Promise.reject(err);
        }
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, admin.password, (err, res) => {
            if (res) {
              resolve(admin);
            } else {
              const error = new Error('Sorry, Incorrect password');
              error.status = 400;
              reject(error);
            }
          });
        });
      });
    },
  };
  
  adminSchema.pre('save', function preSave(next) {
    const admin = this;
    if (admin.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.password, salt, (error, hash) => {
          admin.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });
  
  const tokenSchema = new Schema({
    _userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token: { type: String, required: true },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200,
    },
  });
  

export default mongoose.model('Admin', adminSchema);