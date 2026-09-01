from pydantic import BaseModel
from typing import Optional, Any

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    vendor_id: Optional[str] = None

class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None
    data: Optional[Any] = None
