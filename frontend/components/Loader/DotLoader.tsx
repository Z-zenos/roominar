'use client';

import './DotLoader.css';

interface DotLoaderProps {}

function DotLoader({}: DotLoaderProps) {
	return (
		<div className="py-[200px]">
			<div className="dot-spinner col-span-3">
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
				<div className="dot-spinner__dot" />
			</div>
		</div>
	);
}

export default DotLoader;
