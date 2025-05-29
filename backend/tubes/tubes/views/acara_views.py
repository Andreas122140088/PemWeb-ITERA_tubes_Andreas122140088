from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
import json
import os
from datetime import datetime

from .. import models

@view_config(route_name='acara_list', request_method='GET', renderer='json')
def get_acara_list(request):
    """View function to return a list of all Acara."""
    try:
        acara_list = request.dbsession.query(models.Acara).all()
        # Convert Acara objects to a list of dictionaries
        acara_data = []
        for acara in acara_list:
            acara_data.append({
                'id': acara.id, # Menggunakan id_acara
                'gambar_file': acara.gambar_file,
                'judul': acara.judul,
                'konten': acara.konten,
                'tanggal_acara': acara.tanggal_acara.isoformat() if acara.tanggal_acara else None,
                'jenis_acara': acara.jenis_acara
            })
        return acara_data
    except Exception as e:
        request.response.status = 500
        return {'error': str(e)}

@view_config(route_name='acara_detail', request_method='GET', renderer='json')
def get_acara_detail(request):
    """View function to return details of a single Acara by ID."""
    try:
        acara_id = request.matchdict['id']
        acara = request.dbsession.query(models.Acara).filter_by(id=acara_id).first()

        if acara is None:
            return HTTPNotFound(json_body={'error': f'Acara with id {acara_id} not found'})

        # Convert Acara object to a dictionary
        acara_data = {
            'id': acara.id,
            'gambar_file': acara.gambar_file,
            'judul': acara.judul,
            'konten': acara.konten,
            'tanggal_acara': acara.tanggal_acara.isoformat() if acara.tanggal_acara else None,
            'jenis_acara': acara.jenis_acara
        }
        return acara_data

    except Exception as e:
        request.response.status = 500
        return {'error': str(e)}

@view_config(route_name='acara_add', request_method='POST', renderer='json')
def add_acara(request):
    """View function to add a new Acara."""
    try:
        # Get data from the request
        judul = request.POST.get('title')
        konten = request.POST.get('description')
        tanggal_acara_str = request.POST.get('tanggal_acara')
        jenis_acara = request.POST.get('jenis_acara')
        gambar_file = request.POST.get('image')

        # Validate required fields (excluding file for initial check)
        if not all([judul, konten, tanggal_acara_str, jenis_acara]):
            return HTTPBadRequest(json_body={'error': 'Missing required text fields'})

        gambar_file_path_db = None
        # Handle file upload
        if gambar_file is not None and hasattr(gambar_file, 'file') and gambar_file.file:
            try:
                # Define the path to save the uploaded image
                upload_dir = request.registry.settings['upload_dir']
                if not os.path.isdir(upload_dir):
                    os.makedirs(upload_dir, exist_ok=True)

                # Create a unique filename
                filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{gambar_file.filename}"
                file_path = os.path.join(upload_dir, filename)

                # Save the file
                with open(file_path, 'wb') as f:
                    f.write(gambar_file.file.read())

                # Store the relative path in the database
                gambar_file_path_db = f'/static/uploads/{filename}'
            except IOError as e:
                # Let the transaction manager handle rollback
                request.response.status = 500
                return {'error': f'File upload failed: {e}'}
            except Exception as e:
                # Let the transaction manager handle rollback
                request.response.status = 500
                return {'error': f'An unexpected error occurred during file handling: {e}'}
        else:
             return HTTPBadRequest(json_body={'error': 'Image file is required'})

        # Convert tanggal_acara string to Date object
        try:
            tanggal_acara = datetime.strptime(tanggal_acara_str, '%Y-%m-%d').date()
        except ValueError:
            # Let the transaction manager handle rollback
            return HTTPBadRequest(json_body={'error': 'Invalid date format for tanggal_acara. Use YYYY-MM-DD'})

        # Create a new Acara object
        new_acara = models.Acara(
            judul=judul,
            konten=konten,
            tanggal_acara=tanggal_acara,
            jenis_acara=jenis_acara,
            gambar_file=gambar_file_path_db
        )

        # Add the new Acara to the database session
        request.dbsession.add(new_acara)

        # Transaction will be committed automatically by the transaction manager on success

        return {'message': 'Acara added successfully!', 'id': new_acara.id}

    except Exception as e:
        # Let the transaction manager handle rollback
        request.response.status = 500
        return {'error': f'An unexpected error occurred during database operation or other process: {e}'}
