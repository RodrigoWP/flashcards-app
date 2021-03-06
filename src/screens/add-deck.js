import React, { PureComponent } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, View, Keyboard } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addDeck } from 'reducers/decks/action-creators'
import { Container, Header } from 'layout'
import { black, graySemiLight } from 'style/colors'
import { RaisedButton, Input } from 'components'
import { v1 as uuid } from 'uuid'

class AddDeck extends PureComponent {
  state = {
    deckTitle: '',
    pristine: true
  }

  onChangeDeckTitle = (deckTitle) => {
    this.setState({ 
      deckTitle,
      pristine: deckTitle === ''
     })
  }

  createDeck = async () => {
    const deckId = uuid()
    const deck = {
      id: deckId,
      title: this.state.deckTitle
    }

    const { addDeck } = this.props

    await addDeck(deck)
    this.navigateToDeckDetail(deckId)
    Keyboard.dismiss()
  }

  navigateToDeckDetail = (deckId) => {
		const { navigation } = this.props

    navigation.navigate('DeckDetail', { deckId: deckId })
  }

  backPressed = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  render () {
    const { deckTitle, pristine } = this.state

    return (
      <Container stretch={true}>
        <Header
          title='new deck'
          onBackPressed={this.backPressed} />
        <Container>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View>
              <Text style={styles.label}>What is the title of your deck?</Text>
              <Input
                value={deckTitle}
                onChangeText={this.onChangeDeckTitle}
                placeholder='Deck title' />
            </View>
            <RaisedButton
              label='Create Deck'
              disable={pristine}
              onPress={this.createDeck}
              style={{ marginTop: 20 }} />
          </KeyboardAvoidingView>
        </Container>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },

  label: {
    color: black,
    height: 40,
    fontSize: 26,
    textAlign: 'center'
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({ addDeck }, dispatch)

export default connect(
	null,
	mapDispatchToProps
)(AddDeck)
