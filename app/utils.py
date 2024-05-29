# app/utils.py

import re

def is_valid_email(email):
    """Check if the email is valid using a regular expression."""
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def is_valid_password(password):
    """Check if the password is valid (e.g., at least 8 characters long)."""
    return len(password) >= 8
