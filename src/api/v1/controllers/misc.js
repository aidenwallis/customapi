const eightballResponses = [
    'It is certain.',
	'It is decidedly so.',
	'Without a doubt.',
	'Yes definitely.',
	'You may rely on it.',
	'As I see it, yes.',
	'Most likely.',
	'Outlook good.',
	'Most definitely.',
	'Signs point to yes.',
	'Better not tell you now.',
	'Concentrate and ask again.',
	'Don\'t count on it.',
	'My reply is no.',
	'My sources say no.',
	'Outlook not so good.',
	'Very doubtful.',
];

const coinflipResponses = [
	'Heads', 'Tails',
];

export function eightball(req, res) {
    return res.send(eightballResponses[Math.floor(Math.random() * eightballResponses.length)]);
}

export function coinflip(req, res) {
	return res.send(coinflipResponses[Math.floor(Math.random() * coinflipResponses.length)]);
}
