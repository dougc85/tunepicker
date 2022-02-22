const fullNew = ['That Old Black Magic', 'Body and Soul', 'Sweet and Lovely', 'You Stepped Out of a Dream', 'Sidewinder', 'Eternal Triangle', 'I Didn’t Know About You', 'My Melancholy Baby', 'Fee Fi Fo Fum', 'I Hear a Rhapsody'];
const fullMed = ['Sonny moon for two', 'Four', 'It had to be you', 'Pent up House', 'Dolphin Dance', 'Tell Me a Bedtime Story', 'Spring Can Really Hang You Up the Most', 'Without a Song', 'You don’t know what love is', 'As Time Goes By'];
const fullKnow = ['Half Nelson', 'Embraceable You', 'September in the Rain', 'How Insensitive', 'Ceora', 'I Could Write a Book', 'Girl From Ipanema', 'Bolivia', 'Pennies From Heaven', 'Airegin', 'Nearness of You', 'Sleeping Bee', 'Come Fly With Me', 'Along Came Betty (w ending)', 'Come Rain Or Come Shine - Blakey', 'Cheek to Cheek', 'Change Partners', 'You’re Everything', 'Lady is a Tramp', 'Speak No Evil', 'Jitterbug Waltz', 'Joy Spring', 'Detour Ahead', 'I Let Song Go Out My Heart', 'Its Only a Paper Moon (w intro)', 'Darn That Dream', 'Hot House', 'I’ve got the world on a string', 'Yesterdays', 'Here’s that rainy Day', 'April in Paris w/ ending', 'Sweet Georgia Brown', 'Cheryl', 'Unforgettable', 'Almost Like Being in Love', 'I Mean You', 'I Thought About You', 'Moonlight in Vermont', 'Confirmation', 'Mean to Me', 'Well You Needn’t', 'My Foolish Heart', 'Con Alma', 'Up Jumped Spring', 'It Don’t Mean a Thing', 'Prelude to a Kiss', 'You’d be so nice', 'Just Friends', 'Emily', 'Skylark', 'How Deep is the Ocean', 'Windows', 'Bloomdido', 'Blame it on my Youth', 'My Romance', 'Over the Rainbow', 'Jody Grind', 'Young at Heart', 'All or Nothing at all', 'Back at the Chicken Shack', 'Our Love is Here to Stay', 'No more blues', 'Wise One', 'On the Sunny Side of the Street', 'Sandu', 'Dat Dere', 'Donna Lee', 'Doxy', 'When it Rains', 'Night Train', 'Jeannine', 'Gloria’s Step', 'Whisper Not', 'When Sunny Gets Blue', 'Witchcraft', 'Black Nile', 'I’ve got you under my skin', 'Inner Urge', 'Stardust', 'Blue Train', '26-2', 'There is No Greater Love', 'Nica’s Dream', 'Isfahan', 'Cool Eyes', 'Yancey Special', 'L-o-v-e', 'Milestones', 'Moose the Mooche', 'The Very Thought if You', 'In Your Own Sweet Way', 'How about you', 'Recorda-Me', 'Ask Me Now', 'Yardbird suite', 'Round Midnight (intro &coda)', 'Samba de Orfeo', 'UMMG', 'Ornithology', 'Sleeping Dancer Sleep On', 'Dance of the Infidels', 'Pensativa', 'Conception', 'It never entered my mind', 'You make me feel so young', 'Moment’s Notice', 'Deed I do', 'Blues for Alice', 'Dindi W intro', 'Bye-Ya', 'Bouncing with Bud', 'Syeeda’s Song Flute', 'Sophisticated Lady', 'Valse Hot', 'Love For Sale', 'Wail', 'Sugar Ray'];

//const tuneStorageNewJSON = window.localStorage.getItem('tuneStorageNew');
const tuneStorageMedJSON = window.localStorage.getItem('tuneStorageMed');
const tuneStorageKnowJSON = window.localStorage.getItem('tuneStorageKnow');
const tuneStorageEditsJSON = window.localStorage.getItem('tuneStorageEdits');

//let newList = tuneStorageNewJSON ? (JSON.parse(tuneStorageNewJSON)) : [];
let newList = [...fullNew];
let medList = tuneStorageMedJSON ? (JSON.parse(tuneStorageMedJSON)) : [];
let knowList = tuneStorageKnowJSON ? (JSON.parse(tuneStorageKnowJSON)) : [];
let editsArray = tuneStorageEditsJSON ? (JSON.parse(tuneStorageEditsJSON)) : [];
/*
if (newList === undefined || newList.length === 0) {
  newList = [...fullNew];
}
*/

if (medList === undefined || medList.length === 0) {
  medList = [...fullMed];
}
if (knowList === undefined || knowList.length === 0) {
  knowList = [...fullKnow];
}
if (editsArray === undefined) {
  editsArray = [];
}

const tuneData = { newList, medList, knowList, fullKnow };

export default tuneData;