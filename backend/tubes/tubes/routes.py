def includeme(config):
                """Add routes to the config."""
                config.add_static_view('static', 'static', cache_max_age=3600)
                config.add_static_view('static/uploads', config.get_settings()['upload_dir'], cache_max_age=3600) # Add static view for uploads
                
                # Default route
                config.add_route('home', '/')
                
                # User routes with request_method to differentiate endpoints with the same URL
                config.add_route('user_list', '/api/886920', request_method='GET') # Changed URL path
                config.add_route('user_detail', '/api/886920/{id}', request_method='GET') # Changed URL path
                config.add_route('user_add', '/api/886920', request_method='POST') # Changed URL path
                config.add_route('user_update', '/api/886920/{id}', request_method='PUT') # Changed URL path
                config.add_route('user_delete', '/api/886920/{id}', request_method='DELETE') # Changed URL path
                config.add_route('user_login', '/api/886920/login', request_method='POST') # Add new route for login
                config.add_route('acara_list', '/api/acara', request_method='GET')
                config.add_route('acara_add', '/api/acara', request_method='POST') # Add new route for adding acara
                config.add_route('acara_options', '/api/acara', request_method='OPTIONS') # Add OPTIONS route for CORS preflight
                config.add_route('acara_detail', '/api/acara/{id}', request_method='GET') # Add new route for acara detail
                config.add_route('acara_delete', '/api/acara/{id}', request_method='DELETE') # Changed URL path
                config.add_route('acara_detail_options', '/api/acara/{id}', request_method='OPTIONS') # Add OPTIONS route for CORS preflight