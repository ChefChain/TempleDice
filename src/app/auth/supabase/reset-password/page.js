import * as React from 'react';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { ResetPasswordForm } from '@/components/auth/supabase/reset-password-form';

export const metadata = { title: `Reset password | Supabase | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <ResetPasswordForm />
      </SplitLayout>
    </GuestGuard>
  );
}
