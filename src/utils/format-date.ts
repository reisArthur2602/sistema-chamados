export const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

export const formatDateTime = (date: Date | string) =>
    new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(
        new Date(date)
    );
