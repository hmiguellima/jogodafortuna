# import the Bottle framework
from bottle import Bottle, request, template, redirect, abort

# Run the Bottle wsgi application. We don't need to call run() since our
# application is embedded within an App Engine WSGI application server.
bottle = Bottle()

from controllers.users import UserController

users = UserController()

@bottle.get('/service/v1/user/detail/<user_id>')
def user_detail(user_id):
    user = users.detail(user_id)
    if not user:
        abort(404, 'User not found.')
    return user


@bottle.get('/service/v1/user/list')
def users_list():
    return dict(users=users.list())


@bottle.get('/service/v1/user/edit/<user_id>')
def user_edit(user_id):
    user = users.detail(user_id)
    if not user:
        abort(404, 'User not found.')
    return template('server/edit_user', dict(name=user.name, email=user.email))


@bottle.put('/service/v1/user/edit/<user_id>')
def user_edit_put(user_id):
    name = request.forms.get('name')
    email = request.forms.get('email')
    users.edit(user_id, name, email)


@bottle.get('/service/v1/user/create')
def user_create():
    return template('server/create_user')


@bottle.post('/service/v1/user/create')
def user_create_post(user_id=''):
    name = request.forms.get('name')
    email = request.forms.get('email')
    users.create(name, email)
