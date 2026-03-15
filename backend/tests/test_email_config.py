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
        GMAIL_USER="gmail@example.com",
        GMAIL_APP_PASSWORD="gmail-secret",
        EMAIL_ADDRESS="legacy@example.com",
        EMAIL_PASSWORD="legacy-secret",
        NOTIFICATION_EMAIL="alerts@example.com",
    )

    from_email, password = server.get_email_credentials()

    assert from_email == "gmail@example.com"
    assert password == "gmail-secret"
    assert server.get_notification_email({"emailNotifications": "settings@example.com"}) == "alerts@example.com"


def test_email_helpers_fall_back_to_legacy_and_settings(monkeypatch):
    server = load_server_module(
        monkeypatch,
        GMAIL_USER=None,
        GMAIL_APP_PASSWORD=None,
        EMAIL_ADDRESS="legacy@example.com",
        EMAIL_PASSWORD="legacy-secret",
        NOTIFICATION_EMAIL=None,
    )

    from_email, password = server.get_email_credentials()

    assert from_email == "legacy@example.com"
    assert password == "legacy-secret"
    assert server.get_notification_email({"emailNotifications": "settings@example.com"}) == "settings@example.com"
