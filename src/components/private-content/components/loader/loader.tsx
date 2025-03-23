import { AppComponentsPropsBase } from '@/types';
import styled from 'styled-components';

const LoaderContainer = ({ className }: AppComponentsPropsBase) => {
	return (
		<div className={className}>
			<div className="loader" ></div>
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	& .loader {
		height: 3px;
		min-width: 99vw;
		--c: no-repeat linear-gradient(#44739c 0 0);
		background: var(--c), var(--c), #74bdfc;
		background-size: 60% 100%;
		animation: l16 3s infinite;
	}
	@keyframes l16 {
		0% {
			background-position: -150% 0, -150% 0;
		}
		66% {
			background-position: 250% 0, -150% 0;
		}
		100% {
			background-position: 250% 0, 250% 0;
		}
	}
`;
