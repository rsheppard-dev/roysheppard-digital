import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

const Form = () => {
	const [isSending, setIsSending] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const recaptchaRef = useRef();

	const onSubmitForm = async (data, e) => {
		setIsSending(true);

		const token = await recaptchaRef.current.executeAsync();
		recaptchaRef.current.reset();
		data.token = token;

		fetch('/api/mail', {
			method: 'post',
			body: JSON.stringify(data),
		});

		setIsSending(false);
		e.target.reset();

		// dynamically load snackbar
		const Snackbar = (await import('../utils/snackbar')).default;
		const snackbar = new Snackbar();
		snackbar.init();
		snackbar.show('Your message has been sent.');
	};

	return (
		<form method='post' onSubmit={handleSubmit(onSubmitForm)}>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label'>
					Full name *
				</label>
				<input
					type='text'
					className={`form-control ${errors.name && 'border border-danger'}`}
					id='name'
					{...register('name', {
						required: 'Name is required.',
						minLength: {
							value: 4,
							message: 'Minimum name length is 4 characters.',
						},
					})}
				/>
				{errors.name && (
					<small className='text-danger'>{errors.name.message}</small>
				)}
			</div>

			<div className='mb-3'>
				<label htmlFor='email' className='form-label'>
					Email *
				</label>
				<input
					type='email'
					className={`form-control ${errors.email && 'border border-danger'}`}
					id='email'
					{...register('email', {
						required: 'Email is required.',
						pattern: {
							value:
								/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'You must enter a valid email address.',
						},
					})}
				/>
				{errors.email && (
					<small className='text-danger'>{errors.email.message}</small>
				)}
			</div>

			<div className='mb-3'>
				<label htmlFor='phone' className='form-label'>
					Phone number
				</label>
				<input
					type='phone'
					className={`form-control ${errors.phone && 'border border-danger'}`}
					id='phone'
					{...register('phone', {
						pattern: {
							value: /^[0-9]*$/,
							message: 'Phone number can only include numbers.',
						},
						minLength: {
							value: 11,
							message: 'Phone number must be at least 11 numbers.',
						},
					})}
				/>
				{errors.phone && (
					<small className='text-danger'>{errors.phone.message}</small>
				)}
			</div>

			<div className='mb-3'>
				<label htmlFor='message' className='form-label'>
					Message *
				</label>
				<textarea
					className={`form-control ${errors.message && 'border border-danger'}`}
					id='message'
					rows='3'
					{...register('message', {
						required: 'Message is required.',
						minLength: {
							value: 10,
							message: 'Minimum length of message is 10 characters.',
						},
					})}
				/>
				{errors.message && (
					<small className='text-danger'>{errors.message.message}</small>
				)}
			</div>

			<ReCAPTCHA
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
				size='invisible'
				ref={recaptchaRef}
			/>

			<button type='submit' className='button' disabled={isSending}>
				{isSending ? 'Sending.....' : 'Send message'}
			</button>
			<small>
				This site is protected by reCAPTCHA and the Google{' '}
				<a
					target='_blank'
					href='https://policies.google.com/privacy'
					rel='noreferrer'
				>
					Privacy Policy
				</a>{' '}
				and{' '}
				<a
					target='_blank'
					href='https://policies.google.com/terms'
					rel='noreferrer'
				>
					Terms of Service
				</a>{' '}
				apply.
			</small>

			<style jsx>
				{`
					button {
						width: 180px;
					}
				`}
			</style>
		</form>
	);
};

export default Form;
