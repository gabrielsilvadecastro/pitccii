from pydantic import BaseModel
from typing import Optional, List, ForwardRef
from datetime import datetime

class AthleteDTO(BaseModel):
    name: str
    birth_date: datetime
    country: str
    height: float
    weight: float
    best_times: str
    team: str
    specializations: str
    medal_history: str
    modality: str

    class Config:
        orm_mode = True

MatchDTO = ForwardRef("MatchDTO")

class JudgeDTO(BaseModel):
    name: str
    surname: str
    email: str
    password: str
    country: str
    certification_level: str
    arbitration_category: str
    associated_matches: str

    class Config:
        orm_mode = True

class JudgePublicDTO(BaseModel):
    id: int
    name: str
    surname: str
    email: str
    country: str
    certification_level: str
    arbitration_category: str
    associated_matches: str

    class Config:
        orm_mode = True

class MatchDTO(BaseModel):
    datetime: datetime
    match_type: str
    distance: float
    match_status: str
    judges: str
    location: str
    athletes_involved: str
    result: str

    class Config:
        orm_mode = True

class LoginDTO(BaseModel):
    email: str
    password: str
