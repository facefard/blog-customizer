import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({
	onClick,
	isOpen,
}: {
	onClick: OnClick;
	isOpen?: boolean;
}) => {
	const containerStyle = {
		transform: isOpen ? 'translateX(616px)' : 'translateX(0)',
	};

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			style={containerStyle}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
