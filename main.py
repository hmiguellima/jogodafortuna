"""`main` is the top level module for your Bottle application.

Loads the Bottle framework and adds a custom error
handler.
"""

# import the Bottle framework
from bottle import Bottle, request, template, redirect, abort

# Run the Bottle wsgi application. We don't need to call run() since our
# application is embedded within an App Engine WSGI application server.
bottle = Bottle()

from controllers.users import UserController

users = UserController()

@bottle.get('/service/v1/user/detail/<user_id>')
def user_detail(user_id=''):
    user = users.detail(user_id)
    if not user:
        abort(404)
    return dict(name=user.name, email=user.email)


@bottle.get('/service/v1/user/list')
def users_list():
    return dict(users=users.list())


@bottle.get('/service/v1/user/edit/<user_id>')
def user_edit(user_id):
    user = users.detail(user_id)
    if not user:
        abort(404)
    return template('edit_user', dict(name=user.name, email=user.email))


@bottle.put('/service/v1/user/edit/<user_id>')
def user_edit_put(user_id):
    name = request.forms.get('name')
    email = request.forms.get('email')
    users.edit(user_id, name, email)
    return redirect('/service/v1/user/detail/%s' % user_id)


@bottle.get('/service/v1/user/create')
def user_create():
    return template('create_user')


@bottle.post('/service/v1/user/create')
def user_create_post(user_id=''):
    name = request.forms.get('name')
    email = request.forms.get('email')
    users.create(name, email)
    return redirect('/service/v1/user/list')


@bottle.error(404)
def error_404(error):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.'


@bottle.error(500)
def error_500(error):
    """Return a custom 500 error."""
    return 'Sorry, there was an error: %s' % error
