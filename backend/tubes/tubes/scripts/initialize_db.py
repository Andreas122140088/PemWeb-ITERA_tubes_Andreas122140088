import argparse
import sys
from datetime import date

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add or update models / fixtures in the database.

    """
    # Tambahkan data awal untuk Mahasiswa
    user1 = models.User(
        nim='12345',
        nama='Budi Santoso',
        jurusan='Teknik Informatika',
        tanggal_lahir=date(2000, 5, 15),
        alamat='Jl. Merdeka No. 123, Bandung',
        email='budi@example.com',
        password='password1' # Add example password
    )
    user2 = models.User(
        nim='54321',
        nama='Siti Aminah',
        jurusan='Sistem Informasi',
        tanggal_lahir=date(2001, 8, 22),
        alamat='Jl. Mawar No. 45, Jakarta',
        email='siti@example.com',
        password='password2' # Add example password
    )
    user3 = models.User(
        nim='122140088',
        nama='Andreas Alfin Yoga Utama',
        jurusan='Teknik Informatika',
        tanggal_lahir=date(2003, 9, 19),
        alamat='Jl. doang No. Jadian',
        email='andreas.122140088@student.itera.ac.id',
        password='password3' # Add example password
    )
    dbsession.add(user1)
    dbsession.add(user2)
    dbsession.add(user3)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')
