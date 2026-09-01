from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.vendor import Vendor
from app.core.security import decode_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/vendors/login", auto_error=False)

def get_current_vendor(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Vendor:
    """
    Dependency to authenticate and return the current logged-in vendor.
    Raises 401 Unauthorized if invalid or missing token.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token is missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    payload = decode_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    vendor_id = payload["sub"]
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor account no longer exists"
        )
    
    return vendor

def get_optional_vendor(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[Vendor]:
    """Optional vendor authentication for public routes with enhanced features."""
    if not token:
        return None
    try:
        return get_current_vendor(token=token, db=db)
    except HTTPException:
        return None
