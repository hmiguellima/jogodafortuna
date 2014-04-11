import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), "../../lib"))

import wallet

from bottle import route, run, template,view

@route( '/cancel' )
@view( 'cancel' )
def cancel():
    return dict( foo = 1 )

@route( '/confirm' )
@view( 'confirm' )
def confirm():
    return dict( bar = 2 )

@route( '/compra/<amount>/<items>' )
@view( 'checkout' )
def checkout(amount = 'default amount', items = 'default items' ):
    morada  = wallet.Address( "pt", "Rua Visconde Valmor, 9", "Lisboa", "1800-100" )
    john    = wallet.Client( "john.doe@sapo.pt", morada )
    return dict( amount = amount, items = items, client = john )

run(host='localhost', port=8080, debug=True)
