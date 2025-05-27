from sqlalchemy import Column, Integer, String, Text, Date
from .meta import Base

class Acara(Base):
    __tablename__ = 'acara'
    id = Column(Integer, primary_key=True) # Mengganti nama kolom id menjadi id_acara
    gambar_file = Column(String)
    judul = Column(String)
    konten = Column(Text)
    tanggal_acara = Column(Date) # Kolom baru untuk tanggal acara
    jenis_acara = Column(String) # Kolom baru untuk jenis acara (disimpan sebagai string)
