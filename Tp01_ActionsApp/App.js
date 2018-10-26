import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: []
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie);
        this.setState({texteSaisie: nouvelleSaisie})
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider !')

        if(this.state.texteSaisie !== '') {
            var newActionsList = this.state.actions.concat({
                title: this.state.texteSaisie,
                finished: false
            })
            this.setState({ actions: newActionsList })
            this.setState({ texteSaisie: '' })
        }
    }

    pressOnAction = (nom, title) => {
        nom == "Supprimer" ? this.deleteAction(title) : this.finishAction(title)
    }
    deleteAction(title) {
        var newActions = this.state.actions.filter(action => action.title != title)
        this.setState({ actions: newActions })
    }
    finishAction(title) {
        var newActions = this.state.actions
        var action = newActions.filter(action => action.title == title)[0]
        action.finish = true
        this.setState({ actions: newActions })
    }

    render() {
        const {texteSaisie} = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions listActions={this.state.actions} pressOnAction={this.pressOnAction}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})