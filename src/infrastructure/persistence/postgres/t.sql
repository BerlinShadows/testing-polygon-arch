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

DROP TABLE IF EXISTS notifications;

CREATE TABLE
    notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        channel TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        payload JSONB,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL,
        sent_at TIMESTAMP,
        attempt INTEGER DEFAULT 0
    );

CREATE INDEX idx_notifications_user_id ON notifications (user_id);

CREATE INDEX idx_notifications_status ON notifications (status);

CREATE INDEX idx_notifications_attempt ON notifications (attempt);

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

CREATE TABLE
    IF NOT EXISTS scenario_templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        version INTEGER NOT NULL DEFAULT 1,
        parameters JSONB NOT NULL,
        steps JSONB NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE TABLE
    scenario_instances (
        id TEXT PRIMARY KEY,
        template_id TEXT NOT NULL REFERENCES scenario_templates (id) ON DELETE CASCADE,
        template_version INTEGER NOT NULL,
        status TEXT NOT NULL,
        input_parameters JSONB NOT NULL DEFAULT '{}',
        current_step_id TEXT,
        step_results JSONB NOT NULL DEFAULT '{}',
        started_at TIMESTAMP NOT NULL,
        completed_at TIMESTAMP,
        paused_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );

CREATE INDEX IF NOT EXISTS idx_scenario_instances_template_id ON scenario_instances (template_id);

CREATE INDEX IF NOT EXISTS idx_scenario_instances_status ON scenario_instances (status);

CREATE INDEX IF NOT EXISTS idx_scenario_instances_current_step ON scenario_instances (current_step_id);

DROP TABLE IF EXISTS scenario_instances;

DROP TABLE IF EXISTS scenario_templates;