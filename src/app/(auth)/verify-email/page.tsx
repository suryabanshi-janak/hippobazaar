import Image from 'next/image';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function VerifyEmailPage({ searchParams }: PageProps) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className='container flex flex-col items-center justify-center relative pt-20 lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        {token && typeof token === 'string' ? (
          <div className='grid gap-6'></div>
        ) : (
          <div className='flex items-center justify-center flex-col h-full space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/hippo-email-sent.png'
                alt='hippo email sent image'
                fill
              />
            </div>

            <h3 className='font-semibold text-2xl'>Check your email</h3>

            <p className='text-muted-foreground text-center'>
              We&apos;ve sent a verification link to{' '}
              {toEmail ? (
                <span className='font-semibold'>{toEmail}</span>
              ) : (
                'your email.'
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
