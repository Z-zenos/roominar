import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
	Control,
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext,
} from 'react-hook-form';

import {
	ChangeEvent,
	HTMLAttributes,
	createContext,
	useContext,
	forwardRef,
	ElementRef,
	ComponentPropsWithoutRef,
	useId,
} from 'react';
import { cn } from '@/lib/utils';
import TextInput, { TextInputProps } from '../Input/TextInput';
import { Label } from '../Label';
import Checkbox, { CheckboxProps } from '../Input/Checkbox';
import {
	DateRangePicker,
	DateRangePickerProps,
} from '../Datetime/DateRangePicker';
import { DateRange } from 'react-day-picker';
import clsx from 'clsx';

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const id = useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div ref={ref} className={cn('space-y-2', className)} {...props} />
			</FormItemContext.Provider>
		);
	},
);

FormItem.displayName = 'FormItem';

const FormLabel = forwardRef<
	ElementRef<typeof LabelPrimitive.Root>,
	ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	const { error, formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			className={cn(error && 'text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
});

FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<
	ElementRef<typeof Slot>,
	ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});

FormControl.displayName = 'FormControl';

const FormDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
});

FormDescription.displayName = 'FormDescription';

const FormMessage = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn('text-sm font-medium text-destructive', className)}
			{...props}
		>
			{body}
		</p>
	);
});

FormMessage.displayName = 'FormMessage';

interface FormInputProps extends TextInputProps {
	control: Control<any>;
	label?: string;
	isDisplayError?: boolean;
	onTextChange?(value: string): void;
}

const FormInput = ({
	name,
	control,
	isDisplayError = false,
	label,
	onTextChange,
	...props
}: FormInputProps) => {
	return (
		<FormField
			control={control}
			name={name as string}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<TextInput
							{...props}
							{...field}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								field.onChange(e);
								onTextChange && onTextChange(e.target.value);
							}}
						/>
					</FormControl>
					{isDisplayError && <FormMessage />}
				</FormItem>
			)}
		/>
	);
};

interface FormCheckBoxListProps extends CheckboxProps {
	items: { value: any; label: string }[];
	name: string;
	control: Control<any>;
	onSearch?(data: any): void;
}

