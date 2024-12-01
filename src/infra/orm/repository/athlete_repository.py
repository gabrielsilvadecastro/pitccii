from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.orm.models import models

class AthleteRepository():
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, athlete: schemas.AthleteDTO):
        db_athlete = models.Athlete(
            name = athlete.name,
            birth_date = athlete.birth_date,
            country = athlete.country,
            height = athlete.height,
            weight = athlete.weight,
            best_times = athlete.best_times,
            team = athlete.team,
            specializations = athlete.specializations,
            medal_history = athlete.medal_history,
            modality = athlete.modality
        )
        self.db.add(db_athlete)
        self.db.commit()
        return db_athlete

    def get_athletes(self):
        athletes = self.db.query(models.Athlete).all()
        return athletes

    def delete_athlete(self, athlete_id: int):
        athlete = self.db.query(models.Athlete).filter(models.Athlete.id == athlete_id).first()
        if athlete:
            self.db.delete(athlete)
            self.db.commit()
            return athlete
        return None

    def update_athlete(self, athlete_id: int, athlete: schemas.AthleteDTO):
        db_athlete = self.db.query(models.Athlete).filter(models.Athlete.id == athlete_id).first()
        if db_athlete:
            for attr, value in athlete.dict().items():
                setattr(db_athlete, attr, value) if value else None
            self.db.commit()
            return db_athlete
        return None
    
    def get_athlete(self, athlete_id: int):
        return self.db.query(models.Athlete).filter(models.Athlete.id == athlete_id).first()

    def get_athlete_by_name(self, name: str):
        return self.db.query(models.Athlete).filter(models.Athlete.name == name).first()