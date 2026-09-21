const characters = [
  {name:'The Innocent',lead:'Finds hope and sees what is good in people.',strengths:['Optimism','Trust','Sincerity'],skills:['Look for the good without ignoring problems.','Tell the truth kindly, even when it is difficult.','Notice when someone needs encouragement.'],action:'Tell someone one specific thing you appreciate about them.'},
  {name:'The Explorer',lead:'Steps into the unfamiliar with curiosity and courage.',strengths:['Curiosity','Independence','Adaptability'],skills:['Ask questions before making assumptions.','Try an unfamiliar activity or approach.','Work out what matters to you, then choose your direction.'],action:'Try one new way of solving a familiar problem.'},
  {name:'The Sage',lead:'Looks closely, asks better questions and learns before deciding.',strengths:['Wisdom','Reflection','Clear thinking'],skills:['Check whether information is reliable.','Listen to more than one point of view.','Explain your thinking and change your mind when evidence changes.'],action:'Ask “How do we know?” and look for evidence.'},
  {name:'The Hero',lead:'Acts with courage when a challenge matters.',strengths:['Courage','Effort','Perseverance'],skills:['Begin a difficult task even when unsure.','Practise after a mistake instead of quitting.','Use your strength to help someone else.'],action:'Take the first small step on a task you have been avoiding.'},
  {name:'The Rebel',lead:'Questions unfairness and has the nerve to improve things.',strengths:['Conviction','Independence','Boldness'],skills:['Challenge an idea respectfully.','Speak up when someone is treated unfairly.','Offer a constructive alternative, not just criticism.'],action:'Name one thing you would improve and suggest a fair way to change it.'},
  {name:'The Magician',lead:'Imagines what could be and helps turn possibility into action.',strengths:['Imagination','Vision','Resourcefulness'],skills:['Connect ideas that seem unrelated.','Turn a big idea into one practical step.','Help others see a new possibility.'],action:'Sketch an idea that could make someone’s day easier.'},
  {name:'The Everyman',lead:'Makes room for others and helps people feel they belong.',strengths:['Belonging','Humility','Loyalty'],skills:['Include someone who is left out.','Listen without trying to impress.','Do your share when a group depends on you.'],action:'Invite someone into a conversation or activity.'},
  {name:'The Lover',lead:'Builds strong connections through care and attention.',strengths:['Empathy','Commitment','Connection'],skills:['Notice how your words affect people.','Show appreciation in a specific way.','Respect boundaries while caring for others.'],action:'Check in with someone and really listen to their answer.'},
  {name:'The Jester',lead:'Brings joy and helps others see a lighter side.',strengths:['Humour','Playfulness','Perspective'],skills:['Use humour that includes rather than hurts.','Lift the mood when a group is under pressure.','Know when it is time to be serious.'],action:'Make someone smile without making anyone the target of the joke.'},
  {name:'The Caregiver',lead:'Notices needs and gives practical help.',strengths:['Kindness','Reliability','Compassion'],skills:['Ask what help would be useful.','Follow through on a promise.','Care for others while looking after yourself too.'],action:'Offer one practical act of help today.'},
  {name:'The Creator',lead:'Makes new things and improves what already exists.',strengths:['Creativity','Craft','Persistence'],skills:['Try more than one draft or idea.','Accept feedback and improve your work.','Build something that solves a real problem.'],action:'Make a rough first version of an idea you care about.'},
  {name:'The Ruler',lead:'Takes responsibility and helps a group move forward.',strengths:['Leadership','Organisation','Fairness'],skills:['Set a clear goal and share the work.','Make decisions that consider everyone affected.','Own mistakes and put things right.'],action:'Take responsibility for one task and see it through.'}
];

const grid = document.getElementById('character-grid');
const gallery = document.getElementById('gallery-view');
const detail = document.getElementById('detail-view');
const spritePosition = i => `${(i % 4) * 100 / 3}% ${Math.floor(i / 4) * 50}%`;
let activeIndex = null;

characters.forEach((character, i) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'character-card';
  button.setAttribute('aria-label', `Open ${character.name} profile`);
  const art = document.createElement('span');
  art.className = 'card-art';
  art.style.backgroundPosition = spritePosition(i);
  art.setAttribute('aria-hidden', 'true');
  const footer = document.createElement('span');
  footer.className = 'card-footer';
  const name = document.createElement('span');
  name.className = 'card-name';
  name.textContent = character.name;
  const arrow = document.createElement('span');
  arrow.className = 'card-arrow';
  arrow.textContent = '↗';
  arrow.setAttribute('aria-hidden', 'true');
  footer.append(name, arrow);
  button.append(art, footer);
  button.addEventListener('click', () => { location.hash = `character-${i + 1}`; });
  grid.append(button);
});

function fillList(container, values, className) {
  container.replaceChildren(...values.map(value => {
    const node = document.createElement(className === 'chip' ? 'span' : 'li');
    if (className) node.className = className;
    node.textContent = value;
    return node;
  }));
}

function updateView() {
  const match = /^#character-(\d+)$/.exec(location.hash);
  const index = match ? Number(match[1]) - 1 : -1;
  if (!characters[index]) {
    gallery.hidden = false;
    detail.hidden = true;
    if (activeIndex !== null) grid.children[activeIndex]?.focus({preventScroll:true});
    activeIndex = null;
    return;
  }
  const character = characters[index];
  gallery.hidden = true;
  detail.hidden = false;
  document.getElementById('detail-portrait').style.backgroundPosition = spritePosition(index);
  document.getElementById('detail-portrait').setAttribute('aria-label', `Illustration of ${character.name}`);
  document.getElementById('detail-number').textContent = String(index + 1).padStart(2, '0') + ' / 12';
  document.getElementById('detail-title').textContent = character.name;
  document.getElementById('detail-lead').textContent = character.lead;
  document.getElementById('detail-action').textContent = character.action;
  document.getElementById('nav-count').textContent = `${index + 1} / 12`;
  fillList(document.getElementById('detail-strengths'), character.strengths, 'chip');
  fillList(document.getElementById('detail-skills'), character.skills);
  activeIndex = index;
  window.scrollTo(0, 0);
}

document.getElementById('back-button').addEventListener('click', () => { location.hash = ''; });
document.getElementById('previous-button').addEventListener('click', () => { location.hash = `character-${(activeIndex + 11) % 12 + 1}`; });
document.getElementById('next-button').addEventListener('click', () => { location.hash = `character-${(activeIndex + 1) % 12 + 1}`; });
window.addEventListener('hashchange', updateView);
updateView();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