const FormCheckBoxList = ({
	items,
	name,
	control,
	onSearch,
	className,
	...props
}: FormCheckBoxListProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={() => (
				<FormItem className={className}>
					{items.map((item, index) => (
						<FormField
							key={`ffcb-${item.value}`}
							control={control}
							name={name}
							render={({ field }) => {
								return (
									<FormItem
										key={`ficb-${item.value}`}
										className={clsx(
											!index && 'mt-2',
											'flex flex-row items-center justify-start space-x-1 ',
										)}
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(item.value)}
												{...props}
												onCheckedChange={(checked) => {
													let newItems = null;

													if (checked) {
														newItems = field?.value
															? [...field.value, item.value]
															: [item.value];
													} else {
														newItems = field.value?.filter(
															(value: any) => value !== item.value,
														);
													}
													field.onChange(newItems);
													(onSearch as Function)({
														[`${name}`]: newItems,
													});
												}}
												title={item.label}
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
					))}
					{/* <FormMessage /> */}
				</FormItem>
			)}
		/>
	);
};

FormCheckBoxList.displayName = 'FormCheckBoxList';

interface FormCheckBoxProps extends CheckboxProps {
	name: string;
	control: Control<any>;
	onSearch?(data: any): void;
}

const FormCheckBox = ({
	name,
	control,
	onSearch,
	...props
}: FormCheckBoxProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-center justify-start space-x-1">
					<FormControl>
						<Checkbox
							checked={field.value || false}
							{...props}
							onCheckedChange={(checked) => {
								field.onChange(checked);
								onSearch &&
									onSearch({
										[`${name}`]: checked,
									});
							}}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
};

FormCheckBox.displayName = 'FormCheckBox';

// interface FormSliderProps extends HTMLAttributes<HTMLDivElement> {
// 	min: number;
// 	max: number;
// 	control: Control<any>;
// 	onSearch?(data: any): void;
// 	name?: string;
// }

// const FormSlider = ({
// 	min,
// 	max,
// 	onSearch,
// 	name,
// 	control,
// 	className,
// }: FormSliderProps) => {
// 	return (
// 		<FormField
// 			control={control}
// 			name={name as string}
// 			render={({ field }) => (
// 				<FormItem>
// 					<FormControl>
// 						<div className={className}>
// 							<Slider
// 								className={clsx('my-2')}
// 								max={max}
// 								min={min}
// 								defaultValue={[1, 1000]}
// 								{...field}
// 								value={field.value || [1, 1000]}
// 								onChange={(values) => {
// 									field.onChange(values);
// 									(onSearch as Function)({ price: values });
// 								}}
// 							/>
// 							<div
// 								className={clsx(
// 									styles.between,
// 									'gap-1 1000px:flex-nowrap flex-wrap',
// 								)}
// 							>
// 								<TextInput
// 									leftIcon={<FaDollarSign className="text-purple-main" />}
// 									type="number"
// 									leftIconClassName="col-span-2"
// 									className="col-span-8"
// 									value={field.value ? field.value[0] : 1}
// 									onChange={(ev) => {
// 										field.onChange([+ev.target.value, field.value[1]]);
// 										(onSearch as Function)({
// 											price: [+ev.target.value, field.value[1]],
// 										});
// 									}}
// 								/>
// 								<IoRemoveOutline className="1000px:block hidden w-10 h-10" />
// 								<TextInput
// 									leftIcon={<FaDollarSign className="text-purple-main " />}
// 									type="number"
// 									leftIconClassName="col-span-2"
// 									className="col-span-8"
// 									value={field.value ? field.value[1] : 1000}
// 									onChange={(ev) => {
// 										field.onChange([field.value[0], +ev.target.value]);
// 										(onSearch as Function)({
// 											price: [field.value[0], +ev.target.value],
// 										});
// 									}}
// 								/>
// 							</div>
// 						</div>
// 					</FormControl>
// 					{/* <FormMessage /> */}
// 				</FormItem>
// 			)}
// 		/>
// 	);
// };

// FormSlider.displayName = 'FormSlider';

interface FormDateRangePickerProps extends DateRangePickerProps {
	name: string;
	control: Control<any>;
	onSearch?(data: any): void;
}

const FormDateRangePicker = ({
	name,
	control,
	onSearch,
	className,
}: FormDateRangePickerProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex flex-row items-center justify-start space-x-1">
					<FormControl>
						<DateRangePicker
							className={className}
							daterange={field.value}
							onDateRangeChange={(daterange: DateRange | undefined) => {
								field.onChange(daterange);
								(onSearch as Function)({ registerDateRange: daterange });
							}}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
};

FormDateRangePicker.displayName = 'FormDateRangePicker';

// interface FormTextareaProps extends TextareaProps {
// 	name: string;
// 	control: Control<any>;
// 	onSearch?(data: any): void;
// 	isDisplayError?: boolean;
// }

// const FormTextarea = ({
// 	name,
// 	control,
// 	onSearch,
// 	placeholder,
// 	isDisplayError,
// }: FormTextareaProps) => {
// 	return (
// 		<FormField
// 			control={control}
// 			name={name}
// 			render={({ field }) => (
// 				<FormItem>
// 					<FormControl>
// 						<Textarea
// 							placeholder={placeholder}
// 							className="resize-none"
// 							{...field}
// 						/>
// 					</FormControl>
// 					{isDisplayError && <FormMessage />}
// 				</FormItem>
// 			)}
// 		/>
// 	);
// };

// FormTextarea.displayName = 'FormTextarea';

// interface FormSelectProps extends SelectInputProps {
// 	name: string;
// 	control: Control<any>;
// 	onSearch?(data: any): void;
// 	isDisplayError?: boolean;
// }

// const FormSelect = ({
// 	values,
// 	name,
// 	control,
// 	onSearch,
// 	isDisplayError,
// 	className,
// }: FormSelectProps) => {
// 	return (
// 		<FormField
// 			control={control}
// 			name={name}
// 			render={({ field }) => (
// 				<FormItem>
// 					<FormControl>
// 						<SelectInput values={values} className={className} {...field} />
// 					</FormControl>
// 					{isDisplayError && <FormMessage />}
// 				</FormItem>
// 			)}
// 		/>
// 	);
// };

// FormSelect.displayName = 'FormSelect';

// interface FormImageUploaderProps extends ImageUploaderProps {
// 	name: string;
// 	control: Control<any>;
// 	isDisplayError?: boolean;
// }

// const FormImageUploader = ({
// 	name,
// 	control,
// 	isDisplayError,
// 	className,
// 	formats,
// 	onGetImageUrl,
// }: FormImageUploaderProps) => {
// 	return (
// 		<FormField
// 			control={control}
// 			name={name}
// 			render={({ field }) => (
// 				<FormItem>
// 					<FormControl>
// 						<ImageUploader
// 							className={className}
// 							formats={formats}
// 							onGetImageUrl={onGetImageUrl}
// 							{...field}
// 						/>
// 					</FormControl>
// 					{isDisplayError && <FormMessage />}
// 				</FormItem>
// 			)}
// 		/>
// 	);
// };

// FormImageUploader.displayName = 'FormImageUploader';

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
	FormInput,
	FormCheckBox,
	FormCheckBoxList,
	// FormSlider,
	FormDateRangePicker,
	// FormTextarea,
	// FormSelect,
	// FormImageUploader,
};
