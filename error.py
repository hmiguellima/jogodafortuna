# import the Bottle framework
from bottle import Bottle

# Run the Bottle wsgi application. We don't need to call run() since our
# application is embedded within an App Engine WSGI application server.
bottle = Bottle()

@bottle.error(404)
def error_404(error):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.'


@bottle.error(500)
def error_500(error):
    """Return a custom 500 error."""
    return 'Sorry, there was an error: %s' % error
