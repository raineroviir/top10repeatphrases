// problem = 'Given a string representing a document, write a function which returns the top 10 most frequent repeated phrases. A phrase is a stretch of three to ten consecutive words and cannot span sentences. Only include a phrase if it is not a subset of another, longer phrase (if “calm cool” and “calm cool and collected” are repeated, do not include “calm cool” in the returned set).'



function topTenRepeatPhrases(string) {
  //we need a word counter to parse the document and count and look for sets of a minimum of 3 words, or 3 separate strings separated by spaces.  The counter breaks when we get to 10 and or when encountering a period (can't span sentences).
  let library = {}
  const sentences = string.split('.')

  sentences.forEach((v,i,a) => {
    let words = v.trim().split(' ')
    function recursivePhraseBuilder(words) {
      if (words.length < 3) { return }
      let phrase = words
      //here we define the longest phrase length and also set up a ternary to catch ends of sentences
      let maxPhraseLength = words.length < 6 ? words.length : 3
      phrase = words.slice(0, maxPhraseLength)

      // convert our array of words back to readable phrase
      phrase = phrase.join(' ').toLowerCase()
      //searches for existing strings in library that have some match
      function checkForDupes(input) {
        modifiedPhrase = input.slice(1, input.length)
        if (input.length < 2) { return false }
        const keys = Object.keys(library)
        return keys.some((v,i,a) => {
          const match = v.match(input.join(' ').trim())
          if (library[v] > 1 && match) {
            return true
          } else {
            return false
          }
        })
        return checkForDupes(modifiedPhrase)
      }
      const duplicateChecker = checkForDupes(phrase.split(' '))
      if (!duplicateChecker) {
        if (!library[phrase]) {
          library[phrase] = 1
        } else {
          library[phrase] += 1
        }
      }
      words.shift()
      return recursivePhraseBuilder(words)
    }
    recursivePhraseBuilder(words)
  })
  //lets remove phrases that only occured once
  let repeatedPhrases = {}
  for (var key in library) {
    if (library[key] !== 1) {
      repeatedPhrases[key] = library[key]
    }
  }
  //to do: create sorting function to return top 10 key, value pairs
  return repeatedPhrases
}
string = `Mary had a little lamb. Later she no longer had a little lamb.`

topTenRepeatPhrases(string)
