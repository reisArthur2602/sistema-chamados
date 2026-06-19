'use client';

import { Role } from '@/app/generated/enums';
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
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, UserPlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUser } from '../actions/create-user';
import { updateUser } from '../actions/update-user';
import type { UserRow } from './users-columns';

const baseFields = {
    nome: z.string().min(1, 'Nome obrigatório').max(255, 'Máximo 255 caracteres'),
    usuario: z.string(),
    role: z.nativeEnum(Role, { message: 'Selecione o papel' }),
    senha: z.string(),
    confirmarSenha: z.string(),
};

const createSchema = z
    .object({ ...baseFields, senha: z.string().min(8, 'Mínimo 8 caracteres'), confirmarSenha: z.string().min(1, 'Confirme a senha') })
    .refine((d) => d.senha === d.confirmarSenha, {
        message: 'As senhas não coincidem',
        path: ['confirmarSenha'],
    });

const editSchema = z.object({
    nome: baseFields.nome,
    usuario: baseFields.usuario,
    role: baseFields.role,
    senha: z.string(),
    confirmarSenha: z.string(),
});

type FormValues = {
    nome: string;
    usuario: string;
    role: Role;
    senha: string;
    confirmarSenha: string;
};

interface UpsertUserDialogProps {
    user?: UserRow;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function UpsertUserDialog({ user, open: controlledOpen, onOpenChange: controlledOnOpenChange }: UpsertUserDialogProps) {
    const isEdit = !!user;

    const [internalOpen, setInternalOpen] = useState(false);
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmar, setShowConfirmar] = useState(false);

    const open = isEdit ? (controlledOpen ?? false) : internalOpen;
    const setOpen = (v: boolean) => {
        if (isEdit) controlledOnOpenChange?.(v);
        else setInternalOpen(v);
    };

    const schema = useMemo(() => (isEdit ? editSchema : createSchema), [isEdit]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: user?.nome ?? '',
            usuario: user?.usuario ?? '',
            role: user?.role ?? 'Membro',
            senha: '',
            confirmarSenha: '',
        },
    });

    const nome = watch('nome');

    useEffect(() => {
        if (isEdit) return;
        setValue('usuario', nome ? slugify(nome, { replacement: '.', lower: true, strict: true }) : '', {
            shouldValidate: false,
        });
    }, [nome, setValue, isEdit]);

    useEffect(() => {
        if (open) {
            reset({
                nome: user?.nome ?? '',
                usuario: user?.usuario ?? '',
                role: user?.role ?? 'Membro',
                senha: '',
                confirmarSenha: '',
            });
        }
    }, [open, user, reset]);

    async function onSubmit(data: FormValues) {
        try {
            if (isEdit) {
                await updateUser(user!.id, { nome: data.nome, role: data.role });
                toast.success('Usuário atualizado.');
            } else {
                await createUser({ nome: data.nome, usuario: data.usuario, role: data.role, senha: data.senha });
                toast.success('Usuário criado com sucesso!');
            }
            setOpen(false);
        } catch {
            toast.error(isEdit ? 'Erro ao atualizar usuário.' : 'Erro ao criar usuário.');
        }
    }

    const content = (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="font-title text-lg">
                    {isEdit ? 'Editar usuário' : 'Novo usuário'}
                </DialogTitle>
                {!isEdit && (
                    <DialogDescription>
                        Preencha os dados para criar um novo usuário no sistema.
                    </DialogDescription>
                )}
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                    <Field className="col-span-2" data-invalid={!!errors.nome}>
                        <FieldLabel htmlFor="upsert-nome">Nome completo</FieldLabel>
                        <Input id="upsert-nome" placeholder="Ex: João Silva" {...register('nome')} />
                        <FieldError errors={errors.nome ? [{ message: errors.nome.message }] : []} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="upsert-usuario">Usuário</FieldLabel>
                        <Input
                            id="upsert-usuario"
                            placeholder="joao.silva"
                            disabled
                            {...register('usuario')}
                        />
                    </Field>

                    <Field data-invalid={!!errors.role}>
                        <FieldLabel>Papel</FieldLabel>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o papel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Membro">Membro</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={errors.role ? [{ message: errors.role.message }] : []} />
                    </Field>

                    {!isEdit && (
                        <>
                            <Field data-invalid={!!errors.senha}>
                                <FieldLabel htmlFor="upsert-senha">Senha</FieldLabel>
                                <div className="relative">
                                    <Input
                                        id="upsert-senha"
                                        type={showSenha ? 'text' : 'password'}
                                        placeholder="Mínimo 8 caracteres"
                                        className="pr-9"
                                        {...register('senha')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSenha((v) => !v)}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        tabIndex={-1}
                                    >
                                        {showSenha ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                                    </button>
                                </div>
                                <FieldError errors={errors.senha ? [{ message: errors.senha.message }] : []} />
                            </Field>

                            <Field data-invalid={!!errors.confirmarSenha}>
                                <FieldLabel htmlFor="upsert-confirmar">Confirmar senha</FieldLabel>
                                <div className="relative">
                                    <Input
                                        id="upsert-confirmar"
                                        type={showConfirmar ? 'text' : 'password'}
                                        placeholder="Repita a senha"
                                        className="pr-9"
                                        {...register('confirmarSenha')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmar((v) => !v)}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        tabIndex={-1}
                                    >
                                        {showConfirmar ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                                    </button>
                                </div>
                                <FieldError errors={errors.confirmarSenha ? [{ message: errors.confirmarSenha.message }] : []} />
                            </Field>
                        </>
                    )}
                </div>

                <DialogFooter className="mt-6" showCloseButton>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting
                            ? isEdit ? 'Salvando...' : 'Criando...'
                            : isEdit ? 'Salvar' : 'Criar usuário'}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );

    if (isEdit) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                {content}
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlusIcon />
                    Novo usuário
                </Button>
            </DialogTrigger>
            {content}
        </Dialog>
    );
}
