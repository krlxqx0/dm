// =========================================================
// FOR MY LOVE — script.js
// =========================================================

// ---- НАСТРОЙКА ------------------------------------------------
// ВАЖНО: поставь здесь настоящую дату и время начала ваших отношений.
// Формат: 'ГГГГ-ММ-ДДTЧЧ:ММ:СС'
const START_DATE = new Date('2025-09-11T00:00:00')
// -----------------------------------------------------------------

function updateTimer() {
	const now = new Date()
	let diff = now - START_DATE

	if (diff < 0) diff = 0

	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
	const minutes = Math.floor((diff / (1000 * 60)) % 60)
	const seconds = Math.floor((diff / 1000) % 60)

	const pad = n => String(n).padStart(2, '0')

	const daysEl = document.getElementById('days')
	const hoursEl = document.getElementById('hours')
	const minutesEl = document.getElementById('minutes')
	const secondsEl = document.getElementById('seconds')

	if (daysEl) daysEl.textContent = days
	if (hoursEl) hoursEl.textContent = pad(hours)
	if (minutesEl) minutesEl.textContent = pad(minutes)
	if (secondsEl) secondsEl.textContent = pad(seconds)
}

updateTimer()
setInterval(updateTimer, 1000)

// ---- Лёгкий эффект лепестков ----------------------------------
// Один аккуратный момент анимации, запускается один раз — когда открытка открыта.
function spawnPetals() {
	const reduceMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches
	if (reduceMotion) return

	const symbols = ['🌸', '♡', '🌷']
	const count = 14

	for (let i = 0; i < count; i++) {
		const petal = document.createElement('span')
		petal.className = 'petal'
		petal.textContent = symbols[i % symbols.length]
		petal.style.left = Math.random() * 100 + 'vw'
		petal.style.fontSize = 14 + Math.random() * 14 + 'px'
		petal.style.setProperty('--drift', Math.random() * 80 - 40 + 'px')
		petal.style.animationDuration = 6 + Math.random() * 5 + 's'
		petal.style.animationDelay = Math.random() * 2.5 + 's'
		document.body.appendChild(petal)

		// убираем элемент из DOM после того как он долетел вниз, чтобы не копились
		petal.addEventListener('animationend', () => petal.remove())
	}
}

// ---- Открытка на входе в сайт ----------------------------------
;(function openingCard() {
	const cover = document.getElementById('cover')
	if (!cover) return

	let opened = false

	function openCover() {
		if (opened) return
		opened = true

		cover.classList.add('is-opening')
		document.body.classList.add('site-opened')
		document.body.classList.remove('locked')
		spawnPetals()

		// после появления фото отключаем анимацию появления,
		// чтобы transform дальше был свободен для эффекта при наведении
		document.querySelectorAll('.gallery-img').forEach(img => {
			img.addEventListener(
				'animationend',
				() => img.classList.add('is-settled'),
				{ once: true }
			)
		})

		// прячем открытку из потока после того как она уехала в стороны
		cover.addEventListener(
			'transitionend',
			() => cover.classList.add('is-hidden'),
			{ once: true }
		)
	}

	cover.addEventListener('click', openCover)
	cover.setAttribute('tabindex', '0')
	cover.setAttribute('role', 'button')
	cover.setAttribute('aria-label', 'Открыть сайт')
	cover.addEventListener('keydown', e => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			openCover()
		}
	})
})()
