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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';
import { z } from 'zod';

const createUsuarioSchema = z
    .object({
        nome: z.string().min(1, 'Nome obrigatório').max(255, 'Máximo 255 caracteres'),
        usuario: z.string(),
        role: z.nativeEnum(Role, { message: 'Selecione o papel' }),
        senha: z.string().min(8, 'Mínimo 8 caracteres'),
        confirmarSenha: z.string().min(1, 'Confirme a senha'),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: 'As senhas não coincidem',
        path: ['confirmarSenha'],
    });

type CreateUsuarioValues = z.infer<typeof createUsuarioSchema>;

export function CreateUserDialog() {
    const [open, setOpen] = useState(false);
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmar, setShowConfirmar] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateUsuarioValues>({
        resolver: zodResolver(createUsuarioSchema),
        defaultValues: { role: 'Membro', nome: '' },
    });

    const nome = watch('nome');

    useEffect(() => {
        if (!nome) return;
        setValue('usuario', slugify(nome, { replacement: '.', lower: true, strict: true }), {
            shouldValidate: false,
        });
    }, [nome, setValue]);

    async function onSubmit(_data: CreateUsuarioValues) {
        try {
            // TODO: chamar server action / API
            toast.success('Usuário criado com sucesso!');
            setOpen(false);
            reset();
        } catch {
            toast.error('Erro ao criar usuário. Tente novamente.');
        }
    }

    function handleOpenChange(value: boolean) {
        if (!value) reset();
        setOpen(value);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlusIcon />
                    Novo usuário
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-title text-lg">Novo usuário</DialogTitle>
                    <DialogDescription>
                        Preencha os dados para criar um novo usuário no sistema.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                        <Field className="col-span-2" data-invalid={!!errors.nome}>
                            <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
                            <Input id="nome" placeholder="Ex: João Silva" {...register('nome')} />
                            <FieldError
                                errors={errors.nome ? [{ message: errors.nome.message }] : []}
                            />
                        </Field>

                        <Field data-invalid={!!errors.usuario}>
                            <FieldLabel htmlFor="usuario">Usuário</FieldLabel>
                            <Input
                                id="usuario"
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
                            <FieldError
                                errors={errors.role ? [{ message: errors.role.message }] : []}
                            />
                        </Field>

                        <Field data-invalid={!!errors.senha}>
                            <FieldLabel htmlFor="senha">Senha</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="senha"
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
                                    {showSenha ? (
                                        <EyeOffIcon className="size-4" />
                                    ) : (
                                        <EyeIcon className="size-4" />
                                    )}
                                </button>
                            </div>
                            <FieldError
                                errors={errors.senha ? [{ message: errors.senha.message }] : []}
                            />
                        </Field>

                        <Field data-invalid={!!errors.confirmarSenha}>
                            <FieldLabel htmlFor="confirmarSenha">Confirmar senha</FieldLabel>
                            <div className="relative">
                                <Input
                                    id="confirmarSenha"
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
                                    {showConfirmar ? (
                                        <EyeOffIcon className="size-4" />
                                    ) : (
                                        <EyeIcon className="size-4" />
                                    )}
                                </button>
                            </div>
                            <FieldError
                                errors={
                                    errors.confirmarSenha
                                        ? [{ message: errors.confirmarSenha.message }]
                                        : []
                                }
                            />
                        </Field>
                    </div>

                    <DialogFooter className="mt-6" showCloseButton>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Criando...' : 'Criar usuário'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
