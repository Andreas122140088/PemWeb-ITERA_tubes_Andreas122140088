from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
import json

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
