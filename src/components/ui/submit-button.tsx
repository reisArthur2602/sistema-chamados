'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFormContext } from 'react-hook-form';

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
    isPending?: boolean;
}

export function SubmitButton({ isPending = false, children, disabled, ...props }: SubmitButtonProps) {
    const {
        formState: { isSubmitting },
    } = useFormContext();

    const loading = isPending || isSubmitting;

    return (
        <Button type="submit" disabled={loading || disabled} {...props}>
            {loading && <Spinner />}
            {children}
        </Button>
    );
}
