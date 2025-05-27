import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
    HTTPUnauthorized,  # Import HTTPUnauthorized
)
from ..models import User  # Changed from Mahasiswa


@view_config(route_name='user_list', renderer='json')  # Changed route_name
def user_list(request):  # Changed function name
    """View untuk menampilkan daftar user"""  # Updated description
    dbsession = request.dbsession
    users = dbsession.query(User).all()  # Changed query model and variable name
    return {'users': [u.to_dict() for u in users]}  # Changed key and variable name


@view_config(route_name='user_detail', renderer='json')  # Changed route_name
def user_detail(request):  # Changed function name
    """View untuk melihat detail satu user"""  # Updated description
    dbsession = request.dbsession
    user_id = request.matchdict['id']  # Changed variable name
    user = dbsession.query(User).filter_by(id=user_id).first()  # Changed query model and variable name

    if user is None:  # Changed variable name
        return HTTPNotFound(json_body={'error': 'User tidak ditemukan'})  # Updated message

    return {'user': user.to_dict()}  # Changed key and variable name


@view_config(route_name='user_add', request_method='POST', renderer='json')  # Changed route_name
def user_add(request):  # Changed function name
    """View untuk menambahkan user baru"""  # Updated description
    try:
        # Ambil data dari request JSON
        json_data = request.json_body

        # Validasi data minimal
        required_fields = ['nim', 'nama', 'jurusan']
        for field in required_fields:
            if field not in json_data:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi'})

        # Parse tanggal lahir jika ada
        tanggal_lahir = None
        if 'tanggal_lahir' in json_data and json_data['tanggal_lahir']:
            try:
                tanggal_lahir = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD'})

        # Buat objek User baru
        user = User(
            nim=json_data['nim'],
            nama=json_data['nama'],
            jurusan=json_data['jurusan'],
            tanggal_lahir=tanggal_lahir,
            alamat=json_data.get('alamat')
        )  # Changed model name and variable name

        # Simpan ke database
        dbsession = request.dbsession
        dbsession.add(user)  # Changed variable name
        dbsession.flush()  # Untuk mendapatkan ID yang baru dibuat

        return {'success': True, 'user': user.to_dict()}  # Changed key and variable name

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='user_update', request_method='PUT', renderer='json')  # Changed route_name
def user_update(request):  # Changed function name
    """View untuk mengupdate data user"""  # Updated description
    dbsession = request.dbsession
    user_id = request.matchdict['id']  # Changed variable name

    # Cari user yang akan diupdate
    user = dbsession.query(User).filter_by(id=user_id).first()  # Changed query model and variable name
    if user is None:  # Changed variable name
        return HTTPNotFound(json_body={'error': 'User tidak ditemukan'})  # Updated message

    try:
        # Ambil data dari request JSON
        json_data = request.json_body

        # Update atribut yang ada di request
        if 'nim' in json_data:
            user.nim = json_data['nim']  # Changed variable name
        if 'nama' in json_data:
            user.nama = json_data['nama']  # Changed variable name
        if 'jurusan' in json_data:
            user.jurusan = json_data['jurusan']  # Changed variable name
        if 'alamat' in json_data:
            user.alamat = json_data['alamat']  # Changed variable name

        # Parse tanggal lahir jika ada
        if 'tanggal_lahir' in json_data:
            if json_data['tanggal_lahir']:
                try:
                    user.tanggal_lahir = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
                except ValueError:
                    return HTTPBadRequest(json_body={'error': 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD'})
            else:
                user.tanggal_lahir = None  # Changed variable name

        return {'success': True, 'user': user.to_dict()}  # Changed key and variable name

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


@view_config(route_name='user_delete', request_method='DELETE', renderer='json')  # Changed route_name
def user_delete(request):  # Changed function name
    """View untuk menghapus data user"""  # Updated description
    dbsession = request.dbsession
    user_id = request.matchdict['id']  # Changed variable name

    # Cari user yang akan dihapus
    user = dbsession.query(User).filter_by(id=user_id).first()  # Changed query model and variable name
    if user is None:  # Changed variable name
        return HTTPNotFound(json_body={'error': 'User tidak ditemukan'})  # Updated message

    # Hapus dari database
    dbsession.delete(user)  # Changed variable name

    return {'success': True, 'message': f'User dengan id {user_id} berhasil dihapus'}  # Updated message


@view_config(route_name='user_login', request_method='POST', renderer='json')  # New view for login
def user_login(request):
    """View for user login"""
    try:
        json_data = request.json_body
        email = json_data.get('email')
        password = json_data.get('password')

        if not email or not password:
            return HTTPBadRequest(json_body={'error': 'Email and password are required'})

        dbsession = request.dbsession
        user = dbsession.query(User).filter_by(email=email).first()

        if user is None or user.password != password:  # Simple password check (consider hashing in production)
            return HTTPUnauthorized(json_body={'error': 'Invalid email or password'})

        # Successful login
        return {'success': True, 'message': 'Login successful', 'user': user.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})