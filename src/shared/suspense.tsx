import { Loader2 } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { Suspense as ReactSuspense } from 'react'

export const LoadingScreen = () => {
	return (
		<div className='fixed inset-0 grid items-center w-full h-full justify-items-center'>
			<Loader2 size='large' />
		</div>
	)
}

export const Suspense = ({ children }: PropsWithChildren) => {
	return <ReactSuspense fallback={<LoadingScreen />}>{children}</ReactSuspense>
}