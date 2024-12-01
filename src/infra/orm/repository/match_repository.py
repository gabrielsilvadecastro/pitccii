from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.orm.models import models

class MatchRepository():
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, match: schemas.MatchDTO):
        db_match = models.Match(
            datetime=match.datetime,
            match_type=match.match_type,
            distance=match.distance,
            match_status=match.match_status,
            judges=match.judges,
            location=match.location,
            athletes_involved=match.athletes_involved,
            result=match.result
        )
        self.db.add(db_match)
        self.db.commit()
        return db_match

    def get_matches(self):
        matches = self.db.query(models.Match).all()
        return matches

    def delete_match(self, match_id: int):
        match = self.db.query(models.Match).filter(models.Match.id == match_id).first()
        if match:
            self.db.delete(match)
            self.db.commit()
            return match
        return None

    def update_match(self, match_id: int, match: schemas.MatchDTO):
        db_match = self.db.query(models.Match).filter(models.Match.id == match_id).first()
        if db_match:
            for attr, value in match.dict().items():
                setattr(db_match, attr, value) if value else None
            self.db.commit()
            return db_match
        return None
    
    def get_match(self, match_id: int):
        return self.db.query(models.Match).filter(models.Match.id == match_id).first()

    def get_match_by_type(self, matchtype: str):
        return self.db.query(models.Match).filter(models.Match.match_type == matchtype).all()