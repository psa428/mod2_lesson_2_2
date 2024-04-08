import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';


export const App = () => {

	// Можно задать 2 состояния — steps и activeIndex
	const [steps] = useState(data);
	let [activeIndex, setActiveIndex] = useState(0);
	
	

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	function further(){
		
		if (activeIndex < steps.length -1)
			setActiveIndex(++activeIndex);
		else 
			setActiveIndex(0);
		
		setPosition(activeIndex);
		
	};	

	function back(){
		//	Обработчик нажатия кнопки "Назад"
		
		if (activeIndex > 0)
			setActiveIndex(--activeIndex);
		else
			setActiveIndex(0);
		
		setPosition(activeIndex);
		
	};

	
	function setPosition(ind) {
		
		if (ind === 0 ) {
			
			setIsFirstStep(true);
			setIsLastStep(false);
		}
		else if (ind === steps.length - 1) { 
			
			setIsFirstStep(false);
			setIsLastStep(true);
		}	
		else {
			
			setIsFirstStep(false);
			setIsLastStep(false);
		};
		
	};	

	function setStep(i){
		
		setActiveIndex(i);
		
		setPosition(i);
		
		
	};
		
	

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	let [isFirstStep, setIsFirstStep] = useState(true);
	let [isLastStep, setIsLastStep] = useState(false);
	
	
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
						
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{
							steps.map((item, index) => (<li className={styles['steps-item'] + ' ' + ((index > activeIndex) ? '' : styles.done)}>
								{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
								<button className={styles['steps-item-button']} onClick={() => setStep(index)}>{Number(item.id)}</button>
								{/* При клике на кнопку установка выбранного шага в качестве активного */}
								{item.title}
							</li>
								)
							)		
						}
						
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={() => back()} disabled={isFirstStep ? true : false}>Назад</button>
						<button className={styles.button} onClick={() => further()}>
							{isLastStep ? 'Начать с начала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
