from pyramid.config import Configurator
from pyramid.events import NewResponse



def add_cors_headers(event):
    event.response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    event.response.headers['Access-Control-Allow-Methods'] = 'POST,GET,DELETE,PUT,OPTIONS'
    event.response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    event.response.headers['Access-Control-Allow-Credentials'] = 'true'


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('pyramid_tm')  # Include the transaction manager
        config.include('.models')
        config.include('.routes')
        config.scan('.views')  # Pindai direktori views untuk menemukan view configurations
        config.add_subscriber(add_cors_headers, NewResponse)  # Add CORS subscriber
    return config.make_wsgi_app()
