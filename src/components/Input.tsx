import type { ChangeEventHandler } from "react";

interface InputProps {
	className?: string;
	id: string;
	maxLength: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onClear(): void;
	placeholder: string;
	value: string;
}

export default function Input(props: InputProps): JSX.Element {
	return (
		<div className={`relative flex h-12 w-1/4 min-w-max items-center justify-center ${props.className ?? ""}`}>
			<input
				autoCapitalize="off"
				autoComplete="off"
				autoCorrect="off"
				className="w-full rounded-md bg-discord-not-quite-black px-5 py-3 text-white shadow focus:outline-none"
				id={props.id}
				maxLength={props.maxLength}
				onChange={props.onChange}
				placeholder={props.placeholder}
				type="text"
				value={props.value}
			/>

			{props.value && (
				<label
					className="absolute right-0 my-auto mx-4 h-full min-w-max cursor-pointer text-2xl text-discord-red transition-colors active:text-red-600"
					// eslint-disable-next-line @typescript-eslint/unbound-method
					onClick={props.onClear}
				>
					<span className="inline-block h-10 align-middle leading-10">x</span>
				</label>
			)}
		</div>
	);
}
