'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createComment } from '../actions/create-comment';

const schema = z.object({
    mensagem: z
        .string()
        .min(1, 'Digite um comentário')
        .max(2000, 'Máximo de 2000 caracteres'),
});

type FormValues = z.infer<typeof schema>;

interface TicketCommentFormProps {
    chamadoId: string;
}

export function TicketCommentForm({ chamadoId }: TicketCommentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: FormValues) {
        try {
            await createComment(chamadoId, data.mensagem);
            toast.success('Comentário adicionado!');
            reset();
        } catch {
            toast.error('Erro ao adicionar comentário.');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
            <Field data-invalid={!!errors.mensagem}>
                <FieldLabel htmlFor="mensagem">Adicionar comentário</FieldLabel>
                <Textarea
                    id="mensagem"
                    placeholder="Escreva um comentário..."
                    rows={3}
                    {...register('mensagem')}
                />
                <FieldError
                    errors={errors.mensagem ? [{ message: errors.mensagem.message }] : []}
                />
            </Field>
            <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Comentar'}
                </Button>
            </div>
        </form>
    );
}
