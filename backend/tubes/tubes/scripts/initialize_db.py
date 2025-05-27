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

    # Tambahkan data awal untuk Acara
    acara1 = models.Acara(
        gambar_file='seminar_itera.jpg',
        judul='Seminar Nasional Teknologi',
        konten='Seminar Nasional Teknologi di ITERA akan membahas inovasi terbaru dalam berbagai bidang teknologi, mulai dari kecerdasan buatan hingga energi terbarukan. Acara ini akan menghadirkan para pakar industri dan akademisi terkemuka untuk berbagi wawasan dan pengalaman mereka.\n\nSelain sesi presentasi, akan ada juga workshop interaktif dan pameran proyek mahasiswa. Ini adalah kesempatan emas bagi para peserta untuk memperluas pengetahuan, membangun jaringan, dan melihat langsung penerapan teknologi terkini dalam berbagai solusi praktis.',
        tanggal_acara=date(2024, 10, 20),
        jenis_acara='Seminar'
    )
    acara2 = models.Acara(
        gambar_file='lomba_koding.png',
        judul='Lomba Koding ITERA',
        konten='Lomba Koding ITERA kembali hadir untuk menantang kemampuan pemrograman Anda! Kompetisi ini terbuka untuk seluruh mahasiswa ITERA dari berbagai jurusan. Persiapkan diri Anda untuk menyelesaikan soal-soal algoritma dan struktur data yang menarik dan menantang.\n\nTotal hadiah jutaan rupiah menanti para pemenang. Selain itu, ini adalah kesempatan bagus untuk mengasah skill koding, belajar dari peserta lain, dan mendapatkan pengalaman berharga dalam kompetisi pemrograman. Jangan lewatkan kesempatan ini untuk menjadi yang terbaik!',
        tanggal_acara=date(2024, 11, 15),
        jenis_acara='Lomba'
    )
    acara3 = models.Acara(
        gambar_file='expo_ukm.jpeg',
        judul='Expo UKM ITERA',
        konten='Expo UKM ITERA adalah ajang tahunan untuk memperkenalkan berbagai Unit Kegiatan Mahasiswa yang ada di kampus. Temukan minat dan bakat Anda dengan menjelajahi stand-stand UKM yang beragam, mulai dari bidang seni, olahraga, ilmiah, hingga keagamaan.\n\nAcara ini juga akan dimeriahkan dengan penampilan menarik dari berbagai UKM, talkshow inspiratif, dan kesempatan untuk langsung mendaftar menjadi anggota. Jangan lewatkan kesempatan untuk menjadi bagian dari komunitas yang sesuai dengan passion Anda di ITERA.',
        tanggal_acara=date(2024, 12, 1),
        jenis_acara='UKM'
    )
    acara4 = models.Acara(
        gambar_file='webinar_data_science.png',
        judul='Webinar Pengantar Data Science',
        konten='Ikuti Webinar Pengantar Data Science untuk memahami konsep dasar dan pentingnya Data Science di era digital saat ini. Webinar ini cocok bagi pemula yang tertarik dengan pengolahan dan analisis data. Narasumber ahli akan berbagi pengetahuan dan studi kasus menarik.\n\nAnda akan mempelajari tools dan teknik dasar yang digunakan dalam Data Science, serta bagaimana bidang ini diterapkan di berbagai industri. Webinar ini interaktif dan Anda akan memiliki kesempatan untuk bertanya langsung kepada narasumber. Segera daftar dan perluas wawasan Anda di bidang Data Science!',
        tanggal_acara=date(2025, 1, 10),
        jenis_acara='Seminar'
    )
    acara5 = models.Acara(
        gambar_file='turnamen_esport.jpg',
        judul='Turnamen E-sport ITERA',
        konten='Saksikan keseruan Turnamen E-sport ITERA yang akan mempertemukan tim-tim terbaik dalam game-game populer. Dukung tim favoritmu dan rasakan atmosfer kompetisi yang panas. Turnamen ini menjadi bukti perkembangan pesat industri e-sport di kalangan mahasiswa.\n\nSelain pertandingan utama, akan ada juga mini games, doorprize, dan kesempatan untuk bertemu dengan sesama penggemar e-sport. Jangan lewatkan acara ini untuk menjadi bagian dari komunitas gaming ITERA dan saksikan lahirnya juara-juara baru!',
        tanggal_acara=date(2025, 1, 25),
        jenis_acara='Lomba'
    )

    dbsession.add(acara1)
    dbsession.add(acara2)
    dbsession.add(acara3)
    dbsession.add(acara4)
    dbsession.add(acara5)


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
