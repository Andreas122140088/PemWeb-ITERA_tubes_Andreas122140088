from sqlalchemy import (
    Column,
    Integer,
    Text,
    Date,
)

from .meta import Base


class User(Base):
    """ Model untuk tabel tubes_user """
    __tablename__ = 'tubes_user'
    id = Column(Integer, primary_key=True)
    nim = Column(Text, unique=True, nullable=False)
    nama = Column(Text, nullable=False)
    jurusan = Column(Text, nullable=False)
    tanggal_lahir = Column(Date)
    alamat = Column(Text)
    email = Column(Text, unique=True, nullable=True)  
    password = Column(Text, nullable=False)  

    def to_dict(self):
        return {
            'id': self.id,
            'nim': self.nim,
            'nama': self.nama,
            'jurusan': self.jurusan,
            'tanggal_lahir': self.tanggal_lahir.isoformat() if self.tanggal_lahir else None,
            'alamat': self.alamat,
            'email': self.email,  
            'password': self.password,
        }