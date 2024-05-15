import { ArrowButton } from '../arrow-button/ArrowButton';
import { Button } from 'components/button';
import React, { useState, useRef } from 'react';
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
import clsx from 'clsx';
import { useClose } from '../hooks/useClose';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	defaultState,
	onParamsChange,
}: {
	defaultState: ArticleStateType;
	onParamsChange: (updatedState: ArticleStateType) => void;
}) => {
	const [formState, setFormState] = useState<ArticleStateType>(defaultState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleChange = (updatedState: ArticleStateType) => {
		setFormState(updatedState);
		onParamsChange(updatedState);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleChange(formState);
	};

	const handleReset = () => {
		setFormState(defaultState);
		onParamsChange(defaultState);
	};

	// Используем кастомный хук для навешивания и удаления обработчиков
	useClose({
		isOpen: isSidebarOpen,
		onClose: () => setIsSidebarOpen(false),
		rootRef: formRef,
	});

	return (
		<div>
			<ArrowButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name='font-size'
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
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
