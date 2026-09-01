import logging
from typing import Optional
import httpx
from app.config import settings

logger = logging.getLogger("bharatsetu.whatsapp")

async def send_whatsapp_message(to_phone: str, body: str) -> bool:
    """
    Sends a WhatsApp message using Twilio API.
    CRITICAL RELIABILITY RULE (BR-08):
    This function catches all potential exceptions so that a notification failure
    never invalidates or rolls back a database booking transaction.
    """
    try:
        sid = settings.TWILIO_ACCOUNT_SID
        token = settings.TWILIO_AUTH_TOKEN
        from_phone = settings.TWILIO_WHATSAPP_NUMBER

        # Clean recipient phone number to whatsapp format
        clean_phone = to_phone.strip()
        if not clean_phone.startswith("whatsapp:"):
            if not clean_phone.startswith("+"):
                clean_phone = f"+91{clean_phone}"  # Default to India country code if missing
            clean_phone = f"whatsapp:{clean_phone}"

        # If credentials are missing, simulate delivery in logs for hackathon MVP
        if not sid or not token or sid.startswith("YOUR_"):
            logger.info(
                f"[WHATSAPP MOCK SIMULATION] To: {clean_phone} | Message: {body}"
            )
            print(f"\n==========================================")
            print(f"📲 [WHATSAPP NOTIFICATION SIMULATED]")
            print(f"To: {clean_phone}")
            print(f"Body:\n{body}")
            print(f"==========================================\n")
            return True

        # Twilio REST API URL
        url = f"https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json"
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url,
                data={
                    "From": from_phone,
                    "To": clean_phone,
                    "Body": body
                },
                auth=(sid, token)
            )

        if response.status_code in (200, 201):
            logger.info(f"WhatsApp message successfully sent to {clean_phone}")
            return True
        else:
            logger.error(f"Twilio API Error ({response.status_code}): {response.text}")
            return False

    except Exception as e:
        logger.error(f"Failed to send WhatsApp message to {to_phone}: {str(e)}")
        # Always return False safely without raising, satisfying BR-08
        return False


async def notify_new_booking(
    booking_id: str,
    customer_name: str,
    customer_phone: str,
    vendor_name: str,
    vendor_phone: str,
    service_title: str,
    booking_date: str
) -> dict:
    """
    Triggers dual WhatsApp notifications for a new booking:
    1. Confirmation to Customer
    2. New Booking Request to Vendor
    """
    customer_msg = (
        f"🌟 *BharatSetu Booking Confirmation*\n\n"
        f"Namaste {customer_name}! Your booking request has been registered.\n\n"
        f"📌 *Booking ID:* {booking_id[:8].upper()}\n"
        f"🏨 *Service:* {service_title}\n"
        f"📅 *Date:* {booking_date}\n"
        f"👤 *Vendor:* {vendor_name}\n"
        f"📞 *Vendor Contact:* {vendor_phone}\n\n"
        f"Status: *PENDING VENDOR CONFIRMATION*\n"
        f"You will receive an update once the vendor confirms your booking. Thank you for choosing local!"
    )

    vendor_msg = (
        f"🔔 *BharatSetu New Booking Request*\n\n"
        f"Namaste {vendor_name}! You have received a new customer booking.\n\n"
        f"📌 *Booking ID:* {booking_id[:8].upper()}\n"
        f"🛠️ *Service:* {service_title}\n"
        f"📅 *Requested Date:* {booking_date}\n"
        f"👤 *Customer Name:* {customer_name}\n"
        f"📞 *Customer Phone:* {customer_phone}\n\n"
        f"Please log into your BharatSetu Vendor Dashboard to accept or manage this booking."
    )

    # Trigger async notifications safely
    c_sent = await send_whatsapp_message(customer_phone, customer_msg)
    v_sent = await send_whatsapp_message(vendor_phone, vendor_msg)

    return {"customer_notified": c_sent, "vendor_notified": v_sent}


async def notify_booking_status_update(
    booking_id: str,
    customer_name: str,
    customer_phone: str,
    service_title: str,
    booking_date: str,
    new_status: str
) -> bool:
    """
    Notifies customer on WhatsApp when booking status changes (confirmed, completed, cancelled).
    """
    status_emoji = {
        "confirmed": "✅ CONFIRMED",
        "completed": "🎉 COMPLETED",
        "cancelled": "❌ CANCELLED"
    }.get(new_status.lower(), new_status.upper())

    msg = (
        f"📢 *BharatSetu Booking Status Update*\n\n"
        f"Namaste {customer_name}!\n"
        f"Your booking status for *{service_title}* on *{booking_date}* has been updated.\n\n"
        f"New Status: *{status_emoji}*\n"
        f"Booking ID: {booking_id[:8].upper()}\n\n"
    )

    if new_status.lower() == "completed":
        msg += "🌟 We hope you enjoyed your experience! Please visit BharatSetu to leave a review for your verified vendor."
    elif new_status.lower() == "confirmed":
        msg += "Your local service provider looks forward to hosting you!"
    elif new_status.lower() == "cancelled":
        msg += "We apologize for any inconvenience. Feel free to browse other authentic local providers on BharatSetu."

    return await send_whatsapp_message(customer_phone, msg)
