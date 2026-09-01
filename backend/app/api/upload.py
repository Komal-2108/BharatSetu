from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from app.core.storage import upload_file_bytes

router = APIRouter(prefix="/upload", tags=["Storage & Media"])

@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_file(
    file: UploadFile = File(...),
    subfolder: str = Form("media")
):
    """
    FR-14 & Storage Requirement:
    Uploads a file (vendor document or service image) to local storage / Supabase storage
    and returns the accessible URL.
    """
    allowed_folders = ["media", "docs", "services", "vendors"]
    if subfolder not in allowed_folders:
        subfolder = "media"

    content = await file.read()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File content is empty."
        )

    file_url = await upload_file_bytes(
        file_bytes=content,
        filename=file.filename or "upload.jpg",
        subfolder=subfolder
    )

    return {
        "filename": file.filename,
        "url": file_url,
        "subfolder": subfolder
    }
