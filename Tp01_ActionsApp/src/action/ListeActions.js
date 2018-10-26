import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({listActions, pressOnAction}) => {

    return (
        <View>
            {
                listActions.map(action => <UneAction action={action} key={action} pressOnAction={pressOnAction}/>)
            }
        </View>
    )
}

export default ListeActions