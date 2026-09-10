// =========================================================
// letter.js — открытие конверта на странице письма
// =========================================================

const box = document.getElementById('envelopeBox')
const hint = document.getElementById('hint')
const fullLetter = document.getElementById('fullLetter')

function toggleEnvelope() {
	const isOpen = box.classList.toggle('is-open')
	hint.textContent = isOpen ? '' : 'нажми на конверт, чтобы открыть'

	if (isOpen) {
		setTimeout(() => {
			fullLetter.classList.add('is-shown')
			fullLetter.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
		}, 450)
	} else {
		fullLetter.classList.remove('is-shown')
	}
}

box.addEventListener('click', toggleEnvelope)

box.addEventListener('keydown', e => {
	if (e.key === 'Enter' || e.key === ' ') {
		e.preventDefault()
		toggleEnvelope()
	}
})
