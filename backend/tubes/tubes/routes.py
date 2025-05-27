def includeme(config):
                """Add routes to the config."""
                config.add_static_view('static', 'static', cache_max_age=3600)
                
                # Default route
                config.add_route('home', '/')
                
                # User routes with request_method to differentiate endpoints with the same URL
                config.add_route('user_list', '/api/886920', request_method='GET') # Changed URL path
                config.add_route('user_detail', '/api/886920/{id}', request_method='GET') # Changed URL path
                config.add_route('user_add', '/api/886920', request_method='POST') # Changed URL path
                config.add_route('user_update', '/api/886920/{id}', request_method='PUT') # Changed URL path
                config.add_route('user_delete', '/api/886920/{id}', request_method='DELETE') # Changed URL path
                config.add_route('user_login', '/api/886920/login', request_method='POST') # Add new route for login