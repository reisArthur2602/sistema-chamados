'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createTicket } from '../actions/create-ticket';

const createChamadoSchema = z.object({
    titulo: z.string().min(1, 'Título obrigatório').max(255, 'Máximo 255 caracteres'),
    descricao: z.string().min(1, 'Descrição obrigatória'),
    atribuidoParaId: z.string().optional(),
});

type CreateChamadoValues = z.infer<typeof createChamadoSchema>;

interface UsuarioOption {
    id: string;
    nome: string;
}

interface CreateTicketDialogProps {
    usuarios?: UsuarioOption[];
}

export function CreateTicketDialog({ usuarios = [] }: CreateTicketDialogProps) {
    const [open, setOpen] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateChamadoValues>({
        resolver: zodResolver(createChamadoSchema),
    });

    async function onSubmit(data: CreateChamadoValues) {
        await createTicket(data);
        toast.success('Chamado criado com sucesso!');
        setOpen(false);
        reset();
    }

    function handleOpenChange(value: boolean) {
        if (!value) reset();
        setOpen(value);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <PlusIcon />
                    Novo chamado
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-title text-lg">Novo chamado</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para abrir um novo chamado.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FieldGroup>
                        <Field data-invalid={!!errors.titulo}>
                            <FieldLabel htmlFor="titulo">Título</FieldLabel>
                            <Input
                                id="titulo"
                                placeholder="Descreva o problema brevemente"
                                {...register('titulo')}
                            />
                            <FieldError
                                errors={errors.titulo ? [{ message: errors.titulo.message }] : []}
                            />
                        </Field>

                        <Field data-invalid={!!errors.descricao}>
                            <FieldLabel htmlFor="descricao">Descrição</FieldLabel>
                            <Textarea
                                id="descricao"
                                placeholder="Descreva o problema em detalhes..."
                                rows={4}
                                {...register('descricao')}
                            />
                            <FieldError
                                errors={
                                    errors.descricao ? [{ message: errors.descricao.message }] : []
                                }
                            />
                        </Field>

                        <Field data-invalid={!!errors.atribuidoParaId}>
                            <FieldLabel>
                                Atribuir para{' '}
                                <span className="font-normal text-muted-foreground">
                                    (opcional)
                                </span>
                            </FieldLabel>
                            <Controller
                                name="atribuidoParaId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={usuarios.length === 0}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    usuarios.length === 0
                                                        ? 'Nenhum usuário disponível'
                                                        : 'Selecione um responsável'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {usuarios.map((u) => (
                                                <SelectItem key={u.id} value={u.id}>
                                                    {u.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-6" showCloseButton>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Criando...' : 'Criar chamado'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
