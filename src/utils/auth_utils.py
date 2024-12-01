from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI, Depends, HTTPException, status
from src.infra.orm.config.database import get_db
from sqlalchemy.orm import Session
from src.infra.auth import token_provider
from jose import JWTError
from src.infra.orm.repository import judge_repository
oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')


def get_judge_logged(token: str = Depends(oauth2_schema), db: Session = Depends(get_db)):
    
    try:
        email = token_provider.verify_access_token(token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token invalido')
    
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token invalido')

    judge = judge_repository.JudgeRepository(db).get_by_email(email=email)

    if not judge:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token invalido')
    
    return judge