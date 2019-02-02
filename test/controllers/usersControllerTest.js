import request from 'co-request';
import { getTestURL } from '../../app/lib';
import should from 'should';
import { User } from '../../app/models';

global.token;
describe('User Controller', () => {
  describe('Create', () => {
    it('Should throw error if details passed without AdminToken' , async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/users`),
        body: {
          name: 'Samarth Gupta',
          email: 'samarthgupta@gmail.com',
          phoneNumber: '9521232323',
          password: '12345678'
        },
        json: true,
      });

      res.statusCode.should.be.eql(403);
    });
    it('Should create User', async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/users`),
        headers: {
          apikey: process.env.adminSecret,
        },
        body: {
          name: 'Samarth Gupta',
          email: 'samarthgupta@gmail.com',
          phoneNumber: '9521232323',
          password: '12345678'
        },
        json: true,
      });

      res.statusCode.should.be.eql(201);
    });

    it('Should not create user without phoneNumber', async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/users`),
        headers: {
          apikey: process.env.adminSecret,
        },
        body: {
          name: 'Samarth Gupta',
          email: 'samarthgupta@gmail.com',
          password: '12345678',
        },
        json: true,
      });

      res.statusCode.should.be.eql(400);
    });
  });

  describe('Verify', () => {
    it('Should throw error if details passed without AdminToken' , async () => {
      var res = await request({
        method: 'PUT',
        url: getTestURL(`/api/users`),
        body: {
          name: 'Samarth Gupta',
          email: 'samarthgupta@gmail.com',
          phoneNumber: '9521232323',
          password: '12345678'
        },
        json: true,
      });

      res.statusCode.should.be.eql(403);
    });

    it('Should update status of User', async () => {
      var user = await User.findOne({
        where: {
          status: 0,
        },
      });

      var res = await request({
        method: 'PUT',
        url: getTestURL(`/api/users/${user.id}/verify`),
        headers: {
          apikey: process.env.adminSecret,
        },
        json: true,
      });

      res.statusCode.should.be.eql(200);
    });
  });

  describe('Sign In', () => {
    it('Should not be able to sign in if password is incorrect' , async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/sign_in`),
        headers: {
          apikey: process.env.adminSecret,
        },
        body: {
          phoneNumber: '9521232323',
          password: '12345135'
        },
        json: true,
      });

      res.statusCode.should.be.eql(401);
    });

    it('Should generate token for User if password is correct', async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/sign_in/`),
        headers: {
          apikey: process.env.adminSecret,
        },
        body: {
          phoneNumber: '9521232323',
          password: '12345678'
        },
        json: true,
      });

      res.statusCode.should.be.eql(201);
      res.body.should.have.property('name');
      res.body.should.have.property('token');
      res.body.should.have.property('id');
      const { token } = res.body;
      global.token = token;
    });
  });

});
