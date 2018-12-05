import Player from '../Player'
import PlayingCard from '../PlayingCard'
import RoundResult from '../RoundResult'

describe('RoundResult', () => {
  let asker, target, cards, roundResult

  beforeEach(() => {
    asker = Player.asHuman('Human Asker')
    target = new Player('Target')
    cards = [new PlayingCard('A', 'S'), new PlayingCard('A', 'C')]
    roundResult = new RoundResult(asker, cards, target)
  })

  describe('#constructor', () => {
    it('takes in the name of the player from whom the card came', () => {
      expect(roundResult.asker()).toEqual(asker)
    })

    it('takes in the name of the target player', () => {
      expect(roundResult.target()).toEqual(target)
    })

    it('takes in the cards taken', () => {
      expect(roundResult.cards()).toEqual(cards)
    })
  })

  describe('#toString', () => {
    describe('Human Asker gets catch', () => {
      it('returns the round result string', () => {
        expect(roundResult.toString()).toEqual(`You took ${cards.join(', ')} from ${target.name()}`)
      })
    })

    describe('Human Asker goes fishing', () => {
      it('returns the round result string', () => {
        cards = [new PlayingCard('A', 'S')]
        roundResult = new RoundResult(asker, cards)
        expect(roundResult.toString()).toEqual(`You drew ${cards.join(', ')} from the deck`)
      })
    })

    describe('Bot Asker gets catch from Human Target', () => {
      it('returns the round result string', () => {
        asker = new Player('Asker')
        target = Player.asHuman('Human Target')
        roundResult = new RoundResult(asker, cards, target)
        expect(roundResult.toString()).toEqual(`${asker.name()} took ${cards.join(', ')} from you`)
      })
    })

    describe('Bot Asker goes fishing', () => {
      it('returns the round result string', () => {
        asker = new Player('Asker')
        cards = [new PlayingCard('A', 'S')]
        roundResult = new RoundResult(asker, cards)
        expect(roundResult.toString()).toEqual(`${asker.name()} drew cards from the deck`)
      })
    })

    describe('Bot Asker gets catch from Bot Target', () => {
      it('returns the round result string', () => {
        asker = new Player('Asker')
        roundResult = new RoundResult(asker, cards, target)
        expect(roundResult.toString()).toEqual(`${asker.name()} took ${cards.join(', ')} from ${target.name()}`)
      })
    })
  })
})
