'use client';

import { LogoMark } from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/ui/submit-button';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { login } from '../actions/login';

const loginSchema = z.object({
    usuario: z.string().min(1, 'Usuário obrigatório'),
    senha: z.string().min(1, 'Senha obrigatória'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();

    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    async function onSubmit(data: LoginFormValues) {
        const result = await login(data);
        if (result.ok) {
            toast.success(result.message);
            router.push('/tickets');
        } else {
            toast.error(result.message);
        }
    }

    return (
        <Card className="w-full border-border/60 shadow-lg">
            <CardHeader className="items-center pb-4 text-center">
                <Link href="/">
                    <LogoMark size={44} className="mx-auto" />
                </Link>
                <CardTitle className="font-title text-xl">Chamados</CardTitle>
                <CardDescription>Acesse com suas credenciais</CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FieldGroup>
                            <Field data-invalid={!!errors.usuario}>
                                <FieldLabel htmlFor="usuario">Usuário</FieldLabel>
                                <Input
                                    id="usuario"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="@arthur.reis"
                                    {...register('usuario')}
                                />
                                <FieldError
                                    errors={
                                        errors.usuario ? [{ message: errors.usuario.message }] : []
                                    }
                                />
                            </Field>

                            <Field data-invalid={!!errors.senha}>
                                <FieldLabel htmlFor="senha">Senha</FieldLabel>
                                <Input
                                    id="senha"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    {...register('senha')}
                                />
                                <FieldError
                                    errors={errors.senha ? [{ message: errors.senha.message }] : []}
                                />
                            </Field>

                            <SubmitButton className="w-full">Entrar</SubmitButton>
                        </FieldGroup>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
