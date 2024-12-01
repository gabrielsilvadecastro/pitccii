from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'])

def get_hash(pwd: str):
    return pwd_context.hash(pwd)

def verify_hash(pwd: str, hash:str):
    return pwd_context.verify(pwd, hash)