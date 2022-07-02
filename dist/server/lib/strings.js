const strings = {
  creation: {
    race: ["Human", "Half-Orc", "Elf", "Dwarf", "Gnome", "Halfling"],
    adj: ["bigoted", "bitchy", "blunt", "boisterous", "bossy", "brave", "callous", "cautious", "charming", "cheerful", "churlish", "cold", "composed", "conceited", "condescending", "confident", "conscientious", "cool-headed", "courageous", "crabby", "crass", "critical", "cruel", "cunning", "curious", "cynical", "decisive", "dependable", "determined", "driven", "fearless", "flamboyant", "flirtatious", "friendly", "gruff", "headstrong", "hot-headed", "lazy", "loud", "Machiavellian", "moody", "philosophical", "pompous", "pretty chill", "romantic", "selfish", "sensitive", "tactless", "thoughtful", "wary", "depressed", "delightful", "demure", "diligent", "disruptive", "discerning", "dramatic", "dutiful", "frank", "funny", "fussy", "generous", "gentle", "gloomy", "grave", "grouchy", "guarded", "hateful", "helpful", "hot-headed", "hypercritical", "level-headed", "mean", "methodical", "meticulous", "miserable", "motivated", "morose", "naive", "nosy", "peaceful", "pensive", "plain-speaking", "playful", "plucky", "positive", "proud", "prejudiced", "quick-tempered", "reliable", "reluctant", "resentful", "resourceful", "respectful", "restless", "sassy", "sentimental", "short-tempered", "snobby", "sombre", "sophisticated", "spiteful", "soulless", "stern", "stoic", "surly", "sweet", "suspicious", "talented", "warm-hearted", "wary", "well-intentioned", "adventurous", "agreeable", "ambitious", "anxious", "apathetic", "argumentative", "assertive", "attentive", "impulsive", "intolerant", "inventive", "overemotional", "unpredictable", "eager", "easy-going", "egotistical", "emotional", "enterprising", "enthusiastic", "excitable", "impatient", "impetuous", "inconsiderate", "insensitive", "irritable", "obnoxious", "old-fashioned", "outgoing", "outspoken", "unbalanced", "unstable", "absent minded", "melodramatic", "paranoid", "chipper", "passive-aggressive", "amicable", "broad-minded", "compassionate", "considerate", "diplomatic", "faithful", "hard-working", "modest"],
    loc: ["a tiny village", "the smallest mountain in the world", "the forest of sadness", "the city sewers", "the gutter", "a large family", "a orphanage workhouse", "a slave owning city", "a town that only ever bartered for goods", "a super religious upbringing", "a mid-level cult", "a cavern without echoes", "a commune", "the wet desert", "an unchartable island", "a small family farm", "a village without a tavern", "the slave fighting pits", "a company of sellswords", "an underground network of dragon caves", "a mercenary company", "a nocturnal town", "a city that never slept", "a royal lineage", "a carnival freak show", "an impure bloodline", "the petrified wood", "a strict monastery", "a local street gang", "the now dry swamp", "a ruined city", "a haunted castle", "the best library in the city", "a bustling city", "a maximum security prison", "a floating city", "an underground city", "a theatre company", "the guards academy", "a small town tavern", "the grave diggers union", "the royal bank", "a haberdashery", "the city post office", "a travelling band", "a fishing village", "a boarding school for the children of middle-class wizards", "the base of a volcano", "an illusory forest", "a forgotten elven monastery", "the pirate infested isles", "an unchartable island", "an asylum", "a fallen kingdom", "the inner city slums", "an underwater monastery", "a mining town", "a high-class brothel", "a nomad circus", "a tourist town in the mountains", "the high-plains desert", "an oasis village", "the worst brothel in town", "the freelands", "a childrens workhouse", "the tundra", "the nice part of a bad town", "a peaceful coastal town ", "the wilds", "a pompous wizard school", "a small remote village", "an ancient monastery", "a very tiny province", "a silk and spices trade galley", "the tower of bones", "a string of terrible places to live", "a notorious dungeon", "the wild wood", "the hold of a slave ship", "the slums of a port city", "a laid back beach town", "a place only they can pronounce", "an extremist temple", "the rat catchers guild", "a sheltered upbringing", "a sunken city", "the dry lands", "the salt flats", "a city in the shifting sands", "the most vile of swamps", "a tropical paradise", "a gnome run orphanage", "a recently erupted volcano village", "Waterdeep", "a small family bakery", "a small town where nothing ever happened", "an underground military stronghold", "a town of Outlaws", "a war-torn city", "a plague ridden city", "a poor dairy farm", "the local tavern", "the northern icelands", "the dusty mountains", "an isolated monastery ", "Briarwood Castle", "the endless cornfields ", "the Gladiator Arena", "an affluent upbringing", "a prison colony", "a backwater village", "from a city deep under the mountains", "the northern wastelands", "a local brewery", "a small town wizarding school", "a secluded forest village", "a desert town hidden inside a sandstorm", "a wealthy vineyard", "a frozen jungle", "the city slums", "A floating shanty town", "A cliff-side village", "a rundown adventuring tavern", "a moving island", "a cursed village", "the Ruined Sea", "a quiet woodland hut", "the sea of sand", "the citadel", "an island long thought to be uninhabited", "the long abandoned mines", "a small town on the border", "a broken home", "a thriving seaport town", "a destroyed city", "the North Plains", "the iceberg sea", "the Valley of the Giants", "the badlands", "the wilderness", "a quaint little village on a hill", "a haunted forest", "a conquered city", "the lizard infested marshlands", "the kitchens of the local barracks", "Black Rock Beach", "an internment camp", "a small farm in the grasslands", "an engineers guild", "Thornwood", "the treeless forest", "the Dank Hollows", "a bustling underground kingdom", "an underwater city once dry by a magical force field", "the strongest family heritage line in the land", "the royal catacombs", "a fake leper colony hiding a secret", "a halfway house", "the city of lights", "the City of Ten Thousand Flags", "the enchanted forest", "a slave market", "a city no one else has ever heard of", "The mean uncobbled streets of the city", "the dungeon inspectors guild (local #422)", "Lady Marigolds Dance Academy", "a camp of army followers", "a doomed dwarven fortress", "a city with towers that rival the clouds", "the wetlands", "A destitute plantation", "the royal court", "A foggy peninsula", "A secret brawlers guild", "a hastily erected tent city", "an aristocratic family", "the Parliament of Beggars", "a enchanted forest logging company", "the scorched plains", "the boneyard", "the iron mountain range", "the deep wood", "the vast wastes", "the black dungeon", "a powerful trading town", "the poor surroundings of the capital city", "a low ceilinged castle", "a line of fallen royalty", "a boarding school", "Black Oak", "the white halls of the north", "a village without children", "the Wayferer Foothills", "a deserted island", "the shifting desert", "the shade forests", "a sunken city", "a rural construction company", "the assassins guild", "the black citadel", "an abandoned fortress", "an island that cant be reached by boat", "the endless wastes", "a frozen wasteland", "a free thinkers commune", "a broken home", "a sleepy harbour town", "The shattered mountain range", "the forked islands", "a disgraced family of knights", "the city watch", "a refugee camp for war orphans", "a complex bureaucratic society", "a large desert metropolis", "a dysfunctional marriage", "a poorly run orphanage", "a bustling city market", "a dilapidated mansion", "a young offenders institute", "the Forest of Faces", "the improbable peaks", "the sealed city", "the class act travelling circus", "a run down tavern", "the Underdark", "a man made desert", "a slave caravan", "the fey wilds", "a high end gambling house", "a drought-stricken farm", "a now impoverished noble family", "the quality control for potion brewing association", "a town where orcs are bought and sold as slaves", "a secret order of monks", "the imperial army"],
    desc: ["doesnt believe in magic, ever", "hates wearing their glasses", "finds it impossible to speak to girls", "has always wanted to open their own tavern", "has a huge debt to pay back", "was raised by ghosts", "suffers from claustrophobia", "is really (I MEAN REALLY) afraid of the dark", "makes inappropriate jokes at the worst times", "is afraid of heights", "doesnt understand the concept of politeness", "always alliterates their anecdotes", "has a bad gambling problem", "was told theyll never be good enough", "wants everyone to like them", "never takes their armour off, just in case", "always wanted to learn magic but struggled with it", "always needs to be the centre of attention", "has no other family but the party", "was left out of their fathers will", "studied interior dungeon design", "is downright racist towards living skeletons", "believes theyre a demi god, but hasnt figured out who their father is yet", "is writing an autobiography", "has serious daddy issues", "has a drinking problem", "is completely colour blind", "failed out of every guild going", "saw their whole family consumed by a gelatinous cube", "gets nervous speaking in front of crowds", "is afraid of sharp edges", "doesnt have a reflection", "suffers from nosebleeds", "is uncomfortable around old people (they smell like death)", "cant swim", "was brought up to be a librarian", "grew up in a graveyard", "is afraid of fire", "hates music", "grew up fat", "distrusts all authority", "mistrusts anyone smaller than them", "hates the monarchy", "is afraid of dogs", "was once rescued by wolves", "has anger problems", "always romanticised adventure", "cant read", "deserted the army", "is responsible for their sisters death", "is certain their days are numbered", "always takes first watch", "cant silence the voices", "meditates before dawn", "constantly watches their back", "always refers to inanimate objects as she", "always wakes up on the right side of the bed", "always keeps their promises", "is a recovering cannibal", "wants to be famous, no matter what", "believes trees can speak to them and them alone", "is trying to get out of the adventuring business to settle down", "takes great delight in identifying new beetle species", "has serious activity_game image problems", "is a recovering gambling addict", "cant stand the sight of blood", "secretly became an adventurer to impress a love interest", "is afraid the rest of the party will kill them if they try to leave", "searches endlessly for their kidnapped child", "would rather kill you than make eye contact", "was kidnapped by cultists", "has twenty-seven siblings to provide for", "ran afoul of the goblin mob", "is searching for the perfect culinary dish", "has nothing left to lose", "doesnt know their own strength", "has had it up to here with everyones crap", "is red-green colorblind", "carries the skull of their best friend", "has a serious weapons fetish", "has taken a vow of silence", "is just trying to get by", "is trying to avoid a prophecy", "has really bad hay fever", "wants to clear their name", "doesnt believe in hygiene", "is being hunted by a terrible monster", "is dying of a plague and searching for a cure", "lost their family in a dragon attack ", "fights for undead rights", "once survived a boiling cauldron", "forever picking fights to win back honour", "cant stand silence", "lost minor appendages due to their gambling addiction", "is absolutely astonished by jugglers", "cant sleep indoors", "only sleeps with the lights on", "hates to be clean", "drunkenly swore a blood oath and forgot what for", "doesnt perceive gender", "realised the importance of literacy far too late in life", "bangs on about their genealogy to everyone", "keeps a blacklist", "lost their shadow in a bet", "gets easily attached to people", "has cheated death more times than they deserved", "finds armour too restricting", "has no sense of smell", "insists they are the reincarnation of a legendary warrior", "refuses to bathe", "loved, lost and never loved again", "is lactose intolerant", "adds a notch to their sword every night", "prefers to fight drunk", "thinks they can read the future, but consistently gets it wrong", "killed their brother in a duel over their inheritance", "is cursed to speak in sentences of exactly ten words", "was raised as a hostage by their fathers enemies", "moonlights as a private investigator", "has an irrational fear of cats", "is completely and utterly tone-deaf", "is running from a marriage arranged by their parents", "wants to prove theyre no longer that goofy kid", "has gotten away with murder", "knows seven dangerous secrets", "has a debilitating fear of wide open spaces", "always speaks in the third person", "is manically obsessed with etiquette", "wants to smash the capitalist system", "is secretly fond of embroidery", "is searching for a rare fertility herb", "is a compulsive liar", "hates the written word", "wants to one day own their own ship ", "likes to settle arguments with headbutting contests", "has an outstanding warrant for their arrest ", "is the last of an ancient bloodline", "is the twin of the local monarch", "is pretty tight fisted with their gold", "is the only surviving member of their previous adventure party", "was disowned by their family", "names every piece of their gear", "is a complete exhibitionist", "always thinks outside the box", "accidentally torched the local temple and is now cursed by its god", "carries a cryptic treasure map they won in a tavern bet", "has been exiled twice under different names", "believes they have a claim to the throne", "constantly places themselves in danger, just to prove a point", "seeks to end a family feud", "has a pretty selective memory", "has accepted death as an inevitability", "sold everything they own to attend an adventurer academy", "has been on the run for over three years", "is terrified of rats", "believes the undead should be given a second chance", "was forced to watch their families execution", "cant stand children", "worries some of their memories have been tampered with", "hates to be touched", "lost their sense of smell in a bar fight", "likes to speak in rhyme", "cant seem to hold their liquor", "fights for species equality", "was petrified for over two hundred years", "is trying to dodge the draft", "unwittingly misuses words all the bloody time", "has some pretty shady connections", "was beaten and imprisoned for their religious beliefs", "started a rebellion in the northern mountains", "acts shallow but only to hide their insecurities", "makes all minor decisions by flipping a coin", "wants to become a famous singer", "was, until recently, employed to run a dungeon", "had their lost legs replaced with enchanted wood", "always looks their best", "is haunted by the ghost of their father", "was exiled by their brother the king", "always gives the good news first", "used to work as a tavern bouncer", "tries to be a friend to everyone", "hates riding horses", "left their home in disgrace", "doesnt understand sarcasm", "suffers from night terrors", "never passes up a chance to say, I told you so.", "was framed for the murder of a famous and well-loved innkeeper", "believes in racial purity", "is a former bare knuckle boxer", "always cuts to the chase", "always gives the bad news first", "was a weapons instructor for the city militia", "is on the run after having an affair with a nobles daughter", "has a twin that constantly impersonates them", "hasnt been quite right since the accident", "hasnt accomplished anything in their short life yet", "is trapped in a Faustian bargain", "lost their marbles a long time ago", "has a burning hatred for pirates", "aims to learn every language in the land", "owes money to the wrong people", "believes in an eye for an eye", "never turns the other cheek", "once served as a court jester", "in hindsight shouldnt have had the treasure map tattooed on themselves", "already made and lost a fortune", "has a poem for all occasions", "was drafted into the army at fourteen", "has a regular sleepwalking issue", "was cut from their dead mothers womb", "was apprenticed to a failed alchemist", "was jailed for a crime they didnt commit", "is posing as someone else", "was expelled from the royal guards", "is the last of the kings bastard children", "has never been kissed", "suffers from crippling stage-fright", "is writing an epic poem about the partys adventure", "really knows how to party", "loves to haggle", "suffers from a recurring nightmare", "needs to earn the trust of a hated duke", "came out of retirement for this adventure", "loots every kill but leaves enough to pay for their burial", "woke up in a bar with no memory and a sealed letter", "was once a dungeon trap designer", "is haunted by the ghosts of their forefathers", "doesnt have time for all this prophecy bullshit", "is dealing with a midlife crisis", "has delusions of grandeur", "just wants their money back", "always wanted to be an artist", "believes plate armour is just a sign of being posh and over privileged", "failed to protect the royal family", "likes to settle arguments with an arm wrestle", "never returned anything they borrowed", "had their nose cut off in a duel", "believes dungeon crawling is just breaking and entering", "bribed a nobleman to help them smuggle slaves out of a tyrannical kingdom", "was born in a different activity_game", "suffers from vertigo", "lost two fingers in a training accident", "is tracking down the treasure their father died trying to find", "carries a charmed locket that they cant open", "is getting too old for all this", "no longer dreams", "rejected a foreign princes marriage proposal", "has a bad habit of making funny quips after every kill", "ran away at the age of eleven", "has wooden teeth after the incident with the mace", "carries the scars of an attempted suicide", "won a duel they were supposed to lose out of sheer luck", "hates being made to wait", "seems to know everyone", "keeps getting mistaken for a famous knight", "is searching for the knowledge of true immortality", "lost their best friend in an ambush", "is currently on probation for drunk and disorderly behaviour", "is haunted by the ghosts of those they kill", "was badly burnt by a sorcerer", "was written out of their family will", "is planning to retire next year", "is in way too deep with the wrong sort of people", "exaggerates everything they talk about", "has no concept of personal space", "never got the proper training", "is in so far over their head that they cant help but laugh", "can only whisper after an attempted hanging", "is really good at bribing officials", "is quick to take credit and assign blame", "refuses to admit theyre past their prime", "has never had their hair cut", "only has two more years before a demon comes back to claim their soul", "only became an adventurer after losing a bet", "is wanted for a reward", "wears a mysterious necklace that constantly brings them out in a rash", "parties hard, way too hard.", "isnt technically alive anymore", "is convinced theyre always being left out", "doesnt speak a word of common"]
  },
  awaken: {
    first: 'You arrive in Town one sunny morning, ready to begin your adventure.',
    start: 'You awaken ',
    place: {
      tavern: 'at the tavern, ',
      outside: 'under the open skies, '
    },
    location: {
      floor: 'aching head to toe from sleeping on the hard wooden floor. You slowly move around and break your fast.',
      room: 'feeling a good measure better than you did before. You get ready and head down to break your fast.',
      suite: 'feeling like a million marks. You rub your eyes, stretch, and head down to break your fast.'
    },
    stipend: "You receive {0} marks as stipend from your family's lands."
  },
  shops: {
    court: ["Give me a good jape.", "Give me a good reason.", "Have you seen Queen Beth?", "I'm getting bored.", "OFF WITH HIS HEAD!", "Show me something special.", "Tell me a story.", "What a clever little man.", "Where have you been?", "Why should I listen?", "You are boring me."],
    healer: ["Alms for the poor?", "Be brave like Queen Beth.", "Can you spare some marks?", "Care for a massage?", "How may I aid thee?", "Let me heal thy aches.", "Please let me help.", "Share with the poor.", "Thou art distressed.", "Thou art disturbed.", "Tithe for thy soul."],
    tavern: ["*Sniff* *Sniff* (Gulp)", "Beer is my friend.", "Hixxup! Excuse me.", "Huh? You say something?", "I'm kinda sleepy.", "I'm so happy.", "I love to drink.", "Queen Beth who?", "This job is great.", "You're my best friend."],
    weapons: ["Buy something sharp.", "Elf Bows are fast.", "Greetings Friend.", "How are you today?", "My joints are aching.", "Queen Beth is strong...", "See you at the Tavern.", "Want to arm wrestle?", "Welcome to my Shop.", "You think Aileen's cute?"],
    armor: ["Armour is good...", "Back fer more?", "C'mon sexy, smile.", "Cover ever'thing", "Hey there, sexy.", "Hiya Sonny!", "Need some shoes?", "Queen Beth is my hero.", "Watcha Got?", "What's your sign?"],
    trade: ["Aileen scares me.", "Hello Again.", "How are you?", "How's the family?", "I like Queen Beth.", "Need some help?", "Need something special?", "Nice weather today.", "The tavern is noisy.", "Want a kiss?", "You look healthy."],
    smithy: ["Acch! What is it?", "Elf Bows? Bah!", "FIX IT!? Yure Nuts!", "Gak! I hate Elf Bows!", "Here's a pretty piece.", "I spit on Mythril.", "REPAIR!? Smeg off!", "Shades! Go away!", "Think you're tough?", "This is art, laddy.", "This is me finest work.", "Well, piss on me.", "What now!", "What the hell you want?", "You're no Queen Beth."]
  },
  encounter: {
    main: ["While trekking through the {0}, you come across a {1} heading right for you.", "You are hunting a rabbit through the {0} when you come across a {1}."],
    attack: ["Attack yon Beastie", "Assault the Brute", "Battle the Creature", "CHARGE!"],
    flee: ["Run Away!", "Flee for Safety", "Give it the Slip", "Flee the Creature", "Make Good your Escape", "Run For your Life"],
    feed: ["Feed the Creature", "Give It a Bite to Eat", "Toss it Food"],
    help: ["Lend a Hand", "Aide the Poor Devil", "Step In and Help"],
    pay: ["Pay the Ransom", "Pay the Brute"],
    trade: ["Trade", "Exchange Goods"],
    answer: ["Answer", "Hazard a Guess"],
    seduce: ["Seduce the Creature"]
  }
};
module.exports = strings;