from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.infra.orm.repository import athlete_repository,match_repository,judge_repository
from src.infra.orm.config import database
from src.schemas import schemas
from src.infra.orm.config.database import get_db, create_db
from fastapi.middleware.cors import CORSMiddleware
from src.infra.auth import hash_provider, token_provider
from src.utils import auth_utils
from typing import List
from fastapi.responses import RedirectResponse

create_db()

title_project = "Projeto- Natação Olímpica"
description_project = "O SGE tem como objetivo principal facilitar o gerenciamento de competições esportivas, permitindo o registro de atletas, a criação de partidas."
contact_project={
    "name": "Gabriel Silva de Castro",
    "url": "",
    "email": "gabrielcastrog2@gmail.com",
}

app = FastAPI(title=title_project, description=description_project, contact=contact_project)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/is_running')
def is_running():
    return {"running": True}

@app.get('/')
def redirect_ui():
    return RedirectResponse(url="/ui/")

@app.get('/athletes')
def get_athletes_controller(db: Session = Depends(get_db)):
    athletes = athlete_repository.AthleteRepository(db=db).get_athletes()
    return athletes

@app.get('/athlete/{id}')
def get_athlete_controller(id:int, db: Session = Depends(get_db)):
    athlete = athlete_repository.AthleteRepository(db=db).get_athlete(id)
    return athlete

@app.post('/athlete')
def create_athlete_controller(athlete: schemas.AthleteDTO, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    athlete = athlete_repository.AthleteRepository(db=db).create(athlete=athlete)
    return athlete

@app.delete("/athlete/{athlete_id}")
def delete_athlete_controller(athlete_id: int, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    athlete_repo = athlete_repository.AthleteRepository(db)
    athlete = athlete_repo.get_athlete(athlete_id)
    if not athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    athlete_repo.delete_athlete(athlete_id)
    return {"message": "Athlete deleted successfully"}

@app.put("/athlete/{athlete_id}")
def update_athlete_controller(athlete_id: int, athlete: schemas.AthleteDTO, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    athlete_repo = athlete_repository.AthleteRepository(db)
    existing_athlete = athlete_repo.get_athlete(athlete_id)
    if not existing_athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")
    return athlete_repo.update_athlete(athlete_id, athlete)

@app.get('/matches')
def get_matches_controller(db: Session = Depends(get_db)):
    matches = match_repository.MatchRepository(db=db).get_matches()
    return matches

@app.get('/match/{id}')
def get_match_controller(id:int, db: Session = Depends(get_db)):
    match = match_repository.MatchRepository(db=db).get_match(id)
    return match

@app.get('/match/type/{match_type}')
def get_match_controller(match_type: str, db: Session = Depends(get_db)):
    matches = match_repository.MatchRepository(db=db).get_match_by_type(matchtype=match_type)
    if matches:
        for m in matches:
            athletes = m.athletes_involved
            athletes_list = [item.strip() for item in athletes.split(',')]
            res: List[schemas.AthleteDTO] = []
            if athletes_list:
                for at in athletes_list:
                    res.append(athlete_repository.AthleteRepository(db=db).get_athlete_by_name(at))
                m.athletes_involved = res
    return matches

@app.post('/match')
def create_match_controller(match: schemas.MatchDTO, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    match = match_repository.MatchRepository(db=db).create(match=match)
    return match

@app.delete("/match/{match_id}")
def delete_match_controller(match_id: int, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    match_repo = match_repository.MatchRepository(db)
    match = match_repo.get_match(match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    match_repo.delete_match(match_id)
    return {"message": "Match deleted successfully", "match": match}

@app.put("/match/{match_id}")
def update_match_controller(match_id: int, match_dto: schemas.MatchDTO, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    match_repo = match_repository.MatchRepository(db)
    match = match_repo.get_match(match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    return match_repo.update_match(match_id, match_dto)

# @app.get('/judges')
# def get_judges_controller(db: Session = Depends(get_db)):
#     judges = judge_repository.JudgeRepository(db=db).get_judges()
#     return judges

# @app.get('/judge/{id}')
# def get_judge_controller(id:int, db: Session = Depends(get_db)):
#     judge = judge_repository.JudgeRepository(db=db).get_judge(id)
#     return judge

@app.post('/judge', response_model=schemas.JudgePublicDTO, status_code=status.HTTP_201_CREATED)
def create_judge_controller(judge_dto: schemas.JudgeDTO, db: Session = Depends(get_db)):
    exists_judge = judge_repository.JudgeRepository(db=db).get_by_email(email=judge_dto.email)
    if exists_judge:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='email já cadastrado')

    judge_dto.password = hash_provider.get_hash(judge_dto.password)

    judge = judge_repository.JudgeRepository(db=db).create(judge=judge_dto)
    return judge


@app.delete("/judge/{judge_id}")
def delete_judge_controller(judge_id: int, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    judge_repo = judge_repository.JudgeRepository(db)
    judge = judge_repo.get_judge(judge_id)
    if not judge:
        raise HTTPException(status_code=404, detail="Judge not found")
    judge_repo.delete_judge(judge_id)
    return {"message": "Judge deleted successfully", "judge_deleted": judge}

@app.put("/judge/{judge_id}")
def update_judge_controller(judge_id: int, judge_dto: schemas.JudgeDTO, db: Session = Depends(get_db), judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    judge_repo = judge_repository.JudgeRepository(db)
    judge = judge_repo.get_judge(judge_id)
    if not judge:
        raise HTTPException(status_code=404, detail="Judge not found")
    return judge_repo.update_judge(judge_id, judge_dto)

@app.post("/auth/login", status_code=200)
def login(login_dto: schemas.LoginDTO, db: Session = Depends(get_db)):
    pwd = login_dto.password
    email = login_dto.email
    judge = judge_repository.JudgeRepository(db=db).get_by_email(email=email)
    if not judge:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='email não cadastrado')

    if not hash_provider.verify_hash(pwd=pwd,hash=judge.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='senha incorreta')
    
    token = token_provider.create_access_token({'sub': judge.email})
    return {'judge': judge, 'access_token': token}

@app.post("/auth/me", response_model=schemas.JudgePublicDTO)
def me(judge_auth: schemas.JudgeDTO = Depends(auth_utils.get_judge_logged)):
    return judge_auth
