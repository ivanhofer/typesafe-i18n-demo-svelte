import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	startup: 'app started',
	locale: {
		choose: 'choose locale...',
		selectedLocale: 'Selected locale:',
	},
	greeting: {
		message: 'Hello {name:string}!',
		label: 'Your name:',
	},
	today: 'Today is {date:Date|weekday}',
	counter: {
		clicks: 'Clicks:'
	}
}

export default en
