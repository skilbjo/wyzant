#!/usr/bin/env python

import webapp2
import logging
import random
import string
import datetime
import json

from google.appengine.ext import ndb

class UserData(ndb.Model):
    first_name = ndb.StringProperty()
    last_name = ndb.StringProperty()
    email = ndb.StringProperty()
    signup_token = ndb.StringProperty()
    expiration_date = ndb.DateTimeProperty()

class PostData(ndb.Model):
    text_post = ndb.StringProperty()
    timestamp = ndb.DateTimeProperty()
    poster_alias = ndb.StringProperty()
    user = ndb.KeyProperty()
    hashtags = ndb.StringProperty(repeated=True)
    reply_to = ndb.KeyProperty()

class AliasData(ndb.Model):
    alias = ndb.StringProperty()
    user = ndb.KeyProperty()

# Route is /
class GetUsers(webapp2.RequestHandler):
    def get(self):
        self.response.out.write('<html><body>')

        # Sign up form
        self.response.out.write("""
            <h1>Sign Up User</h1>
              <form action="/users/new" method="post">
                first_name: <input type="text" name = "first_name"> <br>
                last_name: <input type= "text" name = "last_name"> <br>
                email:<input type="text" name = "email"> <br>
                code: <input type= "application/json" name = "code"> <br>
              <input type= "submit" value="submit"/>
              </form>
        """)

        self.response.out.write('<br /><br />')

        # Table of signed up users
        users = UserData.query().fetch()

        self.response.out.write('<table>')
        row_template = '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'
        for user in users:
            self.response.write(row_template % (user.first_name, user.last_name, user.email, user.signup_token))
        self.response.out.write('</table>')

        self.response.out.write('</body></html>')

# Route is /users/new
class PostUsers(webapp2.RequestHandler):
    def post(self):
        user=UserData()
        user.first_name       = self.request.get('first_name')
        user.last_name        = self.request.get('last_name')
        user.email            = self.request.get('email')
        user.signup_token     = generate_code()
        user.put()

        now = datetime.datetime.now()
        future = now + datetime.timedelta(minutes=15)
        user.expiration_date = future
        return_obj = {'code':user.signup_token}
        self.response.content_type = 'application/json'
        self.response.write(json.dumps(return_obj))

def generate_code():
    while True:
        code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        if User.query(User.signup_token==code).count()==0:
            break
    return code

# Route is /validate
class ValidateSignUpCodeHandler(webapp2.RequestHandler):
    # Given a sign-up code and an email address, validates that it is a valid code
    # for that email address and has not expired. Returns a token that can be used for
    # authentication
    def post(self):
        email = self.request.get('email')
        code = self.request.get('code')
        user = User.query(User.email==email, User.signup_token==code).get()
        self.response.content_type = 'application/json'
        if user:
            expiration = user.expiration_date
            now = datetime.datetime.now()
            if now < expiration:
                return_obj = {'success':True, 'token': user.key.urlsafe()}
                self.response.write(json.dumps(return_obj))
            else:
                return_obj = {'success':False, 'message': 'EXPIRED'}
                self.response.write(json.dumps(return_obj))
        else:
            return_obj = {'success':False, 'message': 'INVALID'}
            self.response.write(json.dumps(return_obj))

# Route is /posts
class GetPosts(webapp2.RequestHandler):
    def get(self):
        self.response.out.write('<html><body>')

        self.response.out.write("""<h1>New Post Submission</h1>
            <form action="/posts/new" method="post">
              your user:      <input type="text" name = "user"><br>
              your alias:     <input type="text" name = "poster_alias"><br>
              your post here: <input type="text" name = "post_text"><br>
              your hashtags:  <input type="text" name = "hashtags"><br>
            <input type= "submit" value="submit"/>
            </form>
        """)

        # Table of posts
        posts = PostData.query().fetch()

        self.response.out.write('<table>')
        row_template = '<tr> <td>%s</td> <td>%s</td> <td>%s</td> <td>%s</td> </tr>'
        for post in posts:
            self.response.write(row_template % (post.user, post.poster_alias, post.text_post, post.hashtags))
        self.response.out.write('</table>')

        self.response.out.write('</body></html>')


# Route is /posts/new
class PostPosts(webapp2.RequestHandler):
    def post(self):
        post=PostData()
        post.user          = self.request.get('user')
        post.poster_alias  = self.request.get('poster_alias')
        post.text_post     = self.request.get('post_text')
        post.hashtags      = self.request.get('hashtags')
        post.timestamp     = now = datetime.datetime.now()
        post.put()

        self.response.out.write('<html><body>')
        self.response.write('<h1>post submittted succesfully</h1>')
        self.response.out.write('</body></html>')
        self.redirect('/')

app = webapp2.WSGIApplication([('/', GetUsers),
                               ('/users/new', PostUsers),
                               ('/validate', ValidateSignUpCodeHandler),
                               ('/posts', GetPosts),
                               ('/posts/new', PostPosts)
                               ], debug=True)
