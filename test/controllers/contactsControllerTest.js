import request from 'co-request';
import { getTestURL } from '../../app/lib';
import should from 'should';
import { Contact } from '../../app/models';

describe('Contacts Controller', () => {
  describe('Create', () => {
    it('Should throw error if details passed without Token' , async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/contacts`),
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

    it('Should create Contact', async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/contacts`),
        headers: {
          'x-access-token': global.token,
        },
        body: {
          name: 'Piyush',
          email: 'piyush@gmail.com',
          phoneNumber: '9521232312',
        },
        json: true,
      });

      res.statusCode.should.be.eql(201);
    });

    it('Should not create contact without phoneNumber', async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/contacts`),
        headers: {
          'x-access-token': global.token,
        },
        body: {
          name: 'Samarth Gupta',
          email: 'samarthgupta@gmail.com',
        },
        json: true,
      });

      res.statusCode.should.be.eql(400);
    });
  });

  describe('Update', () => {
    it('Should throw error if passed without token', async () => {
      var res = await request({
        method: 'POST',
        url: getTestURL(`/api/contacts/1234`),
        body: {
          name: 'Samarth Gupta',
          email: 'samarthgupta@gmail.com',
          password: '12345678',
        },
        json: true,
      });

      res.statusCode.should.be.eql(403);
    });

    it('Should update contact details' , async () => {
      const contact = await Contact.findOne({});
      var res = await request({
        method: 'PUT',
        url: getTestURL(`/api/contacts/${contact.id}`),
        headers: {
          'x-access-token': global.token,
        },
        body: {
          name: 'Piyush Anand',
          email: 'xyz@gmail.com',
          phoneNumber: '9521232323',
        },
        json: true,
      });

      res.statusCode.should.be.eql(200);
      res.body.user.should.have.property('name');
      res.body.user.name.should.be.eql('Piyush Anand');
      res.body.user.should.have.property('email');
      res.body.user.email.should.be.eql('xyz@gmail.com');
      res.body.user.should.have.property('phoneNumber');
      res.body.user.phoneNumber.should.be.eql('9521232323');
    });
  });

  describe('Index', () => {
    it('Should throw error if passed without token', async () => {
      var res = await request({
        method: 'GET',
        url: getTestURL(`/api/contacts`),
        json: true,
      });

      res.statusCode.should.be.eql(403);
    });

    it('Should list contacts', async () => {
      var res = await request({
        method: 'GET',
        url: getTestURL(`/api/contacts/`),
        headers: {
          'x-access-token': global.token,
        },
        json: true,
      });

      res.statusCode.should.be.eql(200);
    });

    it('Should be able to search contacts', async () => {
      var res = await request({
        method: 'GET',
        url: getTestURL(`/api/contacts`, { email: 'xyz@gmail.com' }),
        headers: {
          'x-access-token': global.token,
        },

        json: true,
      });

      res.statusCode.should.be.eql(200);
    });
  });
});
