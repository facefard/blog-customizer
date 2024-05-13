import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useState, useEffect, useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({ onClick }: { onClick: OnClick }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
		onClick(); // Вызов функции onClick из родительского компонента..
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const containerStyle = {
		transform: isOpen ? 'translateX(616px)' : 'translateX(0)',
	};

	return (
		<div
			ref={containerRef}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			style={containerStyle}
			onClick={toggleOpen}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
