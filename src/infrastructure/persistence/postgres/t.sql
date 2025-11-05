CREATE TABLE
    IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        roles JSONB NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS roles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        channel TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        payload JSONB,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL,
        sent_at TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS audit_events (
        id TEXT PRIMARY KEY,
        provider_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        payload JSONB NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE INDEX IF NOT EXISTS idx_audit_provider ON audit_events (provider_id);

CREATE INDEX IF NOT EXISTS idx_audit_event_type ON audit_events (event_type);

CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_events (created_at);