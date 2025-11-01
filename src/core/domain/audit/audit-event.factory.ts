import { AuditEvent } from './audit-event.entity';
import { AuditProvider, AuditEventType } from './audit-event.types';

export class AuditEventFactory {
  static notificationProcessed(
    notificationId: string,
    userId: string,
    channel: string,
    status: string,
    title: string,
  ): AuditEvent {
    return new AuditEvent(
      AuditProvider.NotificationService,
      AuditEventType.NotificationProcessed,
      {
        notificationId,
        userId,
        channel,
        status,
        title,
      },
    );
  }

  static notificationFailed(
    notificationId: string,
    userId: string,
    channel: string,
    error: string,
  ): AuditEvent {
    return new AuditEvent(
      AuditProvider.NotificationService,
      AuditEventType.NotificationFailed,
      {
        notificationId,
        userId,
        channel,
        error,
      },
    );
  }

  static userCreated(userId: string, email: string, name: string): AuditEvent {
    return new AuditEvent(
      AuditProvider.UserService,
      AuditEventType.UserCreated,
      {
        userId,
        email,
        name,
      },
    );
  }

  static userLogin(userId: string, ip: string, userAgent: string): AuditEvent {
    return new AuditEvent(AuditProvider.UserService, AuditEventType.UserLogin, {
      userId,
      ip,
      userAgent,
    });
  }

  static roleCreated(
    roleId: string,
    name: string,
    description: string,
  ): AuditEvent {
    return new AuditEvent(
      AuditProvider.RoleService,
      AuditEventType.RoleCreated,
      {
        roleId,
        name,
        description,
      },
    );
  }

  static roleUpdated(
    roleId: string,
    name: string,
    description: string,
  ): AuditEvent {
    return new AuditEvent(
      AuditProvider.RoleService,
      AuditEventType.RoleUpdated,
      {
        roleId,
        name,
        description,
      },
    );
  }

  static scenarioStarted(scenarioName: string, startedAt: Date): AuditEvent {
    return new AuditEvent(
      AuditProvider.AuditService,
      AuditEventType.ScenarioStarted,
      {
        scenarioName,
        startedAt: startedAt.toISOString(),
      },
    );
  }

  static scenarioCompleted(
    scenarioName: string,
    durationMs: number,
  ): AuditEvent {
    return new AuditEvent(
      AuditProvider.AuditService,
      AuditEventType.ScenarioCompleted,
      {
        scenarioName,
        durationMs,
      },
    );
  }
}
