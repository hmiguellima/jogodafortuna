from models.user import User

class UserController:


    def detail(self, user_key):
        return User.get(user_key)


    def list(self):
        return User.all().run()


    def edit(self, user_key, name, email):
        u = self.detail(user_key)
        u.name = name
        u.email = email
        u.put()


    def create(self, name, email):
        u = User(name=name, email=email)
        u.put()


    def delete(self, user_key):
        u = self.detail(user_key)
        u.delete()
