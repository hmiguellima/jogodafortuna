# import the Bottle framework
from bottle import Bottle, request, template, abort

# Run the Bottle wsgi application. We don't need to call run() since our
# application is embedded within an App Engine WSGI application server.
bottle = Bottle()

from controllers.users import UserController

users = UserController()

@bottle.get('/service/v1/user/detail/<user_key>')
def detail(user_key):
    user = users.detail(user_key)
    if not user:
        abort(404, 'User not found.')
    return user


@bottle.get('/service/v1/user/list')
def lst():
    result = dict(users=[])
    urs = users.list()
    for u in urs:
        result['users'] += [dict(key=str(u.key()), name=u.name, email=u.email)]
    return result


@bottle.get('/service/v1/user/edit/<user_key>')
def edit(user_key):
    user = users.detail(user_key)
    if not user:
        abort(404, 'User not found.')
    return template('server/edit_user', dict(key=str(user.key()), name=user.name, email=user.email))


@bottle.post('/service/v1/user/edit/<user_key>')
def edit_post(user_key):
    name = request.forms.get('name')
    email = request.forms.get('email')
    users.edit(user_key, name, email)


@bottle.get('/service/v1/user/create')
def create():
    return template('server/create_user')


@bottle.post('/service/v1/user/create')
def create_post(user_id=''):
    name = request.forms.get('name')
    email = request.forms.get('email')
    users.create(name, email)


@bottle.delete('/service/v1/user/delete/<user_key>')
def delete(user_key):
    users.delete(user_key)
