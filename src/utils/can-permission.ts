import { Role } from '@/app/generated/enums';

export const canPermission = (role: Role, allowed: Role[]) => allowed.includes(role);
