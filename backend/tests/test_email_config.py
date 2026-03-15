import importlib
import sys


def load_server_module(monkeypatch, **env):
    monkeypatch.setenv("MONGO_URL", "mongodb://localhost:27017")
    monkeypatch.setenv("DB_NAME", "test_db")
    for key, value in env.items():
        if value is None:
            monkeypatch.delenv(key, raising=False)
        else:
            monkeypatch.setenv(key, value)
    sys.modules.pop("server", None)
    return importlib.import_module("server")


def test_email_helpers_prefer_gmail_env_names(monkeypatch):
    server = load_server_module(
        monkeypatch,
        RESEND_API_KEY=None,
        RESEND_FROM_EMAIL=None,
        GMAIL_USER="gmail@example.com",
        GMAIL_APP_PASSWORD="gmail-secret",
        EMAIL_ADDRESS="legacy@example.com",
        EMAIL_PASSWORD="legacy-secret",
        NOTIFICATION_EMAIL="alerts@example.com",
    )

    assert server.get_email_provider() == "gmail"
    assert server.get_from_email() == "gmail@example.com"
    assert server.get_gmail_app_password() == "gmail-secret"
    assert server.get_notification_email({"emailNotifications": "settings@example.com"}) == "alerts@example.com"


def test_email_helpers_fall_back_to_legacy_and_settings(monkeypatch):
    server = load_server_module(
        monkeypatch,
        RESEND_API_KEY=None,
        RESEND_FROM_EMAIL=None,
        GMAIL_USER=None,
        GMAIL_APP_PASSWORD=None,
        EMAIL_ADDRESS="legacy@example.com",
        EMAIL_PASSWORD="legacy-secret",
        NOTIFICATION_EMAIL=None,
    )

    assert server.get_email_provider() == "gmail"
    assert server.get_from_email() == "legacy@example.com"
    assert server.get_gmail_app_password() == "legacy-secret"
    assert server.get_notification_email({"emailNotifications": "settings@example.com"}) == "settings@example.com"


def test_email_helpers_prefer_resend_when_api_key_exists(monkeypatch):
    server = load_server_module(
        monkeypatch,
        RESEND_API_KEY="re_test_key",
        RESEND_FROM_EMAIL="UISN <onboarding@resend.dev>",
        GMAIL_USER="gmail@example.com",
        GMAIL_APP_PASSWORD="gmail-secret",
        NOTIFICATION_EMAIL="alerts@example.com",
    )

    assert server.get_email_provider() == "resend"
    assert server.get_resend_api_key() == "re_test_key"
    assert server.get_from_email() == "UISN <onboarding@resend.dev>"
    assert server.get_notification_email() == "alerts@example.com"
