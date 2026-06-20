import type { StatusChamado } from '@/generated/enums';

export const statusConfig: Record<StatusChamado, { label: string; className: string }> = {
    aberto: {
        label: 'Aberto',
        className:
            'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    },
    em_atendimento: {
        label: 'Em atendimento',
        className:
            'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    },
    resolvido: {
        label: 'Aguardando aprovação',
        className:
            'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    },
    fechado: {
        label: 'Fechado',
        className:
            'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400',
    },
    cancelado: {
        label: 'Cancelado',
        className:
            'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400',
    },
};
