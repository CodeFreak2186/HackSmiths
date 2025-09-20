from database import supabase

def register_user(email: str, password: str):
    try:
        auth_response = supabase.auth.sign_up({
        "email": email,
        "password": password
        })

        if hasattr(auth_response, "error") and auth_response.error:
            return {"error": auth_response.error.message}
        
    except Exception as e:
        return {"error": str(e)}

    # insert into users table
    db_response = supabase.table("users").insert({"email": email}).execute()

    return {
        "auth": auth_response.user,
        "db": db_response.data
    }


def authenticate_user(email: str, password: str):
    try:
        auth_response = supabase.auth.sign_in_with_password(
            {
                "email": email,
                "password": password,
            }
    )
    except Exception as e:
        return {"error": str(e)}

    # Check if login succeeded
    if hasattr(auth_response, "error") and auth_response.error:
        return {"error": auth_response.error.message}

    # auth_response is a dict-like object with 'session'
    return {"session": auth_response.session}