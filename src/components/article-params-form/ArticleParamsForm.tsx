import { OnClick, ArrowButton } from '../arrow-button/ArrowButton';
import { Button } from 'components/button';
import React, { useState, useEffect, useRef } from 'react';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	backgroundColors,
	fontColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	defaultState,
	onParamsChange,
}: {
	defaultState: ArticleStateType;
	onParamsChange: (updatedState: ArticleStateType) => void;
}) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleSidebar: OnClick = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleChange = (updatedState: ArticleStateType) => {
		setArticleState(updatedState);
		onParamsChange(updatedState);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Предотвращаем стандартное действие отправки формы
		handleChange(articleState); // Вызываем обработчик изменения параметров
	};

	const handleReset = () => {
		setArticleState(defaultState); // Устанавливаем значения по умолчанию
		onParamsChange(defaultState); // Вызываем обработчик изменения параметров с дефолтными значениями
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={formRef}>
			<ArrowButton onClick={toggleSidebar} />
			<aside
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(value) =>
							setArticleState({ ...articleState, fontFamilyOption: value })
						}
						title='Шрифт'
					/>
					<RadioGroup
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						name='font-size'
						onChange={(value) =>
							setArticleState({ ...articleState, fontSizeOption: value })
						}
						title='Размер шрифта'
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						onChange={(value) =>
							setArticleState({ ...articleState, fontColor: value })
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						onChange={(value) =>
							setArticleState({ ...articleState, backgroundColor: value })
						}
						title='Цвет фона'
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						onChange={(value) =>
							setArticleState({ ...articleState, contentWidth: value })
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
