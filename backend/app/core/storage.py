import os
import uuid
import logging
import httpx
from app.config import settings

logger = logging.getLogger("bharatsetu.storage")

async def upload_file_bytes(file_bytes: bytes, filename: str, subfolder: str = "media") -> str:
    """
    Saves file bytes locally and optionally uploads to Supabase Storage if configured.
    Returns the accessible URL string.
    """
    # Ensure local directory exists
    target_dir = os.path.join(settings.UPLOAD_DIR, subfolder)
    os.makedirs(target_dir, exist_ok=True)

    # Generate unique filename
    ext = os.path.splitext(filename)[1].lower()
    if not ext:
        ext = ".jpg"
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    local_filepath = os.path.join(target_dir, unique_filename)

    # Save to local disk
    with open(local_filepath, "wb") as f:
        f.write(file_bytes)

    local_url = f"{settings.BASE_URL.rstrip('/')}/uploads/{subfolder}/{unique_filename}"

    # Supabase Storage Integration (if credentials configured)
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        try:
            supabase_url = settings.SUPABASE_URL.rstrip("/")
            bucket = settings.SUPABASE_BUCKET
            destination_path = f"{subfolder}/{unique_filename}"
            upload_endpoint = f"{supabase_url}/storage/v1/object/{bucket}/{destination_path}"

            headers = {
                "Authorization": f"Bearer {settings.SUPABASE_KEY}",
                "apikey": settings.SUPABASE_KEY,
                "Content-Type": "application/octet-stream"
            }

            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(upload_endpoint, content=file_bytes, headers=headers)
                if res.status_code in (200, 201):
                    public_url = f"{supabase_url}/storage/v1/object/public/{bucket}/{destination_path}"
                    logger.info(f"Uploaded file to Supabase Storage: {public_url}")
                    return public_url
                else:
                    logger.warning(f"Supabase Storage upload returned status {res.status_code}: {res.text}. Falling back to local URL.")
        except Exception as e:
            logger.error(f"Supabase Storage error: {str(e)}. Falling back to local URL.")

    return local_url
