from .models import UploadedContent
from pyramid.view import view_config
from pyramid.request import Request
import os
import uuid

def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('upload_content', '/upload')
    config.add_route('get_content', '/api/content')
    config.scan('.')

@view_config(route_name='upload_content', request_method='POST', renderer='json')
def upload_content_view(request: Request):
    title = request.POST['title']
    description = request.POST['description']
    image_file = request.POST['image']

    # Save the image file
    upload_dir = request.registry.settings['upload_dir']
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    # Generate a unique filename
    file_extension = os.path.splitext(image_file.filename)[1]
    unique_filename = str(uuid.uuid4()) + file_extension
    file_path = os.path.join(upload_dir, unique_filename)

    # Write the file to disk
    image_file.file.seek(0)
    with open(file_path, 'wb') as f:
        f.write(image_file.file.read())

    # Create and save the database entry
    new_content = UploadedContent(
        title=title,
        description=description,
        image_path=f'/static/uploads/{unique_filename}' # Store path relative to static
    )
    request.dbsession.add(new_content)

    return {'message': 'Content uploaded successfully!'}

@view_config(route_name='get_content', request_method='GET', renderer='json')
def get_content_view(request: Request):
    content = request.dbsession.query(UploadedContent).all()
    return [{'id': c.id, 'title': c.title, 'description': c.description, 'image_path': c.image_path} for c in content]
