import { generate } from 'src/core/services/id-generator.service';
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
            generate(this.notificationProcessed.name),
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
            generate(this.notificationFailed.name),
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
            generate(this.userCreated.name),
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
        return new AuditEvent(
            generate(this.userLogin.name),
            AuditProvider.UserService, AuditEventType.UserLogin, {
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
            generate(this.roleCreated.name),
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
            generate(this.roleUpdated.name),
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
            generate(this.scenarioStarted.name),
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
            generate(this.scenarioCompleted.name),
            AuditProvider.AuditService,
            AuditEventType.ScenarioCompleted,
            {
                scenarioName,
                durationMs,
            },
        );
    }
}
