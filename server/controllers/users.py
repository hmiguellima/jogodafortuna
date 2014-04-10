from google.appengine.ext import db

from models.user import User

class UserController:


    def detail(self, user_id):
        key = db.Key.from_path('User', user_id)
        return db.get(key)


    def list(self):
        result = []
        q = User.all()
        for u in q.run():
            print u.key()
            result.append(dict(name=u.name, email=u.email))
        return result


    def edit(self, user_id, name, email):
        key = db.Key.from_path('User', user_id)
        u = db.get(key)
        u.name = name
        u.email = email
        u.put()


    def create(self, name, email):
        u = User(name=name, email=email)
        u.put()
