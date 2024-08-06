'use client';

import { useEffect, useState } from 'react';
import { Message, useForm } from 'react-hook-form';
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiFillFacebook,
} from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiMail } from 'react-icons/hi';
import clsx from 'clsx';
import {
	audRegisterFormSchema,
	AudRegisterFormSchema,
} from '@/lib/schemas/audience/AudRegisterFormSchema';
import { useAudRegisterMutation } from '@/lib/redux/authApi';
import { Form, FormInput } from './Form';
import { Label } from '../Label';
import { styles } from '@/config/styles';
import Button from '../Button/Button';
import { Link } from '@nextui-org/link';

interface AudRegisterFormProps {}

function AudRegisterForm({}: AudRegisterFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<AudRegisterFormSchema>({
		mode: 'all',
		defaultValues: {
			avatar: '',
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(audRegisterFormSchema),
	});

	const [registerUser, { data, error, isSuccess, isLoading }] =
		useAudRegisterMutation();

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || 'Registration successful';

			toast.success(message, { duration: 3000 });
			form.reset();
		}
		if (error) {
			if ('data' in error) {
				const errorData = error as any;

				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);

	async function handleAudRegister(data: AudRegisterFormSchema) {
		if (
			Object.keys(form.formState.errors).length === 0 &&
			form.formState.errors.constructor === Object
		) {
			try {
				await registerUser(data);
			} catch (error: any) {
				toast.error(error?.response?.data?.message as Message);
			}
		} else {
			toast.error(form.formState.errors?.email?.message as Message);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleAudRegister)}
				className={clsx('flex items-center justify-center flex-col')}
			>
				<div className="w-full">
					<div className="w-full">
						<div className="mb-2 block">
							<Label htmlFor="email" className={clsx(styles.label)}>
								Your email
							</Label>
						</div>
						<FormInput
							id="email"
							name="email"
							type="email"
							rightIcon={<HiMail size={20} className="text-purple-main" />}
							placeholder="registermail@gmail.com"
							control={form.control}
							isDisplayError={true}
							className={clsx(
								form.formState.errors.email &&
									form.formState.touchedFields.email &&
									'border-error-main',
							)}
						/>
					</div>

					<div className="flex w-full mt-5 mb-1 items-start justify-between gap-2">
						<div className="w-full">
							<div className="mb-2 block">
								<Label htmlFor="firstName" className={clsx(styles.label)}>
									First name
								</Label>
							</div>
							<FormInput
								id="firstName"
								name="firstName"
								placeholder="Kevin"
								className={clsx(
									form.formState.errors.firstName &&
										form.formState.touchedFields.firstName &&
										'border-error-main',
								)}
								control={form.control}
								isDisplayError={true}
							/>
						</div>

						<div className="w-full">
							<div className="mb-2 block">
								<Label htmlFor="lastName" className={clsx(styles.label)}>
									Last name
								</Label>
							</div>
							<FormInput
								id="lastName"
								name="lastName"
								placeholder="De Bruyne"
								className={clsx(
									form.formState.errors.lastName &&
										form.formState.touchedFields.lastName &&
										'border-error-main',
								)}
								control={form.control}
								isDisplayError={true}
							/>
						</div>
					</div>
					<div className="w-full mt-5 relative mb-1">
						<div className="mb-2 block">
							<Label htmlFor="password" className={clsx(styles.label)}>
								Enter your password
							</Label>
						</div>
						<FormInput
							id="password"
							name="password"
							type={!showPassword ? 'password' : 'text'}
							rightIcon={
								!showPassword ? (
									<AiOutlineEyeInvisible
										className="text-purple-main"
										size={20}
										onClick={() => setShowPassword(true)}
									/>
								) : (
									<AiOutlineEye
										className="text-purple-main"
										size={20}
										onClick={() => setShowPassword(false)}
									/>
								)
							}
							placeholder="password!@%"
							className={clsx(
								form.formState.errors.password &&
									form.formState.touchedFields.password &&
									'border-error-main',
							)}
							control={form.control}
							isDisplayError={true}
						/>
					</div>

					<div className="w-full mt-5 relative mb-1">
						<div className="mb-2 block">
							<Label htmlFor="confirm-password" className={clsx(styles.label)}>
								Confirm password
							</Label>
						</div>
						<FormInput
							id="confirm-password"
							name="confirmPassword"
							type={!showConfirmPassword ? 'password' : 'text'}
							rightIcon={
								!showConfirmPassword ? (
									<AiOutlineEyeInvisible
										className="text-purple-main"
										size={20}
										onClick={() => setShowConfirmPassword(true)}
									/>
								) : (
									<AiOutlineEye
										className="text-purple-main"
										size={20}
										onClick={() => setShowConfirmPassword(false)}
									/>
								)
							}
							placeholder="password!@%"
							className={clsx(
								form.formState.errors.confirmPassword &&
									form.formState.touchedFields.confirmPassword &&
									'border-error-main',
							)}
							control={form.control}
							isDisplayError={true}
						/>
					</div>
				</div>
				<p className="text-sm text-gray-600 font-light mt-3">
					Please agree to the
					<Link href="#" underline="hover" className="text-primary mx-1">
						Terms of Use
					</Link>{' '}
					and{' '}
					<Link href="#" underline="hover" className="text-primary mx-1">
						Personal Information Handling
					</Link>{' '}
					before registering.
				</p>
				<Button
					title="Register"
					type="submit"
					className="w-80 mt-5"
					disabled={!form.formState.isValid || !form.formState.isDirty}
					isLoading={isLoading}
				/>
				<br />
				<h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
					Or join with
				</h5>
				<div className="flex items-center justify-center mt-3">
					<FcGoogle
						size={30}
						className="cursor-pointer mr-2"
						onClick={() => signIn('google')}
					/>
					<AiFillFacebook
						size={30}
						className="cursor-pointer ml-2 text-[#1877F2]"
						onClick={() => signIn('github')}
					/>
				</div>

				<h5 className="text-center pt-4 font-Poppins text-nm font-light">
					Already have account?
					<Link
						href="/login"
						className="text-primary font-semibold pl-1 cursor-pointer"
					>
						Login
					</Link>
				</h5>

				<p className={clsx('mt-4 gap-2 font-light', styles.center)}>
					Want to host your own event?
					<Button className="outline-none">Navigate to organization </Button>
				</p>
			</form>
		</Form>
	);
}

export default AudRegisterForm;
