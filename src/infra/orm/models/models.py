from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Table
from src.infra.orm.config.database import Base
from typing import Optional, List
from datetime import datetime


class Athlete(Base):
    __tablename__ = 'athletes'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    birth_date = Column(DateTime)
    country = Column(String)
    height = Column(Float)
    weight = Column(Float)
    best_times = Column(String, nullable=True)
    team = Column(String)
    specializations = Column(String)
    medal_history = Column(String)
    modality = Column(String)

class Judge(Base):
    __tablename__ = 'judges'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    surname = Column(String)
    email = Column(String)
    password = Column(String)
    country = Column(String)
    certification_level = Column(String)
    arbitration_category = Column(String)
    associated_matches = Column(String)
    

class Match(Base):
    __tablename__ = 'matches'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    datetime = Column(DateTime, default=datetime.now)
    match_type = Column(String)
    distance = Column(Float)
    match_status = Column(String)
    location = Column(String)
    result = Column(String)
    judges = Column(String)
    athletes_involved = Column(String)

