def includeme(config):
                """Add routes to the config."""
                config.add_static_view('static', 'static', cache_max_age=3600)
                
                # Default route
                config.add_route('home', '/')
                
                # User routes with request_method to differentiate endpoints with the same URL
                config.add_route('user_list', '/api/mahasiswa', request_method='GET') # Changed route_name
                config.add_route('user_detail', '/api/mahasiswa/{id}', request_method='GET') # Changed route_name
                config.add_route('user_add', '/api/mahasiswa', request_method='POST') # Changed route_name
                config.add_route('user_update', '/api/mahasiswa/{id}', request_method='PUT') # Changed route_name
                config.add_route('user_delete', '/api/mahasiswa/{id}', request_method='DELETE') # Changed route_name