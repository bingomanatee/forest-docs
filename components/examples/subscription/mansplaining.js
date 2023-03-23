const { Forest } = require('@wonderlandlabs/forest')
const _ = require('lodash')

const WANT_SEX = 'Want to have some sex?'
const I_LIKE_BEER = 'I like beer'

const WOMAN_THOUGHTS = [
  'Its a good day today',
  'How do you feel',
  'Do you like this weather?',
  'I like [generic movie star]',
  'Lets Go Shopping',
  'I want to go to the beach',
  'Lets go for a walk in the park'
]

const WOMAN_RESPONSES = new Map([
  [WANT_SEX, [{ phrase: 'Not right now' }, { phrase: 'Get fucked', stopSpeaking: true }]]
])

const MAN_THOUGHTS = [
  I_LIKE_BEER,
  'I think I am awesome',
  'I think I am awesome',
  'You are pretty',
  'I like [generic sports team]',
  'Monster trucks are cool',
  WANT_SEX,
]

const MAN_RESPONSES = new Map([
  [/ go /i, ["I'm tired", "That's too far", "I'm too drunk"]]
])

function any(list) {
  return _.shuffle(list)[0]
}

const speakerFactory = (name, thoughts, responses = new Map()) => {
  return {
    $value: {
      name,
      speaking: true
    },
    actions: {
      sayThought: (leaf, thought) => {
        // if no parameter, say a thing not related to other persons speech
        if (!thought || (leaf.parent.value.phrase === thought)) {
          thought = any(thoughts)
        }
        // console.log(leaf.value.name, 'thought', thought)
        leaf.parent.do.say(thought, leaf.value.name)
      },
      chooseResponse(leaf, options) {
        const response = any(options)
        //console.log('<response from ', options, 'is', response, '>');
        if (!response) {
          // console.log('no response from options', options);
          return
        }
        const { phrase, stopSpeaking } = (typeof response === 'string' ? { phrase: response } : response)
        if (phrase) {
          leaf.do.sayThought(phrase)
        }
        if (stopSpeaking) {
          leaf.do.set_speaking(false)
        }
      },
      respond(leaf, phrase, speaker) {
        if (!phrase) {
          return
        }
        if (leaf.value.name === speaker) {
          return
        }
        let options
        if (responses.has(phrase)) {
          options = responses.get(phrase)
        } else {
          responses.forEach((rOptions, key) => {
            if (!options && key instanceof RegExp) {
              if (key.test(phrase)) {
                // console.log('found a match for ', phrase, 'with', key)
                options = rOptions
              }
            }
          })
        }

        if (options) {
          leaf.do.chooseResponse(options)
        }
      },
      listenToConvo(leaf) {
        const sub = leaf.subscribe(({ phrase, speaker }) => {
          if (!leaf.value.speaking) {
            console.log(leaf.value.name, 'stopped listening to conversation....');
            sub.unsubscribe();
            return;
          }
          if (speaker === leaf.value.name) {
            return // don't respond to yourself
          }
          setTimeout(() => leaf.do.respond(phrase, speaker))
        });
      }
    }
  }
}

const convo = new Forest({
  $value: { phrase: '', time: Date.now(), speaker: '', awkward: 0 },
  children: {
    man: speakerFactory('Man', MAN_THOUGHTS, MAN_RESPONSES),
    woman: speakerFactory('Woman', WOMAN_THOUGHTS, WOMAN_RESPONSES)
  },
  actions: {
    silence(leaf) {
      leaf.do.set_awkward(leaf.value.awkward + 1)
    },
    say(leaf, phrase, speaker) {
      if (speaker === leaf.value.speaker) {
        // console.log('<same speaker repeating - more awkward>')
        leaf.value = { phrase, speaker, awkward: leaf.value.awkward + 1 }
      } else {
        //  console.log('<new speaker - not awkward>')
        leaf.value = { phrase, speaker, awkward: 0 }
      }
    }
  }
})

// talk until four awkward silences in a row;
let awkwardSilence = 0
let lastSpeaker = ''
const nonSequitor = () => {
  const speakerID = any(['man', 'woman'])
  const person = convo.child(speakerID)
  if (!(person.value.speaking)) {
    convo.do.silence()
  } else {
    person.do.sayThought()
  }

  if (convo.value.awkward > 6) {
    console.log('<awkward silence kills conversation>')
    clearInterval(interval)
  }
}

convo.child('man').do.listenToConvo()
convo.child('woman').do.listenToConvo()

const interval = setInterval(nonSequitor, 500)
let lastPhrase = ''
convo.subscribe(({ phrase, speaker, awkward }) => {
  //console.log('--- ', phrase, speaker, awkward);
  if (phrase === lastPhrase) {
    return
  }
  if (phrase) {
    console.log(speaker, 'said', phrase)
  } else {
    setTimeout(() => convo.do.silence())
  }
  lastPhrase = phrase;
})

/*

Man said I think I am awesome
Woman said Lets Go Shopping
Man said That's too far
Man said Monster trucks are cool
Woman said Lets go for a walk in the park
Man said I'm tired
Woman said How do you feel
Woman said I like [generic movie star]
Woman said Lets Go Shopping
Man said I'm tired
Man said I think I am awesome
Man said Monster trucks are cool
Man said Want to have some sex?
Woman stopped listening to conversation....
Woman said Get fucked
Man said I like beer
Man said I think I am awesome
Man said I like [generic sports team]
Man said I think I am awesome
<awkward silence kills conversation>

 */
