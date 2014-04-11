from google.appengine.ext import db

from models.user import User

class UserController:


    def detail(self, user_id):
        user_key = db.Key.from_path('User', user_id)
        u = User.get(user_key)
        if u:
            user = dict(id=u.key().id(), name=u.name, email=u.email)
        else:
            user = None
        return user


    def list(self):
        result = []
        q = User.all()
        for u in q.run():
            result.append(dict(id=u.key().id(), name=u.name, email=u.email))
        return result


    def edit(self, user_id, name, email):
        u = self.detail(user_id)
        u.name = name
        u.email = email
        u.put()


    def create(self, name, email):
        u = User(name=name, email=email)
        u.put()
