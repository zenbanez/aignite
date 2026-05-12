import re

def sanitize(inquiry_text):
    # PII Masking: Simple redaction for emails and phone numbers
    inquiry_text = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[EMAIL_REDACTED]', inquiry_text)
    inquiry_text = re.sub(r'\+?\d{10,15}', '[PHONE_REDACTED]', inquiry_text)
    
    # Prompt Injection Scrub: Check for common control characters/malicious patterns
    naughty_list = [r'system', r'ignore previous', r'admin', r'bash', r'exec', r'\\n']
    for pattern in naughty_list:
        inquiry_text = re.sub(pattern, '[SCRUBBED]', inquiry_text, flags=re.IGNORECASE)
    
    return inquiry_text.strip()
