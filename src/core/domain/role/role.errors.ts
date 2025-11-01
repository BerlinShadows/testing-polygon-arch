export class RoleNotFoundError extends Error {
  constructor(id: string) {
    super(`Role with ID ${id} not found`);
    this.name = 'RoleNotFoundError';
  }
}

export class RoleAlreadyExistsError extends Error {
  constructor(name: string) {
    super(`Role with name "${name}" already exists`);
    this.name = 'RoleAlreadyExistsError';
  }
}
