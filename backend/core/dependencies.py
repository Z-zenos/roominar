from datetime import datetime
from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlmodel import Session

from backend.api.audience.services.auth.get_user_service import (
    get_user_by_email,
)
from backend.constants.error_code import ErrorCode
from backend.core.code import RoleCode
from backend.core.config import settings
from backend.core.exception import AccessDeniedError, UnauthorizedError
from backend.db.database import get_db
from backend.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/auth/", auto_error=False)


DBDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(oauth2_scheme)]


def get_current_user(
    db: DBDep,
    token: TokenDep,
) -> User:
    if token:
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            email = payload.get("sub")
            if (
                email is None
                or not isinstance(email, str)
                or datetime.now().timestamp() > payload.get("exp")
            ):
                raise UnauthorizedError(error_code=ErrorCode.ERR_UNAUTHORIZED)
        except JWTError:
            raise UnauthorizedError(error_code=ErrorCode.ERR_UNAUTHORIZED)
        user = get_user_by_email(db, email, payload.get("role"))
        if not user:
            raise UnauthorizedError(error_code=ErrorCode.ERR_UNAUTHORIZED)
        return user
    else:
        raise UnauthorizedError(error_code=ErrorCode.ERR_UNAUTHORIZED)


def authorize_role(role: RoleCode):
    def wrapper(current_user: User = Depends(get_current_user)):
        if current_user.role_code != role:
            raise AccessDeniedError(error_code=ErrorCode.ERR_ACCESS_DENIED)
        return current_user

    return wrapper
