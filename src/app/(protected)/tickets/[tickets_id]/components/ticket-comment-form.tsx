'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { SubmitButton } from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createComment } from '../actions/create-comment';
import { Send } from 'lucide-react';

const schema = z.object({
    mensagem: z.string().min(1, 'Digite um comentário').max(2000, 'Máximo de 2000 caracteres'),
});

type FormValues = z.infer<typeof schema>;

interface TicketCommentFormProps {
    chamadoId: string;
}

export function TicketCommentForm({ chamadoId }: TicketCommentFormProps) {
    const queryClient = useQueryClient();

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { mensagem: '' },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = methods;

    const { mutate} = useMutation({
        mutationFn: (data: FormValues) => createComment(chamadoId, data.mensagem),
        onSuccess: () => {
            toast.success('Comentário adicionado!');
            queryClient.invalidateQueries({ queryKey: ['comments', chamadoId] });

        },
        onError: () => toast.error('Erro ao adicionar comentário.'),
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit((data) => mutate(data))}  className="space-y-3">
                <Field data-invalid={!!errors.mensagem}>
                    <FieldLabel htmlFor="mensagem">Adicionar comentário</FieldLabel>
                    <Textarea
                        id="mensagem"
                        placeholder="Escreva um comentário..."

                        {...register('mensagem')}
                    />
                    <FieldError
                        errors={errors.mensagem ? [{ message: errors.mensagem.message }] : []}
                    />
                </Field>
                <div className="flex justify-end">
                    <SubmitButton  variant={"outline"}>
                      <Send className='size-3'/> Enviar
                    </SubmitButton>
                </div>
            </form>
        </FormProvider>
    );
}
