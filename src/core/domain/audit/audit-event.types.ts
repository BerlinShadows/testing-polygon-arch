export enum AuditProvider {
  NotificationService = 'notification-service',
  UserService = 'user-service',
  RoleService = 'role-service',
  AuthService = 'auth-service',
  AuditService = 'audit-service',
  BankingService = 'banking-service',
}

export enum AuditEventType {
  NotificationProcessed = 'notification_processed',
  NotificationFailed = 'notification_failed',

  UserCreated = 'user_created',
  UserUpdated = 'user_updated',
  UserDeleted = 'user_deleted',
  UserLogin = 'user_login',
  UserLogout = 'user_logout',

  RoleCreated = 'role_created',
  RoleUpdated = 'role_updated',
  RoleDeleted = 'role_deleted',

  LoginSuccess = 'login_success',
  LoginFailed = 'login_failed',

  TransferExecuted = 'transfer_executed',
  DepositReceived = 'deposit_received',
  WithdrawalInitiated = 'withdrawal_initiated',

  ScenarioStarted = 'scenario_started',
  ScenarioCompleted = 'scenario_completed',
}
